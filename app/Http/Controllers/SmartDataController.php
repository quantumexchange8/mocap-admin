<?php

namespace App\Http\Controllers;

use App\Mail\EmployeeAccount;
use App\Models\EmploymentHistory;
use App\Models\EvaluationForm;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SmartDataController extends Controller
{
    public function smartData()
    {
        

        return Inertia::render('SmartData/SmartData');
    }

    public function getJobApplicants(Request $request)
    {

        $jobApplicants = JobApplication::query();

        if ($request->has('status') && is_array($request->status)) {
            $jobApplicants->whereIn('status', $request->status);
        }

        if ($request->has('submission_date')) {
            $jobApplicants->whereDate('created_at', '=', $request->submission_date);
        }

        if ($request->has('position')) {
            $jobApplicants->where('position', $request->position);
        }

        $jobApplicants = $jobApplicants->latest()->get();

        
        return response()->json($jobApplicants);
    }

    public function jobApplicantDetails($id) 
    {

        $jobApplicant = JobApplication::with([
            'work_experience',
            'education',
            'job_reference',
            'job_language',
            'job_transport',
            'job_additional',
        ])->find($id);

        $jobApplicant->digital_signature = $jobApplicant->getFirstMediaUrl('job_signature');

        return Inertia::render('SmartData/JobApplicantDetails', [
            'jobApplicant' => $jobApplicant,
        ]);
    }

    public function jobApplicantEvaluation($id)
    {

        $jobApplicant = JobApplication::find($id);

        $checkEvaluated = EvaluationForm::where('job_id', $id)->first();

        if ($checkEvaluated) {
            $checkEvaluated->evaluation_signature = $checkEvaluated->getFirstMediaUrl('evaluation_signature');
        }

        return Inertia::render('SmartData/JobApplicantEvaluation', [
            'jobApplicant' => $jobApplicant,
            'checkEvaluated' => $checkEvaluated,
        ]);
    }

    public function evaluationJobApplicant(Request $request)
    {

        $user = JobApplication::find($request->id);

        $validated = $request->validate([
            'edu_bg' => 'required',
            'work_exp' => 'required',
            'technical_exp' => 'required',
            'verbal_comm' => 'required',
            'candidate_enthusiasm' => 'required',
            'knowledge_organ' => 'required',
            'team_building_skill' => 'required',
            'initiative' => 'required',
            'time_management' => 'required',
            'customer_service' => 'required',
            'overal_impression' => 'required',
            'result_type' => 'required',
            'interview_name' => 'required',
            'evaluation_signature' => 'required',
        ], [
            'edu_bg.required' => 'Please select Education Background rating.',
            'work_exp.required' => 'Please select prior Work Experience rating.',
            'technical_exp.required' => 'Please select Technical Qualification/Experience rating.',
            'verbal_comm.required' => 'Please select Verbal Communication rating.',
            'candidate_enthusiasm.required' => 'Please select Candidate Enthusiasm  rating.',
            'knowledge_organ.required' => 'Please select Knowledge of Organisation rating.',
            'team_building_skill.required' => 'Please select Teambuilding/Interpersonal Skills rating.',
            'initiative.required' => 'Please select Initiative rating.',
            'time_management.required' => 'Please select Time Management rating.',
            'customer_service.required' => 'Please select Customer Service rating.',
            'overal_impression.required' => 'Please select Overall Impression and Recommendation rating.',
            'result_type.required' => 'Please select Hire/Reject applicant.',
            'interview_name.required' => 'Please fill in interviewer name.',
            'evaluation_signature.required' => 'Signature is required.',
        ]);

        $evaluation = EvaluationForm::create([
            'job_id' => $user->id,
            'edu_bg' => $request->edu_bg,
            'edu_remark' => $request->edu_remark ?? null,
            'work_exp' => $request->work_exp,
            'work_remark' => $request->work_remark ?? null,
            'technical_exp' => $request->technical_exp,
            'technical_remark' => $request->technical_remark ?? null,
            'verbal_comm' => $request->verbal_comm,
            'verbal_remark' => $request->verbal_remark ?? null,
            'candidate_enthusiasm' => $request->candidate_enthusiasm,
            'candidate_remark' => $request->candidate_remark ?? null,
            'knowledge_organ' => $request->knowledge_organ,
            'knowledge_remark' => $request->knowledge_remark ?? null,
            'team_building_skill' => $request->team_building_skill,
            'team_building_remark' => $request->team_building_remark ?? null,
            'initiative' => $request->initiative,
            'initiative_remark' => $request->initiative_remark ?? null,
            'time_management' => $request->time_management,
            'time_management_ramark' => $request->time_management_ramark ?? null,
            'customer_service' => $request->customer_service,
            'customer_service_remark' => $request->customer_service_remark ?? null,
            'overal_impression' => $request->overal_impression,
            'overal_impression_remark' => $request->overal_impression_remark ?? null,
            'remark' => $request->remark ?? null,
            'result_type' => $request->result_type,
            'interview_name' => $request->interview_name,
        ]);

        $user->update([
            'status'=> $request->result_type,
        ]);
        
        if ($request->hasFile('evaluation_signature')) {
           $evaluation->addMedia($request->evaluation_signature)->toMediaCollection('evaluation_signature');
        }

        return redirect()->back();
    }

    public function getEmployeeInfo (Request $request)
    {
        $employees = User::where('role', 'employee')->with(['department'])->get();

        return response()->json($employees);

    }

    public function employeeInfo($id) 
    {
        $employee = User::with([
            'employeebank',
            'emergencyinfo',
            'transportinfo',
            'medicalinfo',
            'beneficiaryinfo',
            'department',
            'deletedemployee.handleByUser'
        ])->find($id);

        $employee->user_signature = $employee->getFirstMediaUrl('user_signature');

        // Format deletedemployee created_at if exists
        // if ($employee->deletedemployee) {
        //     $employee->deletedemployee->formatted_created_at = optional($employee->deletedemployee->created_at)
        //         ? $employee->deletedemployee->created_at->format('d/m/Y  H:i')
        //         : null;
        // }

        return Inertia::render('SmartData/EmployeeDetails', [
            'employee' => $employee,
        ]);
    }

    public function updateApplicantStatus(Request $request)
    {

        // dd($request->all());

        $validated = $request->validate([
            'remark' => 'required',
            'status' => 'required',
        ]);

        $jobApplicant = JobApplication::find($request->id);
        $jobEvaluation = EvaluationForm::where('job_id', $request->id)->first();

        $jobApplicant->update([
            'status' => $request->status
        ]);

        $jobEvaluation->update([
            'status' => $request->status,
            'remark' => $request->remark,
        ]);

        return redirect()->back();
    }

    public function getEmploymentHistory(Request $request)
    {

        $histories = EmploymentHistory::where('user_id', $request->id)->get();

        return response()->json($histories);
    }

}
