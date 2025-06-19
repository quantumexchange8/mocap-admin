<?php

namespace App\Http\Controllers;

use App\Models\JobAdditional;
use App\Models\JobApplication;
use App\Models\JobEducation;
use App\Models\JobExperience;
use App\Models\JobLanguage;
use App\Models\JobReference;
use App\Models\JobTransport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class JobApplicationController extends Controller
{
    //
    public function jobApplication()
    {
        return Inertia::render('JobApplication/JobApplication');
    }

    public function personalValidation(Request $request)
    {
        $rules = [
            'position' => ['required'],
            'expected_salary' => ['required'],
            'start_date' => ['required'],
            'full_name' => ['required', 'string', 'max:255'],
            'identity_no' => ['required', 'string', 'max:255'],
            'nationality' => ['required', 'string', 'max:255'],
            'place_of_birth' => ['required'],
            'marital_status' => ['required'],
            'race' => ['required', 'string', 'max:255'],
            'religion' => ['required', 'string', 'max:255'],
            'dial_code' => ['required', 'string', 'max:255'],
            'phone_no' => ['required', 'regex:/^\d{9,10}$/', 'unique:users,phone_no'],
            'email' => ['required', 'string', 'max:255', 'unique:users,email'],
            'address' => ['required', 'string', 'max:255'],
            'postcode' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string', 'max:255'],
        ];

        $messages = [
            'position.required' => 'Select position apply is required.',
            'expected_salary.required' => 'Expected Salary is required.',
            'start_date.required' => 'Available date to start work is required.',
            'full_name.required' => 'Full name is required.',
            'identity_no.required' => 'NRIC/Passport No. is required.',
            'nationality.required' => 'Nationality is required.',
            'place_of_birth.required' => 'Place of Birth is required.',
            'marital_status.required' => 'Marital Status is required.',
            'race.required' => 'Select race is required.',
            'religion.required' => 'Select religion is required.',
            'dial_code.required' => 'Dial Code is required.',
            'phone_no.required' => 'Phone number is required.',
            'phone_no.unique' => 'This phone number has already been taken.',
            'phone_no.regex' => 'Phone number must be 9 to 10 digits.',
            'email.required' => 'Email is required.',
            'email.unique' => 'This email has already been taken.',
            'address.required' => 'Address is required.',
            'postcode.required' => 'Postcode is required.',
            'city.required' => 'City is required.',
            'state.required' => 'State is required.',
        ];

        $validated = $request->validate($rules, $messages);
        return redirect()->back();
    }

    public function educationValidation(Request $request){
        $rules = [
            'edu1_start' => ['required'],
            'edu1_end' => ['required'],
            'edu1_school' => ['required', 'string', 'max:255'],
            'edu1_address' => ['required', 'string', 'max:255'],
            'edu1_qualification' => ['required', 'string', 'max:255'],
            'edu1_course' => ['required', 'string', 'max:255'],
            'skills' => ['required','string'],

            'edu2_start' => ['required_with:edu2_end,edu2_school,edu2_address,edu2_qualification,edu2_course'],
            'edu2_end' => ['required_with:edu2_start,edu2_school,edu2_address,edu2_qualification,edu2_course'],
            'edu2_school' => ['required_with:edu2_start,edu2_end,edu2_address,edu2_qualification,edu2_course'],
            'edu2_address' => ['required_with:edu2_start,edu2_end,edu2_school,edu2_qualification,edu2_course'],
            'edu2_qualification' => ['required_with:edu2_start,edu2_end,edu2_school,edu2_address,edu2_course'],
            'edu2_course' => ['required_with:edu2_start,edu2_end,edu2_school,edu2_address,edu2_qualification'],
        
            'edu3_start' => ['required_with:edu3_end,edu3_school,edu3_address,edu3_qualification,edu3_course'],
            'edu3_end' => ['required_with:edu3_start,edu3_school,edu3_address,edu3_qualification,edu3_course'],
            'edu3_school' => ['required_with:edu3_start,edu3_end,edu3_address,edu3_qualification,edu3_course'],
            'edu3_address' => ['required_with:edu3_start,edu3_end,edu3_school,edu3_qualification,edu3_course'],
            'edu3_qualification' => ['required_with:edu3_start,edu3_end,edu3_school,edu3_address,edu3_course'],
            'edu3_course' => ['required_with:edu3_start,edu3_end,edu3_school,edu3_address,edu3_qualification'],
        ];

        $messages = [
            'edu1_start.required' => 'From is required.',
            'edu1_end.required' => 'To is required.',
            'edu1_school.required' => 'School Name is required.',
            'edu1_address.required' => 'Address is required.',
            'edu1_qualification.required' => 'Qualification is required.',
            'edu1_course.required' => 'Course Name is required.',
            'skills.required' => 'Special Skills is required', 

            'edu2_start.required_with' => 'From is required.',
            'edu2_end.required_with' => 'To is required.',
            'edu2_school.required_with' => 'School Name is required.',
            'edu2_address.required_with' => 'Address is required.',
            'edu2_qualification.required_with' => 'Qualification is required.',
            'edu2_course.required_with' => 'Course Name is required.',

            'edu3_start.required_with' => 'From is required.',
            'edu3_end.required_with' => 'To is required.',
            'edu3_school.required_with' => 'School Name is required.',
            'edu3_address.required_with' => 'Address is required.',
            'edu3_qualification.required_with' => 'Qualification is required.',
            'edu3_course.required_with' => 'Course Name is required.',
        ];

        $validated = $request->validate($rules, $messages);
        return redirect()->back();
    }

    public function workValidation(Request $request){
        // dd($request->all());
        $rules = [
            'experience' => ['required'],
            'job1_title' => ['required_if:experience,yes'],
            'job1_period' => ['required_if:experience,yes', 'array', 'size:2'],
            'job1_company' => ['required_if:experience,yes'],
            'job1_address' => ['required_if:experience,yes'],
            'job1_supervisor' => ['required_if:experience,yes'],
            'job1_dailcode' => ['required_if:experience,yes'],
            'job1_phonecode' => ['required_if:experience,yes'],
            'job1_reason' => ['required_if:experience,yes'],
            'job1_startsalary' => ['required_if:experience,yes'],
            'job1_endsalary' => ['required_if:experience,yes'],

            'job2_title' => ['required_with:job2_period,job2_company,job2_address,job2_supervisor,job2_phonecode,job2_reason,job2_startsalary,job2_endsalary'],
            'job2_period' => ['required_with:job2_title,job2_company,job2_address,job2_supervisor,job2_phonecode,job2_reason,job2_startsalary,job2_endsalary'],
            'job2_company' => ['required_with:job2_title,job2_period,job2_address,job2_supervisor,job2_phonecode,job2_reason,job2_startsalary,job2_endsalary'],
            'job2_address' => ['required_with:job2_title,job2_period,job2_company,job2_supervisor,job2_phonecode,job2_reason,job2_startsalary,job2_endsalary'],
            'job2_supervisor' => ['required_with:job2_title,job2_period,job2_company,job2_address,job2_phonecode,job2_reason,job2_startsalary,job2_endsalary'],
            'job2_phonecode' => ['required_with:job2_title,job2_period,job2_company,job2_address,job2_supervisor,job2_reason,job2_startsalary,job2_endsalary'],
            'job2_reason' => ['required_with:job2_title,job2_period,job2_company,job2_address,job2_supervisor,job2_phonecode,job2_startsalary,job2_endsalary'],
            'job2_startsalary' => ['required_with:job2_title,job2_period,job2_company,job2_address,job2_supervisor,job2_phonecode,job2_reason,job2_endsalary'],
            'job2_endsalary' => ['required_with:job2_title,job2_period,job2_company,job2_address,job2_supervisor,job2_phonecode,job2_reason,job2_startsalary'],
            
            'job3_title' => ['required_with:job3_period,job3_company,job3_address,job3_supervisor,job3_phonecode,job3_reason,job3_startsalary,job3_endsalary'],
            'job3_period' => ['required_with:job3_title,job3_company,job3_address,job3_supervisor,job3_phonecode,job3_reason,job3_startsalary,job3_endsalary'],
            'job3_company' => ['required_with:job3_title,job3_period,job3_address,job3_supervisor,job3_phonecode,job3_reason,job3_startsalary,job3_endsalary'],
            'job3_address' => ['required_with:job3_title,job3_period,job3_company,job3_supervisor,job3_phonecode,job3_reason,job3_startsalary,job3_endsalary'],
            'job3_supervisor' => ['required_with:job3_title,job3_period,job3_company,job3_address,job3_phonecode,job3_reason,job3_startsalary,job3_endsalary'],
            'job3_phonecode' => ['required_with:job3_title,job3_period,job3_company,job3_address,job3_supervisor,job3_reason,job3_startsalary,job3_endsalary'],
            'job3_reason' => ['required_with:job3_title,job3_period,job3_company,job3_address,job3_supervisor,job3_phonecode,job3_startsalary,job3_endsalary'],
            'job3_startsalary' => ['required_with:job3_title,job3_period,job3_company,job3_address,job3_supervisor,job3_phonecode,job3_reason,job3_endsalary'],
            'job3_endsalary' => ['required_with:job3_title,job3_period,job3_company,job3_address,job3_supervisor,job3_phonecode,job3_reason,job3_startsalary'],
        ];

        $messages = [
            'job1_title.required_if' => 'Job Title is required',
            'job1_period.required_if' => 'Period is required',
            'job1_period.size' => 'The job1_period must contain a start and end date.',
            'job1_company.required_if' => 'Company Name is required',
            'job1_address.required_if' => 'Address is required',
            'job1_supervisor.required_if' => 'Supervisor Name is required',
            'job1_dailcode.required_if' => 'Dail Code is required',
            'job1_phonecode.required_if' => 'Phone Number is required',
            'job1_reason.required_if' => 'Reason for Leaving is required',
            'job1_startsalary.required_if' => 'Starting Salary is required',
            'job1_endsalary.required_if' => 'Ending Salary is required',

            'job2_title.required_with' => 'Job Title is required',
            'job2_period.required_with' => 'Period is required',
            'job2_company.required_with' => 'Company Name is required',
            'job2_address.required_with' => 'Address is required',
            'job2_supervisor.required_with' => 'Supervisor Name is required',
            'job2_dailcode.required_with' => 'Dail Code is required',
            'job2_phonecode.required_with' => 'Phone Number is required',
            'job2_reason.required_with' => 'Reason for Leaving is required',
            'job2_startsalary.required_with' => 'Starting Salary is required',
            'job2_endsalary.required_with' => 'Ending Salary is required',

            'job3_title.required_with' => 'Job Title is required',
            'job3_period.required_with' => 'Period is required',
            'job3_company.required_with' => 'Company Name is required',
            'job3_address.required_with' => 'Address is required',
            'job3_supervisor.required_with' => 'Supervisor Name is required',
            'job3_dailcode.required_with' => 'Dail Code is required',
            'job3_phonecode.required_with' => 'Phone Number is required',
            'job3_reason.required_with' => 'Reason for Leaving is required',
            'job3_startsalary.required_with' => 'Starting Salary is required',
            'job3_endsalary.required_with' => 'Ending Salary is required',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        $validator->after(function ($validator) use ($request) {
            if ($request->experience === 'yes') {
                $job1Period = $request->input('job1_period');
    
                if (empty($job1Period[1])) {
                    $validator->errors()->add('job1_period', 'End date is required.');
                }
            }
        });
    
        $validator->validate();

        return redirect()->back();
    }

    public function referenceValidation(Request $request){
        $rules = [
            'refer1_name' => ['required', 'string', 'max:255'],
            'relation1' => ['required', 'string', 'max:255'],
            'refer1_dailcode' => ['required', 'string', 'max:255'],
            'refer1_phoneno' => ['required', 'regex:/^\d{9,10}$/'],
            'refer1_email' => ['required', 'string', 'max:255'],

            'refer2_name' => ['required_with:refer2_relation,refer2_phoneno,refer2_email'],
            'relation2' => ['required_with:refer2_name,refer2_phoneno,refer2_email'],
            'refer2_dailcode' => ['required_with:refer2_name,refer2_relation,refer2_phoneno,refer2_email'],
            'refer2_phoneno' => ['required_with:refer2_name,refer2_relation,refer2_email'],
            'refer2_email' => ['required_with:refer2_name,refer2_relation,refer2_phoneno'],
            
            'refer3_name' => ['required_with:refer3_relation,refer3_phoneno,refer3_email'],
            'relation3' => ['required_with:refer3_name,refer3_phoneno,refer3_email'],
            'refer3_dailcode' => ['required_with:refer3_name,refer3_relation,refer3_phoneno,refer3_email'],
            'refer3_phoneno' => ['required_with:refer3_name,refer3_relation,refer3_email'],
            'refer3_email' => ['required_with:refer3_name,refer3_relation,refer3_phoneno'],
        ];

        $messages = [
            'refer1_name.required' => 'Full Name is required',
            'relation1.required' => 'Relationship is required',
            'refer1_dailcode.required' => 'Dail Code is required',
            'refer1_phoneno.required' => 'Phone Number is required',
            'phone_no.regex' => 'Phone number must be 9 to 10 digits.',
            'refer1_email.required' => 'Email is required',

            'refer2_name.required_with' => 'Full Name is required',
            'relation2.required_with' => 'Relationship is required',
            'refer2_dailcode.required_with' => 'Dail Code is required',
            'refer2_phoneno.required_with' => 'Phone Number is required',
            'refer2_email.required_with' => 'Email is required',

            'refer3_name.required_with' => 'Full Name is required',
            'relation3.required_with' => 'Relationship is required',
            'refer3_dailcode.required_with' => 'Dail Code is required',
            'refer3_phoneno.required_with' => 'Phone Number is required',
            'refer3_email.required_with' => 'Email is required',
        ];

        $validated = $request->validate($rules, $messages);
        return redirect()->back();
    }

    public function languageValidation(Request $request){
        $rules = [
           'eng_speak' => ['required'],
           'eng_write' => ['required'],
           'eng_listen' => ['required'],
           'malay_speak' => ['required'], 
           'malay_write' => ['required'],
           'malay_listen' => ['required'],
           'chinese_speak' => ['required'],
           'chinese_write' => ['required'],
           'chinese_listen' => ['required'],
           'other_language' => ['nullable', 'string'],
           'other_speak' => ['required_with:other_language'],
           'other_write' => ['required_with:other_language'],
           'other_listen' => ['required_with:other_language'],
        ];

        $messages = [
            'eng_speak.required' => 'English speaking rating is required',
            'eng_write.required' => 'English writing rating is required',
            'eng_listen.required' => 'English listening rating is required',
            'malay_speak.required' => 'Malay speaking rating is required',
            'malay_write.required' => 'Malay writing rating is required',
            'malay_listen.required' => 'Malay listening rating is required',
            'chinese_speak.required' => 'Chinese speaking rating is required',
            'chinese_write.required' => 'Chinese writing rating is required',
            'chinese_listen.required' => 'Chinese listening rating is required',
            'other_speak.required' => 'Other speaking rating is required',
            'other_write.required' => 'Other writing rating is required',
            'other_listen.required' => 'Other listening rating is required',
        ];

        $validated = $request->validate($rules, $messages);
        return redirect()->back();
    }    

    public function transportationValidation(Request $request){
        $rules = [
            'transport' => ['required', 'array', 'min:1'],
            'approximate_distance' => ['required'],
            'approximate_minutes' => ['required', 'min:1'],
        ];

        $messages = [
            'transport.required' => 'Transportation is required.',
            'approximate_distance.required' => 'Approximate Distance is required.',
            'approximate_hours.required' => 'Approximate hours is required.',
            'approximate_minutes.required' => 'Approximate minutes is required.',
        ];

        $validated = $request->validate($rules, $messages);
        return redirect()->back();
    }

    public function additionalValidation(Request $request){

        $rules = [
            'overtime_type' => ['required'], 
            'investigate_type' => ['required'],
            'investigate_remark' => ['required_if:investigate_type,1'],
            'convicted_type' => ['required'], 
            'convicted_remark' => ['required_if:convicted_type,1'], 
            'bankrupt_type' => ['required'],
            'bankrupt_remark' => ['required_if:bankrupt_type,1'],
            'suspended_type' => ['required'],
            'suspended_remark' => ['required_if:suspended_type,1'],
            'directorship_type' => ['required'],
            'directorship_remark' => ['required_if:directorship_type,1'],
            'relative_type' => ['required'],
            'relative_remark' => ['required_if:relative_type,1'],
            'health_type' => ['required'],
            'health_remark' => ['required_if:health_type,1'],
            
            'find_job_type' => ['required', 'array', 'min:1'],
            'find_job_type.*' => ['string'], // Validate each array element
            'find_job_remark' => [
                Rule::requiredIf(function () use ($request) {
                    return is_array($request->find_job_type) && 
                        in_array('Other', $request->find_job_type);
                })
            ]
        ];

        $messages = [
            'overtime_type.required' => 'Overtime type is required.',

            'investigate_type.required' => 'Investigation type is required.',
            'investigate_remark.required_if' => 'Specific the investigation details.',

            'convicted_type.required' => 'Convicted type is required.',
            'convicted_remark.required_if' => 'Specific in details.',

            'bankrupt_type.required' => 'Bankrupt type is required.',
            'bankrupt_remark.required_if' => 'Specific in details.',

            'suspended_type.required' => 'Suspended type is required.',
            'suspended_remark.required_if' => 'Specific in details.',

            'directorship_type.required' => 'Directorship type is required.',
            'directorship_remark.required_if' => 'Specific in details.',

            'relative_type.required' => 'Relative type is required.',
            'relative_remark.required_if' => 'Specific in details.',

            'health_type.required' => 'Medical condition is required.',
            'health_remark.required_if' => 'Specific in details.',

            'find_job_type.required' => 'Find job is required.',
            'find_job_remark.required_if' => 'Specific in details.',
        ];

        $validated = $request->validate($rules, $messages);
        return redirect()->back();
    }

    public function checkSignature(Request $request)
    {

        return response()->json([
            'message' => 'success'
        ], 200);
    }

    public function storeApplication(Request $request)
    {

        $application = JobApplication::create([
            'position' => $request->position,
            'expected_salary' => $request->expected_salary,
            'start_date' => Carbon::parse($request->start_date)->setTimezone('Asia/Kuala_Lumpur')->toDateString(),
            'notice_period' => $request->notice_period,
            'full_name' => $request->full_name,
            'identity_no' => $request->identity_no,
            'nationality' => $request->nationality,
            'place_of_birth' => $request->place_of_birth,
            'marital_status' => $request->marital_status['name'],
            'race' => $request->race,
            'religion' => $request->religion,
            'dial_code' => $request->dial_code,
            'phone_no' => $request->phone_no,
            'email' => $request->email,
            'address' => $request->address,
            'postcode' => $request->postcode,
            'city' => $request->city,
            'state' => $request->state,
            'status' => 'pending_review',
            'special_skill' => $request->skills,
        ]);

        $education1 = JobEducation::create([
            'job_apply_id' => $application->id,
            'from_date' => Carbon::parse($request->edu1_start)->setTimezone('Asia/Kuala_Lumpur')->toDateString(),
            'to_date' => Carbon::parse($request->edu1_end)->setTimezone('Asia/Kuala_Lumpur')->toDateString(),
            'school_name' => $request->edu1_school,
            'address' => $request->edu1_address,
            'qualification' => $request->edu1_qualification,
            'course_name' => $request->edu1_course,
        ]);

        if ($request->edu2_school) {
            $education2 = JobEducation::create([
                'job_apply_id' => $application->id,
                'from_date' => Carbon::parse($request->edu2_start)->setTimezone('Asia/Kuala_Lumpur')->toDateString() ?? null,
                'to_date' => Carbon::parse($request->edu2_end)->setTimezone('Asia/Kuala_Lumpur')->toDateString() ?? null,
                'school_name' => $request->edu2_school ?? null,
                'address' => $request->edu2_address ?? null,
                'qualification' => $request->edu2_qualification ?? null,
                'course_name' => $request->edu2_course ?? null,
            ]);
        }

        if ($request->edu3_school) {
            $education3 = JobEducation::create([
                'job_apply_id' => $application->id,
                'from_date' => Carbon::parse($request->edu3_start)->setTimezone('Asia/Kuala_Lumpur')->toDateString() ?? null,
                'to_date' => Carbon::parse($request->edu3_end)->setTimezone('Asia/Kuala_Lumpur')->toDateString() ?? null,
                'school_name' => $request->edu3_school ?? null,
                'address' => $request->edu3_address ?? null,
                'qualification' => $request->edu3_qualification ?? null,
                'course_name' => $request->edu3_course ?? null,
            ]);
        }

        if ($request->experience === 'yes') {
            
            $period1 = $request->job1_period;
            $experience1 = JobExperience::create([
                'job_apply_id' => $application->id,
                'title' => $request->job1_title,
                'period_from' => (is_array($period1) && isset($period1[0]) && $period1[0])
                    ? Carbon::parse($period1[0])->setTimezone('Asia/Kuala_Lumpur')->toDateString()
                    : null,
                'period_to' => (is_array($period1) && isset($period1[1]) && $period1[1])
                    ? Carbon::parse($period1[1])->setTimezone('Asia/Kuala_Lumpur')->toDateString()
                    : null,
                'company_name' => $request->job1_company,
                'address' => $request->job1_address,
                'supervisor_name' => $request->job1_supervisor,
                'dial_code' => $request->job1_dailcode,
                'phone_no' => $request->job1_phonecode,
                'reason_leaving' => $request->job1_reason,
                'starting_salary' => $request->job1_startsalary,
                'ending_salary' => $request->job1_endsalary,
            ]);

            if ($request->job2_title) {
                $period2 = $request->job2_period;
                $experience2 = JobExperience::create([
                    'job_apply_id' => $application->id,
                    'title' => $request->job2_title ?? null,
                    'period_from' => (is_array($period2) && isset($period2[0]) && $period2[0])
                        ? Carbon::parse($period2[0])->setTimezone('Asia/Kuala_Lumpur')->toDateString()
                        : null,
                    'period_to' => (is_array($period2) && isset($period2[1]) && $period2[1])
                        ? Carbon::parse($period2[1])->setTimezone('Asia/Kuala_Lumpur')->toDateString()
                        : null,
                    'company_name' => $request->job2_company ?? null,
                    'address' => $request->job2_address ?? null,
                    'supervisor_name' => $request->job2_supervisor ?? null,
                    'dial_code' => $request->job2_dailcode ?? null,
                    'phone_no' => $request->job2_phonecode ?? null,
                    'reason_leaving' => $request->job2_reason ?? null,
                    'starting_salary' => $request->job2_startsalary ?? null,
                    'ending_salary' => $request->job2_endsalary ?? null,
                ]);
            }

            if ($request->job3_title) {
                $period3 = $request->job3_period;
                $experience3 = JobExperience::create([
                    'job_apply_id' => $application->id,
                    'title' => $request->job3_title ?? null,
                    'period_from' => (is_array($period3) && isset($period3[0]) && $period3[0])
                        ? Carbon::parse($period3[0])->setTimezone('Asia/Kuala_Lumpur')->toDateString()
                        : null,
                    'period_to' => (is_array($period3) && isset($period3[1]) && $period3[1])
                        ? Carbon::parse($period3[1])->setTimezone('Asia/Kuala_Lumpur')->toDateString()
                        : null,
                    'company_name' => $request->job3_company ?? null,
                    'address' => $request->job3_address ?? null,
                    'supervisor_name' => $request->job3_supervisor ?? null,
                    'dial_code' => $request->job3_dailcode ?? null,
                    'phone_no' => $request->job3_phonecode ?? null,
                    'reason_leaving' => $request->job3_reason ?? null,
                    'starting_salary' => $request->job3_startsalary ?? null,
                    'ending_salary' => $request->job3_endsalary ?? null,
                ]);
            }
        }


        $reference1 = JobReference::create([
            'job_apply_id' => $application->id,
            'full_name' => $request->refer1_name,
            'relationship' => $request->relation1,
            'dial_code' => $request->refer1_dailcode,
            'phone_no' => $request->refer1_phoneno,
            'email' => $request->refer1_email,
        ]);

        if ($request->refer2_name) {
            $reference2 = JobReference::create([
                'job_apply_id' => $application->id,
                'full_name' => $request->refer2_name ?? null,
                'relationship' => $request->relation2 ?? null,
                'dial_code' => $request->refer2_dailcode ?? null,
                'phone_no' => $request->refer2_phoneno ?? null,
                'email' => $request->refer2_email ?? null,
            ]);
        }

        if ($request->reference3) {
            $reference3 = JobReference::create([
                'job_apply_id' => $application->id,
                'full_name' => $request->refer3_name ?? null,
                'relationship' => $request->relation3 ?? null,
                'dial_code' => $request->refer3_dailcode ?? null,
                'phone_no' => $request->refer3_phoneno ?? null,
                'email' => $request->refer3_email ?? null,
            ]);
        }



        $language = JobLanguage::create([
            'job_apply_id' => $application->id,
            'en_speaking' => $request->eng_speak,
            'en_writting' => $request->eng_write,
            'en_listening' => $request->eng_listen,
            'bm_speaking' => $request->malay_speak,
            'bm_writting' => $request->malay_write,
            'bm_listening' => $request->malay_listen,
            'cn_speaking' => $request->chinese_speak,
            'cn_writting' => $request->chinese_write,
            'cn_listening' => $request->chinese_listen,
            'others_language' => $request->other_language ?? null,
            'others_speaking' => $request->other_speak ?? null,
            'others_writting' => $request->other_write ?? null,
            'others_listening' => $request->other_listen ?? null,
        ]);
        
        $transportation = JobTransport::create([
            'job_apply_id' => $application->id,
            'work_transportation' =>  $request->transport,
            'approximate_distance' => $request->approximate_distance,
            'approximate_hours' => $request->approximate_hours,
            'approximate_minutes' => $request->approximate_minutes,
        ]);

        $additional = JobAdditional::create([
            'job_apply_id' => $application->id,
            'overtime_type' => $request->overtime_type,
            'investigate_type' => $request->investigate_type,
            'investigate_remark' => $request->investigate_remark ?? null,
            'convicted_type' => $request->convicted_type,
            'convicted_remark' => $request->convicted_remark ?? null,
            'bankrupt_type' => $request->bankrupt_type,
            'bankrupt_remark' => $request->bankrupt_remark ?? null,
            'suspended_type' => $request->suspended_type,
            'suspended_remark' => $request->suspended_remark ?? null,
            'directorship_type' => $request->directorship_type,
            'directorship_remark' => $request->directorship_remark ?? null,
            'relative_type' => $request->relative_type,
            'relative_remark' => $request->relative_remark ?? null,
            'medical_type' => $request->health_type,
            'medical_remark' => $request->health_remark ?? null,
            'job_type' => is_array($request->find_job_type) ? implode(',', $request->find_job_type) : $request->find_job_type,            
            'job_remark' =>  $request->find_job_remark ?? null,
        ]);

        if ($request->hasFile('digital_signature')) {
            $application->addMedia($request->digital_signature)->toMediaCollection('job_signature');
        }
    }

    public function applicationSuccess()
    {

        return Inertia::render('JobApplication/Partials/ApplicationSuccess');
    }

}
