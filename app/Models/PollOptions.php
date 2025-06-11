<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PollOptions extends Model
{

    use SoftDeletes;


    protected $fillable = [
        'poll_id',
        'option_name',
        'order_no',
        'votes',
    ];
}
