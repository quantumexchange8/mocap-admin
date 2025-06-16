import Button from "@/Components/Button";
import { Announcement, CalendarPlusIcon, CommentIcon, DeleteIcon, GripVerticalIcon, LikeIcon, LogoIcon, PaperClipIcon, PinIcon, PlusIcon, SendIcon, ThumbnailIcon, UploadIcon, XIcon } from "@/Components/Icon/Outline";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import Pin from "@/Components/Pin/Pin1";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Breadcrumb, Checkbox, Progress, Segmented, Switch, TimePicker, TreeSelect, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { Calendar } from "primereact/calendar";
import { Editor } from "primereact/editor";
import { InputNumber } from "primereact/inputnumber";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import dayjs from 'dayjs';
import toast from "react-hot-toast";
import InputError from "@/Components/InputError";
import ConfirmDialog from "@/Components/ConfirmDialog";
import PublishedIllus from "@/Components/Icon/Illustration/Publish";

export default function CreateAnnouncement() {

    const user = usePage().props.auth?.user;

    const [fileList, setFileList] = useState([]);
    const [fileList2, setFileList2] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [progressPercent, setProgressPercent] = useState(0);
    const [getEmployee, setGetEmployee] = useState([]);
    const { Dragger } = Upload;
    const [treeLine, setTreeLine] = useState(true);
    const [previewDialog, setPreviewDialog] = useState(false);
    const [scheduleDialog, setScheduleDialog] = useState(false);
    const [confirmPublish, setConfirmPublish] = useState(false);
    let minDate = new Date();

    const fetchEmployee = async () => {
        setIsLoading(true);
        
        try {
            
            const response = await axios.get('/getEmployeeTree');
            setGetEmployee(response.data);

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
        recipient: [],
        subject: '',
        content_text: '',
        pin_bool: false,
        like: false,
        commend: false,
        pin_type: '',
        thumbnail: null,
        thumbnailPreview: null,
        attachment: null,
        poll: false,
        poll_question: '',
        option: [
            { id: Date.now().toString() , option_name: '', order_no: 1 },
        ],
        duration_type: 'set_end_date',
        end_date: null,
        length_day: '',
        length_hour: '',
        length_minute: '',
        schedule_date: null,
        schedule_time: null,
    });

    const onRecipientChange = (value, label, extra) => {
        // Check if "all" is selected
        const isSelectingAll = value.includes('all');
    
        // Get all department-related values to exclude
        const allDeptValues = getEmployee
            .find(item => item.value === 'all')?.children
            ?.flatMap(dept => [
                dept.value,
                ...(dept.children?.map(emp => emp.value) || [])
            ]) || [];
    
        if (isSelectingAll) {
            // Filter out department-related values and remove any duplicate 'all'
            const others = value.filter(v => v !== 'all' && !allDeptValues.includes(v));
            const newValues = ['all', ...others.filter((v, i, arr) => arr.indexOf(v) === i)];
            setData('recipient', newValues);
        } else {
            // If "all" was selected before but not now, remove it
            const filtered = value.filter(v => v !== 'all');
            setData('recipient', filtered);
        }
    };
    

    const pinOptions = [
        { id: 'pin1', title1: 'important', title2: 'announcement', value: '1' },
        { id: 'pin2', title1: 'important', title2: 'action needed', value: '2' },
        { id: 'pin3', title1: 'excited', title2: 'event ahead!', value: '3' },
        { id: 'pin4', title1: 'SEASON’S', title2: 'greetings', value: '4' },
        { id: 'pin5', title1: 'LATEST', title2: 'COMPANY NEWS', value: '5' },
        { id: 'pin6', title1: 'QUICK', title2: 'REMINDER', value: '6' },
    ];

    const handleSelect = (id) => {
        setData('pin_type', id === data.pin_type ? '' : id); // deselect on second click
    };

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
          message.error('只能上传图片文件!');
        }
        return isImage;
    };

    const onChangeCropImg = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onCropComplete = async (file) => {
        if (file) {
          // 创建预览URL
          const previewUrl = URL.createObjectURL(file);
          
          setData({
            ...data,
            thumbnail: file,
            thumbnailPreview: previewUrl
          });
        }
    };

    React.useEffect(() => {
        return () => {
          if (data.thumbnailPreview) {
            URL.revokeObjectURL(data.thumbnailPreview);
          }
        };
    }, [data.thumbnailPreview]);
    

    const removeThumbnail = () => {
        setIsLoading(true);
        setProgressPercent(0);

        // Simulate a delay of 2 seconds
        const interval = setInterval(() => {
            setProgressPercent(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setData('thumbnail', null);
                    setData('thumbnailPreview', null);
                    setFileList([]);
                    setIsLoading(false);
                    return 100;
                }
                return prev + 5; // Increase by 5% every 100ms → 2 seconds total
            });
        }, 100);
    }

    const props = {
        name: 'file',
        multiple: true,
        accept: '.pdf,.jpg,.jpeg,.png',
        showUploadList: false,
        beforeUpload: () => false, // prevent auto upload
        onChange({ fileList }) {
            const files = fileList.map(file => file.originFileObj);
            setData('attachment', files);
            setFileList2(fileList); // keep Upload component in sync
        }
    };

    const removeFile = (indexToRemove) => {
        setData(prev => ({
            ...prev,
            attachment: prev.attachment.filter((_, index) => index !== indexToRemove),
        }));
        setFileList2(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const attachmentList = () => {

    }

    const renderHeader  = () =>{
        return (
            <>
                <span className="ql-formats">
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                </span>
                <span className="ql-formats">
                    <select className="ql-color" defaultValue="">
                        <option value="black"></option>
                        <option value="red"></option>
                        <option value="green"></option>
                        <option value="blue"></option>
                        <option value="orange"></option>
                        <option value="violet"></option>
                        <option value="#d0d1d2"></option>
                        <option value="" />
                    </select>
                    <select className="ql-background" defaultValue="">
                        <option value="black"></option>
                        <option value="red"></option>
                        <option value="green"></option>
                        <option value="blue"></option>
                        <option value="orange"></option>
                        <option value="violet"></option>
                    </select>
                </span>
                <span className="ql-formats">
                    <button className="ql-list" value="ordered" />
                    <button className="ql-list" value="bullet" />
                </span>
                <span className="ql-formats">
                    <button className="ql-align" value="" />
                    <button className="ql-align" value="center" />
                    <button className="ql-align" value="right" />
                </span>
                <span className="ql-formats">
                    <button className="ql-clean" />
                </span>
            </>
        )
    }

    const header = renderHeader();

    // Poll
    const handleAdd = () => {
        const newId = (Date.now()).toString(); // generate unique id
        const newPosition = { id: newId, option_name: '', order_no: data.option.length + 1 };
        setData(prev => ({
            ...prev,
            option: [...prev.option, newPosition],
        }));
    };

    const handleChange = (index, value) => {
        const newPositions = [...data.option];
        newPositions[index].option_name = value;
        setData(prev => ({
          ...prev,
          option: newPositions,
        }));
    };

    const handleRemove = (id) => {
        const newPositions = data.option
          .filter(item => item.id !== id)
          .map((item, idx) => ({ ...item, order_no: idx + 1 }));
        setData(prev => ({
          ...prev,
          option: newPositions,
        }));
    };

    const handleSort = (order) => {
        const newPositions = order.map((id, index) => {
            const item = data.option.find(p => p.id === id);
            return {
                ...item,
                order_no: index + 1,
            };
        });
        setData(prev => ({
            ...prev,
            option: newPositions,
        }));
    };

    const openScheduleDialog = () =>  {
        setScheduleDialog(true);
    }
    const closeScheduleDialog = () =>  {
        setScheduleDialog(false);
        setData('schedule_date', null);
        setData('schedule_time', null);
    }

    const confirmSchedule = () => {
        setScheduleDialog(false);

        toast.success('Announcement scheduled successfully!', {
            title: 'Announcement scheduled successfully!',
            duration: 3000,
            variant: 'variant1',
        });
    }

    const saveDraft = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post('/store-announcement-draft', {
            onSuccess: () => {
                toast.success('Draft saved successfully!', {
                    title: 'Draft saved successfully!',
                    duration: 3000,
                    variant: 'variant1',
                });
                window.location.href = '/announcement';
                reset();
                setIsLoading(false);
            },
            onError: (errors) => {
                setIsLoading(false);
                toast.error('Failed to save draft. Please try again.', {
                    title: `${errors?.schedule_date ? errors.schedule_date : 'Failed to save draft. Please try again.'}`,
                    duration: 3000,
                    variant: 'variant1',
                });
            }
        })
    }

    const openPreview = () => {
        setPreviewDialog(true);
    }
    const closePreview = () => {
        setPreviewDialog(false);
    }

    const openConfirmPublish = () => {
        setConfirmPublish(true);
    }
    const closeConfirmPublish = () => {
        setConfirmPublish(false);
    }

    const publish = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post('/store-announcement-publish', {
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
                setConfirmPublish(false);
            }
        })
    }

    return (
        <AuthenticatedLayout header="Announcement" >
            <Head title="New Announcement" />

            <div className="flex flex-col">
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
                                    <span className="text-gray-950 text-sm font-semibold">New Announcement</span>
                                )
                            }
                        ]}
                    />
                    <div className="flex items-center gap-3">
                        <Button variant="outlined" size="sm" className='flex items-center gap-2' onClick={openPreview} >
                            <span>Preview</span>
                        </Button>
                        <Button variant="outlined" size="sm" className='flex items-center gap-2' onClick={saveDraft} >
                            <span>Save as Draft</span>
                        </Button>
                        <Button variant="outlined" size="sm" className='flex items-center gap-2' onClick={openScheduleDialog} >
                            <CalendarPlusIcon />
                            <span>Schedule</span>
                        </Button>
                        <Button size="sm" className='flex items-center gap-2' onClick={openConfirmPublish} >
                            <span>Publish</span>
                            <SendIcon className='text-white' />
                        </Button>
                    </div>
                </div>

                <div className="p-5 w-full flex justify-center">
                    <div className="max-w-[728px] w-full flex flex-col gap-8">
                        {/* Recipient */}
                        <div className="flex flex-col gap-2">
                            <InputLabel value='Recipient' />
                            <TreeSelect
                                treeData={getEmployee}
                                value={data.recipient}
                                onChange={onRecipientChange}
                                treeCheckable={true}
                                treeLine={treeLine}
                                showCheckedStrategy={TreeSelect.SHOW_PARENT}
                                placeholder="Select recipients"
                                allowClear
                                multiple
                                showSearch
                                className="w-full custom-tree-select"
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                treeDefaultExpandAll
                                status={errors.recipient ? 'error' : ''}
                            />
                            {
                                errors.recipient ? (
                                    <InputError message={errors.recipient} />
                                ) : (
                                    <span className="text-gray-500 text-xs">Only selected members will receive the announcement.</span>
                                )
                            }
                            
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <InputLabel value='Content' />
                                <TextInput 
                                    id="subject"
                                    type="text"
                                    name="subject"
                                    value={data.subject}
                                    className="w-full"
                                    placeholder="Subject here"
                                    isFocused={false}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    hasError={!!errors.subject}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Editor 
                                    value={data.content_text} 
                                    onTextChange={(e) => setData('content_text', e.htmlValue)} 
                                    style={{ height: '280px' }}
                                    headerTemplate={header}
                                />
                                <span>
                                    <InputError message={errors.content_text} />
                                </span>
                            </div>
                        </div>

                        {/* Available for Like/Comment */}
                        <div className="w-full flex flex-col border border-gray-300 rounded-sm">
                            <div className="py-3 px-4 flex items-center gap-3">
                                <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm">
                                    <LikeIcon className='w-4 h-4' />
                                </div>
                                <div className="w-full flex flex-col">
                                    <div className="text-gray-950 text-sm font-medium">Availability for Like</div>
                                </div>
                                <div className="max-w-[35px] w-full">
                                    <Switch 
                                        checked={data.like}
                                        onChange={(checked) => setData('like', checked)}
                                    />
                                </div>
                            </div>
                            <div className="py-3 px-4 flex items-center gap-3 border-t border-gray-300">
                                <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm">
                                    <CommentIcon className='w-4 h-4' />
                                </div>
                                <div className="w-full flex flex-col">
                                    <div className="text-gray-950 text-sm font-medium">Availability for Comment</div>
                                </div>
                                <div className="max-w-[35px] w-full">
                                    <Switch 
                                        checked={data.commend}
                                        onChange={(checked) => setData('commend', checked)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pin */}
                        <div className="w-full flex flex-col border border-gray-300 rounded-sm">
                            <div className="py-3 px-4 flex items-center gap-3">
                                <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm">
                                    <PinIcon />
                                </div>
                                <div className="w-full flex flex-col">
                                    <div className="text-gray-950 text-sm font-medium">Pin Announcement</div>
                                    <div className="text-gray-500 text-xs">Pin this announcement to the employee dashboard for increased visibility.</div>
                                </div>
                                <div className="max-w-[35px] w-full">
                                    <Switch 
                                        checked={data.pin_bool}
                                        onChange={(checked) => setData('pin_bool', checked)}
                                    />
                                </div>
                            </div>
                            {
                                data.pin_bool && (
                                    <div className="py-8 px-4 flex flex-col items-center gap-5 border-t border-gray-300">
                                        <div className="text-gray-500 text-xs w-full text-center">Select the preset banner to display on the employee dashboard.</div>
                                        <div className="w-full overflow-x-auto scrollbar-hide">
                                            <div className="flex items-center gap-5 flex-nowrap min-w-max">
                                                {
                                                    pinOptions.map(pin => (
                                                        <Pin
                                                            key={pin.id}
                                                            id={pin.id}
                                                            title1={pin.title1}
                                                            title2={pin.title2}
                                                            value={pin.value}
                                                            selected={data.pin_type === pin.id}
                                                            onSelect={handleSelect}
                                                        />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="w-full h-[1px] bg-gray-200"></div>
                                            <div className="text-gray-500 text-xs min-w-[440px]">or upload image with a max size of 5 MB. Recommended dimensions: 1280*720 px.</div>
                                            <div className="w-full h-[1px] bg-gray-200"></div>
                                        </div>
                                        <div>
                                            <Button className="flex items-center gap-2" size="sm">
                                                <PlusIcon />
                                                <span>Choose</span>
                                            </Button>
                                        </div>
                                        <div className="text-left w-full">
                                            <InputError message={errors.pin_type} />
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        {/* Thumbnail */}
                        <div className="w-full flex flex-col border border-gray-300 rounded-sm">
                            <div className="py-3 px-4 flex items-center gap-3">
                                <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm">
                                    <ThumbnailIcon />
                                </div>
                                <div className="w-full flex flex-col">
                                    <div className="text-gray-950 text-sm font-medium">Thumbnail</div>
                                    <div className="text-gray-500 text-xs">Upload an image to represent your announcement.</div>
                                </div>
                            </div>
                            <div className="py-8 px-4 flex flex-col gap-5 border-t border-gray-300">
                                <div className="text-gray-500 text-xs">Upload an image that fits the 9:16 aspect ratio for best display results. Once selected, use the crop tool to adjust the image to the correct dimensions.</div>
                                <div className="w-full">
                                    {
                                        data.thumbnailPreview ? (
                                            <div className="flex flex-col gap-5">
                                                <div className="flex">
                                                    <Button variant="outlined-danger" size="sm" onClick={removeThumbnail} disabled={isLoading} >
                                                        Remove
                                                    </Button>
                                                </div>
                                                {
                                                    isLoading ? (
                                                        <Progress percent={progressPercent} status="active" />
                                                    ) : (
                                                        <div className="flex flex-col gap-2">
                                                            {/* preview image */}
                                                            <div className="max-w-[480px] max-h-[270px]">
                                                                <img
                                                                    src={data.thumbnailPreview}
                                                                    alt="Thumbnail Preview"
                                                                    className="max-w-[480px] max-h-[270px]"
                                                                />
                                                            </div>
                                                            {/* file name */}
                                                            <div className="text-sm text-gray-700">
                                                                {fileList[0]?.name || data.thumbnail.name}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        ) : (
                                            <div>
                                                <ImgCrop modalTitle="Crop Image" aspect={16/9} quality={1} onModalOk={onCropComplete}>
                                                    <Upload
                                                        fileList={fileList}
                                                        onChange={onChangeCropImg}
                                                        beforeUpload={beforeUpload} // Prevent auto upload
                                                        maxCount={1}
                                                        accept="image/*"
                                                    >
                                                        <Button size="sm" className="flex items-center gap-2" disabled={isLoading}>
                                                            Choose Image
                                                        </Button>
                                                    </Upload>
                                                </ImgCrop>

                                                {
                                                    isLoading && (
                                                        <Progress percent={progressPercent} status="active" />
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                                <InputError message={errors.thumbnail} />
                            </div>
                        </div>

                        {/* Attachment */}
                        <div className="w-full flex flex-col border border-gray-300 rounded-sm">
                            <div className="py-3 px-4 flex items-center gap-3">
                                <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm">
                                    <PaperClipIcon />
                                </div>
                                <div className="w-full flex flex-col">
                                    <div className="text-gray-950 text-sm font-medium">Attachment</div>
                                    <div className="text-gray-500 text-xs">Upload supporting files that employees can download and reference.</div>
                                </div>
                            </div>
                            <div className="py-8 px-4 flex flex-col gap-5 border-t border-gray-300">
                                <Dragger {...props} fileList={fileList2}  listType="picture" >
                                    {
                                        data.attachment && data.attachment.length > 0 ? (
                                            <div className="grid grid-cols-2 gap-3">
                                                {
                                                    data.attachment.map((file, index) => (
                                                        <div key={index} className="flex items-center justify-between gap-3 border border-dashed border-gray-200 rounded ">
                                                            <div className="flex items-center gap-3">
                                                                <div className="max-w-16 h-16">
                                                                    {
                                                                        file.type?.startsWith("image/") ? (
                                                                            <img
                                                                                src={URL.createObjectURL(file)}
                                                                                alt="Preview"
                                                                                className="w-full h-full object-cover rounded"
                                                                            />
                                                                        ) : (
                                                                            <div className="p-3 w-full h-full flex items-center justify-center bg-gray-100 text-xxs text-gray-950">
                                                                                <div className="border border-error-400 rounded-sm rounded-tr-lg py-2.5 px-1 bg-white">
                                                                                    PDF
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className="flex flex-col items-start gap-1">
                                                                    <div className="text-gray-950 text-sm font-medium">{file.name}</div>
                                                                    <div className="text-gray-500 text-xs">{file.size / 1000} KB</div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <Button variant="text" size="sm" iconOnly 
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeFile(index);
                                                                    }}
                                                                >
                                                                    <DeleteIcon />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ) : (
                                            <div className="h-20 flex flex-col gap-1 items-center justify-center">
                                                <span className="text-sm text-gray-500">Click or drag file to this area to upload</span>
                                                <span className="text-gray-400 text-xs">Maximum file size is 5 MB. Supported file types are .pdf, .jpg and .png.</span>
                                            </div>
                                        )
                                    }
                                </Dragger>
                            </div>
                        </div>

                        {/* Poll */}
                        <div className="w-full flex flex-col border border-gray-300 rounded-sm">
                            <div className="py-3 px-4 flex items-center gap-3">
                                <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm">
                                    <PaperClipIcon />
                                </div>
                                <div className="w-full flex flex-col">
                                    <div className="text-gray-950 text-sm font-medium">Poll</div>
                                    <div className="text-gray-500 text-xs">Create a poll to gather feedback or votes from employees.</div>
                                </div>
                                <div>
                                    <Switch 
                                        checked={data.poll}
                                        onChange={(checked) => setData('poll', checked)}
                                    />
                                </div>
                            </div>
                            {
                                data.poll && (
                                    <div className="py-8 px-4 flex flex-col gap-5 border-t border-gray-300">
                                        <div>
                                            <TextInput 
                                                id="poll_question"
                                                type="text"
                                                name="poll_question"
                                                value={data.poll_question || ''}
                                                className="w-full"
                                                placeholder="Type your question..."
                                                isFocused={false}
                                                onChange={(e) => setData('poll_question', e.target.value)}
                                                hasError={!!errors.poll_question}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <InputLabel value='Options' />
                                            <div className="flex flex-col gap-4">
                                                <ReactSortable
                                                    list={data.option}
                                                    setList={(newList) => {
                                                        // sort based on dragged list
                                                        handleSort(newList.map(item => item.id));
                                                    }}
                                                    animation={200}
                                                    handle=".drag-handle"
                                                    className="flex flex-col gap-4"
                                                >
                                                    {
                                                        data.option.map((pos, index) => (
                                                            <div key={pos.id} data-id={pos.id} className="flex items-center gap-3">
                                                                <div className="drag-handle max-w-[38px] max-h-[38px] w-full h-full flex justify-center items-center cursor-move">
                                                                    <GripVerticalIcon />
                                                                </div>
                                                                <div className="w-full">
                                                                    <TextInput
                                                                        className="w-full"
                                                                        type="text"
                                                                        value={pos.option_name}
                                                                        onChange={(e) => handleChange(index, e.target.value)}
                                                                        placeholder="Enter option"
                                                                    />
                                                                </div>
                                                                <div className="w-full max-w-[38px] h-full max-h-[38px] flex items-center justify-center cursor-pointer hover:bg-gray-50 rounded-sm" onClick={() => handleRemove(pos.id)}>
                                                                    <XIcon />
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </ReactSortable>

                                                {/* Add option */}
                                                <div className="">
                                                    <Button 
                                                        variant="text" 
                                                        size="sm" 
                                                        className="flex items-center gap-2"
                                                        onClick={handleAdd}
                                                    >
                                                        <PlusIcon />
                                                        <span>Add</span>
                                                    </Button>
                                                </div>

                                                <InputError message={errors["option.0.option_name"]} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <InputLabel value='Duration' />
                                            <div>
                                                <Segmented 
                                                    options={[
                                                        { label: 'Set End Date', value: 'set_end_date' },
                                                        { label: 'Set Length', value: 'set_length' },
                                                    ]}
                                                    value={data.duration_type}
                                                    onChange={(value) => setData('duration_type', value)}
                                                    className="custom-segmented w-full"
                                                />
                                            </div>
                                            <div>
                                                {
                                                    data.duration_type === 'set_end_date' && (
                                                        <>
                                                            <Calendar 
                                                                value={data.end_date}
                                                                onChange={(e) => setData('end_date', e.value)} 
                                                                className="w-full text-sm"
                                                                placeholder="dd/mm/yyyy"
                                                                invalid={!!errors.end_date}
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
                                                            <InputError message={errors.end_date} />
                                                        </>
                                                    )
                                                }
                                                {
                                                    data.duration_type === 'set_length' && (
                                                        <>
                                                            <div className="w-full grid grid-cols-3 gap-5">
                                                                <div>
                                                                    <InputNumber 
                                                                        inputId="days"
                                                                        value={data.length_day || 0} 
                                                                        onValueChange={(e) => setData('length_day', e.value)} 
                                                                        suffix=" day(s)" 
                                                                        className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                                                        min={0}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <InputNumber 
                                                                        inputId="hours"
                                                                        value={data.length_hour || 0} 
                                                                        onValueChange={(e) => setData('length_hour', e.value)} 
                                                                        suffix=" hour(s)" 
                                                                        className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                                                        min={0}
                                                                        max={23}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <InputNumber 
                                                                        inputId="minutes"
                                                                        value={data.length_minute || 0} 
                                                                        onValueChange={(e) => setData('length_minute', e.value)} 
                                                                        suffix=" minute(s)" 
                                                                        className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                                                        min={0}
                                                                        max={59}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {
                                                                errors.length_day && (
                                                                    <InputError message='Cannot all be 0' className="mt-2" />
                                                                )
                                                            }
                                                            
                                                        </>
                                                    )
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Schedule Dialog */}
            <Modal
                show={scheduleDialog}
                maxWidth='md'
                title='Schedule Announcement'
                onClose={closeScheduleDialog}
                footer={
                    <div className="flex justify-end gap-4 w-full">
                        <Button size="sm" variant="outlined" onClick={closeScheduleDialog}>Cancel</Button>
                        <Button size="sm" onClick={confirmSchedule} disabled={!data.schedule_date || !data.schedule_time} >Confirm</Button>
                    </div>
                }
            >
                <div className="py-3 px-6 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <InputLabel value='Select the time to publish' />
                        <div className="grid grid-cols-2 gap-5">
                            <Calendar 
                                value={data.schedule_date}
                                onChange={(e) => setData('schedule_date', e.value)} 
                                className="w-full text-sm"
                                placeholder="dd/mm/yyyy"
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
                                showNow={false}
                                disabledTime={() => {
                                    const now = dayjs();
                                    const selectedDate = dayjs(data.schedule_date);

                                    // Only apply time restriction if selected date is today
                                    if (!data.schedule_date || !selectedDate.isSame(now, 'day')) {
                                        return {};
                                    }

                                    const minTime = now.add(15, 'minute');
                                    const minHour = minTime.hour();
                                    const minMinute = minTime.minute();

                                    return {
                                        disabledHours: () =>
                                            Array.from({ length: 24 }, (_, hour) =>
                                                hour < minHour ? hour : null
                                            ).filter((v) => v !== null),
                                        disabledMinutes: (selectedHour) => {
                                            if (selectedHour === minHour) {
                                                return Array.from({ length: minMinute }, (_, m) => m);
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

            <Modal 
                show={previewDialog} 
                maxWidth='lg'
                title='Preview Announcement'
                onClose={closePreview}
                showFooter="hidden"
            >
                <div className="py-8 px-6 w-full flex justify-center">
                    <div className="max-w-[728px] w-full flex flex-col gap-8">
                        <div className="flex items-center gap-3">
                            <div>
                                {
                                    user.profile_image ? (
                                        <div className="relative w-8 h-8 group">
                                            <img
                                                src={data.profile_image}
                                                className="w-8 h-8"
                                            />
                                        </div>
                                    ) : (
                                        <div className="relative w-8 h-8 group">
                                            <LogoIcon />
                                        </div>
                                    )
                                }
                            </div>
                            <div className="flex flex-col ">
                                <div className="text-gray-950 text-base font-semibold">{user.name}</div>
                                <div className="text-sm text-gray-500 ">Published: dd/mm/yyyy  00:00:00</div>
                            </div>
                        </div>
                        <div className="border-y border-gray-100 flex justify-between items-center text-gray-500 text-sm p-3">
                            <div className="flex items-center gap-2">
                                <span>To:</span>
                                <span>
                                    {
                                        data.recipient && (
                                            <>
                                                {
                                                    data.recipient.map((user, index) => (
                                                        <div key={index} className="flex items-center gap-1">
                                                            <span>{user}{index !== data.recipient.length - 1 && ','}</span>
                                                        </div>
                                                    ))
                                                }
                                            </>
                                        )
                                    }
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div><CommentIcon /></div>
                                <div className="text-gray-700 text-sm">0</div>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <div className=" max-w-[640px]">
                                <img src={data.thumbnailPreview ? data.thumbnailPreview : null} alt="" />
                            </div>
                        </div>
                        <div className="text-gray-950 text-xxl font-bold">
                            {data.subject ? data.subject : ''}
                        </div>
                        <div className="text-gray-950 text-lg">
                            {data.content_text && (
                                <div
                                    style={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: data.content_text }}
                                />
                            )}
                        </div>
                        {/* Attachment */}
                        <div>
                            {
                                data.attachment && data.attachment.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-3">
                                        {
                                            data.attachment.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between gap-3 border border-gray-200 rounded shadow-smShadow ">
                                                    <div className="flex items-center gap-3">
                                                        <div className="max-w-16 h-16">
                                                            {
                                                                file.type?.startsWith("image/") ? (
                                                                    <img
                                                                        src={URL.createObjectURL(file)}
                                                                        alt="Preview"
                                                                        className="w-full h-full object-cover rounded"
                                                                    />
                                                                ) : (
                                                                    <div className="p-3 w-full h-full flex items-center justify-center bg-gray-100 text-xxs text-gray-950">
                                                                        <div className="border border-error-400 rounded-sm rounded-tr-lg py-2.5 px-1 bg-white">
                                                                            PDF
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                        <div className="flex flex-col items-start gap-1">
                                                            <div className="text-gray-950 text-sm font-medium">{file.name}</div>
                                                            <div className="text-gray-500 text-xs">{file.size / 1000} KB</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        {/* option */}
                        <div className="flex flex-col gap-6">
                            <div>{data.poll_question ? data.poll_question : ''}</div>
                            <div className="flex flex-col gap-3">
                                {
                                    data.option.map((opt, index) => (
                                        <div key={index} className="flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <div className="text-gray-950 text-base">{opt.option_name}</div>
                                                <div className="text-gray-950 text-base font-semibold">0%</div>
                                            </div>
                                            <div className="w-full h-1 bg-gray-100 rounded-[10px]"></div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </Modal>

            <ConfirmDialog show={confirmPublish} >
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
                        <Button size="sm" onClick={publish}>Yes, Publish Now</Button>
                    </div>
                </div>
            </ConfirmDialog>

        </AuthenticatedLayout>
    )
}