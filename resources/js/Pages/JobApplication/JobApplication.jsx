import React, { useState, useEffect, useRef } from "react";
import { useForm } from "@inertiajs/react";
import { ArrowLeft, ArrowRight, Earth, JobApplicationIcon1, JobApplicationIcon2, JobApplicationIcon3, JobApplicationIcon4, JobApplicationIcon5, JobApplicationIcon6, JobApplicationIcon7, JobApplicationIcon8 } from "@/Components/Icon/Outline";
import { message, Steps, Popconfirm } from 'antd';
import Button from "@/Components/Button";
import PersonalInfo from "./Partials/PersonalInfo";
import Education from "./Partials/Education";
import WorkInfo from "./Partials/WorkInfo";
import References from "./Partials/References";
import LanguageInfo from "./Partials/LanguageInfo";
import TransportInfo from "./Partials/TransportInfo";
import AdditionalInfo from "./Partials/AdditionalInfo";
import Declaration from "./Partials/Declaration";
import { MocapLogo, Onboarding2Logo } from '@/Components/Icon/Logo';
import { motion, AnimatePresence } from 'framer-motion';

export default function JobApplication() {

    const [current, setCurrent] = useState(0);
    const sigCanvas = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [sign, setSign] = useState(null);
    const [direction, setDirection] = useState('forward');
    const [completedSteps, setCompletedSteps] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {data, setData, post, processing, errors, reset } = useForm ({
        //personal
        position: '',
        expected_salary: '',
        start_date: null,
        full_name: '',
        identity_no: '',
        nationality: 'Malaysian',
        place_of_birth: '',
        marital_status: '',
        race: '',
        religion: '',
        dial_code: '+60',
        phone_no: '',
        email: '',
        address: '',
        postcode: '',
        city: '',
        state: '',

        //education
        edu1_start: null,
        edu1_end: null,
        edu1_school: '',
        edu1_address: '',
        edu1_qualification: '',
        edu1_course: '',
        edu2_start: null,
        edu2_end: null,
        edu2_school: '',
        edu2_address: '',
        edu2_qualification: '',
        edu2_course: '',
        edu3_start: null,
        edu3_end: null,
        edu3_school: '',
        edu3_address: '',
        edu3_qualification: '',
        edu3_course: '',
        skills: '',

        //work experience
        experience: true,
        job1_title: '',
        job1_period: null,
        job1_company: '',
        job1_address: '',
        job1_supervisor: '',
        job1_dailcode: '+60',
        job1_phonecode: '',
        job1_reason: '',
        job1_startsalary: '',
        job1_endsalary: '',
        job2_title: '',
        job2_period: null,
        job2_company: '',
        job2_address: '',
        job2_supervisor: '',
        job2_dailcode: '',
        job2_phonecode: '',
        job2_reason: '',
        job2_startsalary: '',
        job2_endsalary: '',
        job3_title: '',
        job3_period: null,
        job3_company: '',
        job3_address: '',
        job3_supervisor: '',
        job3_dailcode: '',
        job3_phonecode: '',
        job3_reason: '',
        job3_startsalary: '',
        job3_endsalary: '',

        //reference
        refer1_name: '',
        relation1: '',
        refer1_dailcode: '+60',
        refer1_phoneno: '',
        refer1_email: '',
        refer2_name: '',
        relation2: '',
        refer2_dailcode: '',
        refer2_phoneno: '',
        refer2_email: '',
        refer3_name: '',
        relation3: '',
        refer3_dailcode: '',
        refer3_phoneno: '',
        refer3_email: '',

        //language
        eng_speak: '3',
        eng_write: '3',
        eng_listen: '3',
        malay_speak: '3',
        malay_write: '3',
        malay_listen: '3',
        chinese_speak: '3',
        chinese_write: '3',
        chinese_listen: '3',
        other_language: '',
        other_speak: '',
        other_write: '',
        other_listen: '',

        // transport
        transport: '',
        approximate_distance: '',
        approximate_hours: '',
        approximate_minutes: '',

        // additional info
        overtime_type: 'No',
        investigate_type: 'No',
        investigate_remark: '',
        convicted_type: 'No',
        convicted_remark: '',
        bankrupt_type: 'No',
        bankrupt_remark: '',
        suspended_type: 'No',
        suspended_remark: '',
        directorship_type: 'No',
        directorship_remark: '',
        relative_type: 'No',
        relative_remark: '',
        health_type: 'No',
        health_remark: '',
        find_job_type: '',
        find_job_remark: '',

        // declaration
        digital_signature: null,
    });

    const steps = [
        {
            content: <PersonalInfo data={data} setData={setData} errors={errors}/>,
            icon: <JobApplicationIcon1 />
        },
        {
            content: <Education data={data} setData={setData} errors={errors}/>,
            icon: <JobApplicationIcon2/>,
        },
        {
            content: <WorkInfo data={data} setData={setData} errors={errors}/>,
            icon: <JobApplicationIcon3/>,
        },
        {
            content: <References data={data} setData={setData} errors={errors}/>,
            icon: <JobApplicationIcon4/>,
        },
        {
            content: <LanguageInfo data={data} setData={setData} errors={errors}/>,
            icon: <JobApplicationIcon5/>,
        },
        {
            content: <TransportInfo data={data} setData={setData} errors={errors}/>,
            icon: <JobApplicationIcon6/>,
        },
        {
            content: <AdditionalInfo data={data} setData={setData} errors={errors}/>,
            icon: <JobApplicationIcon7/>,
        },
        {
            content: <Declaration data={data} setData={setData} errors={errors} sigCanvas={sigCanvas}/>,
            icon: <JobApplicationIcon8/>,
        },
    ];

    const validateStep = (stepToValidate, callback) => {
        const routes = [
            '/job-personal-validation',
            '/job-education-validation',
            '/job-work-validation',
            '/job-reference-validation',
            '/job-language-validation',
            '/job-transportation-validation',
            '/job-additional-validation',
        ];

        if (stepToValidate < routes.length) {
            post(routes[stepToValidate], {
                preserveScroll: true,
                onSuccess: () => {
                    callback(); // continue navigation after success
                }
            });
        } else {
            callback(); // No validation needed
        }
    };

    const next = () => {
        validateStep(current, () => {
            setDirection('forward');
            const next = current + 1;
            setCurrent(next);

            if (next === 7) {
                setCompletedSteps(true);
            }
        })
    };
    
    const prev = () =>setCurrent(current - 1);

    const onChange = (newStep) => {
        if (completedSteps) {
            // Must validate current step before moving to another
            validateStep(current, () => {
                setDirection(newStep > current ? 'forward' : 'backward');
                setCurrent(newStep)
            });
        } else if (newStep <= current + 1) {
            // Allow moving forward step-by-step normally
            setDirection(newStep > current ? 'forward' : 'backward');
            setCurrent(newStep);
        }
    };

    const confirm = e => {
        console.log(e);
        message.success('Clear');
    };

    const cancel = e => {
        console.log(e);
        message.error('Cancel');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check and upload signature if present
        if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
            const dataUrl = sigCanvas.current.toDataURL("image/png");
            const blob = dataURLtoBlob(dataUrl);
            setSign(blob);
            setData("digital_signature", blob);

            try {
                const formData = new FormData();
                formData.append('digital_signature', blob, 'signature.png');

                const response = await axios.post('/job-check-signature', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                if (response.status !== 200) {
                    // Handle signature check failure (optional)
                    return;
                }
            } catch (error) {
                console.error('error', error);
                return;
            }
        }

        // Submit the form
        post('/store-application', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                window.location.href = `/application-success`;
            }
        });
    };

    useEffect(() => {
        if (data.digital_signature !== null) {
            setData('digital_signature', sign)
        }
    }, []);
    
    function dataURLtoBlob(dataurl) {
        const arr = dataurl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    const variants = {
        enter: (direction) => ({
            x: direction === 'forward' ? 50 : -50,
            opacity: 0,
            scale: 0.98,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: 'spring', stiffness: 200, damping: 25 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
            }
        },
        exit: (direction) => ({
            x: direction === 'forward' ? -50 : 50,
            opacity: 0,
            scale: 0.98,
            transition: {
                duration: 0.25
            }
        })
    };

    return (
        <div className="flex w-full min-h-screen flex-col">
            <div className="flex sticky z-10 top-0 w-full px-5 py-2 justify-between items-center bg-white border-b border-gray-200">
                <a href="/" className="flex items-center gap-3">
                    <div><Onboarding2Logo /></div>
                    <div><MocapLogo /></div>
                </a>
                <div className='flex w-[38px] h-[38px] p-[9px] justify-center items-center flex-shrink-0'>
                    <Earth/>    
                </div>
            </div>

            <div className="flex-1">
                <div className="flex w-full px-0 py-5 flex-col items-center gap-5">
                    {/* Steps */}
                    <div className="flex w-[738px] px-0 py-5 items-center gap-2">
                        <Steps 
                            current={current} 
                            onChange={(step) => {
                                if (completedSteps) {
                                    onChange(step);
                                }}}
                            items={steps}
                        />  
                    </div>
                    {/* content */}
                    <AnimatePresence custom={direction} initial={false}  mode="wait">
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="w-full h-full flex flex-col gap-5"
                        >
                            {steps[current].content}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* footer */}
            <div className="flex sticky bottom-0 w-full p-5 justify-between items-center bg-white border-t border-t-gray-200">
                <Popconfirm
                    icon={false}
                    description="Are you sure you want to clear?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Clear"
                    okType="danger"
                    cancelText="Cancel"
                    placement="topRight"
                    >
                    <span>
                        <Button 
                            size="lg"
                            variant="text"
                            className="flex px-6 py-4 justify-center items-center gap-2"
                        >
                            Clear Form
                        </Button>   
                    </span>
                </Popconfirm>
                
                <div className="flex items-center gap-5">
                {current > 0 && (
                    <Button 
                        size='lg' 
                        variant="secondary"
                        className="flex px-6 py-4 justify-center items-center gap-2"
                        onClick={() => prev()}
                    >
                        <ArrowLeft/>
                        <span>Back</span>
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button 
                        size='lg' 
                        variant="primary"
                        className="flex px-6 py-4 justify-center items-center gap-2"
                        onClick={() => next()}
                    >
                        <span>Next</span>
                        <ArrowRight/>
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button 
                        size='lg' 
                        variant="primary"
                        className="flex px-6 py-4 justify-center items-center gap-2"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                )}
                </div>
            </div>
        </div>
    )
}