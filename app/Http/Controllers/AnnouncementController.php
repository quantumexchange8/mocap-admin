<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\AnnouncementComment;
use App\Models\AnnouncementCommentMention;
use App\Models\AnnouncementPoll;
use App\Models\AnnouncementUser;
use App\Models\Department;
use App\Models\PollOptions;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class AnnouncementController extends Controller
{
    public function announcement()
    {

        return Inertia::render('Announcement/Announcement');
    }

    public function createAnnouncement()
    {

        return Inertia::render('Announcement/CreateAnnouncement');
    }

    public function getEmployeeTree()
    {
        $departments = Department::with(['users' => fn ($q) => $q->whereIn('role', ['employee', 'admin'])])->get();

        $departmentNodes = [];

        foreach ($departments as $dept) {
            $employeeNodes = [];

            foreach ($dept->users as $user) {
                $employeeNodes[] = [
                    'key' => $user->name,
                    'title' => $user->name,
                    'value' => $user->name,
                    'isLeaf' => true,
                ];
            }

            $departmentNodes[] = [
                'key' => $dept->name,
                'title' => $dept->name,
                'value' => $dept->name,
                'children' => $employeeNodes,
            ];
        }

        $tree = [];

        // All Employee group with departments inside
        $tree[] = [
            'key' => 'all',
            'title' => 'All Employee',
            'value' => 'all',
            'children' => $departmentNodes,
        ];

        // External member node
        $tree[] = [
            'key' => 'external_member',
            'title' => 'External Member',
            'value' => 'external_member',
            'isLeaf' => true,
        ];

        return response()->json($tree);
    }

    public function storeAnnouncementDraft(Request $request)
    {

        $auth = Auth::user();

        if($request->schedule_date || $request->schedule_time) {
            $validated = $request->validate([
                'schedule_date' => 'required_with:schedule_time',
                'schedule_time' => 'required_with:schedule_date',
                'recipient' => 'required',
                'subject' => 'required',
                'content_text' => 'required',
                'pin_type' => 'required_if:pin_bool,true',
                'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'poll_question' => 'nullable|string',
                'option' => 'required_with:poll_question',
                'option.*.option_name' => 'required|string',
                'duration_type' => 'required_with:poll_question',
                'end_date' => 'required_if:duration_type,set_end_date|nullable|date',
            ]);

            Validator::make($request->all(), [])->after(function ($validator) use ($request) {
                if ($request->duration_type === 'set_length') {
                    $day = (int) $request->length_day;
                    $hour = (int) $request->length_hour;
                    $minute = (int) $request->length_minute;
            
                    if ($day === 0 && $hour === 0 && $minute === 0) {
                        $validator->errors()->add('length_day', 'Duration cannot be all zero.');
                        $validator->errors()->add('length_hour', 'Duration cannot be all zero.');
                        $validator->errors()->add('length_minute', 'Duration cannot be all zero.');
                    }
                }
            })->validate();
        }

        $validated = $request->validate([
            'recipient' => 'required',
            'subject' => 'required',
        ]);

        if ($request->poll_question) {

            if ($request->duration_type === 'set_end_date') {
                $validated = $request->validate([
                    'end_date' => 'required_with:poll_question',
                ]);
            }

            if ($request->duration_type === 'set_length') {
                $validator = Validator::make($request->all(), [
                    'length_day' => 'nullable|integer|min:0',
                    'length_hour' => 'nullable|integer|min:0',
                    'length_minute' => 'nullable|integer|min:0',
                ]);
            
                $validator->after(function ($validator) use ($request) {
                    $day = (int) $request->length_day;
                    $hour = (int) $request->length_hour;
                    $minute = (int) $request->length_minute;
            
                    if ($day === 0 && $hour === 0 && $minute === 0) {
                        $validator->errors()->add('length_day', 'At least one of day, hour, or minute must be greater than 0.');
                    }
                });
            
                $validator->validate(); // will throw ValidationException if invalid
            }
        }

        // check schedule time will conflict poll end date
        $this->pollAndScheduleConflict($request);

        // Main Announcement
        $announcement = Announcement::create([
            'subject' => $request->subject,
            'content_title' => $request->subject,
            'content_text' => $request->content_text ?? null,
            'pin' => $request->boolean('pin_bool'),
            'pin_type' => $request->pin_type ?? null,
            'schedule_date' => $request->schedule_date ? Carbon::parse($request->schedule_date)->timezone('Asia/Kuala_Lumpur')->format('Y-m-d') : null,
            'schedule_time' => $request->schedule_time ? Carbon::parse($request->schedule_time)->timezone('Asia/Kuala_Lumpur')->format('H:i:s') : null,
            'status' => 'draft',
            'created_by' => $auth->id,
         ]);

        //  send to all user // selected user
        $recipientValues = $request->recipient; // Example: ['IT', 'user 4']

        // 1. Categorize recipient values
        $explicitUsers = [];       // Names or IDs of selected users
        $selectedDepartments = []; // Department names
        $includeAllEmployees = false;
        $includeExternal = false;

        foreach ($recipientValues as $value) {
            if ($value === 'all') {
                $includeAllEmployees = true;
            } elseif ($value === 'external_member') {
                $includeExternal = true;
            } elseif (Department::where('name', $value)->exists()) {
                $selectedDepartments[] = $value;
            } else {
                $explicitUsers[] = $value; // user names
            }
        }

        // 2. Handle all employees selection
        if ($includeAllEmployees) {
            $announcement->all_user = 1;
            $announcement->save();
            
            // Get all employees
            $allEmployees = User::whereIn('role', ['employee', 'admin'])->get();
            
            foreach ($allEmployees as $user) {
                DB::table('announcement_users')->insert([
                    'announcement_id' => $announcement->id,
                    'user_id' => $user->id,
                    'department_id' => null, // Include department_id for all employees
                    'read_at' => null,
                    'status' => 'inactive',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // 3. Handle external members
        if ($includeExternal) {
            $externalMembers = User::where('role', 'external_member')->get();
            
            foreach ($externalMembers as $user) {
                DB::table('announcement_users')->insert([
                    'announcement_id' => $announcement->id,
                    'user_id' => $user->id,
                    'department_id' => null, // External members typically don't have departments
                    'read_at' => null,
                    'status' => 'inactive',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // 4. Handle specific departments
        if (!empty($selectedDepartments)) {
            $departments = Department::whereIn('name', $selectedDepartments)->get();
            
            foreach ($departments as $department) {
                $departmentUsers = User::where('department_id', $department->id)->get();
                
                foreach ($departmentUsers as $user) {
                    DB::table('announcement_users')->insert([
                        'announcement_id' => $announcement->id,
                        'user_id' => $user->id,
                        'department_id' => $department->id, // Set department_id for department selections
                        'read_at' => null,
                        'status' => 'inactive',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }

        // 5. Handle explicit user selections
        if (!empty($explicitUsers)) {
            $users = User::whereIn('name', $explicitUsers)->get();
            
            foreach ($users as $user) {
                DB::table('announcement_users')->insert([
                    'announcement_id' => $announcement->id,
                    'user_id' => $user->id,
                    'department_id' => null, // Explicit user selections should have null department_id
                    'read_at' => null,
                    'status' => 'inactive',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        if ($request->like === 1) {
            $announcement->like_bool = 'yes';
            $announcement->save();
        } else {
            $announcement->like_bool = 'no';
            $announcement->save();
        }

        if ($request->commend === 1) {
            $announcement->comment = 'yes';
            $announcement->save();
        } else {
            $announcement->comment = 'no';
            $announcement->save();
        }

        //  create poll
        if ($request->poll_question) {

            $now = Carbon::now()->timezone('Asia/Kuala_Lumpur');

            if ($request->duration_type === 'set_end_date') {
                $poll = AnnouncementPoll::create([
                    'announcement_id' => $announcement->id,
                    'option_name' => $request->poll_question,
                    'duration_type' => $request->duration_type,
                    'duration_date' => $request->end_date ? Carbon::parse($request->end_date)->timezone('Asia/Kuala_Lumpur')->endOfDay() : null,
                    // 'duration_days' => $request->length_day ?? null,
                    // 'duration_hours' => $request->length_hour ?? null,
                    // 'duration_minutes' => $request->length_minute ?? null,
                    'expired_at' => $request->end_date ? Carbon::parse($request->end_date)->timezone('Asia/Kuala_Lumpur')->endOfDay(): $now,
                ]);
            }

            if ($request->duration_type === 'set_length') {
                $poll = AnnouncementPoll::create([
                    'announcement_id' => $announcement->id,
                    'option_name' => $request->poll_question,
                    'duration_type' => $request->duration_type,
                    // 'duration_date' => $request->end_date ? Carbon::parse($request->end_date)->timezone('Asia/Kuala_Lumpur')->endOfDay() : null,
                    'duration_days' => $request->length_day ?? null, // int
                    'duration_hours' => $request->length_hour ?? null, // int
                    'duration_minutes' => $request->length_minute ?? null, //int
                    'expired_at' => $now->copy()
                            ->addDays((int) $request->length_day ?? 0)
                            ->addHours((int) $request->length_hour ?? 0)
                            ->addMinutes((int) $request->length_minute ?? 0),
                ]);
            }

            if (!empty($request->option)) {
                foreach ($request->option as $opt) {
                    if ($opt['option_name']) {
                        $pollOpt = PollOptions::create([
                            'poll_id' => $poll->id,
                            'option_name' => $opt['option_name'],
                            'order_no' => $opt['order_no'],
                            'votes' => 0,
                        ]);
                    }
                }
            }
        } 

        //  thumbnail
        if ($request->hasFile('thumbnail')) {
            $announcement->addMedia($request->thumbnail)->toMediaCollection('thumbnail');
        }

        if (!empty($request->attachment)) {
            foreach ($request->attachment as $attch) {
                if ($attch) {
                    $announcement->addMedia($attch)->toMediaCollection('attachment');
                }
            }
        }

        return redirect()->back();
    }

    protected function pollAndScheduleConflict($request)
    {
        $now = Carbon::now()->timezone('Asia/Kuala_Lumpur');

        // Combine schedule date and time
        $schedule_date = $request->schedule_date ? Carbon::parse($request->schedule_date)->timezone('Asia/Kuala_Lumpur')->format('Y-m-d') : null;
        $schedule_time = $request->schedule_time;

        $schedule_datetime = null;

        if ($schedule_date && $schedule_time) {
            $schedule_datetime = Carbon::parse($schedule_date)
                ->setTimeFromTimeString($schedule_time)
                ->timezone('Asia/Kuala_Lumpur');
        }

        $expired_at = null;

        // Calculate expiry time
        if ($request->duration_type === 'set_end_date') {
            $expired_at = $request->end_date
                ? Carbon::parse($request->end_date)->timezone('Asia/Kuala_Lumpur')->endOfDay()
                : $now;
        }

        if ($request->duration_type === 'set_length') {
            $expired_at = $now->copy()
                ->addDays((int) ($request->length_day ?? 0))
                ->addHours((int) ($request->length_hour ?? 0))
                ->addMinutes((int) ($request->length_minute ?? 0));
        }

        // Check for conflict only if schedule_datetime is set
        if ($schedule_datetime && $expired_at && $schedule_datetime->greaterThan($expired_at)) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'schedule_date' => 'Scheduled date/time must be before the poll expiry date.',
            ]);
        }
    }


    public function getDraftAnnouncement()
    {

        $drafts = Announcement::where('status', 'draft')->with([
                'user:id,name,username', 
                'announcement_user', 
                'announcement_user.user',
                'announcement_comment',
                'announcement_user.department',
            ])->latest()->get();

        $drafts->each(function ($draft) {
            if ($draft->user) {
                $draft->user->profile_image = $draft->getFirstMediaUrl('profile_image');
            }
        });

        return response()->json($drafts);
    }

    public function storeAnnouncementPublish(Request $request)
    {
        $auth = Auth::user();

        // 主验证规则
        $mainRules = [
            'recipient' => 'required',
            'subject' => 'required',
            'content_text' => 'required',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];

        // 条件验证规则
        $conditionalRules = [
            'pin_type' => 'required_if:pin_bool,true',
            'poll_question' => 'nullable|string',
            'option' => 'required_with:poll_question',
            'option.*.option_name' => 'required|string',
            'duration_type' => 'required_with:poll_question',
            'end_date' => 'required_if:duration_type,set_end_date|nullable|date|after:now',
        ];

        // 合并验证规则
        $validated = $request->validate(array_merge($mainRules, $conditionalRules));

        // 自定义验证逻辑
        $validator = Validator::make($request->all(), []);
        
        // 验证持续时间长度
        $validator->after(function ($validator) use ($request) {
            if ($request->duration_type === 'set_length') {
                $this->validateDurationLength($validator, $request);
            }
            
            // 可以在这里添加其他自定义验证
        });
        
        $validator->validate();

        // check schedule time will conflict poll end date
        $this->pollAndScheduleConflict($request);

        // publish
        $this->publishAnnouncement($request);

        // 处理成功逻辑
        return redirect()->back()->with('success', 'Announcement published successfully!');
    }

    protected function validateDurationLength($validator, $request)
    {
        $day = (int) $request->length_day;
        $hour = (int) $request->length_hour;
        $minute = (int) $request->length_minute;

        if ($day === 0 && $hour === 0 && $minute === 0) {
            $validator->errors()->add('length_day', 'Duration cannot be all zero.');
            $validator->errors()->add('length_hour', 'Duration cannot be all zero.');
            $validator->errors()->add('length_minute', 'Duration cannot be all zero.');
        }
        
        // 可以添加更多持续时间验证逻辑
    }

    protected function publishAnnouncement($request) 
    {
        $auth = Auth::user();

        $now = Carbon::now()->timezone('Asia/Kuala_Lumpur');

        $announcement = Announcement::create([
            'subject' => $request->subject,
            'content_title' => $request->subject,
            'content_text' => $request->content_text,
            'pin' => $request->boolean('pin_bool'),
            'pin_type' => $request->pin_type ?? null,
            'status' => 'published',
            'created_by' => $auth->id,
            'published_at' => $now,
        ]);

         //  send to all user // selected user
         $recipientValues = $request->recipient; // Example: ['IT', 'user 4']

         // 1. Categorize recipient values
         $explicitUsers = [];       // Names or IDs of selected users
         $selectedDepartments = []; // Department names
         $includeAllEmployees = false;
         $includeExternal = false;
 
         foreach ($recipientValues as $value) {
             if ($value === 'all') {
                 $includeAllEmployees = true;
             } elseif ($value === 'external_member') {
                 $includeExternal = true;
             } elseif (Department::where('name', $value)->exists()) {
                 $selectedDepartments[] = $value;
             } else {
                 $explicitUsers[] = $value; // user names
             }
         }
 
         // 2. Handle all employees selection
         if ($includeAllEmployees) {
             $announcement->all_user = 1;
             $announcement->save();
             
             // Get all employees
             $allEmployees = User::whereIn('role', ['employee', 'admin'])->get();
             
             foreach ($allEmployees as $user) {
                 DB::table('announcement_users')->insert([
                     'announcement_id' => $announcement->id,
                     'user_id' => $user->id,
                     'department_id' => null, // Include department_id for all employees
                     'read_at' => null,
                     'status' => 'active',
                     'created_at' => now(),
                     'updated_at' => now(),
                 ]);
             }
         }
 
         // 3. Handle external members
         if ($includeExternal) {
             $externalMembers = User::where('role', 'external_member')->get();
             
             foreach ($externalMembers as $user) {
                 DB::table('announcement_users')->insert([
                     'announcement_id' => $announcement->id,
                     'user_id' => $user->id,
                     'department_id' => null, // External members typically don't have departments
                     'read_at' => null,
                     'status' => 'active',
                     'created_at' => now(),
                     'updated_at' => now(),
                 ]);
             }
         }
 
         // 4. Handle specific departments
         if (!empty($selectedDepartments)) {
             $departments = Department::whereIn('name', $selectedDepartments)->get();
             
             foreach ($departments as $department) {
                 $departmentUsers = User::where('department_id', $department->id)->get();
                 
                 foreach ($departmentUsers as $user) {
                     DB::table('announcement_users')->insert([
                         'announcement_id' => $announcement->id,
                         'user_id' => $user->id,
                         'department_id' => $department->id, // Set department_id for department selections
                         'read_at' => null,
                         'status' => 'active',
                         'created_at' => now(),
                         'updated_at' => now(),
                     ]);
                 }
             }
         }
 
         // 5. Handle explicit user selections
         if (!empty($explicitUsers)) {
             $users = User::whereIn('name', $explicitUsers)->get();
             
             foreach ($users as $user) {
                 DB::table('announcement_users')->insert([
                     'announcement_id' => $announcement->id,
                     'user_id' => $user->id,
                     'department_id' => null, // Explicit user selections should have null department_id
                     'read_at' => null,
                     'status' => 'active',
                     'created_at' => now(),
                     'updated_at' => now(),
                 ]);
             }
         }

        // like/comment function

        if ($request->like === 1) {
            $announcement->like_bool = 'yes';
            $announcement->save();
        } else {
            $announcement->like_bool = 'no';
            $announcement->save();
        }

        if ($request->commend === 1) {
            $announcement->comment = 'yes';
            $announcement->save();
        } else {
            $announcement->comment = 'no';
            $announcement->save();
        }

        //  create poll
        if ($request->poll_question) {

            $now = Carbon::now()->timezone('Asia/Kuala_Lumpur');

            if ($request->duration_type === 'set_end_date') {
                $poll = AnnouncementPoll::create([
                    'announcement_id' => $announcement->id,
                    'option_name' => $request->poll_question,
                    'duration_type' => $request->duration_type,
                    'duration_date' => $request->end_date ? Carbon::parse($request->end_date)->timezone('Asia/Kuala_Lumpur')->endOfDay() : null,
                    // 'duration_days' => $request->length_day ?? null,
                    // 'duration_hours' => $request->length_hour ?? null,
                    // 'duration_minutes' => $request->length_minute ?? null,
                    'expired_at' => $request->end_date ? Carbon::parse($request->end_date)->timezone('Asia/Kuala_Lumpur')->endOfDay(): $now,
                ]);
            }

            if ($request->duration_type === 'set_length') {
                $poll = AnnouncementPoll::create([
                    'announcement_id' => $announcement->id,
                    'option_name' => $request->poll_question,
                    'duration_type' => $request->duration_type,
                    // 'duration_date' => $request->end_date ? Carbon::parse($request->end_date)->timezone('Asia/Kuala_Lumpur')->endOfDay() : null,
                    'duration_days' => $request->length_day ?? null, // int
                    'duration_hours' => $request->length_hour ?? null, // int
                    'duration_minutes' => $request->length_minute ?? null, //int
                    'expired_at' => $now->copy()
                            ->addDays((int) $request->length_day ?? 0)
                            ->addHours((int) $request->length_hour ?? 0)
                            ->addMinutes((int) $request->length_minute ?? 0),
                ]);
            }
            

    
            if (!empty($request->option)) {
                foreach ($request->option as $opt) {
                    if ($opt['option_name']) {
                        $pollOpt = PollOptions::create([
                            'poll_id' => $poll->id,
                            'option_name' => $opt['option_name'],
                            'order_no' => $opt['order_no'],
                            'votes' => 0,
                        ]);
                    }
                }
            }
        }

        //  thumbnail
        if ($request->hasFile('thumbnail')) {
            $announcement->addMedia($request->thumbnail)->toMediaCollection('thumbnail');
        }

        // attachment
        if (!empty($request->attachment)) {
            foreach ($request->attachment as $attch) {
                if ($attch) {
                    $announcement->addMedia($attch)->toMediaCollection('attachment');
                }
            }
        }
    }

    public function getPinAnnouncement(Request $request)
    {

        $pinAnnouncement = Announcement::where('status', 'published')
            ->where('pin', 1)
            ->with(['user', 'announcement_user', 'announcement_comment'])
            ->get();

        return response()->json($pinAnnouncement);
    }

    public function getPublishedAnnouncement(Request $request)
    {
        $pubAnnouncement = Announcement::where('status', 'published')
            ->with(['user', 'announcement_user', 'announcement_user.user', 'announcement_comment'])
            ->get();

        return response()->json($pubAnnouncement);
    }

    public function draftAnnouncementDetails($id)
    {

        $announcements = Announcement::with([
            'user',
            'announcement_user',
            'announcement_user.user',
            'announcement_user.department',
            'announcement_poll',
            'announcement_poll.poll_options',
        ])->find($id);

        $announcmentPoll = AnnouncementPoll::where('announcement_id', $id)->first();
        $totalVote = PollOptions::where('poll_id', $announcmentPoll)->sum('votes');

        if ($announcements->user) {
            $announcements->user->profile_image = $announcements->user->getFirstMediaUrl('profile_image');
        }

        // Thumbnail
        $announcements->thumbnail = $announcements->getFirstMediaUrl('thumbnail');

        // Attachment
        $announcements->attachment = $announcements->getMedia('attachment')->map(function ($media) {
            return [
                'url' => $media->getUrl(),
                'file_name' => $media->file_name,
                'size' => $media->size,
            ];
        });
        
        return Inertia::render('Announcement/DraftAnnouncementDetails', [
            'announcements' => $announcements,
            'totalVote' => $totalVote
        ]);
    }

    public function updateDraftSchedule(Request $request)
    {

        $announcement = Announcement::find($request->id);

        $now = Carbon::now()->timezone('Asia/Kuala_Lumpur');
        $scheduleDate = $request->schedule_date ? Carbon::parse($request->schedule_date)->timezone('Asia/Kuala_Lumpur')->startOfDay() : null;
        $scheduleTime = $request->schedule_time ? Carbon::parse($request->schedule_time)->timezone('Asia/Kuala_Lumpur') : null;

        if ($scheduleDate && $scheduleTime) {
            $scheduleDateOnly = $scheduleDate->toDateString();
            $nowDateOnly = $now->toDateString();
    
            // Combine schedule date + time into full datetime
            $scheduleDateTime = Carbon::parse("{$scheduleDateOnly} {$scheduleTime->format('H:i:s')}")->timezone('Asia/Kuala_Lumpur');
    
            if ($scheduleDateOnly === $nowDateOnly && $scheduleDateTime->lessThanOrEqualTo($now)) {
                return back()->withErrors([
                    'schedule_time' => 'Schedule time must be in the future if the schedule date is today.'
                ])->withInput();
            }
        }

        $announcement->update([
            'schedule_date' => $scheduleDate ? $scheduleDate->format('Y-m-d') : null,
            'schedule_time' => $scheduleTime ? $scheduleTime->format('H:i:s') : null,
        ]);    

        return redirect()->back();
    }

    public function removeDraftAnnouncement(Request $request)
    {

        $announcement = Announcement::find($request->id);
        $announcementPoll = AnnouncementPoll::where('announcement_id', $request->id)->first();
        $announcementPollOpt = PollOptions::where('poll_id', $announcementPoll->id)->get();

        $announcementUser = AnnouncementUser::where('announcement_id', $request->id)->get();

        $announcement->delete();
        $announcementPoll->delete();

        foreach ($announcementPollOpt as $poll) {
            $poll->delete();
        }

        foreach ($announcementUser as $user) {
            $user->delete();
        }

        return redirect()->back();
    }

    public function editDraftAnnouncement($id)
    {

        $draftAnnouncements = Announcement::with([
            'user',
            'announcement_user',
            'announcement_user.user:id,name,username',
            'announcement_user.department',
            'announcement_poll',
            'announcement_poll.poll_options',
        ])->find($id);

        $draftAnnouncements->thumbnail = $draftAnnouncements->getFirstMediaUrl('thumbnail');

        // Attachment
        $draftAnnouncements->attachment = $draftAnnouncements->getMedia('attachment')->map(function ($media) {
            return [
                'url' => $media->getUrl(),
                'file_name' => $media->file_name,
                'size' => $media->size,
                'uuid' => $media->uuid,
            ];
        });
        
        return Inertia::render('Announcement/EditAnnouncementDetails', [
            'draftAnnouncements' => $draftAnnouncements,
        ]);
    }

    public function publishedAnnouncmentDetails($id) 
    {

        $announcements = Announcement::with([
            'user',
            'announcement_user',
            'announcement_user.user',
            'announcement_user.department',
            'announcement_poll',
            'announcement_poll.poll_options',
        ])->find($id);

        $totalVote = 0;

        $announcmentPoll = AnnouncementPoll::where('announcement_id', $id)->first();
        if ($announcmentPoll) {
            $totalVote = PollOptions::where('poll_id', $announcmentPoll->id)->sum('votes');
        }
        $totalComment = AnnouncementComment::where('announcement_id', $announcements->id)->count();

        if ($announcements->user) {
            $announcements->user->profile_image = $announcements->user->getFirstMediaUrl('profile_image');
        }

        $announcements->thumbnail = $announcements->getFirstMediaUrl('thumbnail');
        
        // Attachment
        $announcements->attachment = $announcements->getMedia('attachment')->map(function ($media) {
            return [
                'url' => $media->getUrl(),
                'file_name' => $media->file_name,
                'size' => $media->size,
            ];
        });
        
        return Inertia::render('Announcement/PublishedAnnouncementDetails', [
            'announcements' => $announcements,
            'totalVote' => $totalVote,
            'totalComment' => $totalComment,
        ]);
    }

    public function archiveAnnouncement(Request $request)
    {

        $announcement = Announcement::find($request->id);
        $announcementUser = AnnouncementUser::where('id', $request->id)->get();

        foreach ($announcementUser as $user) {
            $user->status = 'inactive';
            $user->save();
        }

        $announcement->update([
            'status' => 'archived',
        ]);

        return redirect()->back();
    }

    public function getAnnouncementUser(Request $request)
    {

        $readedUsers = AnnouncementUser::where('announcement_id', $request->id)
                ->where('status', 'active')
                ->whereNotNull('read_at')
                ->with(['user'])
                ->get();

        $unreadUsers = AnnouncementUser::where('announcement_id', $request->id)
                ->where('status', 'active')
                ->whereNull('read_at')
                ->with(['user'])
                ->get();

        $readedUsers->each(function ($readedUser) {
            if ($readedUser->user) {
                $readedUser->user->profile_image = $readedUser->user->getFirstMediaUrl('profile_image');
            }
        });

        $unreadUsers->each(function ($unreadUser) {
            if ($unreadUser->user) {
                $unreadUser->user->profile_image = $unreadUser->user->getFirstMediaUrl('profile_image');
            }
        });

        return response()->json([
            'readedUser' => $readedUsers,
            'unreadUser' => $unreadUsers,
        ]);
    }

    public function getAnnouncementComment(Request $request)
    {
        $announcement = Announcement::find($request->id);

        $comments = AnnouncementComment::where('announcement_id', $request->id)
                ->with(['user', 'mentionuser', 'mentionuser.user'])
                ->get();

        return response()->json($comments);
    }

    public function sendComment(Request $request)
    {

        $commentText = $request->comment;
        $announcementId = $request->id;
        $authUserId = Auth::user()->id; 

        preg_match_all('/@([^\s@][^@]*?)(?=\s|$)/', $commentText, $matches);
        $mentionedUsernames = $matches[1];

        // 2. Optional: Get user IDs of those mentioned
        $mentionedUsers = User::whereIn('username', $mentionedUsernames)->pluck('id');

        $comment = AnnouncementComment::create([
            'announcement_id' => $announcementId,
            'user_id' => $authUserId,
            'comment_text' => $commentText,
            'parrent_id' => null, // or set this if it's a reply
        ]);

        foreach ($mentionedUsers as $mentionedUserId) {
            DB::table('announcement_comment_mentions')->insert([
                'comment_id' => $comment->id,
                'mention_user_id' => $mentionedUserId,
            ]);
        }

        return redirect()->back();
    }

    public function deleteSelectedComment(Request $request)
    {
        
        $comment = AnnouncementComment::find($request->params['id']);
        $comment->delete();

        $commentMention = AnnouncementCommentMention::where('comment_id', $request->params['id'])->get();

        foreach ($commentMention as $mention) {
            $mention->delete();
        }

        return redirect()->back();
    }

    public function archiveAnnouncementDetails($id)
    {

        $announcements = Announcement::with([
            'user',
            'announcement_user',
            'announcement_user.user',
            'announcement_user.department',
            'announcement_poll',
            'announcement_poll.poll_options',
        ])->find($id);

        $announcmentPoll = AnnouncementPoll::where('announcement_id', $id)->first();
        $totalVote = PollOptions::where('poll_id', $announcmentPoll)->sum('votes');

        if ($announcements->user) {
            $announcements->user->profile_image = $announcements->user->getFirstMediaUrl('profile_image');
        }

        $announcements->thumbnail = $announcements->getFirstMediaUrl('thumbnail');
        
        return Inertia::render('Announcement/ArchiveAnnouncementDetails', [
            'announcements' => $announcements,
            'totalVote' => $totalVote
        ]);
    }

    public function getArchiveAnnouncement()
    {

        $archivedes = Announcement::where('status', 'archived')->with([
            'user:id,name,username', 
            'announcement_user', 
            'announcement_user.user',
            'announcement_comment',
            'announcement_user.department',
        ])->latest()->get();

        $archivedes->each(function ($archived) {
            if ($archived->user) {
                $archived->user->profile_image = $archived->getFirstMediaUrl('profile_image');
            }
        });

        return response()->json($archivedes);
    }

    public function deleteAnnouncement(Request $request)
    {

        $announcement = Announcement::find($request->id);
        $announcement->delete();

        $announcementPoll = AnnouncementPoll::where('announcement_id', $request->id)->first();
        $announcementPoll->delete();

        $pollOption = PollOptions::where('poll_id', $announcementPoll->id)->get();
        foreach ($pollOption as $pollOpt) {
            $pollOpt->delete();
        }

        $announcementUser = AnnouncementUser::where('announcement_id', $request->id)->get();
        foreach ($announcementUser as $annUser) {
            $annUser->delete();
        }

        $announcementComment = AnnouncementComment::where('announcement_id', $request->id)->get();
        foreach ($announcementComment as $comment) {
            $comment->delete();

            $announcementMention = AnnouncementCommentMention::where('comment_id', $comment->id)->get();
            $announcementMention->delete();
        }

        return redirect()->back();
    }

    public function unarchiveAnnouncement(Request $request)
    {

        $now = Carbon::now()->timezone('Asia/Kuala_Lumpur');

        $announcement = Announcement::find($request->id);
        $announcementUser = AnnouncementUser::where('id', $request->id)->get();

        foreach ($announcementUser as $user) {
            $user->status = 'active';
            $user->save();
        }

        $announcement->update([
            'status' => 'published',
            'published_at' => $now,
        ]);

        return redirect()->back();
    }

    public function publishDraftAnnouncement(Request $request)
    {

        $now = Carbon::now()->timezone('Asia/Kuala_Lumpur');
        $announcement = Announcement::find($request->id);

        $announcement->update([
            'status' => 'published',
            'published_at' => $now,
        ]);

        $announcement_user = AnnouncementUser::where('announcement_id', $request->id)->get();

        foreach ($announcement_user as $ann_user) {
            $ann_user->update([
                'status' => 'active',
            ]);
        }

        return redirect()->back();
    }

    public function updateDraftAnnouncement(Request $request)
    {

        $auth = Auth::user();

        // 主验证规则
        $mainRules = [
            'recipient' => 'required',
            'subject' => 'required',
            'content_text' => 'required',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];

        // 条件验证规则
        $conditionalRules = [
            'pin_type' => 'required_if:pin_bool,true',
            'poll_question' => 'nullable|string',
            'option' => 'required_with:poll_question',
            'option.*.option_name' => 'required|string',
            'duration_type' => 'required_with:poll_question',
            'end_date' => 'required_if:duration_type,set_end_date|nullable|date|after:now',
        ];

        // 合并验证规则
        $validated = $request->validate(array_merge($mainRules, $conditionalRules));

        // 自定义验证逻辑
        $validator = Validator::make($request->all(), []);

        // 验证持续时间长度
        $validator->after(function ($validator) use ($request) {
            if ($request->duration_type === 'set_length') {
                $this->validateDurationLength($validator, $request);
            }
            
            // 可以在这里添加其他自定义验证
        });

        $validator->validate();

        $announcement = Announcement::find($request->id);

        $now = Carbon::now()->timezone('Asia/Kuala_Lumpur');

        $announcement->update([
            'subject' => $request->subject,
            'content_title' => $request->subject,
            'content_text' => $request->content_text,
            'pin' => $request->boolean('pin_bool'),
            'pin_type' => $request->pin_type ?? null,
            'status' => 'draft',
            'created_by' => $auth->id,
            // 'published_at' => $now,
        ]);

         // 2. Delete all existing announcement_users for this announcement
        DB::table('announcement_users')->where('announcement_id', $announcement->id)->delete();

        // Reset all_user flag
        $announcement->all_user = 0;
        $announcement->save();

        

        //  send to all user // selected user
        $recipientValues = $request->recipient; // Example: ['IT', 'user 4']

        $this->assignAnnouncementRecipients($announcement, $recipientValues);

        if ($request->like === 1) {
            $announcement->like_bool = 'yes';
            $announcement->save();
        } else {
            $announcement->like_bool = 'no';
            $announcement->save();
        }

        if ($request->commend === 1) {
            $announcement->comment = 'yes';
            $announcement->save();
        } else {
            $announcement->comment = 'no';
            $announcement->save();
        }

        //  create poll
        if ($request->poll_question) {

            $now = Carbon::now()->timezone('Asia/Kuala_Lumpur');
            $poll = AnnouncementPoll::where('announcement_id', $request->id)->first();

            if ($request->duration_type === 'set_end_date') {

                $poll->update([
                    'option_name' => $request->poll_question,
                    'duration_type' => $request->duration_type,
                    'duration_date' => $request->end_date ? Carbon::parse($request->end_date)->timezone('Asia/Kuala_Lumpur')->endOfDay() : null,
                    'expired_at' => $request->end_date ? Carbon::parse($request->end_date)->timezone('Asia/Kuala_Lumpur')->endOfDay(): $now,
                ]);
            }
            if ($request->duration_type === 'set_length') {

                $poll->update([
                    'option_name' => $request->poll_question,
                    'duration_type' => $request->duration_type,
                    'duration_days' => $request->length_day ?? null, // int
                    'duration_hours' => $request->length_hour ?? null, // int
                    'duration_minutes' => $request->length_minute ?? null, //int
                    'expired_at' => $now->copy()
                            ->addDays((int) $request->length_day ?? 0)
                            ->addHours((int) $request->length_hour ?? 0)
                            ->addMinutes((int) $request->length_minute ?? 0),
                ]);
            }

            DB::table('poll_options')->where('poll_id', $poll->id)->delete();

            if (!empty($request->option)) {
                foreach ($request->option as $opt) {
                    if ($opt['option_name']) {
                        $pollOpt = PollOptions::create([
                            'poll_id' => $poll->id,
                            'option_name' => $opt['option_name'],
                            'order_no' => $opt['order_no'],
                            'votes' => 0,
                        ]);
                    }
                }
            }

            //  thumbnail
            $announcement->thumbnail = $announcement->getFirstMediaUrl('thumbnail');
            if ($announcement->thumbnail) {
                // remove existing thumbnail
                if ($request->removeThumbnail) {
                    $announcement->clearMediaCollection('thumbnail');
                }

                // upload new thumbnail
                if ($request->hasFile('thumbnail')) {
                    $announcement->addMedia($request->thumbnail)->toMediaCollection('thumbnail');
                }
            } else {
                if ($request->hasFile('thumbnail')) {
                    $announcement->addMedia($request->thumbnail)->toMediaCollection('thumbnail');
                }
            }

            // Attachment 
             // Remove selected existing attachments
            if ($request->has('removeAttachment')) {
                foreach ($request->removeAttachment as $uuid) {
                    $media = Media::where('uuid', $uuid)->first();
                    if ($media) {
                        $media->delete(); // deletes from DB and S3 (if using Spatie's config)
                    }
                }
            }

            // Add new attachments
            if (!empty($request->attachment)) {
                foreach ($request->attachment as $attch) {
                    if ($attch) {
                        $announcement->addMedia($attch)->toMediaCollection('attachment');
                    }
                }
            }
            

        }

        return redirect()->back();
    }

    private function assignAnnouncementRecipients($announcement, $recipientValues)
    {
        // 1. Categorize recipient values
        $explicitUsers = [];       // Names or IDs of selected users
        $selectedDepartments = []; // Department names
        $includeAllEmployees = false;
        $includeExternal = false;

        foreach ($recipientValues as $value) {
            if ($value === 'all') {
                $includeAllEmployees = true;
            } elseif ($value === 'external_member') {
                $includeExternal = true;
            } elseif (Department::where('name', $value)->exists()) {
                $selectedDepartments[] = $value;
            } else {
                $explicitUsers[] = $value; // user names
            }
        }

        // 2. Handle all employees selection
        if ($includeAllEmployees) {
            $announcement->all_user = 1;
            $announcement->save();
            
            // Get all employees
            $allEmployees = User::whereIn('role', ['employee', 'admin'])->get();
            
            foreach ($allEmployees as $user) {
                DB::table('announcement_users')->insert([
                    'announcement_id' => $announcement->id,
                    'user_id' => $user->id,
                    'department_id' => null, // Include department_id for all employees
                    'read_at' => null,
                    'status' => 'active',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // 3. Handle external members
        if ($includeExternal) {
            $externalMembers = User::where('role', 'external_member')->get();
            
            foreach ($externalMembers as $user) {
                DB::table('announcement_users')->insert([
                    'announcement_id' => $announcement->id,
                    'user_id' => $user->id,
                    'department_id' => null, // External members typically don't have departments
                    'read_at' => null,
                    'status' => 'active',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // 4. Handle specific departments
        if (!empty($selectedDepartments)) {
            $departments = Department::whereIn('name', $selectedDepartments)->get();
            
            foreach ($departments as $department) {
                $departmentUsers = User::where('department_id', $department->id)->get();
                
                foreach ($departmentUsers as $user) {
                    DB::table('announcement_users')->insert([
                        'announcement_id' => $announcement->id,
                        'user_id' => $user->id,
                        'department_id' => $department->id, // Set department_id for department selections
                        'read_at' => null,
                        'status' => 'active',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }

        // 5. Handle explicit user selections
        if (!empty($explicitUsers)) {
            $users = User::whereIn('name', $explicitUsers)->get();
            
            foreach ($users as $user) {
                DB::table('announcement_users')->insert([
                    'announcement_id' => $announcement->id,
                    'user_id' => $user->id,
                    'department_id' => null, // Explicit user selections should have null department_id
                    'read_at' => null,
                    'status' => 'active',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
