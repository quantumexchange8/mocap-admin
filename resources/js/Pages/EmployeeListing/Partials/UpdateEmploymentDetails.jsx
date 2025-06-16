import Button from "@/Components/Button";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { ClearIcon, DatePickerIcon } from "@/Components/Icon/Outline";
import { FemaleAvatar, MaleAvatar } from "@/Components/Icon/ProfilePhoto";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UpdateEmploymentDetails({ fetchEmployee, employmentDetails, isOpenEmploymentDetail, setIsOpenEmploymentDetail, closeEmploymentDetails }) {

    const employmentType = [
        {name: 'Internship'},
        {name: 'Probation'},
        {name: 'Permanent'},
    ];

    const [isLoading, setIsLoading] = useState(false);
    const [getPosition, setGetPosition] = useState([]);
    const [getDepartment, setGetDepartment] = useState([]);
    const [isConfirmDialog, setIsConfirmDialog] = useState(false);

    const fetchDepartment = async  () => {
        setIsLoading(true);
        try {

            const response = await axios.get('/getDepartment');
            
            setGetDepartment(response.data);
            
        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchPosition = async  () => {
        setIsLoading(true);
        try {

            const response = await axios.get('/getDepartmentposition');
            
            setGetPosition(response.data);
            
        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPosition();
        fetchDepartment();
    }, []);

    const transformedOptions = getPosition.map(dept => ({
        label: dept.department_name,
        items: dept.positions.map(pos => ({
            label: pos.position_name,
            value: pos.position_name, // or pos.id if you only want the ID
        }))
    }));

    const { data, setData, post, processing, errors, reset, isDirty } = useForm({
        id: '',
        employment_type: '',
        department_type: '',
        position_type: null,
        date_of_employment: null,
        intern_end_date: null,
    });

    useEffect(() => {
        if (employmentDetails) {
            setData('id', employmentDetails.id)
            setData('employment_type', employmentDetails.employee_type)
            setData('department_type', employmentDetails.department_id)
            setData('position_type', employmentDetails.position)
            setData('date_of_employment', new Date(employmentDetails.employee_date))
            setData('intern_end_date', new Date(employmentDetails.employee_end_date))
        }
    }, [employmentDetails]);

    const clearDate = () => {
        setData('date_of_employment', null)
    }

    const clearDate2 = () => {
        setData('intern_end_date', null)
    }

    const openConfirmDialog = () => {
        setIsConfirmDialog(true);
    }
    const closeConfirmDialog = () => {
        setIsConfirmDialog(false);
    }

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post('/update-employee-details', {
            preserveScroll: true,
            onSuccess: () => {
                setIsConfirmDialog(false);
                setIsOpenEmploymentDetail(false);
                setIsLoading(false);
                fetchEmployee();
                reset();
                toast.success(`Employment details updated successfully for ${employmentDetails.username}`, {
                    title: `Employment details updated successfully for ${employmentDetails.username}`,
                    duration: 3000,
                    variant: 'variant1',
                });
            },
            onError: () => {
                setIsConfirmDialog(false);
                setIsLoading(false);
            }
        })
    }

    return (
        <>
        
            <Modal
                show={isOpenEmploymentDetail}
                maxWidth='md'
                title='Employment Details'
                onClose={closeEmploymentDetails}
                footer={
                    <div className="flex justify-end gap-4 w-full">
                        <Button size="sm" variant="outlined" onClick={closeEmploymentDetails}>Cancel</Button>
                        <Button size="sm" disabled={!isDirty} onClick={openConfirmDialog} >Update</Button>
                    </div>
                }
            > 
                {
                    employmentDetails && (
                        <div className="py-3 px-6 flex flex-col gap-8">
                            <div className="flex items-center gap-3">
                                {
                                    employmentDetails.profile_image ? (
                                        <div className="max-w-12 min-w-12 w-full h-12 rounded-full">
                                            <img src={employmentDetails.profile_image} alt="" className="rounded-full w-12 h-12" />
                                        </div>
                                    ) : (
                                        <div className="rounded-full w-12 h-12">
                                            {
                                                employmentDetails.gender === 'male' ? (
                                                    <MaleAvatar className='w-12 h-12 rounded-full' />
                                                ) : (
                                                    <FemaleAvatar className='w-12 h-12 rounded-full' />
                                                )
                                            }
                                        </div>
                                    )
                                }
                                <div className="flex flex-col gap-1">
                                    <div className="text-gray-950 text-base font-semibold">{employmentDetails.name}</div>
                                    <div className="text-gray-500 text-sm">CTID: {employmentDetails.employee_id}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="col-span-2 flex flex-col gap-2">
                                    <InputLabel value='Employment Type' />
                                    <Dropdown 
                                        value={data.employment_type} 
                                        onChange={(e) => setData('employment_type', e.value)} 
                                        options={employmentType.map((item) => ({
                                            label: item.name,
                                            value: item.name,
                                        }))}
                                        optionLabel="label"
                                        placeholder="Select" 
                                        loading={isLoading}
                                        className="w-full text-sm"
                                        invalid={!!errors.employment_type}
                                        pt={{
                                            root: { className: 'border border-gray-300 rounded-sm px-4 py-3 text-gray-950 focus-within:border-gray-950 transition-colors duration-200' }, // main box
                                            panel: { className: 'p-dropdown-panel bg-white border border-gray-300 shadow-lg mt-0.5 rounded-sm' }, // dropdown list
                                            item: ({ context }) => ({
                                                className: `px-4 py-2 text-sm text-gray-950 hover:bg-gray-100 cursor-pointer ${
                                                    context.selected ? 'bg-gray-950 font-semibold text-white hover:bg-gray-800 ' : ''
                                                }`
                                            }),
                                            filterInput: { className: 'px-4 py-2 text-sm border border-gray-300 rounded-sm ' },
                                            filterContainer: { className: 'p-2'}
                                        }}
                                    />
                                    <InputError message={errors.employment_type} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Department' />
                                    <Dropdown 
                                        value={data.department_type || ''} 
                                        onChange={(e) => setData('department_type', e.value)} 
                                        options={getDepartment.map(department => ({
                                            label: department.name,
                                            value: department.id,
                                        }))}
                                        optionLabel="label"
                                        placeholder="Select" 
                                        loading={isLoading}
                                        className="w-full text-sm"
                                        invalid={!!errors.department_type}
                                        pt={{
                                            root: { className: 'border border-gray-300 rounded-sm px-4 py-3 text-gray-950 focus-within:border-gray-950 transition-colors duration-200' }, // main box
                                            panel: { className: 'p-dropdown-panel bg-white border border-gray-300 shadow-lg mt-0.5 rounded-sm' }, // dropdown list
                                            item: ({ context }) => ({
                                                className: `px-4 py-2 text-sm text-gray-950 hover:bg-gray-100 cursor-pointer ${
                                                    context.selected ? 'bg-gray-950 font-semibold text-white hover:bg-gray-800 ' : ''
                                                }`
                                            }),
                                            filterInput: { className: 'px-4 py-2 text-sm border border-gray-300 rounded-sm ' },
                                            filterContainer: { className: 'p-2'}
                                        }}
                                    />
                                    <InputError message={errors.department_type} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Position' />
                                    <Dropdown 
                                        value={data.position_type} 
                                        onChange={(e) => setData('position_type', e.value)} 
                                        options={transformedOptions}
                                        optionGroupLabel="label"
                                        optionGroupChildren="items"
                                        placeholder="Select" 
                                        loading={isLoading}
                                        className="w-full text-sm"
                                        invalid={!!errors.position_type}
                                        pt={{
                                            root: { className: 'border border-gray-300 rounded-sm px-4 py-3 text-gray-950 focus-within:border-gray-950 transition-colors duration-200' }, // main box
                                            panel: { className: 'p-dropdown-panel bg-white border border-gray-300 shadow-lg mt-0.5 rounded-sm px-1 py-3' }, // dropdown list
                                            item: ({ context }) => ({
                                                className: `px-4 py-2 text-sm text-gray-950 hover:bg-gray-100 cursor-pointer ${
                                                    context.selected ? 'bg-gray-950 font-semibold text-white hover:bg-gray-800 ' : ''
                                                }`
                                            }),
                                            
                                            itemGroup: { className: 'px-4' },
                                            itemGroupLabel: { className: 'text-gray-500 text-xs' },
                                            filterInput: { className: 'px-4 py-2 text-sm border border-gray-300 rounded-sm ' },
                                            filterContainer: { className: 'p-2'}
                                        }}
                                    />
                                    <InputError message={errors.position_type} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Department' />
                                    <div className="relative">
                                        <Calendar 
                                            value={data.date_of_employment}
                                            onChange={(e) => setData('date_of_employment', e.value)} 
                                            className="w-full text-sm"
                                            placeholder="dd/mm/yyyy"
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
                                            readOnlyInput
                                        />
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            {
                                                data.date_of_employment === null ? (
                                                    <DatePickerIcon />
                                                ) : (
                                                    <span className="cursor-pointer" onClick={clearDate}>
                                                        <ClearIcon />
                                                    </span>
                                                )
                                            }
                                            
                                        </div>
                                    </div>
                                    <InputError message={errors.date_of_employment} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Department' />
                                    <div className="relative">
                                        <Calendar 
                                            value={data.intern_end_date}
                                            onChange={(e) => setData('intern_end_date', e.value)} 
                                            className="w-full text-sm"
                                            placeholder="dd/mm/yyyy"
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
                                            readOnlyInput
                                        />
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            {
                                                data.intern_end_date === null ? (
                                                    <DatePickerIcon />
                                                ) : (
                                                    <span className="cursor-pointer" onClick={clearDate2}>
                                                        <ClearIcon />
                                                    </span>
                                                )
                                            }
                                            
                                        </div>
                                    </div>
                                    <InputError message={errors.intern_end_date} />
                                </div>
                            </div>
                        </div>
                    )
                }
            </Modal>

            {
                isConfirmDialog && (
                    <ConfirmDialog
                        show={isConfirmDialog}
                    >
                        <div className='flex flex-col gap-8 p-6'>
                            <div className="flex flex-col items-center gap-2">
                                <div className="text-gray-950 text-lg font-bold">Confirm Employment Update</div>
                                <div className="text-gray-700 text-sm text-center">
                                Are you sure you want to update the employment details for <span className="font-semibold">{employmentDetails?.name}</span>? Please review carefully before submitting.
                                </div>
                            </div>
                            <div className='flex items-center gap-4 justify-center'>
                                <div><Button size='sm' variant='outlined' onClick={closeConfirmDialog}>Cancel</Button></div>
                                <div><Button size='sm' onClick={submit}>Confirm</Button></div>
                            </div>
                        </div>
                    </ConfirmDialog>

                )
            }
        </>
    )
}