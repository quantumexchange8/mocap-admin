<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeletedEmployee extends Model
{
    //

    protected $fillable = [
        'user_id',
        'reason_deletion',
        'reason_leaving',
        'misconduct_type',
        'misconduct_remark',
        'criminal_type',
        'criminal_remark',
        'illegal_type',
        'illegal_remark',
        'disclosed_type',
        'disclosed_remark',
        'encouraged_type',
        'encouraged_remark',
        'negative_attidude',
        'positive_attidude',
        'overall_rating',
        'overall_remark',
        'handle_by',
    ];

    protected $casts = [
        'negative_attidude' => 'array',
        'positive_attidude' => 'array',
    ];
    
    public function handleByUser()
{
    return $this->belongsTo(User::class, 'handle_by');
}
}
