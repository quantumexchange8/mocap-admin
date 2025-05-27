<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EmployeeProfileController extends Controller
{
    public function updatePersonalInfo(Request $request)
    {

        $user = User::find($request->id);

        $validated = $request->validate([
            'nationality' => 'required',
            'identity_no' => [
                'required',
                Rule::unique('users', 'identity_no')->ignore($user->id),
            ],
            'gender' => 'required',
            'race' => 'required',
            'religion' => 'required',
            'place_of_birth' => 'required',
            'marital_status' => 'required',
            'postcode' => 'required',
            'city' => 'required',
            'state' => 'required',
        ]);

        $user->update([
            'nationality' => $request->nationality,
            'identity_no' => $request->identity_no,
            'gender' => $request->gender,
            'race' => $request->race,
            'religion' => $request->religion,
            'place_of_birth' => $request->place_of_birth,
            'maritial_status' => $request->marital_status,
            'postcode' => $request->postcode,
            'city' => $request->city,
            'state' => $request->state,
        ]);

        return redirect()->back();
    }
}
