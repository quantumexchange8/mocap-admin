<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeBank extends Model
{
    //
    protected $fillable = [
        'user_id',
        'bank_name',
        'acc_type',
        'acc_no',
        'income_tax_no',
        'epf_no',
        'socso_no',
        'spouse_name',
        'spouse_ic',
        'spouse_dial_code',
        'spouse_phone',
    ];
    
}
