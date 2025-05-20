<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobLanguage extends Model
{
    protected $fillable = [
        'job_apply_id',
        'en_speaking',
        'en_writting',
        'en_listening',
        'cn_speaking',
        'cn_writting',
        'cn_listening',
        'bm_speaking',
        'bm_writting',
        'bm_listening',
        'others_language',
        'others_speaking',
        'others_writting',
        'others_listening',
    ];
}
