<?php

use App\Http\Controllers\Api\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('notify-unread-user', [NotificationController::class, 'notifyUnreadUser']);

Route::group(["middleware" => ["auth:sanctum"]], function() {
    
});