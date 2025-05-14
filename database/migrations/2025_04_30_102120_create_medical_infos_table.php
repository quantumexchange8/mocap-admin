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
        Schema::create('medical_infos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('blood_type');
            $table->string('allergic_type');
            $table->string('allergic_remark')->nullable();
            $table->string('medical_type');
            $table->string('medical_remark')->nullable();
            $table->string('medication_type');
            $table->string('medication_remark')->nullable();
            $table->string('pregnant_type')->nullable();
            $table->string('pregnant_remark')->nullable();
            $table->date('pregnant_delivery_date')->nullable();
            $table->string('pregnancy_medication_type')->nullable();
            $table->string('pregnancy_medication_remark')->nullable();
            $table->string('gynaecological_type')->nullable();
            $table->string('gynaecological_remark')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_infos');
    }
};
