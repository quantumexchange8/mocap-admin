import Button from "@/Components/Button";
import { ChevronDown, DeleteIcon, Department, DepartmentIcon1, DepartmentIcon10, DepartmentIcon2, DepartmentIcon3, DepartmentIcon4, DepartmentIcon5, DepartmentIcon6, DepartmentIcon7, DepartmentIcon8, DepartmentIcon9, GripVerticalIcon, PlusIcon } from "@/Components/Icon/Outline";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { ColorPicker, Select } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import axios from "axios";
import { ReactSortable } from "react-sortablejs";
import Editor from "@/Components/Editor";
import InputError from "@/Components/InputError";
import toast from "react-hot-toast";

export default function CreateDepartment() {

    const [colorOpen, setColorOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [getUser, setGetUser] = useState([]);

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

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        icon: null,
        color: '#000000',
        head_department: '',
        position: [
            { id: Date.now().toString() ,name: '', order_no: 1 },
        ],
        job_description: '',
        job_regulation: '',
    });

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

    // Color
    const handleColorChange = (color) => {
        setData('color', color.toHexString()); // 明确转换为 HEX 格式
    };

    const handleSelectChange = (selected) => {
        setData('head_department', selected)
    }

    // Position
    const handleAdd = () => {
        const newId = (Date.now()).toString(); // generate unique id
        const newPosition = { id: newId, name: '', order_no: data.position.length + 1 };
        setData(prev => ({
            ...prev,
            position: [...prev.position, newPosition],
        }));
    };
    
    const handleChange = (index, value) => {
        const newPositions = [...data.position];
        newPositions[index].name = value;
        setData(prev => ({
          ...prev,
          position: newPositions,
        }));
    };
    
    const handleRemove = (id) => {
        const newPositions = data.position
          .filter(item => item.id !== id)
          .map((item, idx) => ({ ...item, order_no: idx + 1 }));
        setData(prev => ({
          ...prev,
          position: newPositions,
        }));
    };
    
    const handleSort = (order) => {
        const newPositions = order.map((id, index) => {
            const item = data.position.find(p => p.id === id);
            return {
                ...item,
                order_no: index + 1,
            };
        });
        setData(prev => ({
            ...prev,
            position: newPositions,
        }));
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

        post('/store-department', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                reset();
                toast.success('Succesfully Created Department.', {
                    title: 'Succesfully Created Department.',
                    duration: 3000,
                    variant: 'variant1',
                });
                setTimeout(() => {
                    window.location.href = `/department`
                }, 1500); // 1.5 second
            },
            onError: () => {
                setIsLoading(false);
                toast.error('Succesfully Created Department.', {
                    title: 'Succesfully Created Department.',
                    duration: 3000,
                    variant: 'variant1',
                });
            }
        })
    }

    return (
        <AuthenticatedLayout
            header="Departments"
        >

        <Head title="New Departments" />

        <div className="flex flex-col">
            <div className="w-full sticky top-[55px] bg-white z-30 py-2 px-5 flex justify-between items-center border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <span><Department /></span>
                        <span>Departments</span>
                    </div>
                    <div className="text-gray-400 text-base">/</div>
                    <div className="text-gray-950 text-sm font-semibold">New Department</div>
                </div>
                <div>
                    <Button size="sm" onClick={submit} disabled={isLoading}>Create</Button>
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
                        <div className="text-gray-500 text-xs ">Colour selected will be the department icon colour.</div>
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
                                                data.icon === id ? 'border-gray-500' : 'border-gray-300'
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
                            {/* Upload custom icon */}
                            {/* <div className="grid grid-cols-10 justify-items-start">
                                <div className="w-[60px] h-[60px] border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center rounded text-gray-500 hover:text-gray-950"><PlusIcon className='w-6 h-6' /></div>
                                <div className="w-[60px] h-[60px] border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center rounded text-gray-500 hover:text-gray-950">
                                    
                                </div>

                            </div> */}
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

                    {/* head of department */}
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
                                ref={quillRef}
                                value={data.job_description}
                                onChange={handleDescriptionChange}
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
                                ref={quillRef2}
                                value={data.job_regulation}
                                onChange={handleRegulationChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </AuthenticatedLayout>
    )
}