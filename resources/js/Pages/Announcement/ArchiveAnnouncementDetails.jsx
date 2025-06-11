import Button from "@/Components/Button";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { DeleteIllus } from "@/Components/Icon/Illustration";
import { Announcement, CommentIcon, EyeOn, LogoIcon, TrashIcon, UnarchiveIcon } from "@/Components/Icon/Outline";
import { FemaleAvatar, MaleAvatar } from "@/Components/Icon/ProfilePhoto";
import Modal from "@/Components/Modal";
import { formatDate, formatDateTime, formatDMYTime } from "@/Composables";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Breadcrumb, Progress } from "antd";
import React, { useEffect, useState } from "react";

export default function ArchiveAnnouncementDetails({ announcements, totalVote }) {

    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [isConfirmUnarchiveOpen, setIsConfirmUnarhiveOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openReadingDetails, setOpenReadingDetails] = useState(false);
    const [getReadUser, setGetReadUser] = useState([]);
    const [getUnreadUser, setGetUnreadUser] = useState([]);

    const fetchEmployee = async () => {
        setIsLoading(true);
        
        try {
            
            const response = await axios.get('/getAnnouncementUser', {
                params: {
                    id: announcements.id
                }
            });
            setGetReadUser(response.data.readedUser);
            setGetUnreadUser(response.data.unreadUser);

        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchEmployee();
    }, []);


    const { data, setData, post, processing, errors, isDirty, reset } = useForm({
        id: announcements.id
    });

    const deleteArchive = () => {
        setIsConfirmDeleteOpen(true);
    }
    const closeDeleteArchive = () => {
        setIsConfirmDeleteOpen(false);
    }
    const confirmDelete = () => {
        post('/delete-announcement', {
            onSuccess: () => {
                toast.success('Announcement has been deleted.', {
                    title: 'Announcement has been deleted.',
                    duration: 3000,
                    variant: 'variant1',
                });
                closeDeleteArchive();
                window.location.href = '/announcement';
                reset();
                setIsLoading(false);
            }
        })
    }

    const unarchived = () => {
        setIsConfirmUnarhiveOpen(true);
    }
    const closeUnarchived = () => {
        setIsConfirmUnarhiveOpen(false);
    }
    const confirmUnarchive = () => {
        post('/unarchive-announcement', {
            onSuccess: () => {
                toast.success('Announcement has been unarchived.', {
                    title: 'Announcement has been unarchived.',
                    duration: 3000,
                    variant: 'variant1',
                });
                closeDeleteArchive();
                window.location.href = '/announcement';
                reset();
                setIsLoading(false);
            }
        })
    }

    const readingDetails = () => {
        setOpenReadingDetails(true);
    }
    const closeReadingDetails = () => {
        setOpenReadingDetails(false);
    }

    return (
        <AuthenticatedLayout header="Announcement" >
            <Head title="Announcement" />

            <div className="flex flex-col w-full">
                {/* Header */}
                <div className="w-full sticky top-[55px] bg-white z-30 py-2 px-5 flex justify-between items-center border-b border-gray-200">
                    <Breadcrumb 
                        items={[
                            {
                                href: '/announcement',
                                title: (
                                    <div className="flex items-center gap-2">
                                        <Announcement />
                                        <span>Announcement</span>
                                    </div>
                                ),
                            },
                            {
                                title: (
                                    <span className="text-gray-950 text-sm font-semibold">Archive - Announcement Details</span>
                                )
                            }
                        ]}
                    />
                    <div className="flex items-center gap-3">
                        <Button variant="text" size="sm" className='flex items-center gap-2' onClick={deleteArchive} >
                            <TrashIcon />
                            <span>Delete</span>
                        </Button>
                        <Button variant="text" size="sm" className='flex items-center gap-2' onClick={unarchived} >
                            <UnarchiveIcon />
                            <span>Unarchive</span>
                        </Button>
                        <Button variant="secondary" size="sm" className='flex items-center gap-2' onClick={readingDetails} >
                            <EyeOn />
                            <span>Reading Details</span>
                        </Button>
                    </div>
                </div>

                {/* content */}
                <div className="py-12 px-5 w-full flex justify-center">
                    <div className="max-w-[728px] w-full flex flex-col gap-8">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                {
                                    announcements.user.profile_image ? (
                                        <div className="relative w-40 h-40 group">
                                            <img src={announcements.user.profile_image} alt="profile_image" />
                                        </div>
                                    ) : (
                                        <div className="relative w-8 h-8 group">
                                            <LogoIcon />
                                        </div>
                                    )
                                }
                                <div className="flex flex-col ">
                                    <div className="text-gray-950 text-sm font-semibold">{announcements.user.name}</div>
                                    <div className="text-gray-500 text-xs">{announcements.published_at ? <span>Published: {formatDMYTime(announcements.published_at)}</span> : 'No Scheduled Time'}</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 flex justify-between items-center border-y border-gray-100">
                            <div className="text-gray-500 text-xs flex items-center gap-1 truncate">
                                <span>To:</span> {announcements.all_user === 1 ? 'All Employee' : (
                                    <>
                                        {
                                            announcements.announcement_user && (
                                                <div className="flex items-center gap-1">
                                                    {
                                                        // First get unique department names
                                                        [...new Set(
                                                            announcements.announcement_user
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
                                                        announcements.announcement_user
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
                            <div className="flex items-center gap-2 text-gray-500">
                                <div><CommentIcon className='text-gray-500' /></div>
                                <div className="text-sm">{totalVote ? totalVote : 0}</div>
                            </div>
                        </div>
                        <div>
                            {
                                announcements.thumbnail && (
                                    <img src={announcements.thumbnail} alt="thumbnail" />
                                ) 
                            }
                        </div>
                        <div className="text-gray-950 text-xxl font-bold">
                            {announcements.subject}
                        </div>
                        <div
                            style={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                            }}
                            dangerouslySetInnerHTML={{ __html: announcements.content_text }}
                        />
                        {
                            announcements.announcement_poll && (
                                <div className="flex flex-col gap-6">
                                    <div>{announcements.announcement_poll.option_name}</div>
                                    <div className="flex flex-col gap-3">
                                        {
                                            announcements.announcement_poll?.poll_options?.map((poll, index) => (
                                                <div key={index} className="flex flex-col gap-2">
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-gray-950 text-base">{poll.option_name}</div>
                                                        <div className="text-base font-semibold text-gray-950">{poll.votes} vote</div>
                                                    </div>
                                                    <div>
                                                        <Progress percent={poll.votes} showInfo={false} />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                                        <div>{totalVote} votes</div>
                                        <div>•</div>
                                        <div>expires on {announcements.announcement_poll.expired_at}</div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <ConfirmDialog show={isConfirmDeleteOpen}>
                <div className="p-6 flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-3">
                        <div><DeleteIllus /></div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-gray-950 text-lg font-bold">Delete Announcement</div>
                            <div className="text-gray-700 text-sm text-center">You're about to permanently delete this announcement. This action cannot be undone. Are you sure you want to proceed?</div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <Button variant="outlined" size="sm" onClick={closeDeleteArchive}>Cancel</Button>
                        <Button variant="danger" size="sm" onClick={confirmDelete} >Yes, Delete</Button>
                    </div>
                </div>
            </ConfirmDialog>

            <ConfirmDialog show={isConfirmUnarchiveOpen} >
                <div className="p-6 flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-gray-950 text-lg font-bold">Unarchive Announcement?</div>
                            <div className="text-gray-700 text-sm text-center">Unarchiving this announcement will make it visible to employees again. Are you sure you want to proceed?</div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <Button variant="outlined" size="sm" onClick={closeUnarchived}>Cancel</Button>
                        <Button  size="sm" onClick={confirmUnarchive} >Unarchive</Button>
                    </div>
                </div>
            </ConfirmDialog>

            <Modal
                show={openReadingDetails}
                maxWidth='sm'
                title='Reading Details'
                onClose={closeReadingDetails}
                showFooter="hidden"
            >
                <div className="py-3 px-6 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <div className="text-gray-950 text-sm font-semibold">Read: {getReadUser.length}</div>
                        <div className="flex flex-col">
                            {
                                getReadUser.length > 0 ? (
                                    <>
                                        {
                                            getReadUser.map((readUser, index) => (
                                                <div key={index} className="py-2 flex items-center gap-3">
                                                    <div className="max-w-6 max-h-6 rounded-full">
                                                        {
                                                            readUser.user.profile_image ? (
                                                                <img src={readUser.user.profile_image} alt="profile_image" />
                                                            ) : (
                                                                <> 
                                                                    {
                                                                        readUser.user.gender === 'male' && (
                                                                            <MaleAvatar className='w-6 h-6 rounded-full' />
                                                                        )
                                                                    }
                                                                    {
                                                                        readUser.user.gender === 'female' && (
                                                                            <FemaleAvatar className='w-6 h-6 rounded-full' />
                                                                        )
                                                                    } 
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="text-gray-950 text-sm">{readUser.user.username}</div>
                                                </div>
                                            ))
                                        }
                                    </>
                                ) : (
                                    <div className="flex justify-center items-center text-gray-500 text-sm">
                                        No Employee View Yet 
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-gray-950 text-sm font-semibold flex justify-between items-center">
                            <span>Unread: {getUnreadUser.length}</span>
                        </div>
                        <div className="flex flex-col">
                            {
                                getUnreadUser.length > 0 ? (
                                    <>
                                        {
                                            getUnreadUser.map((unreadUser, index) => (
                                                <div key={index} className="py-2 flex items-center gap-3">
                                                    <div className="max-w-6 max-h-6 rounded-full">
                                                        {
                                                            unreadUser.user.profile_image ? (
                                                                <img src={unreadUser.user.profile_image} alt="profile_image" />
                                                            ) : (
                                                                <> 
                                                                    {
                                                                        unreadUser.user.gender === 'male' && (
                                                                            <MaleAvatar className='w-6 h-6 rounded-full' />
                                                                        )
                                                                    }
                                                                    {
                                                                        unreadUser.user.gender === 'female' && (
                                                                            <FemaleAvatar className='w-6 h-6 rounded-full' />
                                                                        )
                                                                    } 
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="text-gray-950 text-sm">{unreadUser.user.username}</div>
                                                </div>
                                            ))
                                        }
                                    </>
                                ) : (
                                    <div className="flex justify-center items-center text-gray-500 text-sm">
                                        All Employee Viewed
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Modal>

        </AuthenticatedLayout>
    )
}