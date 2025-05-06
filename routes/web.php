<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\GlobalController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function() {
    return Inertia::render('Onboarding');
});

Route::get('/job-application', [JobApplicationController::class, 'jobApplication'])->name('job-application');
Route::get('/employee-application', [EmployeeController::class, 'employeeApplication'])->name('employee-application');

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });



Route::middleware('auth')->group(function () {

    /**
     * ==============================
     *           Global Usage
     * ==============================
    */
    Route::get('/getUserListing', [GlobalController::class, 'getUserListing'])->name('getUserListing');

    /**
     * ==============================
     *           Dashboard
     * ==============================
    */
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    /**
     * ==============================
     *           Department
     * ==============================
    */
    Route::get('/department', [DepartmentController::class, 'department'])->name('department');
    Route::get('/getDepartmentListing', [DepartmentController::class, 'getDepartmentListing'])->name('getDepartmentListing');
    Route::get('/create-department', [DepartmentController::class, 'createDepartment'])->name('create-department');
    Route::post('/store-department', [DepartmentController::class, 'storeDepartment'])->name('store-department');
    
    /**
     * ==============================
     *           Profile
     * ==============================
    */
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
