<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getAnouncement()
    {



        return response()->json();
    }

    public function getTotalEmployee()
    {

        $employees = User::where('status', 'active')->whereIn('role', ['admin', 'employee'])->count();

        return response()->json($employees);
    }
}
