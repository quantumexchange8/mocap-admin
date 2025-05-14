<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdditionalInfo extends Model
{
    protected $fillable = [
        'user_id',
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
    ];

    
}
