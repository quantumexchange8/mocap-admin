<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobExperience extends Model
{
    protected $fillable = [
        'job_apply_id',
        'title',
        'period_from',
        'period_to',
        'company_name',
        'address',
        'supervisor_name',
        'dial_code',
        'phone_no',
        'reason_leaving',
        'starting_salary',
        'ending_salary',
    ];
}
