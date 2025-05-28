<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdministratorController extends Controller
{
    public function administrators()
    {

        return Inertia::render('Administrators/Administrators');
    }

    public function getAdministrator()
    {

        $admins = User::whereNot('role', 'employee')
                ->where('status', 'active')
                ->with(['department'])
                ->get();

        $employees = User::whereIn('role', ['employee', 'external_member'])
                ->where('status', 'active')
                ->with(['department'])
                ->get();

        $admins->each(function ($admin) {
            $admin->profile_image = $admin->getFirstMediaUrl('profile_image');
            $admin->permissions = $admin->getAllPermissions()->pluck('name');
        });

        $employees->each(function ($employee) {
            $employee->profile_image = $employee->getFirstMediaUrl('profile_image');
        });
        
        return response()->json([
            'admins' => $admins,
            'employees' => $employees
        ]);
    }

    public function createAdministrator(Request $request)
    {

        $validated = $request->validate([
            'admin'     => 'required',
            'title'     => 'required',
        ]);

        $employee = User::find($request->admin);

        $employee->update([
            'title' => $request->title,
            'role' => 'admin'
        ]);

        $permissions = collect($request->all())
                ->except(['admin', 'title'])
                ->filter(fn ($val) => $val === true)
                ->keys()
                ->toArray();

        $employee->syncPermissions($permissions);

        // assign this user permission role

        return redirect()->back();
    }

    public function updateAdministrator(Request $request)
    {
        
        $admin = User::find($request->id);

        $permissions = collect($request->all())
            ->except(['id', 'title']) // exclude non-permission fields
            ->filter(fn ($val) => $val === true)
            ->keys()
            ->toArray();

        // Sync permissions using Spatie
        $admin->syncPermissions($permissions);

        return redirect()->back();
    }
}
