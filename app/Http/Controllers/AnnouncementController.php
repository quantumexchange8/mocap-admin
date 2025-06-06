<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\AnnouncementComment;
use App\Models\AnnouncementPoll;
use App\Models\Department;
use App\Models\PollOptions;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

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
                'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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
        $recipientValues = $request->recipient; // Example: ['all'], or ['external_member'], or user names/ids

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
                // Check if value matches a department name
                $selectedDepartments[] = $value;
            } else {
                $explicitUsers[] = $value; // likely user name
            }
        }

        // 2. Start query
        $query = User::query();

        // 3. If all employees
        if ($includeAllEmployees) {
            $query->orWhereIn('role', ['employee', 'admin']);
            $announcement->all_user = 1;
            $announcement->save();
        }

        // 4. If external members
        if ($includeExternal) {
            $query->orWhere('role', 'external_member');
        }

        // 5. If specific users (adjust to IDs if needed)
        if (!empty($explicitUsers)) {
            $query->orWhereIn('name', $explicitUsers); // Or 'id' if you're using IDs
        }

        // 6. If departments selected
        if (!empty($selectedDepartments)) {
            $departmentIds = Department::whereIn('name', $selectedDepartments)->pluck('id');

            $query->orWhereIn('department_id', $departmentIds);
        }

        // 7. Get final user list
        $recipients = $query->pluck('id')->unique(); // Prevent duplicates

        // 8. Insert into pivot table
        foreach ($recipients as $userId) {
            DB::table('announcement_users')->insert([
                'announcement_id' => $announcement->id,
                'user_id' => $userId,
                'read_at' => null,
                'status' => 'inactive',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        if ($request->like === 1) {
            $announcement->like_bool = 'yes';
            $announcement->save();
        }

        if ($request->commend === 1) {
            $announcement->comment = 'yes';
            $announcement->save();
        }

        //  create poll
         if ($request->poll_question) {
            $poll = AnnouncementPoll::create([
                'announcement_id' => $announcement->id,
                'option_name' => $request->poll_question,
                'duration_type' => $request->duration_type,
                'duration_date' => $request->end_date ? Carbon::parse($request->end_date)->timezone('Asia/Kuala_Lumpur')->endOfDay() : null,
                'duration_days' => $request->length_day ?? null,
                'duration_hours' => $request->length_hour ?? null,
                'duration_minutes' => $request->length_minute ?? null,
            ]);

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

    public function getDraftAnnouncement()
    {

        $drafts = Announcement::where('status', 'draft')->with([
                'user:id,name,username', 
                'announcement_user', 
                'announcement_user.user',
                'announcement_comment'
            ])->get();

        $drafts->each(function ($draft) {
            if ($draft->user) {
                $draft->user->profile_image = $draft->getFirstMediaUrl('profile_image');
            }
        });

        return response()->json($drafts);
    }

    public function storeAnnouncementPublish(Request $request)
    {

        // dd($request->all());

        // $validated = $request->validate([
        //     'recipient' => 'required',
        //     'subject' => 'required',
        //     'content_text' => 'required',
        //     'pin_type' => 'required_if:pin,true',
        //     'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        //     'poll_question' => 'nullable|string',
        //     'option' => 'required_with:poll_question',
        //     'option.*.option_name' => 'required|string',
        // ]);

        return redirect()->back();
    }
}
