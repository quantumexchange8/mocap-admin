<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AnnouncementComment extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'announcement_id',
        'user_id',
        'comment_text',
        'parrent_id',
    ];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function mentionuser(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(AnnouncementCommentMention::class, 'comment_id', 'id');
    }
}
