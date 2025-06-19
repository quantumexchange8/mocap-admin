import Button from '@/Components/Button';
import ConfirmDialog from '@/Components/ConfirmDialog';
import { ArrowIcon, CalendarCheckIcon, ChevronDown, ClockIcon, DatePickerIcon, UserIcon } from '@/Components/Icon/Outline';
import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Calendar, Select, Skeleton, Tag, theme } from 'antd';
import { useEffect, useState } from 'react';
import DailyAttendance from './DashboardPartials/DailyAttendance';
import { Dayjs } from 'dayjs';
import CalendarPartials from './DashboardPartials/CalendarPartials';
import RecentAnnouncement from './DashboardPartials/RecentAnnouncement';
import { motion } from 'framer-motion';
import NumberAnimate from '@/Components/NumberAnimate';
import EmployeePerformance from './DashboardPartials/EmployeePerformance';
import Overview from './DashboardPartials/Overview';

export default function Dashboard() {

    const [getTotalEmployee, setGetTotalEmployee] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const fetchTotalEmployee = async () => {
        setIsLoading(true);
        try {
            
            const response = await axios.get('/getTotalEmployee');

            setGetTotalEmployee(response.data);

        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchTotalEmployee();
    }, []);
    
    

    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />

            <div className='p-5 flex flex-col gap-5'>
                <div className='p-6 flex flex-col xl:flex-row gap-6 bg-gray-950 bg-dashboard1 bg-cover bg-center bg-no-repeat rounded-sm'>
                    <div className='flex flex-col gap-6 xl:justify-between w-full'>
                        <div className='flex flex-col gap-3'>
                            <div className='text-xxl font-semibold text-white'>Welcome Back, CT Admin!</div> 
                            <div className='text-gray-300 text-base'>Let’s dive in and make today productive!</div>
                        </div>
                        <div className='py-3 px-5 flex items-center gap-5 bg-request-container border border-white rounded'>
                            <div className='flex flex-col w-full'>
                                <div className='text-gray-950 text-xxl font-medium'>
                                    0
                                    <span className='text-gray-700 text-sm pl-1'>New Requests</span>
                                </div>
                                <div className='text-gray-950 text-xs font-medium'>
                                    New Requests Awaiting Your Approval – Take Action Now!
                                </div>
                            </div>
                            <div>
                                <Button size='sm'>Manage</Button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex items-center gap-4'>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 , duration: 0.4 }}
                            className='p-5 flex flex-col gap-3 bg-[#ffffff26] w-full'
                        >
                            <div className='flex'>
                                <div className='p-2 flex items-center justify-center rounded-full bg-[#ffffff26]'>
                                    <UserIcon />
                                </div>
                            </div>
                            <div className='text-gray-300 text-sm'>Total Employee</div>
                            <div className='text-white text-xxl font-medium'>
                                {
                                    isLoading ? <div className='h-[42px] flex items-center'><Skeleton active title={{ rows: 1 }} paragraph={false}  /></div> : getTotalEmployee
                                }
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='flex items-center gap-1'>
                                    <div><ArrowIcon /></div>
                                    <div className='text-gray-300 text-sm font-medium'>
                                        {
                                            isLoading ? <div className='h-[20px] flex items-center'><Skeleton active title={{ rows: 1, width: 48 }} paragraph={false}  /></div> : <span>{0} new</span>
                                        }
                                    </div>
                                </div>
                                <div className='text-gray-400 text-xs'>vs last month</div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 , duration: 0.5 }}
                            className='p-5 flex flex-col gap-3 bg-[#ffffff26] w-full'
                        >
                            <div className='flex'>
                                <div className='p-2 flex items-center justify-center rounded-full bg-[#ffffff26]'>
                                    <CalendarCheckIcon />
                                </div>
                            </div>
                            <div className='text-gray-300 text-sm'>Attendance Rate</div>
                            <div className='text-white text-xxl font-medium'>
                                {
                                    isLoading ? <div className='h-[42px] flex items-center'><Skeleton active title={{ rows: 1 }} paragraph={false}  /></div> : <span>{0}%</span>
                                }
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='flex items-center gap-1'>
                                    <div><ArrowIcon /></div>
                                    <div className='text-gray-300 text-sm font-medium'>
                                        {
                                            isLoading ? <div className='h-[20px] flex items-center'><Skeleton active title={{ rows: 1, width: 48 }} paragraph={false}  /></div> : <span>{2.6} %</span>
                                        }
                                    </div>
                                </div>
                                <div className='text-gray-400 text-xs'>vs last month</div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 , duration: 0.6 }}
                            className='p-5 flex flex-col gap-3 bg-[#ffffff26] w-full'
                        >
                            <div className='flex'>
                                <div className='p-2 flex items-center justify-center rounded-full bg-[#ffffff26]'>
                                    <ClockIcon />
                                </div>
                            </div>
                            <div className='text-gray-300 text-sm'>Overtime Hours</div>
                            <div className='text-white text-xxl font-medium'>
                                {
                                    isLoading ? <div className='h-[42px] flex items-center'><Skeleton active title={{ rows: 1 }} paragraph={false}  /></div> : <span>{0}</span>
                                }
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='flex items-center gap-1'>
                                    <div><ArrowIcon /></div>
                                    <div className='text-gray-300 text-sm font-medium'>
                                        {
                                            isLoading ? <div className='h-[20px] flex items-center'><Skeleton active title={{ rows: 1, width: 48 }} paragraph={false}  /></div> : <span>{2.6} %</span>
                                        }
                                    </div>
                                </div>
                                <div className='text-gray-400 text-xs'>vs last month</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                <div className='grid grid-cols-2 xl:flex xl:flex-row items-center gap-5 w-full xl:max-h-[383px]'>

                    {/* Attendance */}
                    <DailyAttendance />
                    {/* Recent announcement */}
                    <RecentAnnouncement />
                    {/* Calendar */}
                    <CalendarPartials />
                </div>
                {/*  Chart */}
                <div className='flex flex-col xl:grid xl:grid-cols-2 items-center gap-5 w-full'>

                    <EmployeePerformance />

                    <Overview />
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}
