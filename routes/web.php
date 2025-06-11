<?php

use App\Http\Controllers\AdministratorController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AuthEmployeeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeeProfileController;
use App\Http\Controllers\GlobalController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SmartDataController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/', function() {
    return Inertia::render('Onboarding');
});


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
Route::get('/getQualification', [GlobalController::class, 'getQualification'])->name('getQualification');
Route::get('/getJobApplications', [GlobalController::class, 'getJobApplications'])->name('getJobApplications');
Route::get('/getPosition', [GlobalController::class, 'getPosition'])->name('getPosition');


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
 *     Job Application
 * ==============================
*/
Route::get('/job-application', [JobApplicationController::class, 'jobApplication'])->name('job-application');
// validation
Route::post('/job-personal-validation', [JobApplicationController::class, 'personalValidation'])->name('job-personal-validation');
Route::post('/job-education-validation', [JobApplicationController::class, 'educationValidation'])->name('job-education-validation');
Route::post('/job-work-validation', [JobApplicationController::class, 'workValidation'])->name('job-work-validation');
Route::post('/job-reference-validation', [JobApplicationController::class, 'referenceValidation'])->name('job-reference-validation');
Route::post('/job-language-validation', [JobApplicationController::class, 'languageValidation'])->name('job-language-validation');
Route::post('/job-transportation-validation', [JobApplicationController::class, 'transportationValidation'])->name('job-transportation-validation');
Route::post('/job-additional-validation', [JobApplicationController::class, 'additionalValidation'])->name('job-additional-validation');
Route::post('/job-check-signature', [JobApplicationController::class, 'checkSignature'])->name('job-check-signature');
//store
Route::post('/store-application', [JobApplicationController::class, 'storeApplication'])->name('store-application');
Route::get('/application-success', [JobApplicationController::class, 'applicationSuccess'])->name('application-success');

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

/**
 * ==============================
 *     Deleted Illustration
 * ==============================
*/
Route::post('/delete-account', [ProfileController::class, 'deleteAccount'])->name('delete-account');

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
    Route::group(['middleware' => ['permission:dashboard']], function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');
        Route::get('/getAnouncement', [DashboardController::class, 'getAnouncement'])->name('getAnouncement');
        Route::get('/getTotalEmployee', [DashboardController::class, 'getTotalEmployee'])->name('getTotalEmployee');
        
    });

    /**
     * ==============================
     *           Announcement
     * ==============================
    */
    Route::group(['middleware' => ['permission:announcement']], function () {
        Route::get('/announcement', [AnnouncementController::class, 'announcement'])->name('announcement');
        Route::get('/create-announcement', [AnnouncementController::class, 'CreateAnnouncement'])->name('create-announcement');
        Route::post('/store-announcement-draft', [AnnouncementController::class, 'storeAnnouncementDraft'])->name('store-announcement-draft');
        Route::post('/store-announcement-publish', [AnnouncementController::class, 'storeAnnouncementPublish'])->name('store-announcement-publish');
        
        Route::get('/getEmployeeTree', [AnnouncementController::class, 'getEmployeeTree'])->name('getEmployeeTree');
        Route::get('/getDepartmentUsers', [AnnouncementController::class, 'getDepartmentUsers'])->name('getDepartmentUsers');
        Route::get('/getDraftAnnouncement', [AnnouncementController::class, 'getDraftAnnouncement'])->name('getDraftAnnouncement');
        Route::get('/getPinAnnouncement', [AnnouncementController::class, 'getPinAnnouncement'])->name('getPinAnnouncement');
        Route::get('/getPublishedAnnouncement', [AnnouncementController::class, 'getPublishedAnnouncement'])->name('getPublishedAnnouncement');
        Route::get('/getAnnouncementUser', [AnnouncementController::class, 'getAnnouncementUser'])->name('getAnnouncementUser');
        Route::get('/getAnnouncementComment', [AnnouncementController::class, 'getAnnouncementComment'])->name('getAnnouncementComment');
        Route::get('/getArchiveAnnouncement', [AnnouncementController::class, 'getArchiveAnnouncement'])->name('getArchiveAnnouncement');
        
        Route::get('/draft-announcement-details/{id}', [AnnouncementController::class, 'draftAnnouncementDetails'])->name('draft-announcement-details');
        Route::get('/edit-draft-announcement/{id}', [AnnouncementController::class, 'editDraftAnnouncement'])->name('edit-draft-announcement');
        Route::get('/published-announcment-details/{id}', [AnnouncementController::class, 'publishedAnnouncmentDetails'])->name('published-announcment-details');
        Route::get('/archive-announcement-details/{id}', [AnnouncementController::class, 'archiveAnnouncementDetails'])->name('archive-announcement-details');
        
        Route::post('/update-draft-schedule', [AnnouncementController::class, 'updateDraftSchedule'])->name('update-draft-schedule');
        Route::post('/remove-draft-announcement', [AnnouncementController::class, 'removeDraftAnnouncement'])->name('remove-draft-announcement');
        Route::post('/archive-announcement', [AnnouncementController::class, 'archiveAnnouncement'])->name('archive-announcement');
        Route::post('/send-comment', [AnnouncementController::class, 'sendComment'])->name('send-comment');
        Route::post('/delete-selected-comment', [AnnouncementController::class, 'deleteSelectedComment'])->name('delete-selected-comment');
        Route::post('/delete-announcement', [AnnouncementController::class, 'deleteAnnouncement'])->name('delete-announcement');
        Route::post('/unarchive-announcement', [AnnouncementController::class, 'unarchiveAnnouncement'])->name('unarchive-announcement');
        
        
    });

    /**
     * ==============================
     *      Employee Listing
     * ==============================
    */
    Route::group(['middleware' => ['permission:employee_listing']], function () {
        Route::get('/employee-listing', [AuthEmployeeController::class, 'employeeListing'])->name('employee-listing');
        Route::get('/getEmployeeListing', [AuthEmployeeController::class, 'getEmployeeListing'])->name('getEmployeeListing');
        Route::get('/employee-details/{id}', [AuthEmployeeController::class, 'employeeDetails'])->name('employee-details');
        Route::post('/update-employee-details', [AuthEmployeeController::class, 'updateEmployeeDetails'])->name('update-employee-details');
        Route::post('/suspend-employee', [AuthEmployeeController::class, 'suspendEmployee'])->name('suspend-employee');
        Route::post('/restore-employee', [AuthEmployeeController::class, 'restoreEmployee'])->name('restore-employee');
        Route::post('/reset-employee-pw', [AuthEmployeeController::class, 'resetEmployeePw'])->name('reset-employee-pw');
        Route::post('/delete-employee', [AuthEmployeeController::class, 'deleteEmployee'])->name('delete-employee');
        
        Route::post('/update-profile', [AuthEmployeeController::class, 'updateProfile'])->name('update-profile');
        Route::get('/getEduBg', [AuthEmployeeController::class, 'getEduBg'])->name('getEduBg');
        
        Route::post('/update-personal-info', [EmployeeProfileController::class, 'updatePersonalInfo'])->name('update-personal-info');
        Route::post('/update-bank-info', [EmployeeProfileController::class, 'updateBankInfo'])->name('update-bank-info');
        Route::post('/update-beneficiary-info', [EmployeeProfileController::class, 'updateBeneficiaryInfo'])->name('update-beneficiary-info');
        Route::post('/update-urgent-info', [EmployeeProfileController::class, 'updateUrgentInfo'])->name('update-urgent-info');
        Route::post('/update-education', [EmployeeProfileController::class, 'updateEducation'])->name('update-education');
        Route::post('/update-work-info', [EmployeeProfileController::class, 'updateWorkInfo'])->name('update-work-info');
    });
    
    
    /**
     * ==============================
     *           Department
     * ==============================
    */
    Route::group(['middleware' => ['permission:department']], function () {
        Route::get('/department', [DepartmentController::class, 'department'])->name('department');
        Route::get('/getDepartmentListing', [DepartmentController::class, 'getDepartmentListing'])->name('getDepartmentListing');
        Route::get('/create-department', [DepartmentController::class, 'createDepartment'])->name('create-department');
        Route::get('/edit-department/{id}', [DepartmentController::class, 'editDepartment'])->name('edit-department');
        Route::post('/store-department', [DepartmentController::class, 'storeDepartment'])->name('store-department');
        Route::post('/validate-department', [DepartmentController::class, 'validateDepartment'])->name('validate-department');
        Route::post('/delete-department', [DepartmentController::class, 'deleteDepartment'])->name('delete-department');
        Route::post('/update-department', [DepartmentController::class, 'updateDepartment'])->name('update-department');
    });
    

    /**
     * ==============================
     *        Administrators
     * ==============================
    */
    Route::group(['middleware' => ['permission:administrator']], function () {
        Route::get('/administrators', [AdministratorController::class, 'administrators'])->name('administrators');
        Route::get('/getAdministrator', [AdministratorController::class, 'getAdministrator'])->name('getAdministrator');
        Route::post('/create-administrator', [AdministratorController::class, 'createAdministrator'])->name('create-administrator');
        Route::post('/update-administrator', [AdministratorController::class, 'updateAdministrator'])->name('update-administrator');
        Route::post('/update-admin-title', [AdministratorController::class, 'updateAdminTitle'])->name('update-admin-title');
        Route::post('/remove-administrator', [AdministratorController::class, 'removeAdministrator'])->name('remove-administrator');
    });
    /**
     * ==============================
     *           Smart Data
     * ==============================
    */
    Route::group(['middleware' => ['permission:smart_data']], function () {
        Route::get('/smart-data', [SmartDataController::class, 'smartData'])->name('smart-data');
        Route::get('/getJobApplicants', [SmartDataController::class, 'getJobApplicants'])->name('getJobApplicants');
        Route::get('/jobApplicant-details/{id}', [SmartDataController::class, 'jobApplicantDetails'])->name('jobApplicant-details');
        Route::get('/jobApplicant-evaluation/{id}', [SmartDataController::class, 'jobApplicantEvaluation'])->name('jobApplicant-evaluation');
        
        Route::post('/evaluation-job-applicant-signature', [SmartDataController::class, 'evaluationJobApplicantSignature'])->name('evaluation-job-applicant-signature');
        Route::post('/evaluation-job-applicant', [SmartDataController::class, 'evaluationJobApplicant'])->name('evaluation-job-applicant');
    });
    
    Route::post('/evaluation-job-applicant-signature', [SmartDataController::class, 'evaluationJobApplicantSignature'])->name('evaluation-job-applicant-signature');
    Route::post('/evaluation-job-applicant', [SmartDataController::class, 'evaluationJobApplicant'])->name('evaluation-job-applicant');

    Route::get('/getEmployeeInfo', [SmartDataController::class, 'getEmployeeInfo'])->name('getEmployeeInfo');
    Route::get('/employee-info/{id}', [SmartDataController::class, 'employeeInfo'])->name('employeeInfo');

    /**
     * ==============================
     *           Profile
     * ==============================
    */
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/update-profile-pic', [ProfileController::class, 'updateProfilePic'])->name('update-profile-pic');
    Route::post('/remove-profile-pic', [ProfileController::class, 'removeProfilePic'])->name('remove-profile-pic');
    Route::post('/update-name', [ProfileController::class, 'updateName'])->name('update-name');
    Route::post('/update-email', [ProfileController::class, 'updateEmail'])->name('update-email');
    Route::get('/confirm-email', [ProfileController::class, 'confirmEmailChange'])->name('confirm-email')->middleware('signed');   
    Route::get('/verify-new-email', [ProfileController::class, 'verifyNewEmail'])->name('verify-new-email')->middleware('signed');
    Route::post('/update-title', [ProfileController::class, 'updateTitle'])->name('update-title');
    Route::post('/update-password', [ProfileController::class, 'updatePassword'])->name('update-password');    
    Route::post('/validate-password', [ProfileController::class, 'validatePassword'])->name('validate-password');
});

require __DIR__.'/auth.php';
