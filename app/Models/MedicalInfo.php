<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicalInfo extends Model
{
    protected $fillable = [
        'user_id',
        'blood_type',
        'allergic_type',
        'allergic_remark',
        'medical_type',
        'medical_remark',
        'medication_type',
        'medication_remark',
        'pregnant_type',
        'pregnant_remark',
        'pregnant_delivery_date',
        'pregnancy_medication_type',
        'pregnancy_medication_remark',
        'gynaecological_type',
        'gynaecological_remark',
    ];
    
}
