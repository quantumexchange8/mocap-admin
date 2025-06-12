import React from "react";
import InputLabel from "@/Components/InputLabel";
import { DatePicker, Radio, Select } from "antd";
import TextInput from "@/Components/TextInput";
import { ClearIcon, DatePickerIcon } from "@/Components/Icon/Outline";
import { Calendar } from "primereact/calendar";
import InputError from "@/Components/InputError";

export default function MedicalInfo({ data, setData, errors }) {


    const bloodType = [
        {value: 'A+', label: 'A+'},
        {value: 'A-', label: 'A-'},
        {value: 'B+', label: 'B+'},
        {value: 'B-', label: 'B-'},
        {value: 'AB+', label: 'AB+'},
        {value: 'AB-', label: 'AB-'},
        {value: 'O+', label: 'O+'},
        {value: 'O-', label: 'O-'},
        {value: 'no', label: 'Not sure'},
    ]

    const clearDate = () => {
        setData('pregnant_delivery_date', null);
    }

    return (
        <>
            {/* Medical Information */}
            <div className="flex flex-col border border-gray-200 bg-white rounded-sm">
                <div className="flex flex-col py-4 px-5 border-b border-gray-200">
                    <div className="text-gray-950 text-base font-semibold">Medical Information</div>
                    <div className="text-gray-500 text-sm">Mention any medical conditions or allergies we should be aware of to ensure your safety at work.</div>
                </div>
                <div className="flex flex-col gap-5 p-5">
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="blood_type" value={<div className="flex gap-1">
                            <span>What is your blood type? </span>
                        </div>} />
                        <Radio.Group 
                            value={data.blood_type}
                            onChange={(e) => setData('blood_type', e.target.value)}
                            options={bloodType}
                            className="py-3 flex gap-x-2"
                        />
                        <InputError message={errors.blood_type} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="allergic_type" value={<div className="flex gap-1">
                            <span>Are you allergic to any food? </span>
                        </div>} />
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <Radio.Group 
                                    value={data.allergic_type}
                                    onChange={(e) => setData('allergic_type', e.target.value)}
                                    options={['No', 'Yes']}
                                    className="py-3"
                                />
                                <div className="w-full max-w-[500px]">
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
                                <InputError message={errors.allergic_remark} className="w-full max-w-[500px]" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="medical_type" value={<div className="flex gap-1">
                            <span>Are you being treated for any medical (including mental health) condition? </span>
                        </div>} />
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <Radio.Group 
                                    value={data.medical_type}
                                    onChange={(e) => setData('medical_type', e.target.value)}
                                    options={['No', 'Yes']}
                                    className="py-3"
                                />
                                <div className="w-full max-w-[500px]">
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
                            <InputError message={errors.medical_remark} className="w-full max-w-[500px]" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="medication_type" value={<div className="flex gap-1">
                            <span>Are you currently taking any medications? </span>
                        </div>} />
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <Radio.Group 
                                    value={data.medication_type}
                                    onChange={(e) => setData('medication_type', e.target.value)}
                                    options={['No', 'Yes']}
                                    className="py-3"
                                />
                                <div className="w-full max-w-[500px]">
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
                            <InputError message={errors.medication_remark} className="w-full max-w-[500px]" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="pregnant_type" value={<div className="flex gap-1">
                            <span>Are you currently pregnant? </span>
                        </div>} />
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <Radio.Group 
                                    value={data.pregnant_type}
                                    onChange={(e) => setData('pregnant_type', e.target.value)}
                                    options={['No', 'Yes']}
                                    className="py-3"
                                    disabled={data.gender === 'male'}
                                />
                                <div className="w-full max-w-[500px]">
                                    <TextInput 
                                        id="pregnant_remark"
                                        type="text"
                                        name="pregnant_remark"
                                        value={data.pregnant_remark}
                                        className="disabled:cursor-not-allowed"
                                        placeholder="If yes, please specify"
                                        autoComplete="pregnant_remark"
                                        disabled={data.pregnant_type === 'No' || data.gender === 'male'}
                                        onChange={(e) => setData('pregnant_remark', e.target.value)}
                                        hasError={!!errors.pregnant_remark}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className=""></div>
                            <InputError message={errors.pregnant_remark} className="w-full max-w-[500px]" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="pregnant_delivery_date" value={<div className="flex gap-1">
                            <span>If you are pregnant, when is your expected date of delivery? </span>
                        </div>} />
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
                        <InputLabel htmlFor="pregnancy_medication_type" value={<div className="flex gap-1">
                            <span>If you are pregnant, are you taking any pregnancy medications? </span>
                        </div>} />
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <Radio.Group 
                                    value={data.pregnancy_medication_type}
                                    onChange={(e) => setData('pregnancy_medication_type', e.target.value)}
                                    options={['No', 'Yes']}
                                    className="py-3"
                                    disabled={data.gender === 'male'}
                                />
                                <div className="w-full max-w-[500px]">
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
                            <InputError message={errors.pregnancy_medication_remark} className="w-full max-w-[500px]" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="gynaecological_type" value={<div className="flex gap-1">
                            <span>Do you suffer from any gynaecological diseases? </span>
                        </div>} />
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <Radio.Group 
                                    value={data.gynaecological_type}
                                    onChange={(e) => setData('gynaecological_type', e.target.value)}
                                    options={['No', 'Yes']}
                                    className="py-3"
                                    disabled={data.gender === 'male'}
                                />
                                <div className="w-full max-w-[500px]">
                                    <TextInput 
                                        id="gynaecological_remark"
                                        type="text"
                                        name="gynaecological_remark"
                                        value={data.gynaecological_remark}
                                        className="disabled:cursor-not-allowed"
                                        placeholder="If yes, please specify"
                                        autoComplete="gynaecological_remark"
                                        disabled={data.gynaecological_type === 'No' || data.gender === 'male'}
                                        onChange={(e) => setData('gynaecological_remark', e.target.value)}
                                        hasError={!!errors.gynaecological_remark}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className=""></div>
                            <InputError message={errors.gynaecological_remark} className="w-full max-w-[500px]" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}