<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DepartmentPosition extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'department_id',
        'position_name',
        'order_no',
    ];
}
