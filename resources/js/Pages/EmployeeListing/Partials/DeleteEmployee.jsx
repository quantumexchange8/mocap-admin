import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { Checkbox, Input, Radio } from 'antd';
import ConfirmDialog from "@/Components/ConfirmDialog";
import { DeleteIllus } from "@/Components/Icon/Illustration";
import { FemaleAvatar, MaleAvatar } from "@/Components/Icon/ProfilePhoto";

export default function DeleteEmployee({ 
    fetchEmployee,
    employmentDetails,
    isDeleteEmployeeOpen,
    setIsDeleteEmployeeOpen,
    closeDeleteEmployee,
}) {

    const reasons = [
        {name: 'Completion', value: 'completion'},
        {name: 'Termination', value: 'termination'},
        {name: 'Resignation', value: 'resignation'},
        {name: 'Retirement', value: 'retirement'},
        {name: 'Duplicate Entry', value: 'duplicate_entry'},
    ];

    const ratings = [
        {name: '1 - Unacceptable', value: '1'},
        {name: '2 - Very Poor', value: '2'},
        {name: '3 - Poor', value: '3'},
        {name: '4 - Fair', value: '4'},
        {name: '5 - Satisfactory', value: '5'},
        {name: '6 - Good', value: '6'},
        {name: '7 - Very Good', value: '7'},
        {name: '8 - Excellent', value: '8'},
        {name: '9 - Most Worth Hiring', value: '9'},
    ];

    const confirmCheck = [
        "I confirm that I have reviewed the above details and approve the deletion of this employee's records.",
    ]

    const negativeOption = [
        'Frequently late',
        'Frequently clock-out early',
        'Frequently apply leave',
        'Frequently absent',
        'Frequently lied about work',
        'Frequently slept during work',
        'Emotionally unstable',
        'Easily irritated or loses temper',
        'Does not participate in meetings',
        'Does not participate in company events',
        'Frequently fails to complete work tasks',
        'Frequently argues with other colleagues',
        'Frequently fights with other colleagues',
        'Frequently fails to repay borrowed money from colleagues',
        'Does not take care of company cleanliness',
    ];

    const positionOption = [
        'Work on time',
        'Friendly with colleagues',
        'Willing to assist colleagues',
        'Communicates well with colleagues',
        'Proactively handles work tasks',
        'Actively responds to work problems',
        'Shows initiative in projects',
        'Completes assigned projects on time',
        'Proactively solves problems',
        'Actively participates in meetings',
        'Actively participates in company events',
        'Frequently completes work ahead of deadlines',
        'Cares about company property',
        'Helps maintain a clean company environment',
    ];

    const { TextArea } = Input;

    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        reason_deletion: '',
        reason_leaving: '',
        misconduct_type: 'Yes',
        misconduct_remark: '',
        criminal_type: 'Yes',
        criminal_remark: '',
        illegal_type: 'Yes',
        illegal_remark: '',
        disclosed_type: 'Yes',
        disclosed_remark: '',
        encouraged_type: 'Yes',
        encouraged_remark: '',
        negative_attidude: '',
        positive_attidude: '',
        overall_rating: '',
        remarks: '',
        confirmCheckbox: [],
    });

    useEffect(() => {
        if (employmentDetails) {
            setData('id', employmentDetails.id)
        }
      }, [employmentDetails]);

    const openConfirmSubmit = () => {
        setIsConfirmSubmitOpen(true);
    }
    const closeConfirmSubmit = () => {
        setIsConfirmSubmitOpen(false);
    }

    const submit = (e) => {
        e.preventDefault();

        post('/delete-employee', {
                
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                fetchEmployee();
                closeDeleteEmployee();
            },
            onError: () => {
                setIsLoading(false);
                closeConfirmSubmit();
            }
        });
    }

    return (
        <>
            <Modal
                show={isDeleteEmployeeOpen}
                maxWidth='lg'
                title='Delete Employee'
                onClose={closeDeleteEmployee}
                footer={
                    <div className="flex justify-end gap-4 w-full">
                        <Button size="sm" variant="outlined" onClick={closeDeleteEmployee}>Cancel</Button>
                        <Button size="sm" variant="danger" disabled={data.confirmCheckbox.length == 0} onClick={openConfirmSubmit} >Delete</Button>
                    </div>
                }
            >
                {
                    employmentDetails && (
                        <div className="py-3 px-6 flex flex-col gap-8">
                            <div className="flex gap-3 items-center">
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
                                    <div className="text-gray-950 text-base font-semibold">
                                        {employmentDetails.name}
                                    </div>
                                    <div className="text-gray-500 text-sm">CTID: {employmentDetails.employee_id}</div>
                                </div>
                            </div>
                            <div className="text-gray-700 text-sm">
                                Please complete the following details before proceeding with the deletion of this employee's record. This action cannot be undone.
                            </div>
                            <div className="flex flex-col border border-gray-200 rounded-sm">
                                <div className="py-4 px-5 border-b border-gray-200 text-gray-950 text-base font-semibold">
                                    Confirmation of Employee Actions
                                </div>
                                <div className="flex flex-col gap-5 p-5">
                                    <div className="flex flex-col gap-2">
                                        <InputLabel htmlFor="reason_deletion" value={<div className="flex gap-1">
                                            <span>Reason for Deletion</span>
                                            <span className="text-error-600">*</span>
                                        </div>} />
                                        <Dropdown 
                                            appendTo="self"
                                            value={data.reason_deletion} 
                                            onChange={(e) => setData('reason_deletion', e.value)} 
                                            options={reasons.map((item) => ({
                                                label: item.name,
                                                value: item.value,
                                            }))}
                                            optionLabel="label"
                                            placeholder="Select" 
                                            loading={isLoading}
                                            className="w-full text-sm"
                                            invalid={!!errors.reason_deletion}
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
                                        <InputError message={errors.reason_deletion}  />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <InputLabel htmlFor="reason_leaving" value={<div className="flex gap-1">
                                            <span>Reason for Leaving</span>
                                            <span className="text-error-600">*</span>
                                        </div>} />
                                        <TextArea 
                                            value={data.reason_leaving}
                                            onChange={(e) => setData('reason_leaving', e.target.value)}       
                                            rows={4}                       
                                            placeholder="Please specify the reason for employee's departure..."    
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <InputLabel htmlFor="misconduct_type" value={<div className="flex gap-1">
                                            <span>Has the employee exhibited any misconduct during employment?</span>
                                            <span className="text-error-600">*</span>
                                        </div>} />
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center justify-between">
                                                <Radio.Group 
                                                    value={data.misconduct_type}
                                                    onChange={(e) => setData('misconduct_type', e.target.value)}
                                                    options={['Yes', 'No']}
                                                    className="py-3"
                                                />
                                                 <div className="w-full max-w-[500px]">
                                                    <TextInput 
                                                        id="misconduct_remark"
                                                        type="text"
                                                        name="misconduct_remark"
                                                        value={data.misconduct_remark}
                                                        className="disabled:cursor-not-allowed"
                                                        placeholder="If yes, please specify"
                                                        autoComplete="misconduct_remark"
                                                        disabled={data.misconduct_type === 'No'}
                                                        onChange={(e) => setData('misconduct_remark', e.target.value)}
                                                        hasError={!!errors.misconduct_remark}
                                                    />
                                                 </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className=""></div>
                                                <InputError message={errors.misconduct_remark} className="w-full max-w-[500px]" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <InputLabel htmlFor="criminal_type" value={<div className="flex gap-1">
                                            <span>Has the employee committed any criminal acts during employment?</span>
                                            <span className="text-error-600">*</span>
                                        </div>} />
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center justify-between">
                                                <Radio.Group 
                                                    value={data.criminal_type}
                                                    onChange={(e) => setData('criminal_type', e.target.value)}
                                                    options={['Yes', 'No']}
                                                    className="py-3"
                                                />
                                                <div className="w-full max-w-[500px]">
                                                    <TextInput 
                                                        id="criminal_remark"
                                                        type="text"
                                                        name="criminal_remark"
                                                        value={data.criminal_remark}
                                                        className="w-full max-w-[500px] disabled:cursor-not-allowed"
                                                        placeholder="If yes, please specify"
                                                        autoComplete="criminal_remark"
                                                        disabled={data.criminal_type === 'No'}
                                                        onChange={(e) => setData('criminal_remark', e.target.value)}
                                                        hasError={!!errors.criminal_remark}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className=""></div>
                                                <InputError message={errors.criminal_remark} className="w-full max-w-[500px]" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <InputLabel htmlFor="illegal_type" value={<div className="flex gap-1">
                                            <span>Has the employee used illegal substances during employment?</span>
                                            <span className="text-error-600">*</span>
                                        </div>} />
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center justify-between">
                                                <Radio.Group 
                                                    value={data.illegal_type}
                                                    onChange={(e) => setData('illegal_type', e.target.value)}
                                                    options={['Yes', 'No']}
                                                    className="py-3"
                                                />
                                                <div className="w-full max-w-[500px]">
                                                    <TextInput 
                                                        id="illegal_remark"
                                                        type="text"
                                                        name="illegal_remark"
                                                        value={data.illegal_remark}
                                                        className="w-full max-w-[500px] disabled:cursor-not-allowed"
                                                        placeholder="If yes, please specify"
                                                        autoComplete="illegal_remark"
                                                        disabled={data.illegal_type === 'No'}
                                                        onChange={(e) => setData('illegal_remark', e.target.value)}
                                                        hasError={!!errors.illegal_remark}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className=""></div>
                                                <InputError message={errors.illegal_remark} className="w-full max-w-[500px]" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <InputLabel htmlFor="disclosed_type" value={<div className="flex gap-1">
                                            <span>Has the employee publicly or privately disclosed confidential company information?</span>
                                            <span className="text-error-600">*</span>
                                        </div>} />
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center justify-between">
                                                <Radio.Group 
                                                    value={data.disclosed_type}
                                                    onChange={(e) => setData('disclosed_type', e.target.value)}
                                                    options={['Yes', 'No']}
                                                    className="py-3"
                                                />
                                                <div className="w-full max-w-[500px]">
                                                    <TextInput 
                                                        id="disclosed_remark"
                                                        type="text"
                                                        name="disclosed_remark"
                                                        value={data.disclosed_remark}
                                                        className="w-full max-w-[500px] disabled:cursor-not-allowed"
                                                        placeholder="If yes, please specify"
                                                        autoComplete="disclosed_remark"
                                                        disabled={data.disclosed_type === 'No'}
                                                        onChange={(e) => setData('disclosed_remark', e.target.value)}
                                                        hasError={!!errors.disclosed_remark}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className=""></div>
                                                <InputError message={errors.disclosed_remark} className="w-full max-w-[500px]" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <InputLabel htmlFor="encouraged_type" value={<div className="flex gap-1">
                                            <span>Has the employee publicly or privately encouraged other employees to leave the company during employment?</span>
                                            <span className="text-error-600">*</span>
                                        </div>} />
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center justify-between">
                                                <Radio.Group 
                                                    value={data.encouraged_type}
                                                    onChange={(e) => setData('encouraged_type', e.target.value)}
                                                    options={['Yes', 'No']}
                                                    className="py-3"
                                                />
                                                <div className="w-full max-w-[500px]">
                                                    <TextInput 
                                                        id="encouraged_remark"
                                                        type="text"
                                                        name="encouraged_remark"
                                                        value={data.encouraged_remark}
                                                        className="w-full max-w-[500px] disabled:cursor-not-allowed"
                                                        placeholder="If yes, please specify"
                                                        autoComplete="encouraged_remark"
                                                        disabled={data.encouraged_type === 'No'}
                                                        onChange={(e) => setData('encouraged_remark', e.target.value)}
                                                        hasError={!!errors.encouraged_remark}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className=""></div>
                                                <InputError message={errors.encouraged_remark} className="w-full max-w-[500px]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col border border-gray-200 rounded-sm">
                                <div className="py-4 px-5 border-b border-gray-200 text-gray-950 text-base font-semibold">
                                    Employee's Attitude During Employment (Multiple Selection)
                                </div>
                                <div className="flex flex-col gap-5 p-5">
                                    <div className="flex flex-col gap-2">
                                        <InputLabel htmlFor="negative_attidude" value={<div className="flex gap-1">
                                            <span>Negative Attitude:</span>
                                        </div>} />
                                        <div className="py-3">
                                            <Checkbox.Group
                                                options={negativeOption}
                                                value={data.negative_attidude}
                                                onChange={(checkedValues) => setData('negative_attidude', checkedValues)}
                                                className="gap-x-8 gap-y-5 text-sm text-gray-950"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <InputLabel htmlFor="negative_attidude" value={<div className="flex gap-1">
                                            <span>Positive Attitude:</span>
                                        </div>} />
                                        <div className="py-3">
                                            <Checkbox.Group
                                                options={positionOption}
                                                value={data.positive_attidude}
                                                onChange={(checkedValues) => setData('positive_attidude', checkedValues)}
                                                className="gap-x-8 gap-y-5 text-sm text-gray-950"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col border border-gray-200 rounded-sm">
                                <div className="py-4 px-5 border-b border-gray-200 text-gray-950 text-base font-semibold">
                                    Overall Employee Rating
                                </div>
                                <div className="flex flex-col gap-5 p-5">
                                    <div className="flex flex-col gap-2">
                                        <InputLabel htmlFor="overall_rating" value={<div className="flex gap-1">
                                            <span>Overall Rating:</span>
                                            <span className="text-error-600">*</span>
                                        </div>} />
                                        <Dropdown 
                                            appendTo="self"
                                            value={data.overall_rating} 
                                            onChange={(e) => setData('overall_rating', e.value)} 
                                            options={ratings.map((item) => ({
                                                label: item.name,
                                                value: item.value,
                                            }))}
                                            optionLabel="label"
                                            placeholder="Select" 
                                            loading={isLoading}
                                            className="w-full text-sm"
                                            invalid={!!errors.overall_rating}
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
                                        <TextArea 
                                            value={data.remarks}
                                            onChange={(e) => setData('remarks', e.target.value)}    
                                            placeholder="Remarks..."   
                                            rows={4}                           
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Checkbox.Group
                                    options={confirmCheck}
                                    value={data.confirmCheckbox}
                                    onChange={(checkedValues) => setData('confirmCheckbox', checkedValues)}
                                    className="gap-x-8 gap-y-5 text-sm text-gray-950"
                                />
                            </div>
                        </div>
                    )
                }
            </Modal>

            <ConfirmDialog show={isConfirmSubmitOpen}>
                <div className="flex flex-col gap-8 p-6" >
                    <div className="flex flex-col items-center">
                        <div><DeleteIllus /></div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-gray-950 text-lg font-bold">Delete Employee</div>
                            <div className="text-gray-700 text-sm text-center">
                                Are you sure you want to delete <span className="font-semibold">{employmentDetails?.name}</span>? This action will permanently delete all resources owned by the employee, and it cannot be undone. Please confirm to proceed.
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <Button size="sm" variant="outlined" onClick={closeConfirmSubmit}>Cancel</Button>
                        <Button size="sm" variant="danger" onClick={submit}>Confirm and Delete</Button>
                    </div>
                </div>
            </ConfirmDialog>
        </>
    )
}