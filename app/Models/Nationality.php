<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nationality extends Model
{
    //

    public function states(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(State::class, 'countryId', 'countryId');
    }
}
