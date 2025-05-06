<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDepartmentRequest;
use App\Models\Department;
use App\Models\DepartmentPosition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function department()
    {

        return Inertia::render('Department/Department');
    }

    public function getDepartmentListing()
    {

        $departments = Department::get();

        return response()->json($departments);
    }

    public function createDepartment()
    {

        return Inertia::render('Department/CreateDepartment');
    }

    public function storeDepartment(StoreDepartmentRequest $request)
    {

        $department = Department::create([
            'name' => $request->name,
            'color' => $request->color,
            'icon' => $request->icon,
            'head_id' => $request->head_department ?? null,
            'job_description' => $request->job_description ?? null,
            'job_regulation' => $request->job_regulation ?? null,
        ]);

        if (empty($request->position)) {
            foreach ($request->position as $position) {
                
                if ($position['name']) {
                    $departPosition = DepartmentPosition::create([
                        'department_id' => $department->id,
                        'position_name' => $position['name'],
                        'order_no' => $position['order_no'],
                    ]);
                }
            }
        }

        return redirect()->back();
    }
}
