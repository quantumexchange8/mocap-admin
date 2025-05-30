import Button from "@/Components/Button";
import { ArrowRight, PlusIcon } from "@/Components/Icon/Outline";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.1,
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export default function RecentAnnouncement() {

    const [getAnnouncement, setGetAnnouncement] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAnnouncement = async () => {
        setIsLoading(true);
        try {
            
            const response = await axios.get('/getAnouncement');

            setGetAnnouncement(response.data);

        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAnnouncement();
    }, []);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className='p-6 flex flex-col gap-5 w-full h-[365px] border border-gray-200 bg-white rounded-sm shadow-smShadow'
        >
            <div className="flex items-center justify-between">
                <div className="text-gray-950 text-base font-semibold">Daily Attendance</div>
                <Button size="sm" variant="text" iconOnly>
                    <ArrowRight className='text-gray-950' />
                </Button>
            </div>
            <div className="w-full h-full">
                {
                    isLoading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex items-center justify-center"
                        >
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
                        </motion.div>
                    ) : (
                        <>
                            {
                                getAnnouncement.length > 0 ? (
                                    <div className="flex flex-col">

                                    </div>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                                        No records
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </div>
            <div>
                <Button size="sm" className="w-full flex justify-center items-center gap-2">
                    <PlusIcon />
                    <span>New Announcement</span>
                </Button>
            </div>
        </motion.div>
    )
}