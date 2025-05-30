import React, { useRef } from "react";
import { color, motion } from "framer-motion";
import Button from "@/Components/Button";
import { ArrowRight, DotVerticalIcon } from "@/Components/Icon/Outline";
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import ProjectChart from "./ProjectChart";
import TaskChart from "./TaskChart";


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

const containerVariants2 = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.1,
            duration: 0.7,
            ease: "easeOut"
        }
    }
};



export default function Overview() {

    

    return (
        <div className='flex flex-row xl:flex-col gap-5 w-full'>
            {/* Projects Overview */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className='p-6 flex flex-col gap-5 w-full border border-gray-200 bg-white rounded-sm shadow-smShadow'
            >
                <div className="flex items-center justify-between">
                    <div className="text-gray-950 text-base font-semibold">Projects Overview</div>
                    <Button size="sm" variant="text" iconOnly>
                        <DotVerticalIcon />
                    </Button>
                </div>

                {/* Donught chart */}
                <ProjectChart />
                
            </motion.div>

             {/* Tasks Overview  */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants2}
                className='p-6 flex flex-col gap-5 w-full border border-gray-200 bg-white rounded-sm shadow-smShadow'
            >
                <div className="flex items-center justify-between">
                    <div className="text-gray-950 text-base font-semibold">Tasks Overview</div>
                    <Button size="sm" variant="text" iconOnly>
                        <DotVerticalIcon />
                    </Button>
                </div>

                {/* Task Overview */}
                <TaskChart />
            </motion.div>
        </div>
    )
}