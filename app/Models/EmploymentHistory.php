<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmploymentHistory extends Model
{
    protected $fillable = [
        'user_id',
        'employment_type',
        'employment_start',
        'employment_end',
    ];
}
