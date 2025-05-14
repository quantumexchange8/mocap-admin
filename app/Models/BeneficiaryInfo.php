<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BeneficiaryInfo extends Model
{
    //
    protected $fillable = [
        'user_id',
        'full_name',
        'relationship',
        'indentity_no',
        'dial_code',
        'phone_no',
        'insurance_id',
    ];

    protected $casts = [
        'insurance_id' => 'array',
    ];
}
