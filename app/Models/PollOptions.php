<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PollOptions extends Model
{
    protected $fillable = [
        'poll_id',
        'option_name',
        'order_no',
        'votes',
    ];
}
