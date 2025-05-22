<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->string('position');
            $table->decimal('expected_salary', 13, 2)->default(0.00);
            $table->date('start_date');
            $table->string('full_name');
            $table->string('identity_no');
            $table->string('nationality');
            $table->string('place_of_birth');
            $table->string('marital_status');
            $table->string('race');
            $table->string('religion');
            $table->string('dial_code');
            $table->string('phone_no');
            $table->string('email');
            $table->string('address');
            $table->string('postcode');
            $table->string('city');
            $table->string('state');
            $table->integer('test_mark');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
