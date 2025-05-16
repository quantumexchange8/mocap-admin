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
        Schema::create('job_experiences', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_apply_id');
            $table->string('title');
            $table->string('period_from');
            $table->string('period_to');
            $table->string('company_name');
            $table->string('address');
            $table->string('supervisor_name');
            $table->string('dial_code');
            $table->string('phone_no');
            $table->string('reason_leaving');
            $table->decimal('starting_salary', 13, 2)->default(0.00);
            $table->decimal('ending_salary', 13, 2)->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_experiences');
    }
};
