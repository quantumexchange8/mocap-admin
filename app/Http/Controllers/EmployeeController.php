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

    public function storeEmployee(Request $request)
    {

        // $request->validate([
        //     'digital_signature' => 'required|image|mimes:png,jpg,jpeg|max:2048',
        // ]);

        dd($request->all());

        return redirect()->back();
    }

    public function checkSignature(Request $request)
    {

        
        return response()->json([
            'message' => 'success'
        ], 200);
    }
}
