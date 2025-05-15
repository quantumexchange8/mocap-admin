<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDepartmentRequest;
use App\Models\Department;
use App\Models\DepartmentPosition;
use App\Models\User;
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

        $departments = Department::with(['headuser'])->withCount('position', 'totalUser')->get();

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

        if (!empty($request->position)) {
            foreach ($request->position as $pos) {

                if ($pos['name']) {
                    $departPosition = DepartmentPosition::create([
                        'department_id' => $department->id,
                        'position_name' => $pos['name'],
                        'order_no' => $pos['order_no'],
                    ]);
                }
            }
        }

        return redirect()->back();
    }

    public function editDepartment($id)
    {

        $department = Department::where('id', $id)->with(['position'])->first();

        return Inertia::render('Department/EditDepartment', [
            'department' => $department,
        ]);
    }

    public function validateDepartment(Request $request)
    {

        $checkEmployee = User::where('department_id', $request->id)->first();

        return response()->json([
            'value' => $checkEmployee ? 'yes' : 'no',
        ]);
    }

    public function deleteDepartment(Request $request)
    {

        $department = Department::find($request->id);
        $department->delete();

        $departmentPositions = DepartmentPosition::where('department_id', $request->id)->get();
        foreach ($departmentPositions as $departmentPosition) {
            $departmentPosition->delete();
        }

        return redirect()->back();
    }
}
