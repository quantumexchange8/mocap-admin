import { EmployeeSuccessIllus } from "@/Components/Icon/Illustration";
import { MocapLogo, Onboarding2Logo } from "@/Components/Icon/Logo";
import { LangIcon } from "@/Components/Icon/Outline";
import { Link } from "@inertiajs/react";
import React from "react";
import { motion } from "framer-motion";

export default function VerifyEmail() {

    const redictHome = () => {
        window.location.href = `/`;
    }

    return (
        <div className="w-full">
            <div className="sticky top-0 w-full flex justify-between items-center py-2 px-5 ">
                <div className="flex items-center gap-3 cursor-pointer" onClick={redictHome}>
                    <div><Onboarding2Logo /></div>
                    <div><MocapLogo /></div>
                </div>
                <div className="p-[9px] hover:bg-gray-50 rounded-full cursor-pointer">
                    <LangIcon />
                </div>
            </div>
            {/* can add animation */}
            <div className="w-full flex flex-col items-center justify-center min-h-[90vh]">
                <motion.div
                    className="py-12 px-8"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <EmployeeSuccessIllus />
                </motion.div>
                <motion.div
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="text-gray-950 text-xl font-bold">Your New Email Address is verified Successful!</div>
                    <div className="text-gray-700 text-base">Login with Your New Email Address.</div>
                </motion.div>
            </div>
            {/* can add animation */}
            <div className="fixed bottom-5 w-full text-gray-500 text-xs flex justify-center">
                © {new Date().getFullYear()} Motion Capture Powered by Current Tech Industries
            </div>
        </div>
    )
}