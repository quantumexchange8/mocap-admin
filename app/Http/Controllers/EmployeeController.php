<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function employeeApplication()
    {

        return Inertia::render('EmployeeApplication');
    }
}
