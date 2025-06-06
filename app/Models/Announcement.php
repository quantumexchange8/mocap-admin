<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Announcement extends Model implements HasMedia

{

    use InteractsWithMedia;

    protected $fillable = [
        'subject',
        'content_title',
        'content_text',
        'pin',
        'pin_type',
        'schedule_date',
        'schedule_time',
        'order_no',
        'all_user',
        'specific_user',
        'expired_at',
        'status',
        'created_by',
        'like_bool',
        'comment',
    ];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function announcement_user(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(AnnouncementUser::class, 'announcement_id', 'id');
    }

    public function announcement_comment(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(AnnouncementComment::class, 'announcement_id', 'id');
    }

}
