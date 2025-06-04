<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('overview_custom_colors')->insert([
            ['type' => 'project', 'name' => 'in_progress', 'color' => '#030712'],
            ['type' => 'project', 'name' => 'completed',   'color' => '#9CA3AF'],
            ['type' => 'project', 'name' => 'pending',     'color' => '#D1D5DB'],
            ['type' => 'tasks',   'name' => 'in_progress', 'color' => '#030712'],
            ['type' => 'tasks',   'name' => 'completed',   'color' => '#9CA3AF'],
            ['type' => 'tasks',   'name' => 'pending',     'color' => '#D1D5DB'],
            ['type' => 'tasks',   'name' => 'overdue', 'color' => '#4B5563'],
        ]);
    }
}
