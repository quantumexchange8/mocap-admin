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
        Schema::create('evaluation_forms', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_id');
            $table->string('edu_bg');
            $table->string('edu_remark')->nullable();
            $table->string('work_exp');
            $table->string('work_remark')->nullable();
            $table->string('technical_exp');
            $table->string('technical_remark')->nullable();
            $table->string('verbal_comm');
            $table->string('verbal_remark')->nullable();
            $table->string('candidate_enthusiasm');
            $table->string('candidate_remark')->nullable();
            $table->string('knowledge_organ');
            $table->string('knowledge_remark')->nullable();
            $table->string('team_building_skill');
            $table->string('team_building_remark')->nullable();
            $table->string('initiative');
            $table->string('initiative_remark')->nullable();
            $table->string('time_management');
            $table->string('time_management_ramark')->nullable();
            $table->string('customer_service');
            $table->string('customer_service_remark')->nullable();
            $table->string('overal_impression');
            $table->string('overal_impression_remark')->nullable();
            $table->longText('remark')->nullable();
            $table->string('result_type')->nullable();
            $table->string('interview_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluation_forms');
    }
};
