import { EmployeeApplicationIlls, JobApplicationIlls, LoginIlls } from "@/Components/Icon/Illustration";
import { MocapLogo, Onboarding2Logo, OnboardingLogo } from "@/Components/Icon/Logo";
import { LangIcon } from "@/Components/Icon/Outline";
import { Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function Onboarding() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1000); // 1 seconds
    
        return () => clearTimeout(timer); // cleanup
    }, []);

    return (
        <div className="w-full relative min-h-screen">
            <AnimatePresence>
                {
                    isLoading && (
                        <motion.div
                            className="flex justify-center items-center min-h-screen absolute inset-0 bg-white z-50"
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.8 }}
                        >
                            <OnboardingLogo />
                        </motion.div>
                    )
                }
            </AnimatePresence>
            {
                !isLoading && (
                    <div className="w-full bg-onboarding min-h-screen bg-cover bg-center bg-no-repeat">
                        <div className="sticky top-0 w-full flex justify-between items-center py-2 px-5 ">
                            <div className="flex items-center gap-3">
                                <div><Onboarding2Logo /></div>
                                <div><MocapLogo /></div>
                            </div>
                            <div className="p-[9px] hover:bg-gray-50 rounded-full cursor-pointer">
                                <LangIcon />
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center min-h-[90vh]">
                            <div className="w-full flex flex-col gap-12 max-w-[728px] max-h-[666px]">
                                <div className="flex flex-col gap-3">
                                    <div className="text-gray-950 text-xxl font-bold">Welcome to Motion Capture !</div>
                                    <div className="text-gray-700 text-base">Choose what you’d like to do next: manage job applications, add employees, or access admin tools.</div>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-5">
                                    {/* Job Application Form */}
                                    <Link href={route('job-application')}>
                                        <div className="p-5 flex flex-col gap-2 border border-gray-200 bg-white rounded-sm h-[300px] relative overflow-hidden hover:border-gray-950 hover:shadow-toast cursor-pointer
                                            transition-transform duration-300 ease-in-out hover:-translate-y-2"
                                        >
                                            <div className="text-gray-950 text-sm font-bold">Job Application Form</div>
                                            <div className="text-gray-500 text-xs">Invite candidates to fill out their details before the interview. Simplify your hiring process!</div>
                                            
                                            <JobApplicationIlls className='absolute right-1 bottom-0' />
                                        </div>
                                    </Link>
                                    {/* Employee Application Form */}
                                    <Link href={route('employee-application')}>
                                        <div className="p-5 flex flex-col gap-2 border border-gray-200 bg-white rounded-sm h-[300px] relative overflow-hidden hover:border-gray-950 hover:shadow-toast cursor-pointer
                                            transition-transform duration-300 ease-in-out hover:-translate-y-2"
                                        >
                                            <div className="text-gray-950 text-sm font-bold">Employee Information Form</div>
                                            <div className="text-gray-500 text-xs">Add new employees to the system and keep their profiles up to date.</div>
                                            <EmployeeApplicationIlls className="absolute right-0 bottom-0" />
                                        </div>
                                    </Link>
                                    {/* Back office login */}
                                    <Link href={route('login')} >
                                        <div className="p-5 flex flex-col gap-2 border border-gray-200 bg-gray-950 rounded-sm h-[300px] relative overflow-hidden hover:border-gray-950 hover:shadow-toast cursor-pointer
                                            transition-transform duration-300 ease-in-out hover:-translate-y-2"
                                        >
                                            <div className="text-white text-sm font-bold">Back-Office Login</div>
                                            <div className="text-gray-300 text-xs">Access your tools and manage everything in your back-office dashboard.</div>
                                            <div className="w-[480px] h-[480px] rounded-full bg-white absolute -left-10 top-24 z-10"></div>
                                            <LoginIlls className="absolute right-10 bottom-0 z-20" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="fixed bottom-5 w-full text-gray-500 text-xs flex justify-center">
                            © {new Date().getFullYear()} Motion Capture Powered by Current Tech Industries
                        </div>
                    </div>
                )
            }
        </div>
    )
}