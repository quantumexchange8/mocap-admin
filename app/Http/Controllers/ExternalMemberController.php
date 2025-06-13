<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\RunningNumberService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class ExternalMemberController extends Controller
{
    public function externalMember()
    {
        return Inertia::render('ExternalMember/ExternalMember');
    }

    public function getExternalMembers(Request $request)
    {
        $externalMember = User::where('role', 'external_member')
            ->whereNot('status', 'deleted')
            ->with('handleBy');

        if ($request->has('status') && is_array($request->status)) {
            $externalMember->whereIn('status', $request->status);
        }

        if ($request->has('joined_date')) {
            $externalMember->whereDate('created_at', '=', $request->joined_date);
        }

        $externalMember = $externalMember->latest()->get();
        return response()->json($externalMember);
    }

    public function createMember(Request $request)
    {
        $generateRandomPw = Str::random(8);

        $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'max:255', 'unique:users,email'],
            'dial_code' => ['string', 'max:255'],
            'phone_no' => ['nullable','regex:/^\d{9,10}$/', 'unique:users,phone_no'],
        ],[
            'username.required' => 'Preferred Name is required.',
            'email.required' => 'Email is required.',
            'email.unique' => 'This email has already been taken.',
            'phone_no.unique' => 'This phone number has already been taken.',
            'phone_no.regex' => 'Phone number must be 9 to 10 digits.'
        ]);

        $user = User::create([
            'name' => $request->username,
            'username' => $request->username,
            'employee_id' => RunningNumberService::getID('employee_id'),
            'email' => $request->email,
            'password' => Hash::make($generateRandomPw),
            'dial_code' => $request->dial_code,
            'phone_no' => $request->phone_no,
            'remarks' => $request->remarks,
            'role' => 'external_member',
            'handle_by' => Auth::user()->id,
            'employee_date' => Carbon::parse($request->date_of_employment)->setTimezone('Asia/Kuala_Lumpur')->toDateString(),
            'status' => 'invited',
        ]);

        Mail::to($user->email)->send(new \App\Mail\ExternalMemberAccount($user, $generateRandomPw));
        return redirect()->back();
    }

    public function updateMember(Request $request)
    {

        $user = User::find($request->id);
        $validated = $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'dial_code' => ['string', 'max:255'],
            'phone_no' => ['nullable','regex:/^\d{9,10}$/', Rule::unique('users', 'email')->ignore($user->id),],
            'profile_image' => ['image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ]);

        $user->update([
            'name' => $request->username,
            'username' => $request->username,
            'email' => $request->email,
            'dial_code' => $request->dial_code,
            'phone_no' => $request->phone_no,
            'remarks' => $request->remarks,
        ]);

        if ($request->hasFile('profile_image')) {
        $user->clearMediaCollection('profile_image');
        $user->addMediaFromRequest('profile_image')->toMediaCollection('profile_image');
    }

        return redirect()->back();
    }

    public function suspendMember(Request $request)
    {
        $member = User::find($request->id);

        if ($member) {
            $member->status = 'suspended';
            $member->save();

            return response()->json([
                'message' => 'Member Suspended'
            ], 200);
        }

        return response()->json([
            'message' => 'Member not found'
        ], 401);
    }

    public function restoreMember(Request $request)
    {
        $member = User::find($request->id);

        if ($member) {
            $member->status = 'active';
            $member->save();

            return response()->json([
                'message' => 'External Member Active'
            ], 200);
        }

        return response()->json([
            'message' => 'External Member not found'
        ], 401);
    }

    public function deleteMember(Request $request)
    {
        $member = User::find($request->id);

        $member->update([
            'status' => 'deleted',
        ]);

        return redirect()->back();
    }

    public function resetMemberPw(Request $request)
    {
        $member = User::find($request->member['id']);

        if ($member) {

            if ($request->reset_type === 'manual_password') {

                $member->password = Hash::make($request->password);
                $member->save();
    
                return response()->json([
                    'message' => 'External Member password reset',
                    'password' => $request->password,
                ], 200);

            } else {
                $generateRandomPw = Str::random(8);

                $member->password = Hash::make($generateRandomPw);
                $member->save();

                return response()->json([
                    'message' => 'External Member password reset',
                    'password' => $generateRandomPw,
                ], 200);
            }
        }
        return response()->json([
            'message' => 'External Member not found'
        ], 401);
    }

    public function resetMemberEmail(Request $request){
        $member = User::find($request->member_id);
        $password = $request->newRespPw;
        Mail::to($member->email)->send(new \App\Mail\ExternalMemberNewPassword($member, $password));

    }
}
