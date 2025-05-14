<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmergencyInfo extends Model
{
    protected $fillable = [
        'user_id',
        'full_name',
        'relationship',
        'dial_code',
        'phone_no',
    ];
}
