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
        Schema::create('deleted_employees', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('reason_deletion');
            $table->longText('reason_leaving')->nullable();
            $table->string('misconduct_type')->nullable();
            $table->string('misconduct_remark')->nullable();
            $table->string('criminal_type')->nullable();
            $table->string('criminal_remark')->nullable();
            $table->string('illegal_type')->nullable();
            $table->string('illegal_remark')->nullable();
            $table->string('disclosed_type')->nullable();
            $table->string('disclosed_remark')->nullable();
            $table->string('encouraged_type')->nullable();
            $table->string('encouraged_remark')->nullable();
            $table->json('negative_attidude')->nullable();
            $table->json('positive_attidude')->nullable();
            $table->string('overall_rating')->nullable();
            $table->string('overall_remark')->nullable();
            $table->unsignedBigInteger('handle_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deleted_employees');
    }
};
