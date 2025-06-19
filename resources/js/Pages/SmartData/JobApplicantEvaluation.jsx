import Button from "@/Components/Button";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { UnsavedIllus } from "@/Components/Icon/Illustration";
import { ExportIcon, PrintIcon, ReloadIcon, SmartData } from "@/Components/Icon/Outline";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { formatDate } from "@/Composables";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { Breadcrumb, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function JobApplicantEvaluation({ jobApplicant, checkEvaluated }) {

    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setIsSubmitted] = useState(false);
    const sigCanvas = useRef(null);
    const isSubmittingRef = useRef(false);
    const [nextUrl, setNextUrl] = useState(null);
    const [confirmLeaveOpen, setConfirmLeaveOpen] = useState(false);
    const [initializingForm, setInitializingForm] = useState(false);

    const { data, setData, post, processing, errors, isDirty, reset } = useForm({
        id: jobApplicant.id || '',
        edu_bg: '',
        edu_remark: '',
        work_exp: '',
        work_remark: '',
        technical_exp: '',
        technical_remark: '',
        verbal_comm: '',
        verbal_remark: '',
        candidate_enthusiasm: '',
        candidate_remark: '',
        knowledge_organ: '',
        knowledge_remark: '',
        team_building_skill: '',
        team_building_remark: '',
        initiative: '',
        initiative_remark: '',
        time_management: '',
        time_management_ramark: '',
        customer_service: '',
        customer_service_remark: '',
        overal_impression: '',
        overal_impression_remark: '',
        remark: '',
        result_type: '',
        interview_name: '',
        evaluation_signature: null,
    });

    useEffect(() => {
        if (checkEvaluated) {
            setInitializingForm(true);
            setData('edu_bg', checkEvaluated.edu_bg);
            setData('edu_remark', checkEvaluated.edu_remark || '');
            setData('work_exp', checkEvaluated.work_exp);
            setData('work_remark', checkEvaluated.work_remark || '');
            setData('technical_exp', checkEvaluated.technical_exp);
            setData('technical_remark', checkEvaluated.technical_remark || '');
            setData('verbal_comm', checkEvaluated.verbal_comm);
            setData('verbal_remark', checkEvaluated.verbal_remark || '');
            setData('candidate_enthusiasm', checkEvaluated.candidate_enthusiasm);
            setData('candidate_remark', checkEvaluated.candidate_remark || '');
            setData('knowledge_organ', checkEvaluated.knowledge_organ);
            setData('knowledge_remark', checkEvaluated.knowledge_remark || '');
            setData('team_building_skill', checkEvaluated.team_building_skill);
            setData('team_building_remark', checkEvaluated.team_building_remark || '');
            setData('initiative', checkEvaluated.initiative);
            setData('initiative_remark', checkEvaluated.initiative_remark || '');
            setData('time_management', checkEvaluated.time_management);
            setData('time_management_ramark', checkEvaluated.time_management_ramark || '');
            setData('customer_service', checkEvaluated.customer_service);
            setData('customer_service_remark', checkEvaluated.customer_service_remark || '');
            setData('overal_impression', checkEvaluated.overal_impression);
            setData('overal_impression_remark', checkEvaluated.overal_impression_remark || '');
            setData('remark', checkEvaluated.remark || '');
            setData('result_type', checkEvaluated.result_type);
            setData('interview_name', checkEvaluated.interview_name);
            setData('evaluation_signature', checkEvaluated.evaluation_signature || null);
        }
    }, [checkEvaluated]);

    const handleSignatureChange = async () => {
        if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
            const dataUrl = sigCanvas.current.toDataURL('image/png');
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], 'signature.png', { type: 'image/png' });
    
            setData('evaluation_signature', file);
        } else {
            setData('evaluation_signature', null);
        }
    };
    

    useEffect(() => {
        const handler = (event) => {
            if (!initializingForm && isDirty && !isSubmittingRef.current) {
                event.preventDefault();
                setNextUrl(event.detail.visit.url);
                setConfirmLeaveOpen(true);
            }
        };
    
        const unlisten = router.on('before', handler);
        return () => unlisten();
    }, [isDirty]);

    const confirmLeave = () => {
        setConfirmLeaveOpen(false);
        reset();
        window.location.href = `${nextUrl.pathname}`
    };

    const cancelLeave = () => {
        setConfirmLeaveOpen(false);
        setNextUrl(null); // Clear nextUrl
        isSubmittingRef.current = false;
    };

    function dataURLtoBlob(dataurl) {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        isSubmittingRef.current = true;

        post('/evaluation-job-applicant', {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setIsLoading(false);
                setIsSubmitted(true);

                // 🔁 Refresh only user_details prop from the backend
                router.reload({ only: ['user_details', 'checkEvaluated'] });

                window.location.href = `/smart-data`
            },
            onError: () => {
                isSubmittingRef.current = false;
                setIsLoading(false);
            }
        });
    }


    return (
        <AuthenticatedLayout
            header="Smart Data"
        >
            <Head title="Smart Data" />

            <div className="flex flex-col">
                <div className="w-full sticky top-[55px] bg-white z-30 py-2 px-5 flex justify-between items-center border-b border-gray-200">
                    <Breadcrumb 
                        items={[
                            {
                                href: '/smart-data',
                                title: (
                                    <div className="flex items-center gap-2">
                                        <SmartData />
                                        <span>Smart Data</span>
                                    </div>
                                ),
                            },
                            {
                                title: (
                                    <span className="text-gray-950 text-sm font-semibold">{jobApplicant.full_name} - Evaluation Form</span>
                                )
                            }
                        ]}
                    />
                    <div className="flex items-center gap-3">
                        <Button variant="outlined" size="sm" className="flex items-center gap-2" ><ExportIcon />Export</Button>
                        <Button variant="outlined" size="sm" className="flex items-center gap-2" ><PrintIcon />Print</Button>
                        <Button size="sm" onClick={submit} disabled={isLoading || checkEvaluated || submitted}>Save Changes</Button>
                    </div>
                </div>
                <div className="p-5 flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-5 max-w-[728px] w-full">
                        <div className="flex flex-col border border-gray-200 shadow-smShadow ">
                            <div className="py-4 px-5 text-gray-950 text-base font-semibold border-b border-gray-200">
                                Applicant Information
                            </div>
                            <div className="p-5 grid grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Applicant Name' />
                                    <TextInput 
                                        id="full_name"
                                        type="text"
                                        name="full_name"
                                        value={jobApplicant.full_name}
                                        className="w-full"
                                        placeholder="as per NRIC/Passport"
                                        autoComplete="full_name"
                                        isFocused={false}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Interview Date' />
                                    <TextInput 
                                        id="full_name"
                                        type="text"
                                        name="full_name"
                                        value={formatDate(jobApplicant.created_at)}
                                        className="w-full"
                                        placeholder="as per NRIC/Passport"
                                        autoComplete="full_name"
                                        isFocused={false}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Position Apply For' />
                                    <TextInput 
                                        id="full_name"
                                        type="text"
                                        name="full_name"
                                        value={jobApplicant.position}
                                        className="w-full"
                                        placeholder="as per NRIC/Passport"
                                        autoComplete="full_name"
                                        isFocused={false}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Expected Salary' />
                                    <TextInput 
                                        id="full_name"
                                        type="text"
                                        name="full_name"
                                        value={jobApplicant.expected_salary}
                                        className="w-full"
                                        placeholder="as per NRIC/Passport"
                                        autoComplete="full_name"
                                        isFocused={false}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col border border-gray-200 shadow-smShadow ">
                            <div className="py-4 px-5 flex flex-col text-gray-950 text-base border-b border-gray-200">
                                <div className="font-semibold">Evaluation</div>
                                <div className="text-gray-500 text-sm">Please check the appropriate rating for each of the categories below.</div>
                            </div>
                            <div className="p-5 flex flex-col gap-3 border-b border-gray-200">
                                <div className="flex flex-col gap-1">
                                    <div className="text-gray-950 text-xs font-semibold">1 - Unsatisfactory</div>
                                    <div className="text-gray-500 text-xs">Applicant has been unsuccessful with similar functions or states an unwillingness to perform function.</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-gray-950 text-xs font-semibold">2 - Satisfactory</div>
                                    <div className="text-gray-500 text-xs">Applicant does not suggest ability to perform the function. However, he/she expresses willingness to do so.</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-gray-950 text-xs font-semibold">3 - Average</div>
                                    <div className="text-gray-500 text-xs">Applicant has successfully performed the function or related activities in the past, and expresses a willingness to do so.</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-gray-950 text-xs font-semibold">4 - Above Average</div>
                                    <div className="text-gray-500 text-xs">Applicant has successfully performed the function in the past and demonstrated record of performance that meets the level required for job.</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-gray-950 text-xs font-semibold">5 - Exceptional</div>
                                    <div className="text-gray-500 text-xs">Applicant has performed similar functions very well and met high performance standards for similar functions. Exceeds level required for job.</div>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col gap-8 border-b border-gray-200">
                                <div className="flex flex-col gap-2">
                                    <div className="text-gray-950 text-sm font-bold">Educational Background</div>
                                    <div className="text-gray-700 text-sm">Does the candidate have the appropriate educational qualifications or training for this position? </div>
                                    <div>
                                        <Radio.Group 
                                            value={data.edu_bg}
                                            onChange={(e) => setData('edu_bg', e.target.value)}
                                            options={['1', '2', '3', '4', '5']}
                                            className="py-3 flex gap-x-8"
                                        />
                                    </div>
                                    <div>
                                        <TextInput 
                                            id="edu_remark"
                                            type="text"
                                            name="edu_remark"
                                            value={data.edu_remark}
                                            className="w-full"
                                            placeholder="Provide explanations here..."
                                            autoComplete="edu_remark"
                                            isFocused={false}
                                            onChange={(e) => setData('edu_remark', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.edu_bg}  />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-gray-950 text-sm font-bold">Prior Work Experience</div>
                                    <div className="text-gray-700 text-sm">Has the candidate acquired similar skills or qualifications through past work experiences?</div>
                                    <div>
                                        <Radio.Group 
                                            value={data.work_exp}
                                            onChange={(e) => setData('work_exp', e.target.value)}
                                            options={['1', '2', '3', '4', '5']}
                                            className="py-3 flex gap-x-8"
                                        />
                                    </div>
                                    <div>
                                        <TextInput 
                                            id="work_remark"
                                            type="text"
                                            name="work_remark"
                                            value={data.work_remark}
                                            className="w-full"
                                            placeholder="Provide explanations here..."
                                            autoComplete="work_remark"
                                            isFocused={false}
                                            onChange={(e) => setData('work_remark', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.work_exp}  />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-gray-950 text-sm font-bold">Technical Qualification/Experience</div>
                                    <div className="text-gray-700 text-sm">Does the candidate have the technical skills necessary for this position?</div>
                                    <div>
                                        <Radio.Group 
                                            value={data.technical_exp}
                                            onChange={(e) => setData('technical_exp', e.target.value)}
                                            options={['1', '2', '3', '4', '5']}
                                            className="py-3 flex gap-x-8"
                                        />
                                    </div>
                                    <div>
                                        <TextInput 
                                            id="technical_remark"
                                            type="text"
                                            name="technical_remark"
                                            value={data.technical_remark}
                                            className="w-full"
                                            placeholder="Provide explanations here..."
                                            autoComplete="technical_remark"
                                            isFocused={false}
                                            onChange={(e) => setData('technical_remark', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.technical_exp}  />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-gray-950 text-sm font-bold">Verbal Communication</div>
                                    <div className="text-gray-700 text-sm">How were the candidate’s communication skills during the interview?</div>
                                    <div>
                                        <Radio.Group 
                                            value={data.verbal_comm}
                                            onChange={(e) => setData('verbal_comm', e.target.value)}
                                            options={['1', '2', '3', '4', '5']}
                                            className="py-3 flex gap-x-8"
                                        />
                                    </div>
                                    <div>
                                        <TextInput 
                                            id="verbal_remark"
                                            type="text"
                                            name="verbal_remark"
                                            value={data.verbal_remark}
                                            className="w-full"
                                            placeholder="Provide explanations here..."
                                            autoComplete="verbal_remark"
                                            isFocused={false}
                                            onChange={(e) => setData('verbal_remark', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.verbal_comm}  />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-gray-950 text-sm font-bold">Candidate Enthusiasm </div>
                                    <div className="text-gray-700 text-sm">How much interest did the candidate show in the position and the organisation?</div>
                                    <div>
                                        <Radio.Group 
                                            value={data.candidate_enthusiasm}
                                            onChange={(e) => setData('candidate_enthusiasm', e.target.value)}
                                            options={['1', '2', '3', '4', '5']}
                                            className="py-3 flex gap-x-8"
                                        />
                                    </div>
                                    <div>
                                        <TextInput 
                                            id="candidate_remark"
                                            type="text"
                                            name="candidate_remark"
                                            value={data.candidate_remark}
                                            className="w-full"
                                            placeholder="Provide explanations here..."
                                            autoComplete="candidate_remark"
                                            isFocused={false}
                                            onChange={(e) => setData('candidate_remark', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.candidate_enthusiasm}  />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-gray-950 text-sm font-bold">Knowledge of Organisation </div>
                                    <div className="text-gray-700 text-sm">Did the candidate research the company/department prior to the interview?</div>
                                    <div>
                                        <Radio.Group 
                                            value={data.knowledge_organ}
                                            onChange={(e) => setData('knowledge_organ', e.target.value)}
                                            options={['1', '2', '3', '4', '5']}
                                            className="py-3 flex gap-x-8"
                                        />
                                    </div>
                                    <div>
                                        <TextInput 
                                            id="knowledge_remark"
                                            type="text"
                                            name="knowledge_remark"
                                            value={data.knowledge_remark}
                                            className="w-full"
                                            placeholder="Provide explanations here..."
                                            autoComplete="knowledge_remark"
                                            isFocused={false}
                                            onChange={(e) => setData('knowledge_remark', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.knowledge_organ}  />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-gray-950 text-sm font-bold">Teambuilding/Interpersonal Skills</div>
                                    <div className="text-gray-700 text-sm">Did the candidate demonstrate, through their answer, good teambuilding/interpersonal skills?</div>
                                    <div>
                                        <Radio.Group 
                                            value={data.team_building_skill}
                                            onChange={(e) => setData('team_building_skill', e.target.value)}
                                            options={['1', '2', '3', '4', '5']}
                                            className="py-3 flex gap-x-8"
                                        />
                                    </div>
                                    <div>
                                        <TextInput 
                                            id="team_building_remark"
                                            type="text"
                                            name="team_building_remark"
                                            value={data.team_building_remark}
                                            className="w-full"
                                            placeholder="Provide explanations here..."
                                            autoComplete="team_building_remark"
                                            isFocused={false}
                                            onChange={(e) => setData('team_building_remark', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.team_building_skill}  />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-gray-950 text-sm font-bold">Initiative</div>
                                    <div className="text-gray-700 text-sm">Did the candidate demonstrate through their answers a high degree of initiative?</div>
                                    <div>
                                        <Radio.Group 
                                            value={data.initiative}
                                            onChange={(e) => setData('initiative', e.target.value)}
                                            options={['1', '2', '3', '4', '5']}
                                            className="py-3 flex gap-x-8"
                                        />
                                    </div>
                                    <div>
                                        <TextInput 
                                            id="initiative_remark"
                                            type="text"
                                            name="initiative_remark"
                                            value={data.initiative_remark}
                                            className="w-full"
                                            placeholder="Provide explanations here..."
                                            autoComplete="initiative_remark"
                                            isFocused={false}
                                            onChange={(e) => setData('initiative_remark', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.initiative}  />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-gray-950 text-sm font-bold">Time Management</div>
                                    <div className="text-gray-700 text-sm">Did the candidate demonstrate through their answers good time management skills?</div>
                                    <div>
                                        <Radio.Group 
                                            value={data.time_management}
                                            onChange={(e) => setData('time_management', e.target.value)}
                                            options={['1', '2', '3', '4', '5']}
                                            className="py-3 flex gap-x-8"
                                        />
                                    </div>
                                    <div>
                                        <TextInput 
                                            id="time_management_ramark"
                                            type="text"
                                            name="time_management_ramark"
                                            value={data.time_management_ramark}
                                            className="w-full"
                                            placeholder="Provide explanations here..."
                                            autoComplete="time_management_ramark"
                                            isFocused={false}
                                            onChange={(e) => setData('time_management_ramark', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.time_management}  />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-gray-950 text-sm font-bold">Customer Service</div>
                                    <div className="text-gray-700 text-sm">Did the candidate demonstrate through their answers a high level of customer service skills/abilities?</div>
                                    <div>
                                        <Radio.Group 
                                            value={data.customer_service}
                                            onChange={(e) => setData('customer_service', e.target.value)}
                                            options={['1', '2', '3', '4', '5']}
                                            className="py-3 flex gap-x-8"
                                        />
                                    </div>
                                    <div>
                                        <TextInput 
                                            id="customer_service_remark"
                                            type="text"
                                            name="customer_service_remark"
                                            value={data.customer_service_remark}
                                            className="w-full"
                                            placeholder="Provide explanations here..."
                                            autoComplete="customer_service_remark"
                                            isFocused={false}
                                            onChange={(e) => setData('customer_service_remark', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.customer_service}  />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-gray-950 text-sm font-bold">Overall Impression and Recommendation</div>
                                    <div className="text-gray-700 text-sm">Final comments and recommendation for proceeding with the candidate.</div>
                                    <div>
                                        <Radio.Group 
                                            value={data.overal_impression}
                                            onChange={(e) => setData('overal_impression', e.target.value)}
                                            options={['1', '2', '3', '4', '5']}
                                            className="py-3 flex gap-x-8"
                                        />
                                    </div>
                                    <div>
                                        <TextInput 
                                            id="overal_impression_remark"
                                            type="text"
                                            name="overal_impression_remark"
                                            value={data.overal_impression_remark}
                                            className="w-full"
                                            placeholder="Provide explanations here..."
                                            autoComplete="overal_impression_remark"
                                            isFocused={false}
                                            onChange={(e) => setData('overal_impression_remark', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.overal_impression}  />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col border border-gray-200 shadow-smShadow ">
                            <div className="py-4 px-5 flex flex-col text-gray-950 text-base border-b border-gray-200">
                                <div className="font-semibold">Remarks</div>
                            </div>
                            <div className="p-5">
                                <TextArea 
                                    value={data.remark}
                                    onChange={(e) => setData('remark', e.target.value)}       
                                    rows={4} 
                                />
                            </div>
                        </div>
                        <div className="flex flex-col border border-gray-200 shadow-smShadow ">
                            <div className="py-4 px-5 flex flex-col text-gray-950 text-base border-b border-gray-200">
                                <div className="font-semibold">Results</div>
                            </div>
                            <div className="p-5 flex flex-col gap-5">
                                <div>
                                    <Radio.Group 
                                        value={data.result_type}
                                        onChange={(e) => setData('result_type', e.target.value)}
                                        options={[
                                            { label: 'Hire Applicant', value: 'hired' },
                                            { label: 'Reject Applicant', value: 'rejected' },
                                            { label: 'Offer rejected', value: 'rejected_offer' },
                                        ]}
                                        className="py-3 flex gap-x-8"
                                    />
                                    <InputError message={errors.result_type}  />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Interviewer Name' />
                                    <TextInput 
                                        id="interview_name"
                                        type="text"
                                        name="interview_name"
                                        value={data.interview_name}
                                        className="w-full"
                                        placeholder="Enter name"
                                        autoComplete="interview_name"
                                        isFocused={false}
                                        onChange={(e) => setData('interview_name', e.target.value)}
                                    />
                                    <InputError message={errors.interview_name}  />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Signature' />
                                    {
                                        checkEvaluated ? (
                                            <div className="w-full h-60 bg-gray-50 border border-gray-300 rounded">
                                                <img src={checkEvaluated.evaluation_signature} alt="" />
                                            </div>
                                        ) : (
                                            <div className="relative">
                                                <SignatureCanvas
                                                    ref={sigCanvas}
                                                    penColor="black"
                                                    canvasProps={{ className: 'border border-gray-300 rounded w-full h-60 bg-gray-50' }}
                                                    onEnd={handleSignatureChange}
                                                />
                                                <div className="absolute top-2 right-2 z-10">
                                                    <Button
                                                        type="button"
                                                        variant="outlined"
                                                        size="sm"
                                                        className="flex items-center justify-center"
                                                        onClick={() => sigCanvas.current.clear()}
                                                        iconOnly
                                                    >
                                                        <ReloadIcon />
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="text-gray-950 text-xs">
                                        Date: {new Date().toLocaleDateString('en-GB')}
                                    </div>
                                    <InputError message={errors.evaluation_signature}  />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmDialog show={confirmLeaveOpen}>
                <div className='flex flex-col gap-8 p-6'>
                    <div className="flex flex-col items-center gap-3">
                        <div>
                            <UnsavedIllus />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-gray-950 text-lg font-bold">Unsaved Changes</div>
                            <div className="text-gray-700 text-sm text-center">
                                Entered information will be lost if you leave this page. Would you like to stay and continue?
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 justify-center'>
                        <div><Button size='sm' variant='outlined' onClick={confirmLeave}>Discard</Button></div>
                        <div><Button size='sm' onClick={submit}>Save Changes</Button></div>
                    </div>
                </div>
            </ConfirmDialog>
            
        </AuthenticatedLayout>
    )
}