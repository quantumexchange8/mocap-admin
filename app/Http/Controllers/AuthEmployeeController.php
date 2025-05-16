<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AuthEmployeeController extends Controller
{
    public function employeeListing()
    {

        return Inertia::render('EmployeeListing/EmployeeListing');
    }

    public function getEmployeeListing()
    {

        $employees = User::where('role', 'employee')->get();

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
}
