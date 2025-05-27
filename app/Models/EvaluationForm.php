<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class EvaluationForm extends Model implements HasMedia
{

    use InteractsWithMedia;

    protected $fillable = [
        'job_id',
        'edu_bg',
        'edu_remark',
        'work_exp',
        'work_remark',
        'technical_exp',
        'technical_remark',
        'verbal_comm',
        'verbal_remark',
        'candidate_enthusiasm',
        'candidate_remark',
        'knowledge_organ',
        'knowledge_remark',
        'team_building_skill',
        'team_building_remark',
        'initiative',
        'initiative_remark',
        'time_management',
        'time_management_ramark',
        'customer_service',
        'customer_service_remark',
        'overal_impression',
        'overal_impression_remark',
        'result_type',
        'remark',
        'interview_name',
        'result_type',
    ];
}
