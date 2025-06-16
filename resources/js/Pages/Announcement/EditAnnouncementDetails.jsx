import Button from "@/Components/Button";
import { Announcement, CommentIcon, DeleteIcon, GripVerticalIcon, LikeIcon, LogoIcon, PaperClipIcon, PinIcon, PlusIcon, ThumbnailIcon, XIcon } from "@/Components/Icon/Outline";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Pin from "@/Components/Pin/Pin1";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Breadcrumb, Progress, Segmented, Switch, TreeSelect, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import Dragger from "antd/es/upload/Dragger";
import { Editor } from "primereact/editor";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import Modal from "@/Components/Modal";
import toast from "react-hot-toast";

export default function EditAnnouncementDetails({ draftAnnouncements }) {

    const user = usePage().props.auth?.user;

    const [fileList, setFileList] = useState([]);
    const [fileList2, setFileList2] = useState([]);
    const [getEmployee, setGetEmployee] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [treeLine, setTreeLine] = useState(true);
    const [progressPercent, setProgressPercent] = useState(0);
    const [removedExistingFiles, setRemovedExistingFiles] = useState([]);
    const [previewDialog, setPreviewDialog] = useState(false);
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
        id: draftAnnouncements.id,
        recipient: [],
        subject: draftAnnouncements.subject || '',
        content_text: draftAnnouncements.content_text || '',
        pin_bool: draftAnnouncements.pin === 0 ? false : true,
        like: draftAnnouncements.like_bool === 'no' ? false : true,
        commend: draftAnnouncements.comment === 'no' ? false : true,
        pin_type: draftAnnouncements.pin_type || '',
        thumbnail: null,
        removeThumbnail: false,
        thumbnailPreview: null,
        attachment: null,
        removeAttachment: null,
        poll_question: draftAnnouncements?.announcement_poll?.option_name || '',
        option: draftAnnouncements?.announcement_poll ? draftAnnouncements.announcement_poll.poll_options.map(poll => ({
            id: poll.id.toString(), 
            option_name: poll.option_name || '', 
            order_no: poll.order_no || (poll.order_no === 0 ? 0 : '')
        })) : [
            {id: Date.now().toString() , option_name: '', order_no: 1}
        ],
        duration_type: draftAnnouncements?.announcement_poll ? draftAnnouncements.announcement_poll.duration_type : 'set_end_date',
        end_date: draftAnnouncements?.announcement_poll?.duration_date ? new Date(draftAnnouncements.announcement_poll.duration_date) : null,
        length_day: draftAnnouncements?.announcement_poll ? draftAnnouncements.announcement_poll.duration_days : '',
        length_hour: draftAnnouncements?.announcement_poll ? draftAnnouncements.announcement_poll.duration_hours : '',
        length_minute: draftAnnouncements?.announcement_poll ? draftAnnouncements.announcement_poll.duration_minutes : '',
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

    useEffect(() => {
        if (draftAnnouncements && getEmployee.length > 0) {
            const recipients = [];
    
            // Add "all" if it's a full announcement
            if (draftAnnouncements.all_user === 1) {
                recipients.push("all");
            }
    
            // Add recipients based on announcement_user
            draftAnnouncements.announcement_user.forEach(item => {
    
                if (item.department) {
                    recipients.push(item.department.name); // department name was stored
                } else {
                    recipients.push(item.user.name); // user name was stored
                }
            });
    
            // Avoid duplicates
            const uniqueRecipients = [...new Set(recipients)];
    
            setData("recipient", uniqueRecipients);
        }
    }, [draftAnnouncements, getEmployee]);

    useEffect(() => {
        if (draftAnnouncements.thumbnail) {
            setData('thumbnailPreview', draftAnnouncements.thumbnail);
        }
    }, [])

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

    // Thumbnail
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
                    setData('removeThumbnail', true)
                    setFileList([]);
                    setIsLoading(false);
                    return 100;
                }
                return prev + 5; // Increase by 5% every 100ms → 2 seconds total
            });
        }, 100);
    }

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

    const onChangeCropImg = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
          message.error('只能上传图片文件!');
        }
        return isImage;
    };

    // Attachment
    const props = {
        name: 'file',
        multiple: true,
        accept: '.pdf,.jpg,.jpeg,.png',
        showUploadList: false,
        beforeUpload: () => false, // prevent auto upload
        onChange({ fileList }) {
            const newFiles = fileList.filter(f => !f.uid.toString().startsWith('existing-'));
            const files = newFiles.map(file => file.originFileObj);
            setData('attachment', files);
    
            setFileList2(fileList);
        }
    };

    useEffect(() => {
        if (draftAnnouncements.attachment && draftAnnouncements.attachment.length > 0) {
            
            const existingFiles = draftAnnouncements.attachment.map((item, index) => ({
                uid: `existing-${index}`,
                name: item.file_name || item.url.split('/').pop(), // fallback to filename from URL
                url: item.url,
                type: item.file_name?.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg', // adjust type as needed
                status: 'done',
                uuid: item.uuid,
                size: item.size,
            }));
    
            setFileList2(existingFiles);
        }
    }, [draftAnnouncements]);

    const removeFile = (indexToRemove) => {
        const fileToRemove = fileList2[indexToRemove];
        const updatedList = fileList2.filter((_, index) => index !== indexToRemove);
        setFileList2(updatedList);
    
        if (fileToRemove.uid.toString().startsWith('existing-')) {
            const fileUuid = fileToRemove.uuid; // must be passed from draftAnnouncements
    
            if (fileUuid) {
                setData(prev => ({
                    ...prev,
                    removeAttachment: [...(prev.removeAttachment || []), fileUuid]
                }));
            }
        } else {
            const updatedAttachment = data.attachment.filter((_, idx) => {
                const newFiles = fileList2.filter(f => !f.uid.toString().startsWith('existing-'));
                const attachmentIndex = newFiles.findIndex(f => f.uid === fileToRemove.uid);
                return idx !== attachmentIndex;
            });
    
            setData('attachment', updatedAttachment);
        }
    };

    // Poll
    const handleAdd = () => {
        const newId = (Date.now()).toString(); // generate unique id
        const newPosition = { id: newId, option_name: '', order_no: data.option.length + 1 };
        setData(prev => ({
            ...prev,
            option: [...prev.option, newPosition],
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

    const openPreview = () => {
        setPreviewDialog(true);
    }
    const closePreview = () => {
        setPreviewDialog(false);
    }

    const save = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post('/update-draft-announcement', {
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
                                    <span className="text-gray-950 text-sm font-semibold">Edit Draft</span>
                                )
                            }
                        ]}
                    />
                    <div className="flex items-center gap-3">
                        <Button variant="outlined" size="sm" className='flex items-center gap-2' onClick={openPreview} >
                            <span>Preview</span>
                        </Button>
                        <Button size="sm" className='flex items-center gap-2' onClick={save} >
                            <span>Save Changes</span>
                        </Button>
                    </div>
                </div>

                {/* content */}
                <div className="py-12 px-5 w-full flex justify-center">
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
                                                            {
                                                                fileList && (
                                                                    <div className="text-sm text-gray-700">
                                                                        {/* {data.thumbnail.name} */}
                                                                    </div>
                                                                )
                                                            }
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
                                    fileList2.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-3">
                                            {
                                                fileList2.map((file, index) => (
                                                    <div key={index} className="flex items-center justify-between gap-3 border border-dashed border-gray-200 rounded ">
                                                        <div className="flex items-center gap-3">
                                                            <div className="max-w-16 h-16">
                                                                {
                                                                    file.type?.startsWith("image/") ? (
                                                                        <img
                                                                            src={file.url ? file.url : URL.createObjectURL(file.originFileObj)}
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
                                                                <div className="text-gray-500 text-xs">
                                                                    {
                                                                        file.size
                                                                            ? `${Math.round(file.size / 1000)} KB`
                                                                            : 'Uploaded'
                                                                    }
                                                                </div>
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
                            </div>
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
                                
                        </div>
                    </div>
                </div>
            </div>

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
                                <div className="flex items-center">
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
                                </div>
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
                        {
                            data.poll_question && (
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
                            )
                        }

                    </div>
                </div>
            </Modal>

        </AuthenticatedLayout>
    )
}