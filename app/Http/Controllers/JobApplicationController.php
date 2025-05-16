<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

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
        ];

        $messages = [
            'edu1_start.required' => 'From is required.',
            'edu1_end.required' => 'To is required.',
            'edu1_school.required' => 'School Name is required.',
            'edu1_address.required' => 'Address is required.',
            'edu1_qualification.required' => 'Qualification is required.',
            'edu1_course.required' => 'Course Name is required.',
            'skills.required' => 'Special Skills is required', 
        ];

        $validated = $request->validate($rules, $messages);
        return redirect()->back();
    }

    public function workValidation(Request $request){
        $rules = [
            'job1_title' => ['required_if:experience,true'],
            'job1_period' => ['required_if:experience,true'],
            'job1_company' => ['required_if:experience,true'],
            'job1_address' => ['required_if:experience,true'],
            'job1_supervisor' => ['required_if:experience,true'],
            'job1_dailcode' => ['required_if:experience,true'],
            'job1_phonecode' => ['required_if:experience,true'],
            'job1_reason' => ['required_if:experience,true'],
            'job1_startsalary' => ['required_if:experience,true'],
            'job1_endsalary' => ['required_if:experience,true'],
        ];

        $messages = [
            'job1_title.required' => 'Job Title is required',
            'job1_period.required' => 'Period is required',
            'job1_company.required' => 'Company Name is required',
            'job1_address.required' => 'Address is required',
            'job1_supervisor.required' => 'Supervisor Name is required',
            'job1_dailcode.required' => 'Dail Code is required',
            'job1_phonecode.required' => 'Phone Number is required',
            'job1_reason.required' => 'Reason for Leaving is required',
            'job1_startsalary.required' => 'Starting Salary is required',
            'job1_endsalary.required' => 'Ending Salary is required',
        ];

        $validated = $request->validate($rules, $messages);
        return redirect()->back();
    }

    public function referenceValidation(Request $request){
        $rules = [
            'refer1_name' => ['required', 'string', 'max:255'],
            'relation1' => ['required', 'string', 'max:255'],
            'refer1_dailcode' => ['required', 'string', 'max:255'],
            'refer1_phoneno' => ['required', 'regex:/^\d{9,10}$/'],
            'refer1_email' => ['required', 'string', 'max:255'],
        ];

        $messages = [
            'refer1_name.required' => 'Full Name is required',
            'relation1.required' => 'Relationship is required',
            'refer1_dailcode.required' => 'Dail Code is required',
            'refer1_phoneno.required' => 'Phone Number is required',
            'phone_no.regex' => 'Phone number must be 9 to 10 digits.',
            'refer1_email.required' => 'Email is required',
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
            'approximate_hours' => ['required'],
            'approximate_minutes' => ['required'],
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
            'investigate_remark' => ['required_if:investigate_type,Yes'],
            'convicted_type' => ['required'], 
            'convicted_remark' => ['required_if:convicted_type,Yes'], 
            'bankrupt_type' => ['required'],
            'bankrupt_remark' => ['required_if:bankrupt_type,Yes'],
            'suspended_type' => ['required'],
            'suspended_remark' => ['required_if:suspended_type,Yes'],
            'directorship_type' => ['required'],
            'directorship_remark' => ['required_if:directorship_type,Yes'],
            'relative_type' => ['required'],
            'relative_remark' => ['required_if:relative_type,Yes'],
            'health_type' => ['required'],
            'health_remark' => ['required_if:health_type,Yes'],
            
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

    public function storeApplication(Request $request){
        
    }

    public function applicationSuccess()
    {

        return Inertia::render('JobApplication/Partials/ApplicationSuccess');
    }

}
