<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class User extends Authenticatable implements HasMedia
{
    use HasFactory, Notifiable, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'employee_id',
        'title',
        'email',
        'password',
        'dial_code',
        'phone_no',
        'gender',
        'identity_no',
        'address',
        'postcode',
        'city',
        'state',
        'nationality',
        'dob',
        'race',
        'religion',
        'place_of_birth',
        'maritial_status',
        'position',
        'role',
        'employee_type',
        'department_id',
        'employee_date',
        'employee_end_date',
        'job_id',
        'handle_by',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function employeebank()
    {
        return $this->hasOne(EmployeeBank::class, 'user_id', 'id');
    }
    public function emergencyinfo()
    {
        return $this->hasMany(EmergencyInfo::class, 'user_id', 'id');
    }
    public function transportinfo()
    {
        return $this->hasOne(Transport::class, 'user_id', 'id');
    }
    public function beneficiaryinfo()
    {
        return $this->hasOne(BeneficiaryInfo::class, 'user_id', 'id');
    }
    public function department()
    {
        return $this->hasOne(Department::class, 'id', 'department_id');
    }

    public function job_application()
    {
        return $this->hasOne(JobApplication::class, 'id', 'job_id');
    }

    
}
