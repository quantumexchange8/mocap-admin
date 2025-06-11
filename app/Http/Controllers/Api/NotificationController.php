<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\AnnouncementUser;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function notifyUnreadUser(Request $request) 
    {   

        $announcement = Announcement::find($request->id);

        $unreadUser = AnnouncementUser::where('announcement_id', $request->id)->whereNull('read_at')->with(['user'])->get();

        if ($announcement ||  $unreadUser) {
            return response()->json([
                'announcement' => $announcement,
                'unread_users' => $unreadUser,
            ], 200);
        } else {
            return response()->json([
                'messages' => 'Something happened, please try again later',
            ], 500);
        }
        
    }
}
