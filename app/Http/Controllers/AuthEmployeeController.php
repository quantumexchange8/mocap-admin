<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
}
