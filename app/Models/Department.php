<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{

    protected $fillable = [
        'name',
        'color',
        'icon',
        'head_id',
        'job_description',
        'job_regulation',
    ];
}
