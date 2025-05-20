<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobReference extends Model
{
    protected $fillable = [
        'job_apply_id',
        'full_name',
        'relationship',
        'dial_code',
        'phone_no',
        'email',
    ];
}
