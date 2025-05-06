<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class GlobalController extends Controller
{
    public function getUserListing()
    {

        $users = User::where('status', 'active')->get();

        return response()->json($users);
    }
}
