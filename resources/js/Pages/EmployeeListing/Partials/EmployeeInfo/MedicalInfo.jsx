import Button from "@/Components/Button";
import { ClearIcon, DatePickerIcon } from "@/Components/Icon/Outline";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { Radio } from "antd";
import { Calendar } from "primereact/calendar";
import React, { useState }  from "react";
import toast from "react-hot-toast";

export default function MedicalInfo({
    isMedicalInfoOpen,
    setIsMedicalInfoOpen,
    closeMedicalInfo,
    user_details,
}) {

    const bloodType = [
        {value: 'A+', label: 'A+'},
        {value: 'A-', label: 'A-'},
        {value: 'B+', label: 'B+'},
        {value: 'B-', label: 'B-'},
        {value: 'AB+', label: 'AB+'},
        {value: 'AB-', label: 'AB-'},
        {value: 'O+', label: 'O+'},
        {value: 'O-', label: 'O-'},
        {value: 'no', label: 'Unknown'},
    ];

    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, errors, post, reset } = useForm({
        id: user_details.medicalinfo.id || '',
        blood_type: user_details.medicalinfo.blood_type || '',
        allergic_type: user_details.medicalinfo.allergic_type || '',
        allergic_remark: user_details.medicalinfo.allergic_remark || '',
        medical_type: user_details.medicalinfo.medical_type || '',
        medical_remark: user_details.medicalinfo.medical_remark || '',
        medication_type: user_details.medicalinfo.medication_type || '',
        medication_remark: user_details.medicalinfo.medication_remark || '',
        pregnant_type: user_details.medicalinfo.pregnant_type || '',
        pregnant_remark: user_details.medicalinfo.pregnant_remark || '',
        pregnant_delivery_date: user_details.medicalinfo.pregnant_delivery_date || '',
        pregnancy_medication_type: user_details.medicalinfo.pregnancy_medication_type || '',
        pregnancy_medication_remark: user_details.medicalinfo.pregnancy_medication_remark || '',
        gynaescological_type: user_details.medicalinfo.gynaecological_type || '',
        gynaecological_remark: user_details.medicalinfo.gynaecological_remark || '',
    });


    const closeMedicalInfoDialog = () => {
        reset();
        closeMedicalInfo();
    }

    const clearDate = () => {
        setData('pregnant_delivery_date', null);
    }

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        post('/update-medical-info', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                closeMedicalInfoDialog();
                reset();

                // 🔁 Refresh only user_details prop from the backend
                router.reload({ only: ['user_details'] });

                toast.success(`Medical Information updated successfully for ${user_details.username}.`, {
                    title: `Medical Information updated successfully for ${user_details.username}.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            },
        })
    }

    return (
        <>
            <Modal
                show={isMedicalInfoOpen}
                maxWidth='lg'
                title='Medical Information'
                onClose={closeMedicalInfoDialog}
                footer={
                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button variant="outlined" size="sm" onClick={closeMedicalInfoDialog}>Cancel</Button>
                        <Button size="sm" onClick={submit} >Save Changes</Button>
                    </div>
                }
            >
                <div className="flex flex-col gap-5 py-3 px-6">
                    <div className="flex flex-col gap-2">
                        <InputLabel value="What is your blood type?" />
                        <Radio.Group 
                            value={data.blood_type}
                            onChange={(e) => setData('blood_type', e.target.value)}
                            options={bloodType}
                            className="py-3 flex gap-x-3"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel value="Are you allergic to any food?" />
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                 <Radio.Group 
                                    value={data.allergic_type}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                
                                        setData((prev) => ({
                                            ...prev,
                                            allergic_type: value,
                                            allergic_remark: value === 'No' ? '' : prev.allergic_remark,
                                        }));
                                    }}
                                    options={['No', 'Yes']}
                                    className="py-3 flex gap-x-3"
                                />
                                <div className="w-full max-w-[550px]">
                                    <TextInput 
                                        id="allergic_remark"
                                        type="text"
                                        name="allergic_remark"
                                        value={data.allergic_remark}
                                        className="disabled:cursor-not-allowed"
                                        placeholder="If yes, please specify"
                                        autoComplete="allergic_remark"
                                        disabled={data.allergic_type === 'No'}
                                        onChange={(e) => setData('allergic_remark', e.target.value)}
                                        hasError={!!errors.allergic_remark}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className=""></div>
                                <InputError message={errors.allergic_remark} className="w-full max-w-[550px]" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel value="Are you being treated for any medical (including mental health) condition?" />
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                 <Radio.Group 
                                    value={data.medical_type}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                
                                        setData((prev) => ({
                                            ...prev,
                                            medical_type: value,
                                            medical_remark: value === 'No' ? '' : prev.medical_remark,
                                        }));
                                    }}
                                    options={['No', 'Yes']}
                                    className="py-3 flex gap-x-3"
                                />
                                <div className="w-full max-w-[550px]">
                                    <TextInput 
                                        id="medical_remark"
                                        type="text"
                                        name="medical_remark"
                                        value={data.medical_remark}
                                        className="disabled:cursor-not-allowed"
                                        placeholder="If yes, please specify"
                                        autoComplete="medical_remark"
                                        disabled={data.medical_type === 'No'}
                                        onChange={(e) => setData('medical_remark', e.target.value)}
                                        hasError={!!errors.medical_remark}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className=""></div>
                            <InputError message={errors.medical_remark} className="w-full max-w-[550px]" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel value="Are you currently taking any medications?" />
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                 <Radio.Group 
                                    value={data.medication_type}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                
                                        setData((prev) => ({
                                            ...prev,
                                            medication_type: value,
                                            medication_remark: value === 'No' ? '' : prev.medication_remark,
                                        }));
                                    }}
                                    options={['No', 'Yes']}
                                    className="py-3 flex gap-x-3"
                                />
                                <div className="w-full max-w-[550px]">
                                    <TextInput 
                                        id="medication_remark"
                                        type="text"
                                        name="medication_remark"
                                        value={data.medication_remark}
                                        className="disabled:cursor-not-allowed"
                                        placeholder="If yes, please specify"
                                        autoComplete="medication_remark"
                                        disabled={data.medication_type === 'No'}
                                        onChange={(e) => setData('medication_remark', e.target.value)}
                                        hasError={!!errors.medication_remark}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className=""></div>
                            <InputError message={errors.medication_remark} className="w-full max-w-[550px]" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel value="Are you currently pregnant?" />
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                 <Radio.Group 
                                    value={data.pregnant_type}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                
                                        setData((prev) => ({
                                            ...prev,
                                            pregnant_type: value,
                                            pregnant_remark: value === 'No' ? '' : prev.pregnant_remark,
                                            pregnant_delivery_date: value === 'No' ? '' : prev.pregnant_delivery_date,
                                        }));
                                    }}
                                    options={['No', 'Yes']}
                                    className="py-3 flex gap-x-3"
                                    disabled={data.gender === 'male'}
                                />
                                <div className="w-full max-w-[550px]">
                                    <TextInput 
                                        id="pregnant_remark"
                                        type="text"
                                        name="pregnant_remark"
                                        value={data.pregnant_remark}
                                        className="disabled:cursor-not-allowed"
                                        placeholder="If yes, please specify"
                                        autoComplete="pregnant_remark"
                                        disabled={data.pregnant_type === 'No'}
                                        onChange={(e) => setData('pregnant_remark', e.target.value)}
                                        hasError={!!errors.pregnant_remark}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className=""></div>
                            <InputError message={errors.pregnant_remark} className="w-full max-w-[550px]" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel value="If you are pregnant, when is your expected date of delivery?" />
                        <div className="max-w-[220px] relative">
                            <Calendar 
                                value={data.pregnant_delivery_date} 
                                onChange={(e) => setData('pregnant_delivery_date', e.value)} 
                                className="text-sm w-full"
                                placeholder="dd/mm/yyyy"
                                invalid={!!errors.pregnant_delivery_date}
                                disabled={data.pregnant_type === 'No' || data.gender === 'male'}
                                pt={{
                                input: {
                                    className: 'w-full py-3 px-4 pr-10 text-sm text-gray-950 border border-gray-300 rounded-sm hover:border-gray-400 focus:border-gray-950 focus:ring-0 focus:outline-none'
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
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
                                {
                                data.pregnant_delivery_date === null ? (
                                    <DatePickerIcon />
                                ) : (
                                    <span className="cursor-pointer" onClick={clearDate}>
                                    <ClearIcon />
                                    </span>
                                )
                                }
                            </div>  
                        </div>
                        <InputError message={errors.pregnant_delivery_date} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel value="If you are pregnant, are you taking any pregnancy medications?" />
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                 <Radio.Group 
                                    value={data.pregnancy_medication_type}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                
                                        setData((prev) => ({
                                            ...prev,
                                            pregnancy_medication_type: value,
                                            pregnancy_medication_remark: value === 'No' ? '' : prev.pregnancy_medication_remark,
                                        }));
                                    }}
                                    options={['No', 'Yes']}
                                    className="py-3 flex gap-x-3"
                                    disabled={data.gender === 'male'}
                                />
                                <div className="w-full max-w-[550px]">
                                    <TextInput 
                                        id="pregnancy_medication_remark"
                                        type="text"
                                        name="pregnancy_medication_remark"
                                        value={data.pregnancy_medication_remark}
                                        className="disabled:cursor-not-allowed"
                                        placeholder="If yes, please specify"
                                        autoComplete="pregnancy_medication_remark"
                                        disabled={data.pregnancy_medication_type === 'No' || data.gender === 'male'}
                                        onChange={(e) => setData('pregnancy_medication_remark', e.target.value)}
                                        hasError={!!errors.pregnancy_medication_remark}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className=""></div>
                            <InputError message={errors.pregnancy_medication_remark} className="w-full max-w-[550px]" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel value="Do you suffer from any gynaecological diseases?" />
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                 <Radio.Group 
                                    value={data.gynaescological_type}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                
                                        setData((prev) => ({
                                            ...prev,
                                            gynaescological_type: value,
                                            gynaecological_remark: value === 'No' ? '' : prev.gynaecological_remark,
                                        }));
                                    }}
                                    options={['No', 'Yes']}
                                    className="py-3 flex gap-x-3"
                                    disabled={data.gender === 'male'}
                                />
                                <div className="w-full max-w-[550px]">
                                    <TextInput 
                                        id="gynaecological_remark"
                                        type="text"
                                        name="gynaecological_remark"
                                        value={data.gynaecological_remark}
                                        className="disabled:cursor-not-allowed"
                                        placeholder="If yes, please specify"
                                        autoComplete="gynaecological_remark"
                                        disabled={data.gynaescological_type === 'No' || data.gender === 'male'}
                                        onChange={(e) => setData('gynaecological_remark', e.target.value)}
                                        hasError={!!errors.gynaecological_remark}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className=""></div>
                            <InputError message={errors.gynaecological_remark} className="w-full max-w-[550px]" />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}