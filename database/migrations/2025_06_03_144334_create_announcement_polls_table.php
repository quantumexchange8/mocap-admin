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
        Schema::create('announcement_polls', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('announcement_id');
            $table->string('option_name')->nullable();
            $table->string('duration_type')->nullable();
            $table->date('duration_date')->nullable();
            $table->integer('duration_days')->nullable()->default(0);
            $table->integer('duration_hours')->nullable()->default(0);
            $table->integer('duration_minutes')->nullable()->default(0);
            $table->dateTime('expired_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcement_polls');
    }
};
