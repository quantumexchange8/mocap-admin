<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class JobApplication extends Model implements HasMedia
{
    use InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'position',
        'expected_salary',
        'start_date',
        'full_name',
        'identity_no',
        'nationality',
        'place_of_birth',
        'marital_status',
        'race',
        'religion',
        'dial_code',
        'phone_no',
        'email',
        'address',
        'postcode',
        'city',
        'state',
        'special_skill',
        'status',
        'notice_period',
    ];

    public function education(): \Illuminate\Database\Eloquent\Relations\hasMany
    {
        return $this->hasMany(JobEducation::class, 'job_apply_id', 'id');
    }

    public function experience(): \Illuminate\Database\Eloquent\Relations\hasMany
    {
        return $this->hasMany(JobExperience::class, 'job_apply_id', 'id');
    }

    public function work_experience()
    {
        return $this->hasMany(JobExperience::class, 'job_apply_id', 'id');
    }

    public function job_reference()
    {
        return $this->hasMany(JobReference::class, 'job_apply_id', 'id');
    }

    public function job_language()
    {
        return $this->hasOne(JobLanguage::class, 'job_apply_id', 'id');
    }

    public function job_transport()
    {
        return $this->hasOne(JobTransport::class, 'job_apply_id', 'id');
    }

    public function job_additional()
    {
        return $this->hasOne(JobAdditional::class, 'job_apply_id', 'id');
    }

}
