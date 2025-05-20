<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobAdditional extends Model
{
    protected $fillable = [
        'job_apply_id',
        'overtime_type',
        'overtime_remark',
        'investigate_type',
        'investigate_remark',
        'convicted_type',
        'convicted_remark',
        'bankrupt_type',
        'bankrupt_remark',
        'suspended_type',
        'suspended_remark',
        'directorship_type',
        'directorship_remark',
        'relative_type',
        'relative_remark',
        'medical_type',
        'medical_remark',
        'job_type',
        'job_remark',
    ];
}
