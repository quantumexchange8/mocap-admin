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
        Schema::create('overview_custom_colors', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // e.g. 'project', 'tasks
            $table->string('name'); // e.g. 'in progress', 'completed
            $table->string('color'); // e.g. '#000000
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('overview_custom_colors');
    }
};
