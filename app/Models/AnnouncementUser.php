<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnnouncementUser extends Model
{
    protected $fillable = [];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
