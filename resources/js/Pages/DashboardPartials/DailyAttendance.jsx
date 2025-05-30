import Button from "@/Components/Button";
import { ArrowRight } from "@/Components/Icon/Outline";
import React, { useState } from "react";
import { motion } from "framer-motion";
import NumberAnimate from "@/Components/NumberAnimate";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.1,
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

export default function DailyAttendance() {

    const [isLoading, setIsLoading] = useState(false);
    const [getTotalClockIn, setGetTotalClockIn] = useState();
    const [getTotalLunchOut, setGetTotalLunchOut] = useState();
    const [getTotalLunchIn, setGetTotalLunchIn] = useState();
    const [getTotalClockOut, setGetTotalClockOut] = useState();
    const [getTotalOTIn, setGetTotalOTOut] = useState();
    const [getTotalAbsent, setGetTotalAbsent] = useState();
    const [getTotalOnLeave, setGetTotalOnLeave] = useState();



    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className='p-6 flex flex-col gap-5 w-full h-[365px] border border-gray-200 bg-white rounded-sm shadow-smShadow'
        >
            <motion.div variants={itemVariants} className="flex items-center justify-between">
                <div className="text-gray-950 text-base font-semibold">Daily Attendance</div>
                <Button size="sm" variant="text" iconOnly>
                    <ArrowRight className='text-gray-950' />
                </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col justify-between h-full">
                {[
                    [
                        { label: "Total Clock-In", value: 1 },
                        { label: "Total Lunch-Out", value: 2 }
                    ],
                    [
                        { label: "Total Lunch-In", value: 3 },
                        { label: "Total Clock-Out", value: 4 }
                    ],
                    [
                        { label: "Total Overtime-In", value: 5 },
                        { label: "Total Overtime-Out", value: 6 }
                    ],
                    [
                        { label: "Absent", value: 7, border: "border-error-500" },
                        { label: "On Leave", value: 8, border: "border-info-500" }
                    ]
                ].map((row, rowIndex) => (
                    <motion.div
                        key={rowIndex}
                        variants={itemVariants}
                        className="flex items-center gap-5"
                    >
                        {row.map((item, i) => (
                            <div
                                key={i}
                                className={`border-l-[3px] ${
                                    item.border ?? "border-gray-950"
                                } flex flex-col gap-1 pl-4 w-full`}
                            >
                                <div className="text-gray-500 text-xs">{item.label}</div>
                                <div className="text-gray-950 text-lg font-medium">
                                    <NumberAnimate value={isLoading ? 0 : item.value} />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
