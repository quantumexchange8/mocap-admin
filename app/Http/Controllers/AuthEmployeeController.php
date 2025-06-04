<?php

namespace App\Http\Controllers;

use App\Models\DeletedEmployee;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AuthEmployeeController extends Controller
{
    public function employeeListing()
    {

        return Inertia::render('EmployeeListing/EmployeeListing');
    }

    public function getEmployeeListing()
    {

        $employees = User::whereNot('role', 'superadmin')->whereNot('status', 'deleted')->with(['department'])->get();

        return response()->json($employees);
    }

    public function employeeDetails($id)
    {

        $user_details = User::with([
            'employeebank',
            'emergencyinfo',
            'transportinfo',
            'beneficiaryinfo',
            'department',
        ])->find($id);

        $user_details->profile_image = $user_details->getFirstMediaUrl('profile_image') ?? null;

        return Inertia::render('EmployeeListing/Partials/EmployeeDetails', [
            'user_details' => $user_details,
        ]);
    }

    public function updateEmployeeDetails(Request $request)
    {

        $validated = $request->validate([
            'employment_type'     => 'required|string|max:255',
            'department_type'     => 'required|integer|exists:departments,id',
            'position_type'       => 'required|string|max:255',
            'date_of_employment'  => 'required|date',
            'intern_end_date'     => 'nullable|date|after_or_equal:date_of_employment',
        ]);

        $employee = User::find($request->id);

        $employee->update([
            'employee_type' => $request->employment_type,
            'department_id' => $request->department_type,
            'position' => $request->position_type,
            'employee_date' => Carbon::parse($request->date_of_employment)->setTimezone('Asia/Kuala_Lumpur')->toDateString(),
            'employee_end_date' => Carbon::parse($request->intern_end_date)->setTimezone('Asia/Kuala_Lumpur')->toDateString() ?? null,
        ]);

        return redirect()->back();
    }

    public function suspendEmployee(Request $request)
    {

        $employee = User::find($request->id);

        if ($employee) {
            $employee->status = 'suspended';
            $employee->save();

            return response()->json([
                'message' => 'Employee Suspended'
            ], 200);
        }

        return response()->json([
            'message' => 'Employee not found'
        ], 401);
    }

    public function restoreEmployee(Request $request)
    {
        $employee = User::find($request->id);

        if ($employee) {
            $employee->status = 'active';
            $employee->save();

            return response()->json([
                'message' => 'Employee Active'
            ], 200);
        }

        return response()->json([
            'message' => 'Employee not found'
        ], 401);
    }

    public function resetEmployeePw(Request $request)
    {
        // dd($request->all());
        $employee = User::find($request->employmentDetails['id']);

        if ($employee) {

            if ($request->reset_type === 'manual_password') {

                $employee->password = Hash::make($request->password);
                $employee->save();
    
                return response()->json([
                    'message' => 'Employee password reset',
                    'password' => $request->password,
                ], 200);
            } else {
                $generateRandomPw = Str::random(8);

                $employee->password = Hash::make($generateRandomPw);
                $employee->save();

                return response()->json([
                    'message' => 'Employee password reset',
                    'password' => $generateRandomPw,
                ], 200);
            }

        }

        return response()->json([
            'message' => 'Employee not found'
        ], 401);
    }

    public function deleteEmployee(Request $request)
    {
        $auth = Auth::user();


        if ($request->reason_deletion) {
            if ($request->reason_deletion !== 'duplicate_entry') {
                $validated = $request->validate([
                    'reason_deletion' => 'required|string|max:255',
                    'reason_leaving' => 'required|string|max:255',
                    'misconduct_remark' => 'required_if:misconduct_type,Yes',
                    'criminal_remark' => 'required_if:criminal_type,Yes',
                    'illegal_remark' => 'required_if:illegal_type,Yes',
                    'disclosed_remark' => 'required_if:disclosed_type,Yes',
                    'encouraged_remark' => 'required_if:encouraged_type,Yes',
                    'overall_rating' => 'required'
                ]);
            }
        } else {
            $validated = $request->validate([
                'reason_deletion' => 'required|string|max:255',
            ]);
        }

        $user = User::find($request->id);

        $user->update([
            'status' => 'deleted',
        ]);

        $deleteEmployee = DeletedEmployee::create([
            'user_id' => $user->id,
            'reason_deletion' => $request->reason_deletion,
            'reason_leaving' => $request->reason_leaving ?? null,
            'misconduct_type' => $request->misconduct_type ?? null,
            'misconduct_remark' => $request->misconduct_remark ?? null,
            'criminal_type' => $request->criminal_type ?? null,
            'criminal_remark' => $request->criminal_remark ?? null,
            'illegal_type' => $request->illegal_type ?? null,
            'illegal_remark' => $request->illegal_remark ?? null,
            'disclosed_type' => $request->disclosed_type ?? null,
            'disclosed_remark' => $request->disclosed_remark ?? null,
            'encouraged_type' => $request->encouraged_type ?? null,
            'encouraged_remark' => $request->encouraged_remark ?? null,
            'negative_attidude' => $request->negative_attidude ?? null,
            'positive_attidude' => $request->positive_attidude ?? null,
            'overall_rating' => $request->overall_rating ?? null,
            'overall_remark' => $request->remarks ?? null,
            'handle_by' => $auth->id,
        ]);



        return redirect()->back();
    }

    public function updateProfile(Request $request)
    {
        
        $user = User::find($request->id);

        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'dob' => 'required',
            'phone_no' => [
                'required',
                Rule::unique('users', 'phone_no')->ignore($user->id),
            ],
            'email' => [
                'required',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'address' => 'required',
        ]);

        $user->update([
            'name' => $request->full_name,
            'username' => $request->username,
            'dob' => isset($request->dob) ? Carbon::parse($request->dob)->setTimezone('Asia/Kuala_Lumpur') : null,
            'dial_code' => $request->dial_code,
            'phone_no' => $request->phone_no,
            'email' => $request->email,
            'address' => $request->address,
        ]);

        if ($request->hasFile('image')) {
            $user->addMedia($request->image)->toMediaCollection('profile_image');
        };

        return redirect()->back();
    }

    public function getEduBg(Request $request)
    {

        $user_details = User::with([
            'job_application',
            'job_application.education',
            'job_application.experience'
        ])->find($request->id);

        return response()->json($user_details->job_application);

    }
}
