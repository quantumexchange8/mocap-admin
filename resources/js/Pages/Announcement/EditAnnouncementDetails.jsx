import Button from "@/Components/Button";
import { Announcement, CommentIcon, LikeIcon, PaperClipIcon, PinIcon, ThumbnailIcon } from "@/Components/Icon/Outline";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Pin from "@/Components/Pin/Pin1";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Breadcrumb, Progress, Switch, TreeSelect, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { Editor } from "primereact/editor";
import React, { useEffect, useState } from "react";

export default function EditAnnouncementDetails({ draftAnnouncements }) {

    const [fileList, setFileList] = useState([]);
    const [fileList2, setFileList2] = useState([]);
    const [getEmployee, setGetEmployee] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [treeLine, setTreeLine] = useState(true);
    const [progressPercent, setProgressPercent] = useState(0);

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

    // console.log('draftAnnouncements', draftAnnouncements)

    const { data, setData, post, processing, errors, isDirty, reset } = useForm({
        recipient: [],
        subject: draftAnnouncements.subject || '',
        content_text: draftAnnouncements.content_text || '',
        pin_bool: draftAnnouncements.pin === 0 ? false : true,
        like: draftAnnouncements.like_bool === 'no' ? false : true,
        commend: draftAnnouncements.comment === 'no' ? false : true,
        pin_type: draftAnnouncements.pin_type || '',
        thumbnail: null,
        thumbnailPreview: null,
        attachment: null,
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

    useEffect(() => {
        if (draftAnnouncements && getEmployee.length > 0) {
            const recipients = [];
    
            // Add "all" if it's a full announcement
            if (draftAnnouncements.all_user === 1) {
                recipients.push("all");
            }
    
            // Add recipients based on announcement_user
            draftAnnouncements.announcement_user.forEach(item => {
                if (item.user) {
                    recipients.push(item.user.name); // user name was stored
                }
    
                if (item.department) {
                    recipients.push(item.department.name); // department name was stored
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
                    <button className="ql-list" value="ordered" />
                    <button className="ql-list" value="bullet" />
                </span>
                <span className="ql-formats">
                    <button className="ql-align" value="" />
                    <button className="ql-align" value="center" />
                    <button className="ql-align" value="right" />
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


    const preview = () => {

    }

    const save = () => {
        
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
                        <Button variant="outlined" size="sm" className='flex items-center gap-2' onClick={preview} >
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
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}