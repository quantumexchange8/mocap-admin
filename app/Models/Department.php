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

    public function position(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(DepartmentPosition::class, 'department_id', 'id');
    }
}
