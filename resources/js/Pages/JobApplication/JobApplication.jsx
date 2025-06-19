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
import { Popover } from "antd";

export default function JobApplication() {

    const [current, setCurrent] = useState(0);
    const sigCanvas = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [sign, setSign] = useState(null);
    const [direction, setDirection] = useState('forward');
    const [completedSteps, setCompletedSteps] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const {data, setData, post, processing, errors, reset } = useForm ({
        //personal
        position: '',
        expected_salary: '',
        start_date: null,
        notice_period: '',
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
        experience: 'yes',
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
        job2_dailcode: '+60',
        job2_phonecode: '',
        job2_reason: '',
        job2_startsalary: '',
        job2_endsalary: '',
        job3_title: '',
        job3_period: null,
        job3_company: '',
        job3_address: '',
        job3_supervisor: '',
        job3_dailcode: '+60',
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
        refer2_dailcode: '+60',
        refer2_phoneno: '',
        refer2_email: '',
        refer3_name: '',
        relation3: '',
        refer3_dailcode: '+60',
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
        approximate_hours: '0',
        approximate_minutes: '1',

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

    const handleSignatureChange = async () => {
        if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
            const dataUrl = sigCanvas.current.toDataURL('image/png');
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], 'signature.png', { type: 'image/png' });
    
            setData('digital_signature', file);
        } else {
            setData('digital_signature', null);
        }
    }

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
            content: <Declaration data={data} setData={setData} errors={errors} sigCanvas={sigCanvas} handleSignatureChange={handleSignatureChange} />,
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

    const handleOpenClear = (newOpen) => {
        setOpen(newOpen);
    }

    const handleCloseClear = () => {
        setOpen(false);
    };

    const handleClear = () => {
        if (current === 0) {
        //personal
            setData('position', '');
            setData('expected_salary', '');
            setData('start_date', null);
            setData('full_name', '');
            setData('identity_no', '');
            setData('nationality', 'Malaysian');
            setData('place_of_birth', '');
            setData('marital_status', '');
            setData('race', '');
            setData('religion', '');
            setData('dial_code', '+60');
            setData('phone_no', '');
            setData('email', '');
            setData('address', '');
            setData('postcode', '');
            setData('city', '');
            setData('state', '');
        }
        if (current === 1) {
            // Education
            setData('edu1_start', null);
            setData('edu1_end', null);
            setData('edu1_school', '');
            setData('edu1_address', '');
            setData('edu1_qualification', '');
            setData('edu1_course', '');
            setData('edu2_start', null);
            setData('edu2_end', null);
            setData('edu2_school', '');
            setData('edu2_address', '');
            setData('edu2_qualification', '');
            setData('edu2_course', '');
            setData('edu3_start', null);
            setData('edu3_end', null);
            setData('edu3_school', '');
            setData('edu3_address', '');
            setData('edu3_qualification', '');
            setData('edu3_course', '');
            setData('skills', '');
        }
        if (current === 2) {
            // Work experience
            setData('experience', true);
            setData('job1_title', '');
            setData('job1_period', null);
            setData('job1_company', '');
            setData('job1_address', '');
            setData('job1_supervisor', '');
            setData('job1_dailcode', '+60');
            setData('job1_phonecode', '');
            setData('job1_reason', '');
            setData('job1_startsalary', '');
            setData('job1_endsalary', '');
            setData('job2_title', '');
            setData('job2_period', null);
            setData('job2_company', '');
            setData('job2_address', '');
            setData('job2_supervisor', '');
            setData('job2_dailcode', '');
            setData('job2_phonecode', '');
            setData('job2_reason', '');
            setData('job2_startsalary', '');
            setData('job2_endsalary', '');
            setData('job3_title', '');
            setData('job3_period', null);
            setData('job3_company', '');
            setData('job3_address', '');
            setData('job3_supervisor', '');
            setData('job3_dailcode', '');
            setData('job3_phonecode', '');
            setData('job3_reason', '');
            setData('job3_startsalary', '');
            setData('job3_endsalary', '');
        }
        if (current === 3) {
            // Reference
            setData('refer1_name', '');
            setData('relation1', '');
            setData('refer1_dailcode', '+60');
            setData('refer1_phoneno', '');
            setData('refer1_email', '');
            setData('refer2_name', '');
            setData('relation2', '');
            setData('refer2_dailcode', '');
            setData('refer2_phoneno', '');
            setData('refer2_email', '');
            setData('refer3_name', '');
            setData('relation3', '');
            setData('refer3_dailcode', '');
            setData('refer3_phoneno', '');
            setData('refer3_email', '');
        }
        if (current === 4) {
            // Language
            setData('eng_speak', '3');
            setData('eng_write', '3');
            setData('eng_listen', '3');
            setData('malay_speak', '3');
            setData('malay_write', '3');
            setData('malay_listen', '3');
            setData('chinese_speak', '3');
            setData('chinese_write', '3');
            setData('chinese_listen', '3');
            setData('other_language', '');
            setData('other_speak', '');
            setData('other_write', '');
            setData('other_listen', '');
        }
        if (current === 5) {
            // Transport
            setData('transport', '');
            setData('approximate_distance', '');
            setData('approximate_hours', '');
            setData('approximate_minutes', '');
        }
        if (current === 6) {
            // Additional info
            setData('overtime_type', 'No');
            setData('investigate_type', 'No');
            setData('investigate_remark', '');
            setData('convicted_type', 'No');
            setData('convicted_remark', '');
            setData('bankrupt_type', 'No');
            setData('bankrupt_remark', '');
            setData('suspended_type', 'No');
            setData('suspended_remark', '');
            setData('directorship_type', 'No');
            setData('directorship_remark', '');
            setData('relative_type', 'No');
            setData('relative_remark', '');
            setData('health_type', 'No');
            setData('health_remark', '');
            setData('find_job_type', '');
            setData('find_job_remark', '');
        }
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Submit the form
        post('/store-application', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                window.location.href = `/application-success`;
            }
        });
    };

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
                            onAnimationComplete={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}                        
                        >
                            {steps[current].content}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* footer */}
            <div className="flex sticky bottom-0 w-full p-5 justify-between items-center bg-white border-t border-t-gray-200">
                <Popover
                    content={
                        <div className="flex items-center gap-2 justify-end">
                            <Button variant="outlined" size="sm" onClick={handleCloseClear}>Cancel</Button>
                            <Button variant="danger" size="sm" onClick={handleClear}>Clear</Button>
                        </div>
                    }
                    title="Are you sure you want to clear?"
                    open={open}
                    onOpenChange={handleOpenClear}
                    trigger="click"
                >
                    <span>
                        <Button variant="text" size="lg">Clear Form</Button>
                    </span>
                </Popover>
                
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
                        <ArrowRight className='text-white' />
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