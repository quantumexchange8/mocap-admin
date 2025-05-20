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
        'status',
    ];

}
