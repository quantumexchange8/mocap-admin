<?php

namespace App\Http\Controllers;

use App\Models\BeneficiaryInfo;
use App\Models\EmergencyInfo;
use App\Models\EmployeeBank;
use App\Models\JobEducation;
use App\Models\JobExperience;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class EmployeeProfileController extends Controller
{
    public function updatePersonalInfo(Request $request)
    {

        $user = User::find($request->id);

        $validated = $request->validate([
            'nationality' => 'required',
            'identity_no' => [
                'required',
                Rule::unique('users', 'identity_no')->ignore($user->id),
            ],
            'gender' => 'required',
            'race' => 'required',
            'religion' => 'required',
            'place_of_birth' => 'required',
            'marital_status' => 'required',
            'postcode' => 'required',
            'city' => 'required',
            'state' => 'required',
        ]);

        $user->update([
            'nationality' => $request->nationality,
            'identity_no' => $request->identity_no,
            'gender' => $request->gender,
            'race' => $request->race,
            'religion' => $request->religion,
            'place_of_birth' => $request->place_of_birth,
            'maritial_status' => $request->marital_status,
            'postcode' => $request->postcode,
            'city' => $request->city,
            'state' => $request->state,
        ]);

        return redirect()->back();
    }

    public function updateBankInfo(Request $request){
        
        $employeeBank = EmployeeBank::find($request->id);

        $validated = $request->validate([
            'bank_name' => 'required',
            'acc_type' => 'required',
            'acc_no' => 'required',
        ]);

        $employeeBank->update([
            'bank_name' => $request->bank_name,
            'acc_type' => $request->acc_type,
            'acc_no' => $request->acc_no,
            'income_tax_no' => $request->income_tax_no,
            'epf_no' => $request->epf_no,
            'socso_no' => $request->socso_no,
        ]);

        return redirect()->back();
    }
    
    public function updateBeneficiaryInfo(Request $request){

        $beneficiaryInfo = BeneficiaryInfo::find($request->id);

        $validated = $request->validate([
            'full_name' => 'required',
            'relationship' => 'required',
            'identity_no' => 'required',
            'dial_code' => 'required',
            'phone_no' => 'required',
            'insurance_id' => 'required',
        ]);

        $beneficiaryInfo->update([
            'full_name' => $request->full_name,
            'relationship' => $request->relationship,
            'indentity_no' => $request->identity_no,
            'dial_code' => $request->dial_code,
            'phone_no' => $request->phone_no,
            'insurance_id' => $request->insurance_id,
        ]);

        return redirect()->back();
    }

    public function updateUrgentInfo(Request $request){

        $validated = $request->validate([
            'emergency_infos' => 'required',
            'emergency_infos.*.id' => 'required',
            'emergency_infos.*.full_name' => 'required',
            'emergency_infos.*.relationship' => 'required',
            'emergency_infos.*.dial_code' => 'required',
            'emergency_infos.*.phone_no' => 'required',
        ],[
            'emergency_infos.*.full_name.required' => 'Full Name field is required.',
            'emergency_infos.*.relationship.required' => 'Relationship field is required.',
            'emergency_infos.*.dial_code.required' => 'Dial No field is required.',
            'emergency_infos.*.phone_no.required' => 'Phone No. field is required.',
        ]);
        
        foreach ($request->emergency_infos as $info) {
            $emergencyInfo = EmergencyInfo::findOrFail($info['id']);
            $emergencyInfo->update([
                'full_name' => $info['full_name'],
                'relationship' =>$info['relationship'],
                'dial_code' => $info['dial_code'],
                'phone_no' => $info['phone_no'],
            ]);
        }

        return redirect()->back();
    }

    public function updateEducation(Request $request){

        $validated = $request->validate([
            'education' => 'required',
            'education.*.id' => 'required',
            'education.*.from_date' => 'required',
            'education.*.to_date' => 'required',
            'education.*.school_name' => 'required',
            'education.*.course_name' => 'required',
        ], [
            'education.*.from_date.required' => 'Date field is required.',
            'education.*.to_date' => 'Date field is required.',
            'education.*.school_name' => 'School Name field is required.',
            'education.*.course_name' => 'Course Name field is required',
        ]); 

        foreach ($request->education as $edu){
            $education = JobEducation::find($edu['id']);
            $education->update([
                'from_date'=> Carbon::parse($edu['from_date'])->format('Y-m-d'),
                'to_date'=> Carbon::parse($edu['to_date'])->format('Y-m-d'),
                'school_name'=> $edu['school_name'],
                'course_name'=> $edu['course_name'],
            ]);
        }

        return redirect()->back();
    }

    public function updateWorkInfo(Request $request){
        $validated = $request->validate([
            'work_info' => 'required',
            'work_info.*.id' => 'required',
            'work_info.*.title' => 'required',
            'work_info.*.period_from' => 'required',
            'work_info.*.period_to' => 'required',
            'work_info.*.company_name' => 'required',
        ], [
            'work_info.*.title' => 'Job Title field is required',
            'work_info.*.period_from' => 'Date field is required',
            'work_info.*.period_to' => 'Date field is required',
            'work_info.*.company_name' => 'Company Name field is required',
        ]); 

        foreach ($request->work_info as $work){
            $work_info = JobExperience::find($work['id']);
            $work_info->update([
                'title'=> $work['title'],
                'period_from'=> Carbon::parse($work['period_from'])->format('Y-m-d'),
                'period_to'=> Carbon::parse($work['period_to'])->format('Y-m-d'),
                'company_name'=> $work['company_name'],
            ]);
        }

        return redirect()->back();
    }
}
