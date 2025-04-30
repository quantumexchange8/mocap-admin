<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    //
    public function jobApplication()
    {

        return Inertia::render('JobApplication');
    }
}
