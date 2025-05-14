<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use App\Models\Country;
use App\Models\Department;
use App\Models\DepartmentPosition;
use App\Models\Nationality;
use App\Models\State;
use App\Models\User;
use Illuminate\Http\Request;

class GlobalController extends Controller
{
    public function getUserListing()
    {

        $users = User::where('status', 'active')->get();

        return response()->json($users);
    }

    public function getNationality()
    {

        $nationalities = Nationality::with(['states:countryId,name'])->get();

        return response()->json($nationalities);
    }

    public function phoneCode()
    {

        $phoneCodes = Country::get();

        return response()->json($phoneCodes);
    }

    public function getState()
    {

        $states = State::where('countryId', '131')->get();

        return response()->json($states);
    }

    public function getBank()
    {

        $banks = Bank::get();

        return response()->json($banks);
    }

    public function getDepartment()
    {

        $departments = Department::with(['position'])->get();

        return response()->json($departments);
    }

    public function getDepartmentposition()
    {

        $positions = DepartmentPosition::with('department')->get();

        $grouped = $positions
            ->groupBy('department_id')
            ->map(function ($group) {
                return [
                    'department_id' => $group->first()->department_id,
                    'department_name' => $group->first()->department->name ?? 'Unknown',
                    'positions' => $group->sortBy('order_no')->values(),
                ];
            })
            ->values(); // reset keys to numeric array

        return response()->json($grouped);
    }

    public function getAllAdmin()
    {

        $admins = User::where('role', 'admin')->get();

        return response()->json($admins);
    }
}
