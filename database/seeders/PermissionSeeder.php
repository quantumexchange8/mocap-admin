<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define permissions
        $permissions = [
            'dashboard',
            'request',
            'calendar',
            'announcement',
            'report',
            'employee_listing',
            'attendance',
            'payslip',
            'performance_data',
            'department',
            'project',
            'completed',
            'salary_increment',
            'year_end',
            'assets',
            'pooled',
            'administrator',
            'external_member',
            'smart_data',
            'setting',
            'activity_log',
            'version_history'
        ];

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create Super Admin role
        $superAdminRole = Role::firstOrCreate(['name' => 'superadmin']);

        $superAdminRole->syncPermissions(Permission::all());

        // Assign superadmin role to user ID 1
        $superAdmin = User::find(1);
        if ($superAdmin) {
            $superAdmin->assignRole($superAdminRole);
        }
    }
}
