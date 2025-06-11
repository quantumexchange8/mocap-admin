<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AnnouncementPoll extends Model
{

    use SoftDeletes;


    protected $fillable = [
        'announcement_id',
        'option_name',
        'duration_type',
        'duration_date',
        'duration_days',
        'duration_hours',
        'duration_minutes',
        'expired_at',
    ];

    public function poll_options(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(PollOptions::class, 'poll_id', 'id');
    }
}
