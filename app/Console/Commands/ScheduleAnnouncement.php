<?php

namespace App\Console\Commands;

use App\Models\Announcement;
use App\Models\AnnouncementUser;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ScheduleAnnouncement extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'run:schedule-announcement';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scheduled Announcement to publish';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        
        $scheduleAnnouncement = Announcement::where('status', 'draft')->whereNotNull('schedule_date')->get();

        $now = Carbon::now()->timezone('Asia/Kuala_Lumpur');

        foreach ($scheduleAnnouncement as $announcement) {
            
            if ($announcement->schedule_time) {
                $this->checkScheduleTime($announcement);
            } else {
                $this->checkScheduleDate($announcement);
            }
        }
    }

    protected function checkScheduleDate(Announcement $announcement)
    {

        $now = Carbon::now()->timezone('Asia/Kuala_Lumpur');

        if ($now >= $announcement->schedule_date) {
            $announcement->update([
                'status' => 'active',
                'published_at' => $now,
            ]);
            Log::info('announcement published');

            $announcement_user = AnnouncementUser::where('announcement_id', $announcement->id)->get();

            foreach ($announcement_user as $ann_user) {
                $ann_user->update([
                    'status' => 'active'
                ]);
            }
        }
        

    }

    protected function checkScheduleTime(Announcement $announcement)
    {

        $now = Carbon::now()->timezone('Asia/Kuala_Lumpur');

        $scheduledAt = Carbon::parse("{$announcement->schedule_date} {$announcement->schedule_time}", 'Asia/Kuala_Lumpur');

        if ($now->greaterThanOrEqualTo($scheduledAt)) {
            
            $announcement->update([
                'status' => 'active',
                'published_at' => $now,
            ]);

            Log::info('announcement published');

            $announcement_user = AnnouncementUser::where('announcement_id', $announcement->id)->get();

            foreach ($announcement_user as $ann_user) {
                $ann_user->update([
                    'status' => 'active'
                ]);
            }

        }
        
    }

}
