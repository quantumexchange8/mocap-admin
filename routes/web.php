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

/**
 * ==============================
 *           Global Usage
 * ==============================
*/
Route::get('/getPhoneCode', [GlobalController::class, 'phoneCode'])->name('getPhoneCode');
Route::get('/getNationality', [GlobalController::class, 'getNationality'])->name('getNationality');
Route::get('/getState', [GlobalController::class, 'getState'])->name('getState');
Route::get('/getBank', [GlobalController::class, 'getBank'])->name('getBank');
Route::get('/getDepartment', [GlobalController::class, 'getDepartment'])->name('getDepartment');
Route::get('/getDepartmentposition', [GlobalController::class, 'getDepartmentposition'])->name('getDepartmentposition');
Route::get('/getAllAdmin', [GlobalController::class, 'getAllAdmin'])->name('getAllAdmin');

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


/**
 * ==============================
 *     Employee Application
 * ==============================
*/
Route::get('/employee-application', [EmployeeController::class, 'employeeApplication'])->name('employee-application');
// validation
Route::post('/personal-validation', [EmployeeController::class, 'personalValidaiton'])->name('personal-validation');
Route::post('/emergency-validation', [EmployeeController::class, 'emergencyValidaiton'])->name('emergency-validation');
Route::post('/transportation-validation', [EmployeeController::class, 'transportationValidaiton'])->name('transportation-validation');
Route::post('/medical-validation', [EmployeeController::class, 'medicalValidaiton'])->name('medical-validation');
Route::post('/beneficiary-validation', [EmployeeController::class, 'beneficiaryValidaiton'])->name('beneficiary-validation');
Route::post('/additional-validation', [EmployeeController::class, 'additionalValidaiton'])->name('additional-validation');
Route::post('/check-signature', [EmployeeController::class, 'checkSignature'])->name('check-signature');
Route::post('/employee-information-validation', [EmployeeController::class, 'employeeInfoValidation'])->name('employee-information-validation');

// store
Route::post('/store-employee', [EmployeeController::class, 'storeEmployee'])->name('store-employee');
Route::get('/employee-success', [EmployeeController::class, 'employeeSuccess'])->name('employee-success');


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
