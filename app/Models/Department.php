<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{

    use SoftDeletes;

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

    public function headUser(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'head_id', 'id');
    }

    public function totalUser(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'id', 'department_id');
    }
}
