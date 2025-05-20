<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobTransport extends Model
{
    protected $fillable = [
        'job_apply_id',
        'work_transportation',
        'approximate_distance',
        'approximate_hours',
        'approximate_minutes',
    ];

    protected $casts = [
        'work_transportation' => 'array',
    ];
}
