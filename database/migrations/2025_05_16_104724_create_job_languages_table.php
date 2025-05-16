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
        Schema::create('job_languages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_apply_id');
            $table->string('en_speaking');
            $table->string('en_writting');
            $table->string('en_listening');
            $table->string('cn_speaking');
            $table->string('cn_writting');
            $table->string('cn_listening');
            $table->string('bm_speaking');
            $table->string('bm_writting');
            $table->string('bm_listening');
            $table->string('others_language')->nullable();
            $table->string('others_speaking')->nullable();
            $table->string('others_writting')->nullable();
            $table->string('others_listening')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_languages');
    }
};
