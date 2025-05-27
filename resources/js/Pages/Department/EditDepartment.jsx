import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, DeleteIcon, Department, DepartmentIcon1, DepartmentIcon10, DepartmentIcon2, DepartmentIcon3, DepartmentIcon4, DepartmentIcon5, DepartmentIcon6, DepartmentIcon7, DepartmentIcon8, DepartmentIcon9, GripVerticalIcon, PlusIcon } from "@/Components/Icon/Outline";
import Button from "@/Components/Button";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Breadcrumb, ColorPicker, Select } from "antd";
import { ReactSortable } from "react-sortablejs";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { UnsavedIllus } from "@/Components/Icon/Illustration";
import toast from "react-hot-toast";
import { Editor } from "primereact/editor";

export default function EditDepartment({ department }) {

    const [isLoading, setIsLoading] = useState(false);
    const [colorOpen, setColorOpen] = useState(false);
    const [confirmLeaveOpen, setConfirmLeaveOpen] = useState(false);
    const [nextUrl, setNextUrl] = useState(null);
    const [getUser, setGetUser] = useState([]);
    const isSubmittingRef = useRef(false);

    const fetchUser = async () => {
        setIsLoading(true);
        try {
            
            const response = await axios.get('/getUserListing');
            setGetUser(response.data);

        } catch (error) {
            console.error('error ', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);


    const { data, setData, post, processing, errors, reset, isDirty } = useForm({
        id: department.id || '',
        name: department.name || '',
        icon: department.icon || null,
        color: department.color || '#000000',
        head_department: department.head_id || '',
        position: department.position ? department.position.map(pos => ({
            id: pos.id.toString(),
            name: pos.position_name || '',
            order_no: pos.order_no || (pos.order_no === 0 ? 0 : '') // 处理order_no为0的情况
        })) : [
            { id: '', name: '', order_no: '' }
        ],
        job_description: department.job_description || '',
        job_regulation: department.job_regulation || '',
    });

    useEffect(() => {
        const handler = (event) => {
            if (isDirty && !isSubmittingRef.current) {
                event.preventDefault();
                setNextUrl(event.detail.visit.url);
                setConfirmLeaveOpen(true);
            }
        };
    
        const unlisten = router.on('before', handler);
        return () => unlisten();
    }, [isDirty]);

    const confirmLeave = () => {
        setConfirmLeaveOpen(false);
        window.location.href = `${nextUrl.pathname}`
    };

    const handleColorChange = (color) => {
        setData('color', color.toHexString()); // 明确转换为 HEX 格式
    };

    // head
    const handleSelectChange = (selected) => {
        setData('head_department', selected)
    }

    // Icon
    const defaultIcons = [
        { id: 'icon1', component: <DepartmentIcon1 color={data.color} /> },
        { id: 'icon2', component: <DepartmentIcon2 color={data.color} /> },
        { id: 'icon3', component: <DepartmentIcon3 color={data.color} /> },
        { id: 'icon4', component: <DepartmentIcon4 color={data.color} /> },
        { id: 'icon5', component: <DepartmentIcon5 color={data.color} /> },
        { id: 'icon6', component: <DepartmentIcon6 color={data.color} /> },
        { id: 'icon7', component: <DepartmentIcon7 color={data.color} /> },
        { id: 'icon8', component: <DepartmentIcon8 color={data.color} /> },
        { id: 'icon9', component: <DepartmentIcon9 color={data.color} /> },
        { id: 'icon10', component: <DepartmentIcon10 color={data.color} /> },
    ];

    //Position
    const handleAdd = () => {
        const newId = Date.now().toString(); // generate unique id
        const newPosition = { 
            id: newId, 
            name: '', 
            order_no: data.position.length + 1 
        };
        setData('position', [...data.position, newPosition]);
    };
    
    const handleChange = (index, value) => {
        const newPositions = [...data.position];
        newPositions[index].name = value;
        setData('position', newPositions);
    };

    const handleRemove = (id) => {
        const newPositions = data.position
            .filter(item => item.id !== id)
            .map((item, idx) => ({ 
                ...item, 
                order_no: idx + 1 
            }));
        setData('position', newPositions);
    };

    const handleSort = (order) => {
        const newPositions = order.map((id, index) => {
            const item = data.position.find(p => p.id === id);
            return {
                ...item,
                order_no: index + 1,
            };
        });
        setData('position', newPositions);
    };

    // Editor
    const quillRef = useRef(null);
    const quillRef2 = useRef(null);

    const handleDescriptionChange = useCallback((value) => {
        setData('job_description', value);
    }, [setData]);
    
    const handleRegulationChange = useCallback((value) => {
        setData('job_regulation', value);
    }, [setData]);

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        isSubmittingRef.current = true;

        post('/update-department', {
            preserveScroll: true,
            onSuccess: () => {
                setConfirmLeaveOpen(false);
                setIsLoading(false);
                isSubmittingRef.current = false;
                reset();
                toast.success('Succesfully Created Department.', {
                    title: 'Succesfully Created Department.',
                    duration: 3000,
                    variant: 'variant1',
                });
            },
            onError: () => {
                isSubmittingRef.current = false;
                setIsLoading(false);
            }
        });
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

    return (
        <AuthenticatedLayout
            header="Departments"
        >
            <Head title="Edit Departments" />

            <div className="flex flex-col">
                <div className="w-full sticky top-[55px] bg-white z-30 py-2 px-5 flex justify-between items-center border-b border-gray-200">
                    <Breadcrumb 
                        items={[
                            {
                                href: '/department',
                                title: (
                                    <div className="flex items-center gap-2">
                                        <Department />
                                        <span>Departments</span>
                                    </div>
                                ),
                            },
                            {
                                title: (
                                    <span className="text-gray-950 text-sm font-semibold">Edit Department</span>
                                )
                            }
                        ]}
                    />
                    <div>
                        <Button size="sm" disabled={!isDirty || isLoading} onClick={submit} >{!isDirty ? 'Saved' : 'Save Changes'}</Button>
                    </div>
                </div>
                <div className="p-5 w-full flex justify-center">
                    <div className="max-w-[728px] w-full flex flex-col gap-8">
                        {/* Department name */}
                        <div className="flex flex-col gap-2">
                            <InputLabel value={
                                <div className="flex gap-1"><span>Department Name</span><span className="text-error-500">*</span></div>
                                }
                                hasError={!!errors.name}
                            /> 
                            <TextInput 
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="w-full"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                hasError={!!errors.name}
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* Color */}
                        <div className="flex flex-col gap-2">
                            <InputLabel value={
                                <div className="flex gap-1"><span>Colour</span><span className="text-error-500">*</span></div>
                            } /> 
                            <div className="flex">
                                <ColorPicker
                                    open={colorOpen}
                                    onOpenChange={setColorOpen}
                                    value={data.color}
                                    onChange={handleColorChange}
                                    showText={() => (
                                        <ChevronDown className="text-gray-400" />
                                    )}
                                    className="p-3 flex items-center gap-2 rounded-sm"
                                />
                            </div>
                        </div>

                        {/* Icon */}
                        <div className="flex flex-col gap-2">
                            <InputLabel value={
                                <div className="flex gap-1"><span>Icon</span><span className="text-error-500">*</span></div>
                                }
                                hasError={!!errors.icon} 
                            />
                            <div className="flex flex-col gap-4">
                                {/* default icon */}
                                <div className="grid grid-cols-10 justify-items-start">
                                    {
                                        defaultIcons.map(({ id, component }) => (
                                            <div
                                                key={id}
                                                className={`p-2.5 border rounded cursor-pointer hover:border-gray-950 ${
                                                    data.icon === id ? 'border-gray-950' : 'border-gray-300'
                                                }`}
                                                onClick={() => setData('icon', id)}
                                            >
                                                {component}
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-full h-[1px] bg-gray-200"></div>
                                    <div className="text-gray-500 text-xs min-w-[425px]">or upload icon with a max size of 5 MB. Recommended dimensions: 250*250 px.</div>
                                    <div className="w-full h-[1px] bg-gray-200"></div>
                                </div>
                            </div>
                        </div>           

                        {/* head of department */}
                        <div className="flex flex-col gap-2">
                            <InputLabel value={
                                <div className="flex gap-1"><span>Head of Department</span></div>
                            } /> 
                            <div className="">
                                <Select 
                                    showSearch
                                    placeholder="Select"
                                    className="antd-select-custom focus:ring-offset-transparent"
                                    onChange={handleSelectChange}
                                    value={data.head_department || ''}
                                    loading={isLoading}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={getUser.map(user => ({
                                        label: user.name,
                                        value: user.id,
                                    }))}
                                />
                            </div>
                        </div>

                        {/* Position */}
                        <div className="flex flex-col gap-2">
                            <InputLabel value={
                                <div className="flex gap-1"><span>Positions</span></div>
                            } />
                            <div className="flex flex-col gap-4">
                                {/* loop */}
                                <ReactSortable
                                    list={data.position}
                                    setList={(newList) => {
                                        // sort based on dragged list
                                        handleSort(newList.map(item => item.id));
                                    }}
                                    animation={200}
                                    handle=".drag-handle"
                                    className="flex flex-col gap-4"
                                >
                                    {
                                        data.position.map((pos, index) => (
                                            <div key={pos.id} data-id={pos.id} className="flex items-center gap-3">
                                                <div className="drag-handle max-w-[38px] max-h-[38px] w-full h-full flex justify-center items-center cursor-move">
                                                    <GripVerticalIcon />
                                                </div>
                                                <div className="w-full">
                                                    <TextInput
                                                        className="w-full"
                                                        type="text"
                                                        value={pos.name}
                                                        onChange={(e) => handleChange(index, e.target.value)}
                                                    />
                                                </div>
                                                <div className="w-full max-w-[38px] h-full max-h-[38px] flex items-center justify-center cursor-pointer hover:bg-gray-50 rounded-sm" onClick={() => handleRemove(pos.id)}>
                                                    <DeleteIcon />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </ReactSortable>

                                {/* Add position */}
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
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className="flex flex-col gap-2">
                            <InputLabel value={
                                <div className="flex gap-1"><span>Job Description</span></div>
                            } />
                            <div>
                                <Editor 
                                    value={data.job_description} 
                                    onTextChange={(e) => setData('job_description', e.htmlValue)} 
                                    style={{ height: '280px' }} 
                                    headerTemplate={header}
                                />
                            </div>
                        </div>

                        {/* Job Regulation */}
                        <div className="flex flex-col gap-2">
                            <InputLabel value={
                                <div className="flex gap-1"><span>Job Regulations</span></div>
                            } />
                            <div>
                                <Editor 
                                    value={data.job_regulation} 
                                    onTextChange={(e) => setData('job_regulation', e.htmlValue)} 
                                    style={{ height: '280px' }} 
                                    headerTemplate={header}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmDialog show={confirmLeaveOpen}>
                <div className='flex flex-col gap-8 p-6'>
                    <div className="flex flex-col items-center gap-3">
                        <div>
                            <UnsavedIllus />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-gray-950 text-lg font-bold">Unsaved Changes</div>
                            <div className="text-gray-700 text-sm text-center">
                                Entered information will be lost if you leave this page. Would you like to stay and continue?
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 justify-center'>
                        <div><Button size='sm' variant='outlined' onClick={confirmLeave}>Discard</Button></div>
                        <div><Button size='sm' onClick={submit}>Stay on Page</Button></div>
                    </div>
                </div>
            </ConfirmDialog>
        </AuthenticatedLayout>
    )
}