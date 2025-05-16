
import React, { useState } from "react"
import InputLabel from "@/Components/InputLabel"
import { Radio, Checkbox } from 'antd';
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function AdditionalInfo({data, setData, errors}) {
    const find_job = [
        {label:'Internet Posting', value:'Internet Posting'},
        {label:'Employee Referral', value:'Employee Referral'}, 
        {label:'Others:', value: 'Other'}
    ];

    return(
        <div className="flex w-full px-0 flex-col items-center gap-5">
            {/* Additional Information */}
            <div className="flex w-[728px] flex-col items-center border border-gray-200 rounded-sm">
                <div className="flex px-5 py-4 flex-col items-start self-stretch border-b border-b-gray-200">
                    <div className="self-stretch text-gray-950 font-semibold">Additional Information</div>
                    <div className="self-stretch text-gray-500 text-sm">Provide any extra details that might support your application.</div>
                </div>
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="overtime_type" value="Available for overtime when necessary?"/>
                        <Radio.Group
                            onChange={(e) => setData('overtime_type', e.target.value)}
                            value={data.overtime_type}
                            options={['No', 'Yes']}
                            className="py-3"
                        />
                        <InputError message={errors.overtime_type} className="w-full max-w-[500px]" />
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="investigate_type" value="Are you currently under investigation by the authorities?"/>
                        <div className="flex justify-between items-center self-stretch">
                            <Radio.Group
                                onChange={(e) => setData('investigate_type', e.target.value)}
                                value={data.investigate_type}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <div className="flex flex-col min-w-[500px] max-w-[500px]">
                                <TextInput
                                    id="investigate_remark"
                                    type="text"
                                    name="investigate_remark"
                                    value={data.investigate_remark}
                                    className="w-full"
                                    placeholder="If yes, please specify"
                                    autoComplete="investigate_remark"
                                    disabled={data.investigate_type === 'No'}
                                    onChange={(e) => setData('investigate_remark', e.target.value)}
                                    hasError={!!errors.investigate_remark}
                                />      
                                <InputError message={errors.investigate_remark} className="w-full" />
                            </div> 
                        </div>
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="convicted_type" value="Have you been convicted by any court or law in any country?"/>
                        <div className="flex justify-between items-center self-stretch">
                            <Radio.Group
                                onChange={(e) => setData('convicted_type', e.target.value)}
                                value={data.convicted_type}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <div className="flex flex-col min-w-[500px] max-w-[500px]">
                                <TextInput
                                    id="convicted_remark"
                                    type="text"
                                    name="convicted_remark"
                                    value={data.convicted_remark}
                                    className="flex w-[500px] flex-col items-start gap-2"
                                    placeholder="If yes, please specify"
                                    disabled={data.convicted_type === 'No'}
                                    onChange={(e) => setData('convicted_remark', e.target.value)}
                                    hasError={!!errors.convicted_remark}
                                />
                                <InputError message={errors.convicted_remark} className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="bankrupt_type" value="Are you currently declared bankrupt?"/>
                        <div className="flex justify-between items-center self-stretch">
                            <Radio.Group
                                onChange={(e) => setData('bankrupt_type', e.target.value)}
                                value={data.bankrupt_type}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <div className="flex flex-col min-w-[500px] max-w-[500px]">
                            <TextInput
                                id="bankrupt_remark"
                                type="text"
                                name="bankrupt_remark"
                                value={data.bankrupt_remark}
                                className="flex w-[500px] flex-col items-start gap-2"
                                placeholder="If yes, please specify"
                                disabled={data.bankrupt_type === 'No'}
                                onChange={(e) => setData('bankrupt_remark', e.target.value)}
                                hasError={!!errors.bankrupt_remark}
                            />
                            <InputError message={errors.bankrupt_remark} className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="suspended_type" value="Have you ever been dismissed or suspended from any position? "/>
                        <div className="flex justify-between items-center self-stretch">
                            <Radio.Group
                                onChange={(e) => setData('suspended_type', e.target.value)}
                                value={data.suspended_type}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <div className="flex flex-col min-w-[500px] max-w-[500px]">
                                <TextInput
                                    id="suspended_remark"
                                    type="text"
                                    name="suspended_remark"
                                    value={data.suspended_remark}
                                    className="flex w-[500px] flex-col items-start gap-2"
                                    placeholder="If yes, please specify"
                                    disabled={data.suspended_type === 'No'}
                                    onChange={(e) => setData('suspended_remark', e.target.value)}
                                    hasError={!!errors.suspended_remark}
                                />
                                <InputError message={errors.suspended_remark} className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="directorship_type" value="Are you holding a directorship or other appointment in any company?"/>
                        <div className="flex justify-between items-center self-stretch">
                            <Radio.Group
                                onChange={(e) => setData('directorship_type', e.target.value)}
                                value={data.directorship_type}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <div className="flex flex-col min-w-[500px] max-w-[500px]">
                                <TextInput
                                    id="directorship_remark"
                                    type="text"
                                    name="directorship_remark"
                                    value={data.directorship_remark}
                                    className="flex w-[500px] flex-col items-start gap-2"
                                    placeholder="If yes, please specify"
                                    disabled={data.directorship_type === 'No'}
                                    onChange={(e) => setData('directorship_remark', e.target.value)}
                                    hasError={!!errors.directorship_remark}
                                />
                                <InputError message={errors.directorship_remark} className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="relative_type" value="Do you have friends or relatives in this company?"/>
                        <div className="flex justify-between items-center self-stretch">
                            <Radio.Group
                                onChange={(e) => setData('relative_type', e.target.value)}
                                value={data.relative_type}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <div className="flex flex-col min-w-[500px] max-w-[500px]">
                                <TextInput
                                    id="relative_remark"
                                    type="text"
                                    name="relative_remark"
                                    value={data.relative_remark}
                                    className="flex w-[500px] flex-col items-start gap-2"
                                    placeholder="If yes, please specify"
                                    disabled={data.relative_type == 'No'}
                                    onChange={(e) => setData('relative_remark', e.target.value)}
                                    hasError={!!errors.relative_remark}
                                />
                                <InputError message={errors.relative_remark} className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="health_type" value="Do you suffer from or are you being treated for any medical (including mental health) condition?"/>
                        <div className="flex justify-between items-center self-stretch">
                            <Radio.Group
                                onChange={(e) => setData('health_type', e.target.value)}
                                value={data.health_type}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <div className="flex flex-col min-w-[500px] max-w-[500px]">
                                <TextInput
                                    id="health_remark"
                                    type="text"
                                    name="health_remark"
                                    value={data.health_remark}
                                    className="flex w-[500px] flex-col items-start gap-2"
                                    placeholder="If yes, please specify"
                                    disabled={data.health_type === 'No'}
                                    onChange={(e) => setData('health_remark', e.target.value)}
                                    hasError={!!errors.health_remark}
                                />
                                <InputError message={errors.health_remark} className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="find" value="How did you find out about this job?"/><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex w-full items-center">
                            <Checkbox.Group 
                                options={find_job}
                                value={data.find_job_type}
                                onChange={(checkedValues) => setData('find_job_type', checkedValues)}
                                className="gap-x-8 gap-y-5 text-sm text-gray-950"
                            />
                            <div className="flex flex-col max-w-[252px] w-full">
                                <TextInput
                                    id="find_job_remark"
                                    type="text"
                                    name="find_job_remark"
                                    value={data.find_job_remark}
                                    className="flex flex-col items-start gap-2 w-full"
                                    placeholder="If yes, please specify"
                                    disabled={!data.find_job_type?.includes('Other')}
                                    onChange={(e) => setData('find_job_remark', e.target.value)}
                                    hasError={!!errors.find_job_remark}
                                />
                                <InputError message={errors.find_job_remark} className="w-full" />
                            </div>
                        </div>
                        <InputError message={errors.find_job_type} className="w-full" />
                    </div>
                </form>
            </div>
        </div>
    )
}