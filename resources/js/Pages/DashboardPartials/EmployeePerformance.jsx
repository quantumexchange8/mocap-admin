import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/Components/Button";
import { ArrowRight } from "@/Components/Icon/Outline";
import { Segmented } from "antd";

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

export default function EmployeePerformance() {

    const [viewType, setViewType] = useState('Top Performers');

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className='p-6 flex flex-col gap-5 w-full border border-gray-200 bg-white rounded-sm shadow-smShadow'
        >

            <div className="flex items-center justify-between">
                <div className="text-gray-950 text-base font-semibold">Employee’s Performance</div>
                <Button size="sm" variant="text" iconOnly>
                    <ArrowRight className='text-gray-950' />
                </Button>
            </div>

            <div className="w-full">
                <Segmented
                    value={viewType}
                    onChange={setViewType}
                    options={['Top Performers', 'Least Active']}
                    className="custom-segmented w-full"
                />
            </div>

            <div className="w-full flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <div className="text-gray-700 text-sm font-medium">Working Hours</div>
                    <div className="text-gray-500 text-sm flex justify-center items-center h-[104px]">
                        No data available
                    </div>
                </div>
                <div className="bg-gray-200 h-[1px] w-full"></div>
                <div className="flex flex-col gap-5">
                    <div className="text-gray-700 text-sm font-medium">Projects Completed</div>
                    <div className="text-gray-500 text-sm flex justify-center items-center h-[104px]">
                        No data available
                    </div>
                </div>
                <div className="bg-gray-200 h-[1px] w-full"></div>
                <div className="flex flex-col gap-5">
                    <div className="text-gray-700 text-sm font-medium">Tasks Completed</div>
                    <div className="text-gray-500 text-sm flex justify-center items-center h-[104px]">
                        No data available
                    </div>
                </div>
            </div>
        </motion.div>
    )
}