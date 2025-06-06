<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnnouncementPoll extends Model
{
    protected $fillable = [
        'announcement_id',
        'option_name',
        'duration_type',
        'duration_date',
        'duration_days',
        'duration_hours',
        'duration_minutes',
    ];
}
