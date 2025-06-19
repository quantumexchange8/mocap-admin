import Button from "@/Components/Button";
import { Announcement, CommentIcon, DeleteIcon, LogoIcon, PencilIcon, ScheduleConfigIcon, SendIcon, TrashIcon } from "@/Components/Icon/Outline";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import { formatDate, formatDMYTime } from "@/Composables";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Breadcrumb, Image, Progress, TimePicker } from "antd";
import { Calendar } from "primereact/calendar";
import React, { useState } from "react";
import dayjs from 'dayjs';
import toast from "react-hot-toast";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { DeleteIllus } from "@/Components/Icon/Illustration";
import PublishedIllus from "@/Components/Icon/Illustration/Publish";

export default function DraftAnnouncementDetails({ announcements, totalVote }) {

    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isConfirmPublishOpen, setIsConfirmPublishOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let minDate = new Date();

    const { data, setData, post, processing, errors, isDirty, reset } = useForm({
        id: announcements.id,
        schedule_date: announcements.schedule_date ?? null,
        schedule_time: announcements.schedule_time ?? null,
    });

    const deleteDraft = () => {
        setIsDeleteConfirmOpen(true);
    }
    const closeConfirmDelete = () => {
        setIsDeleteConfirmOpen(false);
    }

    const editDraft = () => {
        window.location.href = `/edit-draft-announcement/${announcements.id}`
    }

    const openConfirmPublish = () => {
        setIsConfirmPublishOpen(true);
    }
    const closeConfirmPublish = () => {
        setIsConfirmPublishOpen(false);
    }

    const publishDraft = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post('/publish-draft-announcement', {
            onSuccess: () => {
                toast.success('Announcement published successfully!', {
                    title: 'Announcement published successfully!',
                    duration: 3000,
                    variant: 'variant1',
                });
                window.location.href = '/announcement';
                setIsLoading(false);
            },
        })
    }

    const openSchedular = () => {
        setIsScheduleOpen(true)
    }
    const closeSchedular = () => {
        setIsScheduleOpen(false)
    }

    const confirmDelete = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post('/remove-draft-announcement', {
            onSuccess: () => {
                toast.success('Draft has been deleted.', {
                    title: 'Draft has been deleted.',
                    duration: 3000,
                    variant: 'variant1',
                });
                window.location.href = '/announcement';
                setIsLoading(false);
            },
        })
    }

    const confirmSchedule = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post('/update-draft-schedule', {
            onSuccess: () => {
                toast.success('Announcement published successfully!', {
                    title: 'Announcement published successfully!',
                    duration: 3000,
                    variant: 'variant1',
                });
                window.location.href = '/announcement';
                reset();
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
                toast.error(`${errors.schedule_time ? errors.schedule_time : 'Errors'}`, {
                    title: `${errors.schedule_time ? errors.schedule_time : 'Errors'}`,
                    duration: 3000,
                    variant: 'variant1',
                });
            }
        })
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
                                    <span className="text-gray-950 text-sm font-semibold">Draft - Announcement Details</span>
                                )
                            }
                        ]}
                    />
                    <div className="flex items-center gap-3">
                        <Button variant="outlined" size="sm" className='flex items-center gap-2' onClick={deleteDraft} >
                            <TrashIcon />
                            <span>Delete</span>
                        </Button>
                        <Button variant="outlined" size="sm" className='flex items-center gap-2' onClick={editDraft} >
                            <PencilIcon />
                            <span>Edit</span>
                        </Button>
                        <Button size="sm" className='flex items-center gap-2' onClick={openConfirmPublish} >
                            <span>Publish</span>
                            <SendIcon className='text-white' />
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
                            <div>
                                <Button variant="secondary" size="sm" className="flex items-center gap-2" onClick={openSchedular} >
                                    <ScheduleConfigIcon />
                                    <span>Change Scheduled Time</span>
                                </Button>
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
                        <div className="flex justify-center ">
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
                                                                <img src={fileUrl.url} alt={`attachment-${index}`} className="max-h-12 rounded shadow" />
                                                                <div className="flex flex-col w-full">
                                                                    <div className="text-gray-950 text-sm font-medium">{fileUrl.file_name}</div>
                                                                    <div className="text-gray-500 text-xs">{fileUrl.size / 1000} KB</div>
                                                                </div>
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
                                                <div key={index} className="flex flex-col ">
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-gray-950 text-base">{poll.option_name}</div>
                                                        <div className="text-base font-semibold text-gray-950">{poll.votes} vote</div>
                                                    </div>
                                                    <div>
                                                        <Progress percent={0} showInfo={false} />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                                        <div>{totalVote} votes</div>
                                        <div>•</div>
                                        <div>expires on {announcements.announcement_poll.expired_at ? formatDMYTime(announcements.announcement_poll.expired_at) : ''}</div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <Modal
                show={isScheduleOpen}
                maxWidth='md'
                title='Schedule Announcement'
                onClose={closeSchedular}
                footer={
                    <div className="flex justify-end gap-4 w-full">
                        <Button size="sm" variant="outlined" onClick={closeSchedular}>Cancel</Button>
                        <Button size="sm" onClick={confirmSchedule} disabled={isLoading} >Confirm</Button>
                    </div>
                }
            >
                <div className="py-3 px-6 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <InputLabel value='Select the time to publish' />
                        <div className="grid grid-cols-2 gap-5">
                            <Calendar 
                                value={data.schedule_date ? new Date(data.schedule_date) : null}
                                onChange={(e) => setData('schedule_date', e.value)} 
                                className="w-full text-sm"
                                placeholder="dd/mm/yyyy"
                                dateFormat="dd/mm/yy"
                                invalid={!!errors.schedule_date}
                                minDate={minDate}
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
                            <TimePicker
                                format="HH:mm"
                                value={data.schedule_time ? dayjs(data.schedule_time, 'HH:mm') : null}
                                onChange={(time, timeString) => setData('schedule_time', timeString)}
                                allowClear
                                disabledTime={() => {
                                    const now = dayjs();
                                    const selectedDate = dayjs(data.schedule_date);
                                    if (!data.schedule_date || !selectedDate.isSame(now, 'day')) {
                                      return {}; // No time restriction if not today
                                    }
                                
                                    const currentHour = now.hour();
                                    const currentMinute = now.minute();
                                
                                    return {
                                      disabledHours: () => Array.from({ length: currentHour }, (_, i) => i),
                                      disabledMinutes: (selectedHour) => {
                                        if (selectedHour === currentHour) {
                                          return Array.from({ length: currentMinute + 1 }, (_, i) => i);
                                        }
                                        return [];
                                      },
                                    };
                                }}
                            />
                        </div>
                    </div>
                    <div className="text-gray-700 text-sm">The announcement will be published at  {data.schedule_date ? dayjs(data.schedule_date).format('YYYY-MM-DD') : '-'} {data.schedule_time ? data.schedule_time : '-'}</div>
                </div>
            </Modal>

            <ConfirmDialog show={isConfirmDeleteOpen} >
                <div className="p-6 flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-3">
                        <div>
                            <DeleteIllus />
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <div className="text-gray-950 text-lg font-bold ">Delete Draft</div>
                            <div className="text-gray-700 text-sm text-center">You're about to permanently delete this draft. This action cannot be undone. Are you sure you want to proceed?</div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <Button variant="outlined" size="sm" onClick={closeConfirmDelete} >Cancel</Button>
                        <Button variant="danger" size="sm" onClick={confirmDelete}>Yes, Delete</Button>
                    </div>
                </div>
            </ConfirmDialog>

            <ConfirmDialog show={isConfirmPublishOpen} >
                <div className="flex flex-col items-center gap-8 p-6">
                    <div className="flex flex-col gap-3 items-center">
                        <div>
                            <PublishedIllus />
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <div className="text-gray-950 text-lg font-bold">
                                Ready to Publish?
                            </div>
                            <div className="text-gray-700 text-sm text-center">
                                You're about to publish this announcement to the selected employees. Review carefully as changes cannot be made after publishing. Do you want to proceed?
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 w-full">
                        <Button size="sm" variant="outlined" onClick={closeConfirmPublish}>Cancel</Button>
                        <Button size="sm" onClick={publishDraft}>Yes, Publish Now</Button>
                    </div>
                </div>
            </ConfirmDialog>
        </AuthenticatedLayout>
    )
}