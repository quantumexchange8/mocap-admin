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
        Schema::create('job_references', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_apply_id');
            $table->string('full_name');
            $table->string('relationship');
            $table->string('dial_code');
            $table->string('phone_no');
            $table->string('email');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_references');
    }
};
