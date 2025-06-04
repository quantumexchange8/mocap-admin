<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function announcement()
    {

        return Inertia::render('Announcement/Announcement');
    }

    public function createAnnouncement()
    {

        return Inertia::render('Announcement/CreateAnnouncement');
    }

    public function getEmployeeTree()
    {
        $departments = Department::with(['users' => fn ($q) => $q->whereIn('role', ['employee', 'admin'])])->get();

        $departmentNodes = [];

        foreach ($departments as $dept) {
            $employeeNodes = [];

            foreach ($dept->users as $user) {
                $employeeNodes[] = [
                    'key' => $user->name,
                    'title' => $user->name,
                    'value' => $user->name,
                    'isLeaf' => true,
                ];
            }

            $departmentNodes[] = [
                'key' => 'dept_' . $dept->id,
                'title' => $dept->name,
                'value' => 'dept_' . $dept->id,
                'children' => $employeeNodes,
            ];
        }

        $tree = [];

        // All Employee group with departments inside
        $tree[] = [
            'key' => 'all',
            'title' => 'All Employee',
            'value' => 'all',
            'children' => $departmentNodes,
        ];

        // External member node
        $tree[] = [
            'key' => 'external_member',
            'title' => 'External Member',
            'value' => 'external_member',
            'isLeaf' => true,
        ];

        return response()->json($tree);
    }

    public function storeAnnouncementDraft(Request $request)
    {

        

        return redirect()->back();
    }
}
