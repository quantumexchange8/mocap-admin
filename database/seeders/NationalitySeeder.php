<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

class NationalitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonFilePath = base_path('database/seeders/Nationality.json');

        $json = File::get($jsonFilePath);

        $data = json_decode($json, true);

        // Insert data into the database
        DB::table('nationalities')->insert($data);
    }
}
