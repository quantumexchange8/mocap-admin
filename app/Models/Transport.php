<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transport extends Model
{

    protected $fillable = [
        'user_id',
        'own_transport',
        'license_id',
        'work_transportation',
        'approximate_distance',
        'approximate_hours',
        'approximate_minutes',
    ];
    

    protected $casts = [
        'own_transport' => 'array',
        'license_id' => 'array',
        'work_transportation' => 'array',
    ];

}
