import React, { useState} from "react";
import { Head } from "@inertiajs/react";
import { ArrowLeft, ArrowRight, Earth, JobApplicationIcon1, JobApplicationIcon2, JobApplicationIcon3, JobApplicationIcon4, JobApplicationIcon5, JobApplicationIcon6, JobApplicationIcon7, JobApplicationIcon8 } from "@/Components/Icon/Outline";
import { message, Steps, Popconfirm } from 'antd';
import Button from "@/Components/Button";
import Form1 from "./Partials/Form1";
import Form2 from "./Partials/Form2";
import Form3 from "./Partials/Form3";
import Form4 from "./Partials/Form4";
import Form5 from "./Partials/Form5";
import Form6 from "./Partials/Form6";
import Form7 from "./Partials/Form7";
import Form8 from "./Partials/Form8";
import { MocapLogo, Onboarding2Logo } from '@/Components/Icon/Logo';

export default function JobApplication() {

    const [current, setCurrent] = useState(0);
    const [open, setOpen] = useState(false);

    const next = () =>setCurrent(current + 1);
    const prev = () =>setCurrent(current - 1);

    const steps = [
        {
            content: <Form1/>,
            icon: <JobApplicationIcon1 />
        },
        {
            content: <Form2/>,
            icon: <JobApplicationIcon2/>,
        },
        {
            content: <Form3/>,
            icon: <JobApplicationIcon3/>,
        },
        {
            content: <Form4/>,
            icon: <JobApplicationIcon4/>,
        },
        {
            content: <Form5/>,
            icon: <JobApplicationIcon5/>,
        },
        {
            content: <Form6/>,
            icon: <JobApplicationIcon6/>,
        },
        {
            content: <Form7/>,
            icon: <JobApplicationIcon7/>,
        },
        {
            content: <Form8/>,
            icon: <JobApplicationIcon8/>,
        },
    ];

    const onChange = (value) => {
        // console.log('onChange:', value);
        setCurrent(value);
      };

      const confirm = e => {
        console.log(e);
        message.success('Clear');
      };
      const cancel = e => {
        console.log(e);
        message.error('Cancel');
      };
      
    return (
        <div className="flex w-full min-h-screen flex-col">
            <div className="flex sticky z-10 top-0 w-full px-5 py-2 justify-between items-center bg-white border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div><Onboarding2Logo /></div>
                    <div><MocapLogo /></div>
                </div>
                <div className='flex w-[38px] h-[38px] p-[9px] justify-center items-center flex-shrink-0'>
                    <Earth/>    
                </div>
            </div>

            {/* content */}
            <div className="flex-1">
                <div className="flex w-full px-0 py-5 flex-col items-center gap-5">
                    <div className="flex w-[738px] px-0 py-5 items-center gap-2">
                        <Steps current={current} onChange={onChange} items={steps}/>  
                    </div>
                    {steps[current].content}
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
                        <Button 
                            size="lg"
                            variant="text"
                            className="flex px-6 py-4 justify-center items-center gap-2"
                        >
                            Clear Form
                    </Button>
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
                        onClick={() => message.success('Processing complete!')}
                    >
                        Submit
                    </Button>
                )}
                </div>
            </div>
        </div>
    )
}