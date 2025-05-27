<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobEducation extends Model
{
    protected $fillable = [
        'job_apply_id',
        'from_date',
        'to_date',
        'school_name',
        'address',
        'qualification',
        'course_name',
    ];
}
