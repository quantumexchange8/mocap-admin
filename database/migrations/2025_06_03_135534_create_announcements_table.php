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
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->string('subject');
            $table->string('content_title');
            $table->longText('content_text')->nullable();
            $table->boolean('pin');
            $table->string('pin_type')->nullable();
            $table->date('schedule_date')->nullable();
            $table->time('schedule_time')->nullable();
            $table->string('order_no')->nullable();
            $table->boolean('all_user')->nullable();
            $table->string('specific_user')->nullable();
            $table->string('comment')->nullable();
            $table->string('like_bool')->nullable();
            $table->integer('like')->nullable();
            $table->string('status')->nullable();
            $table->unsignedBigInteger('created_by');
            $table->dateTime('expired_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
