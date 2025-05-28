<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            BankSeeder::class,
            CountrySeeder::class,
            StateSeeder::class,
            QualificationSeeder::class,
            NationalitySeeder::class,
            RunningNumber::class,
            PermissionSeeder::class,
        ]);
        
        User::factory()->create([
            'name' => 'CT Admin',
            'email' => 'ctadmin@currenttech.pro',
            'username' => 'CT Admin',
            'employee_id' => 'AID0001',
            'title' => 'Admin',
            'password' => 'Test1234.',
            'role' => 'superadmin',
            'status' => 'active'
        ]);
    }
}
