<?php

namespace App\Http\Controllers;

use App\Models\AdditionalInfo;
use App\Models\BeneficiaryInfo;
use App\Models\EmergencyInfo;
use App\Models\EmployeeBank;
use App\Models\MedicalInfo;
use App\Models\Transport;
use App\Models\User;
use App\Services\RunningNumberService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EmployeeController extends Controller
{
    public function employeeApplication()
    {

        return Inertia::render('EmployeeApplication');
    }

    public function personalValidaiton(Request $request) 
    {
        $rules = [
            'full_name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255'],
            'nationality' => ['required', 'string', 'max:255'],
            'identity_no' => ['required', 'string', 'max:255'],
            'gender' => ['required', 'string', 'max:255'],
            'dob' => ['required'],
            'race' => ['required', 'string', 'max:255'],
            'religion' => ['required', 'string', 'max:255'],
            'place_of_birth' => ['required'],
            'marital_status' => ['required'],
            'dial_code' => ['required', 'string', 'max:255'],
            'phone_no' => ['required', 'regex:/^\d{9,10}$/', 'unique:users,phone_no'],
            'email' => ['required', 'string', 'max:255', 'unique:users,email'],
            'address' => ['required', 'string', 'max:255'],
            'postcode' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string', 'max:255'],

            'bank_name' => ['required', 'string', 'max:255'],
            'acc_type' => ['required', 'string', 'max:255'],
            'acc_no' => ['required', 'string', 'max:255'],
            'income_tax_no' => ['required', 'string', 'max:255'],
            'epf_no' => ['required', 'string', 'max:255'],
            'socso_no' => ['required', 'string', 'max:255'],
        ];

        $messages = [
            'full_name.required' => 'Full Name is required.',
            'username.required' => 'Preferred name is required.',
            'nationality.required' => 'Nationality is required.',
            'identity_no.required' => 'Identity no is required.',
            'gender.required' => 'Gender is required.',
            'dob.required' => 'Date of birth is required.',
            'race.required' => 'Select race is required.',
            'religion.required' => 'Select religion is required.',
            'place_of_birth.required' => 'Select place of birth is required.',
            'marital_status.required' => 'Select Marital status is required.',
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

            'bank_name.required' => 'Bank is required.',
            'acc_type.required' => 'Bank account type is required.',
            'acc_no.required' => 'Account number is required.',
            'income_tax_no.required' => 'Income tax number is required.',
            'epf_no.required' => 'EPF number is required.',
            'socso_no.required' => 'Socso number is required.',

        ];

        $validated = $request->validate($rules, $messages);
        return redirect()->back();
    }

    public function emergencyValidaiton(Request $request) 
    {
        $rules = [
            'emerge1_fullname' => ['required', 'string', 'max:255'],
            'relation1' => ['required'],
            'emerge1_dialcode' => ['required', 'string', 'max:255'],
            'emerge1_phone_no' => ['required', 'regex:/^\d{9,10}$/'],
            'emerge2_fullname' => ['required', 'string', 'max:255'],
            'relation2' => ['required'],
            'emerge2_dialcode' => ['required', 'string', 'max:255'],
            'emerge2_phone_no' => ['required', 'regex:/^\d{9,10}$/'],
        ];

        $messages = [
            'emerge1_fullname.required' => 'Full name is required.',
            'relation1.required' => 'Select relationship is required.',
            'emerge1_dialcode.required' => 'Select dial code is required.',
            'emerge1_phone_no.required' => 'Phone number is required.',
            'emerge1_phone_no.regex' => 'Phone number must be 9 to 10 digits.',
            'emerge2_fullname.required' => 'Full name is required.',
            'relation2.required' => 'Select relationship is required.',
            'emerge2_dialcode.required' => 'Select dial code is required.',
            'emerge2_phone_no.required' => 'Phone number is required.',
            'emerge2_phone_no.regex' => 'Phone number must be 9 to 10 digits.',
        ];

        $validated = $request->validate($rules, $messages);

        return redirect()->back();
    }

    public function transportationValidaiton(Request $request) 
    {

        $rules = [
            'own_transport' => ['required', 'array', 'min:1'],
            'license_id' => ['required', 'array', 'max:255'],
            'work_transportation' => ['required', 'array', 'max:255'],
            'approximate_distance' => ['required'],
            'approximate_hours' => ['required'],
            'approximate_minutes' => ['required'],
        ];

        $messages = [
            'own_transport.required' => 'Own transportation is required.',
            'own_transport.min' => 'Choose at least 1 transportation.',
            'license_id.required' => 'Driver license is required.',
            'work_transportation.required' => 'Transportation to work is required.',
            'approximate_distance.required' => 'Approximate Distance is required.',
            'approximate_hours.required' => 'Approximate hours is required.',
            'approximate_minutes.required' => 'Approximate minutes is required.',
        ];

        $validated = $request->validate($rules, $messages);

        return redirect()->back();
    }

    public function medicalValidaiton(Request $request) 
    {

        $rules = [
            'blood_type' => ['required'],

            'allergic_type' => ['required'], // No / Yes
            'allergic_remark' => ['required_if:allergic_type,Yes'], // if allergic_type === 'Yes' this required

            'medical_type' => ['required'],  // No / Yes
            'medical_remark' => ['required_if:medical_type,Yes'], // if medical_type === 'Yes' this required

            'medication_type' => ['required'],
            'medication_remark' => ['required_if:medication_type,Yes'],

            // if gender === 'male' this all not required else female is required
            'pregnant_type' => ['required_if:gender,male'], // No / Yes
            'pregnant_remark' => ['required_if:pregnant_type,Yes'], // if pregnant_type === 'Yes' this required

            'pregnant_delivery_date' => ['required_if:pregnant_type,Yes'], // if pregnant_type === 'Yes' this required

            'pregnancy_medication_type' => ['required_if:pregnant_type,Yes'], // No / Yes
            'pregnancy_medication_remark' => ['required_if:pregnancy_medication_type,Yes'], // if pregnancy_medication_type === 'Yes' this required

            'gynaecological_type' => ['required_if:pregnant_type,Yes'], // No / Yes
            'gynaecological_remark' => ['required_if:gynaecological_type,Yes'], // if gynaecological_type === 'Yes' this required
        ];

        $messages = [
            'blood_type.required' => 'Own transportation is required.',

            'allergic_type.required' => 'Allergic type is required.',
            'allergic_remark.required_if' => 'Specific the allergic food.',

            'medical_type.required' => 'Medical type is required.',
            'medical_remark.required_if' => 'Specific the medical condition.',

            'medication_type.required' => 'Medication type is required.',
            'medication_remark.required_if' => 'Specific the medications.',

            'pregnant_type.required' => 'Pregnant type is required.',
            'pregnant_remark.required_if' => 'Specific the weeks of your pregnancy.',

            'pregnant_delivery_date.required_if' => 'Date or delivery is required.',

            'pregnancy_medication_type.required' => 'Pregnancy medication type is required.',
            'pregnancy_medication_remark.required_if' => 'please specify the name of the drug and its intended use.',

            'gynaecological_type.required' => 'Gynaecological type is required.',
            'gynaecological_remark.required_if' => 'please specify the medical information and medications taken.',
        ];

        $validated = $request->validate($rules, $messages);

        return redirect()->back();
    }

    public function beneficiaryValidaiton(Request $request) 
    {

        $rules = [
            'beneficiary_fullname' => ['required'],
            'beneficiary_relation' => ['required'],
            'beneficiary_identity' => ['required'],
            'beneficiary_dialcode' => ['required'],
            'beneficiary_phoneNo' => ['required', 'regex:/^\d{9,10}$/'],
            'personal_insurance' => ['required', 'array', 'min:1'],
        ];

        $messages = [
            'beneficiary_fullname.required' => 'Full name is required.',
            'beneficiary_relation.required' => 'Relationship is required.',
            'beneficiary_identity.required' => 'NRIC/Passport No. is required.',
            'beneficiary_dialcode.required' => 'Dial code is required.',
            'beneficiary_phoneNo.required' => 'Phone number is required.',
            'beneficiary_phoneNo.regex' => 'Phone number must be 9 to 10 digits.',
            'personal_insurance.required' => 'Select at least 1 insurance.',
        ];

        $validated = $request->validate($rules, $messages);

        return redirect()->back();
    }

    public function additionalValidaiton(Request $request) 
    {

        $rules = [
            'investigate_type' => ['required'], // No / Yes
            'investigate_remark' => ['required_if:investigate_type,Yes'], // if allergic_type === 'Yes' this required

            'convicted_type' => ['required'],  // No / Yes
            'convicted_remark' => ['required_if:convicted_type,Yes'], // if medical_type === 'Yes' this required

            'bankrupt_type' => ['required'],
            'bankrupt_remark' => ['required_if:bankrupt_type,Yes'],

            'suspended_type' => ['required'],
            'suspended_remark' => ['required_if:suspended_type,Yes'],

            'directorship_type' => ['required'],
            'directorship_remark' => ['required_if:directorship_type,Yes'],

            'relative_type' => ['required'],
            'relative_remark' => ['required_if:relative_type,Yes'],
        ];

        $messages = [
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

    public function employeeInfoValidation(Request $request)
    {

        $rules = [
            'employment_type' => ['required'],
            'department_type' => ['required'],
            'position_type' => ['required'],
            'date_of_employment' => ['required'],
            'submitted_by' => ['required'],
        ];

        $messages = [
            'employment_type.required' => 'Investigation type is required.',
            'department_type.required' => 'Investigation type is required.',
            'position_type.required' => 'Investigation type is required.',
            'date_of_employment.required' => 'Investigation type is required.',
            'submitted_by.required' => 'Investigation type is required.',
        ];

        $validated = $request->validate($rules, $messages);

        return redirect()->back();
    }

    public function storeEmployee(Request $request)
    {

        // $request->validate([
        //     'digital_signature' => 'required|image|mimes:png,jpg,jpeg|max:2048',
        // ]);

        $generateRandomPw = Str::random(8);

        $user = User::create([
            'name' => $request->full_name,
            'username' => $request->username,
            'employee_id' => RunningNumberService::getID('employee_id'),
            'title' => 'employee',
            'email' => $request->email,
            'password' => Hash::make($generateRandomPw),
            'dial_code' => $request->dial_code,
            'phone_no' => $request->phone_no,
            'gender' => $request->gender,
            'identity_no' => $request->identity_no,
            'address' => $request->address,
            'postcode' => $request->postcode,
            'city' => $request->city,
            'state' => $request->state,
            'nationality' => $request->nationality,
            'dob' => isset($request->dob) ? Carbon::parse($request->dob)->setTimezone('Asia/Kuala_Lumpur') : null,
            'race' => $request->race,
            'religion' => $request->religion,
            'place_of_birth' => $request->place_of_birth,
            'maritial_status' => $request->marital_status,
            'position' => $request->position_type['position_name'],
            'role' => 'employee',
            'employee_type' => $request->employment_type,
            'department_id' => $request->department_type['id'],
            'employee_date' => Carbon::parse($request->date_of_employment)->setTimezone('Asia/Kuala_Lumpur')->toDateString(),
            'employee_end_date' => Carbon::parse($request->intern_end_date)->setTimezone('Asia/Kuala_Lumpur')->toDateString() ?? null,
            'handle_by' => $request->submitted_by,
            'status' => 'active'
        ]);

        $banks = EmployeeBank::create([
            'user_id' => $user->id,
            'bank_name' => $request->bank_name,
            'acc_type' => $request->acc_type,
            'acc_no' => $request->acc_no,
            'income_tax_no' => $request->income_tax_no,
            'epf_no' => $request->epf_no,
            'socso_no' => $request->socso_no
        ]);

        $emergency1 = EmergencyInfo::create([
            'user_id' => $user->id,
            'full_name' => $request->emerge1_fullname,
            'relationship' => $request->relation1['name'],
            'dial_code' => $request->emerge1_dialcode,
            'phone_no' => $request->emerge1_phone_no,
        ]);
        $emergency2 = EmergencyInfo::create([
            'user_id' => $user->id,
            'full_name' => $request->emerge2_fullname,
            'relationship' => $request->relation2['name'],
            'dial_code' => $request->emerge2_dialcode,
            'phone_no' => $request->emerge2_phone_no,
        ]);

        $transport = Transport::create([
            'user_id' => $user->id,
            'own_transport' => $request->own_transport,
            'license_id' => $request->license_id,
            'work_transportation' => $request->work_transportation,
            'approximate_distance' => $request->approximate_distance,
            'approximate_hours' => $request->approximate_hours,
            'approximate_minutes' => $request->approximate_minutes,
        ]);

        $medicalInfo = MedicalInfo::create([
            'user_id' => $user->id,
            'blood_type' => $request->blood_type,
            'allergic_type' => $request->allergic_type,
            'allergic_remark' => $request->allergic_remark ?? null,
            'medical_type' => $request->medical_type,
            'medical_remark' => $request->medical_remark ?? null,
            'medication_type' => $request->medication_type,
            'medication_remark' => $request->medication_remark ?? null,
            'pregnant_type' => $request->pregnant_type ?? null,
            'pregnant_remark' => $request->pregnant_remark ?? null,
            'pregnant_delivery_date' => Carbon::parse($request->pregnant_delivery_date)->setTimezone('Asia/Kuala_Lumpur')->toDateString() ?? null,
            'pregnancy_medication_type' => $request->pregnancy_medication_type ?? null,
            'pregnancy_medication_remark' => $request->pregnancy_medication_remark ?? null,
            'gynaecological_type' => $request->gynaecological_type ?? null,
            'gynaecological_remark' => $request->gynaecological_remark ?? null,
        ]);

        $beneficiaryInfo = BeneficiaryInfo::create([
            'user_id' => $user->id,
            'full_name' => $request->beneficiary_fullname,
            'relationship' => $request->beneficiary_relation['name'],
            'indentity_no' => $request->beneficiary_identity,
            'dial_code' => $request->beneficiary_dialcode,
            'phone_no' => $request->beneficiary_phoneNo,
            'insurance_id' => $request->personal_insurance,
        ]);

        $additional = AdditionalInfo::create([
            'user_id' => $user->id,
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
        ]);

        if ($request->hasFile('digital_signature')) {
            $user->addMedia($request->digital_signature)->toMediaCollection('user_signature');
        }

        // add mail function
        // Mail::to($request->email)->queue(new OrderShipped($order));

        return redirect()->back();
    }

    public function employeeSuccess()
    {

        return Inertia::render('EmployeeSuccess');
    }

}
