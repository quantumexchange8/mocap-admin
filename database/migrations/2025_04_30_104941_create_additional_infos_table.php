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
        Schema::create('additional_infos', function (Blueprint $table) {
            $table->id();
            $table->string('investigate_type');
            $table->string('investigate_remark')->nullable();
            $table->string('convicted_type');
            $table->string('convicted_remark')->nullable();
            $table->string('bankrupt_type');
            $table->string('bankrupt_remark')->nullable();
            $table->string('suspended_type');
            $table->string('suspended_remark')->nullable();
            $table->string('directorship_type');
            $table->string('directorship_remark')->nullable();
            $table->string('relative_type');
            $table->string('relative_remark')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('additional_infos');
    }
};
