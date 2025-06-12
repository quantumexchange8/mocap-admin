import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "primereact/calendar";
import { CalendarIcon, DatePickerIcon, LogoIcon, PinIcon, PinIcon2, XIcon } from "@/Components/Icon/Outline";
import { Select } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { formatDate, formatDateTime, formatDMYTime } from "@/Composables";
import { DepartmentIllus } from "@/Components/Icon/Illustration";
import { ReactSortable } from "react-sortablejs";
import Pin2 from "@/Components/Pin/Pin2";

export default function Published() {

    const [getPublishedAnnouncement, setGetPublishedAnnouncement] = useState([]);
    const [getPinAnnouncement, setGetPinAnnouncement] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterDate, setFilterDate] = useState(null);
    const [filterSort, setFilterSort] = useState('latest');

    const fetchPinAnnouncement = async () => {
        setIsLoading(true);
        
        try {
            
            const response = await axios.get('/getPinAnnouncement');

            setGetPinAnnouncement(response.data);

        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchPublishedAnnouncement = async () => {
        setIsLoading(true);
        
        try {
            
            const response = await axios.get('/getPublishedAnnouncement');

            setGetPublishedAnnouncement(response.data);

        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPinAnnouncement();
    }, []);

    useEffect(() => {
        fetchPublishedAnnouncement();
    }, []);

    const removeDateFilter = () => {
        setFilterDate(null)
    }

    const handleSelectChange = (selected) => {
        setFilterSort(selected)
    }

    const publishDetail = (id) => {
        window.location.href = `/published-announcment-details/${id}`
    }

    const sortUpdateTimer = useRef(null);

    const handleSort = (sortedList) => {
        setGetPinAnnouncement(sortedList);

        const updatedOrder = sortedList.map((item, index) => ({
            id: item.id,
            order_no: index + 1,
        }));

        // add 5 sec only update to backend
        // if (sortUpdateTimer.current) {
        //     clearTimeout(sortUpdateTimer.current);
        // }
        // sortUpdateTimer.current = setTimeout(() => {
        //     axios
        //         .post("/update-pin-order", { updatedOrder })
        //         .then(() => console.log("Order updated"))
        //         .catch((err) => console.error(err));
        // }, 5000); // 5 seconds
            
    };

    return (
        <AnimatePresence mode="wait">
            {
                isLoading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-[50vh] flex items-center justify-center"
                    >
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {
                            getPublishedAnnouncement.length > 0 ? (
                                <div className="p-5 flex flex-col gap-5">
                                    {/* Pin announcement */}
                                    {
                                        getPinAnnouncement.length > 0 && (
                                            <div className="flex flex-col bg-gray-100 rounded-sm">
                                                <div className="pt-5 px-5 flex flex-col">
                                                    <div className="text-gray-950 text-base font-semibold">Pin Announcement</div>
                                                    <div className="text-gray-700 text-sm">
                                                        Drag to reorder pinned announcements. These will display in the employee app in the same order. Maximum of 5 pinned announcements.
                                                    </div>
                                                </div>
                                                <div className="p-5 overflow-auto">
                                                    <ReactSortable
                                                        list={getPinAnnouncement}
                                                        setList={handleSort}
                                                        className="flex items-center gap-5"
                                                    >
                                                        {
                                                            getPinAnnouncement.map(pinned => (
                                                                <Pin2 
                                                                    key={pinned.id}
                                                                    pin_type={pinned.pin_type}
                                                                />
                                                            ))
                                                        }
                                                    </ReactSortable>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {/* filter row */}
                                    <div className="flex items-center justify-between ">
                                        <div className="relative">
                                            <Calendar 
                                                value={filterDate}
                                                onChange={(e) => setFilterDate(e.value)} 
                                                className="w-full text-sm"
                                                placeholder="Filter by published date"
                                                pt={{
                                                    input: {
                                                        className: 'w-full py-3 px-4 text-sm text-gray-950 border border-gray-300 rounded-sm hover:border-gray-400 focus:border-gray-950 focus:ring-0 focus:outline-none'
                                                    },
                                                    panel: {
                                                        className: 'bg-white border border-gray-300 shadow-md rounded-md'
                                                    },
                                                    header: {
                                                        className: 'bg-white text-gray-900 font-semibold px-4 py-3'
                                                    },
                                                    table: {
                                                        className: 'w-full'
                                                    },
                                                    day: {
                                                        className: 'w-10 h-10 text-center rounded-full transition-colors'
                                                    },
                                                    daySelected: {
                                                        className: 'bg-gray-950 text-white font-bold rounded-full'
                                                    },
                                                    dayToday: {
                                                        className: 'border border-gray-950'
                                                    },
                                                    month: {
                                                        className: 'p-2 hover:bg-gray-100 rounded-md'
                                                    },
                                                    year: {
                                                        className: 'p-2 hover:bg-gray-100 rounded-md'
                                                    },
                                                    monthPicker: {
                                                        className: 'py-1 px-3'
                                                    }
                                                }}
                                            />
                                            {
                                                filterDate ? (
                                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:rounded-full hover:bg-gray-100" onClick={removeDateFilter} ><XIcon /></span>
                                                ) : (
                                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2"><DatePickerIcon /></span>
                                                )
                                            }
                                        </div>
                                        <div className="max-w-[220px] w-full">
                                            <Select 
                                                value={filterSort}
                                                onChange={handleSelectChange}
                                                options={[
                                                    { label: 'Latest', value: 'latest'},
                                                    { label: 'Oldest', value: 'oldest'},
                                                    { label: 'Most Comments', value: 'most_comment'},
                                                ]}
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            isLoading ? (
                                                <motion.div
                                                    key="loader"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="min-h-[50vh] flex items-center justify-center"
                                                >
                                                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="content"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {
                                                        getPublishedAnnouncement && (
                                                            <div className="flex flex-col xl:grid xl:grid-cols-2 gap-5 ">
                                                                {
                                                                    getPublishedAnnouncement.map((announcement, index) => (
                                                                        <div key={index} className="p-5 flex flex-col gap-5 rounded-sm bg-white shadow-toast hover:bg-gray-50 cursor-pointer" onClick={() => publishDetail(announcement.id)} >
                                                                            <div className="flex items-center gap-3">
                                                                                {
                                                                                    announcement.user.profile_image ? (
                                                                                        <div className="relative w-40 h-40 group">
                                                                                            <img src={announcement.user.profile_image} alt="profile_image" />
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div className="relative w-8 h-8 flex group">
                                                                                            <LogoIcon />
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                                <div className="w-full flex flex-col ">
                                                                                    <div className="text-gray-950 text-sm font-semibold">{announcement.user.name}</div>
                                                                                    <div className="text-gray-500 text-xs">Published: {formatDMYTime(announcement.updated_at)}</div>
                                                                                </div>
                                                                                <div className="">
                                                                                    <PinIcon2 />
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex flex-col gap-2">
                                                                                <div className="text-gray-950 text-base font-semibold truncate">{announcement.subject}</div>
                                                                                <div
                                                                                    className="overflow-hidden h-[78px]"
                                                                                    style={{
                                                                                        display: '-webkit-box',
                                                                                        WebkitLineClamp: 3,
                                                                                        WebkitBoxOrient: 'vertical',
                                                                                    }}
                                                                                    dangerouslySetInnerHTML={{ __html: announcement.content_text }}
                                                                                />
                                                                            </div>
                                                                            <div className="flex justify-between items-center">
                                                                                <div className="text-gray-500 text-xs flex items-center gap-1 truncate">
                                                                                    <span>To:</span> {announcement.all_user === 1 ? 'All Employee' : (
                                                                                        <>
                                                                                            {
                                                                                                announcement.announcement_user && (
                                                                                                    <div className="flex items-center gap-1">
                                                                                                        {
                                                                                                            announcement.announcement_user.map((ann_user, index) => (
                                                                                                                <div key={index} className="flex items-center gap-1">
                                                                                                                    <span>{ann_user.department_id ? ann_user.department?.name : ann_user.user.name}{index !== announcement.announcement_user.length - 1 && ','}</span>
                                                                                                                </div>
                                                                                                            ))
                                                                                                        }
                                                                                                    </div>
                                                                                                )
                                                                                            }
                                                                                            
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                                <div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </motion.div>
                                            )
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div className="py-10 px-[200px] min-h-[80vh] flex flex-col items-center justify-center gap-3">
                                    <div>
                                        <DepartmentIllus />
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="text-gray-950 text-base font-bold">No Announcements Yet</div>
                                        <div className="text-gray-700 text-sm text-center">You haven’t published any announcements. Create your first one to keep employees in the loop.</div>
                                    </div>
                                </div>
                            )
                        }
                    </motion.div>
                )
            }
            
        </AnimatePresence>
    )
}