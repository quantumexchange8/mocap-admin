<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RunningNumber extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('running_numbers')->insert([
            'type' => 'employee_id',
            'prefix' => 'CT',
            'digits' => '5',
            'last_number' => '0',
        ]);
        
    }
}
