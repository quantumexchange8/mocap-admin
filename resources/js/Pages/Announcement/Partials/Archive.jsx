import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DepartmentIllus } from "@/Components/Icon/Illustration";
import { CommentIcon, LogoIcon } from "@/Components/Icon/Outline";
import { formatDate } from "@/Composables";

export default function Archive() {

    const [getArchiveAnnouncement, setGetArchiveAnnouncement] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchArchiveAnnouncement = async () => {
        setIsLoading(true);
        
        try {
            
            const response = await axios.get('/getArchiveAnnouncement');

            setGetArchiveAnnouncement(response.data);

        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchArchiveAnnouncement();
    }, []);

    const redirectArchiveDetails = (id) => {
        window.location.href = `/archive-announcement-details/${id}`;
    }

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
                            getArchiveAnnouncement.length > 0 ? (
                                <div className="p-5 flex flex-col xl:grid xl:grid-cols-2 gap-5 ">
                                    {
                                        getArchiveAnnouncement.map((archive, index) => (
                                            <div key={index} className="p-5 flex flex-col gap-5 bg-white rounded-sm shadow-toast hover:bg-gray-50 cursor-pointer" onClick={() => redirectArchiveDetails(archive.id)}>
                                                <div className="flex items-center gap-3">
                                                    {
                                                        archive.user.profile_image ? (
                                                            <div className="relative w-40 h-40 group">
                                                                <img src={archive.user.profile_image} alt="profile_image" />
                                                            </div>
                                                        ) : (
                                                            <div className="relative w-8 h-8 group">
                                                                <LogoIcon />
                                                            </div>
                                                        )
                                                    }
                                                    <div className="flex flex-col ">
                                                        <div className="text-gray-950 text-sm font-semibold">{archive.user.name}</div>
                                                        <div className="text-gray-500 text-xs">{archive.published_at ? <span>Published: {formatDate(archive.published_at)}</span> : 'No Scheduled Time'}</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <div className="text-gray-950 text-base font-semibold truncate">{archive.subject}</div>
                                                    <div
                                                        className="overflow-hidden h-24"
                                                        style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 4,
                                                            WebkitBoxOrient: 'vertical',
                                                        }}
                                                        dangerouslySetInnerHTML={{ __html: archive.content_text }}
                                                    />
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="text-gray-500 text-xs flex items-center gap-1 truncate">
                                                        <span>To:</span> {archive.all_user === 1 ? 'All Employee' : (
                                                            <>
                                                                {
                                                                    draft.announcement_user && (
                                                                        <div className="flex items-center gap-1">
                                                                            {
                                                                                // First get unique department names
                                                                                [...new Set(
                                                                                    archive.announcement_user
                                                                                        .filter(ann_user => ann_user.department_id)
                                                                                        .map(ann_user => ann_user.department?.name)
                                                                                )].map((deptName, index, array) => (
                                                                                    <span key={`dept-${index}`}>
                                                                                        {deptName}{index !== array.length - 1 && ', '}
                                                                                    </span>
                                                                                ))
                                                                            }
                                                                            {
                                                                                // Then add user names for records without departments
                                                                                archive.announcement_user
                                                                                    .filter(ann_user => !ann_user.department_id)
                                                                                    .map((ann_user, index, array) => (
                                                                                        <span key={`user-${index}`}>
                                                                                            {ann_user.user?.name}
                                                                                            {index !== array.length - 1 && ', '}
                                                                                        </span>
                                                                                    ))
                                                                            }
                                                                        </div>
                                                                    )
                                                                }
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div><CommentIcon /></div>
                                                        <div className="text-gray-700 text-sm">
                                                            {
                                                                archive.announcement_comment ? (
                                                                    <>
                                                                        {archive.announcement_comment.length}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        0
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className="py-10 px-[200px] min-h-[80vh] flex flex-col items-center justify-center gap-3">
                                    <div>
                                        <DepartmentIllus />
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="text-gray-950 text-base font-bold">No Archived Announcements</div>
                                        <div className="text-gray-700 text-sm text-center">You haven’t archived any announcements yet. Archived items will appear here when you no longer need them in active view.</div>
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