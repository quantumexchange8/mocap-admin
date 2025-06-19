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
        Schema::create('employee_banks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('bank_name');
            $table->string('acc_type');
            $table->string('acc_no');
            $table->string('income_tax_no')->nullable();
            $table->string('epf_no')->nullable();
            $table->string('socso_no')->nullable();
            $table->string('spouse_name')->nullable();
            $table->string('spouse_ic')->nullable();
            $table->string('spouse_dial_code')->nullable();
            $table->string('spouse_phone')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_banks');
    }
};
