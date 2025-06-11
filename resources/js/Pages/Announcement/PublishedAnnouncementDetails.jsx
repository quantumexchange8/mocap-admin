import Button from "@/Components/Button";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { Announcement, ArchiveIcon, CommentIcon, EyeOn, LogoIcon } from "@/Components/Icon/Outline";
import { FemaleAvatar, MaleAvatar } from "@/Components/Icon/ProfilePhoto";
import Modal from "@/Components/Modal";
import { formatDate } from "@/Composables";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Breadcrumb, Image, Progress } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Comment from "./Partials/Comment";

export default function PublishedAnnouncementDetails({ announcements, totalVote, totalComment }) {

    const [openConfirmArchive, setOpenConfirmArchive] = useState(false);
    const [openReadingDetails, setOpenReadingDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [getReadUser, setGetReadUser] = useState([]);
    const [getUnreadUser, setGetUnreadUser] = useState([]);
    const [isCommendOpen, setIsCommentOpen] = useState(false);
    const [visible, setVisible] = useState(false);

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

    const archiveAnnouncment = () => {
        setOpenConfirmArchive(true);
    }

    const closeConfirmArchive = () => {
        setOpenConfirmArchive(false);
    }

    const readingDetails = () => {
        setOpenReadingDetails(true);
    }
    const closeReadingDetails = () => {
        setOpenReadingDetails(false);
    }

    const openComment = () => {
        setIsCommentOpen(true);
    }
    const closeComment = () => {
        setIsCommentOpen(false);
    }

    const confirmArchive = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post('/archive-announcement', {
            onSuccess: () => {
                toast.success('Announcement has been archived.', {
                    title: 'Announcement has been archived.',
                    duration: 3000,
                    variant: 'variant1',
                });
                closeConfirmArchive();
                window.location.href = '/announcement';
                reset();
                setIsLoading(false);
            }
        })
    }

    const notifyUnreadUser = async () => {
        try {
            
            const response = await axios.get('/api/notify-unread-user', {
                params: {
                    id: announcements.id,
                    unread_user: getUnreadUser.user,
                }
            });

            if (response.status === 200) {
                toast.success('Notified unread users.', {
                    title: 'Notified unread users.',
                    duration: 3000,
                    variant: 'variant1',
                });
            }

        } catch (error) {
            console.error('error', error);
        }
    }

    return (
        <AuthenticatedLayout header="Announcement">
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
                                    <span className="text-gray-950 text-sm font-semibold">Published - Announcement Details</span>
                                )
                            }
                        ]}
                    />
                    <div className="flex items-center gap-3">
                        <Button variant="text" size="sm" className='flex items-center gap-2' onClick={archiveAnnouncment} >
                            <ArchiveIcon />
                            <span>Archive</span>
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
                                    <div className="text-gray-500 text-xs">{announcements.schedule_date ? <span>Scheduled: {formatDate(announcements.schedule_date)}</span> : 'No Scheduled Time'}</div>
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
                            <div className="flex items-center gap-2 text-gray-500 cursor-pointer" onClick={openComment}>
                                <div><CommentIcon className='text-gray-500' /></div>
                                <div className="text-sm">{totalComment ? totalComment : 0}</div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            {
                                announcements.thumbnail && (
                                    <Image src={announcements.thumbnail} width={640}  />
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
                            announcements.attachment.length > 0 && (
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                                    {
                                        announcements.attachment.map((fileUrl, index) => {
                                            const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(fileUrl.url);
                                            const isPDF = /\.pdf$/i.test(fileUrl.url);
                                        
                                            return (
                                                <div key={index} className="p-2 flex items-center gap-3 bg-white border border-gray-200 rounded shadow-smShadow ">
                                                    {
                                                        isImage && (
                                                            <>
                                                                <div className="flex items-center gap-3 w-full cursor-pointer" onClick={() => setVisible(true)}>
                                                                    <img src={fileUrl.url} alt={`attachment-${index}`} className="max-h-12 rounded shadow" />
                                                                    <div className="flex flex-col w-full">
                                                                        <div className="text-gray-950 text-sm font-medium">{fileUrl.file_name}</div>
                                                                        <div className="text-gray-500 text-xs">{fileUrl.size / 1000} KB</div>
                                                                    </div>
                                                                </div>
                                                                <Image 
                                                                    src={fileUrl.url} 
                                                                    style={{ display: 'none' }}
                                                                    preview={{
                                                                        visible,
                                                                        src: fileUrl.url, 
                                                                        onVisibleChange: (value) => {
                                                                            setVisible(value);
                                                                        },
                                                                    }}
                                                                />
                                                            </>
                                                        )
                                                    }
                                            
                                                    {
                                                        isPDF && (
                                                            <a
                                                                href={fileUrl.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-3"
                                                            >
                                                                <div className="flex items-center justify-center text-xxs text-gray-950">
                                                                    <div className="border border-error-400 rounded-sm rounded-tr-lg py-2.5 px-1 bg-white">
                                                                        PDF
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col gap-1 w-full">
                                                                    <div className="text-gray-950 text-sm font-medium">{fileUrl.url.split('/').pop()}</div>
                                                                    <div className="text-gray-500 text-xs">{fileUrl.size / 1000} KB</div>
                                                                    
                                                                </div>
                                                            </a>
                                                        )
                                                    }
                                            
                                                    {
                                                        !isImage && !isPDF && (
                                                            <a
                                                                href={fileUrl.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-gray-600 underline"
                                                            >
                                                                Download File
                                                            </a>
                                                        )
                                                    }
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            )
                        }
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

            <ConfirmDialog show={openConfirmArchive} >
                <div className="p-6 flex flex-col gap-8">
                    <div className="flex flex-col gap-2 items-center">
                        <div className="text-gray-950 text-lg font-bold">Archive Announcement?</div>
                        <div className="text-gray-700 text-sm text-center">Archiving this announcement will remove it from active view. It can be restored later if needed. Do you want to continue?</div>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <Button variant="outlined" size="sm" onClick={closeConfirmArchive} >Cancel</Button>
                        <Button size="sm" onClick={confirmArchive} >Archive</Button>
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
                            <Button variant="secondary" size="sm" onClick={notifyUnreadUser}>Notify All</Button>
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

            {
                isCommendOpen && <Comment announcements={announcements} isCommendOpen={isCommendOpen} setIsCommentOpen={setIsCommentOpen} closeComment={closeComment} />
            }

        </AuthenticatedLayout>
    )
}