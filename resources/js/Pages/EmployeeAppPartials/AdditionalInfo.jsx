import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Radio } from "antd";
import React from "react";

export default function AdditionalInfo({ data, setData }) {


    return (
        <>
            {/* Additional Info */}
            <div className="flex flex-col border border-gray-200 bg-white rounded-sm">
                <div className="flex flex-col py-4 px-5 border-b border-gray-200">
                    <div className="text-gray-950 text-base font-semibold">Additional Information</div>
                    <div className="text-gray-500 text-sm">Provide any extra details that might support your application.</div>
                </div>
                <div className="flex flex-col gap-5 p-5">
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="investigate_type" value={<div className="flex gap-1">
                            <span>Are you currently under investigation by the authorities? </span>
                        </div>} />
                        <div className="flex items-center justify-between">
                            <Radio.Group 
                                value={data.investigate_type}
                                onChange={(e) => setData('investigate_type', e.target.value)}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <TextInput 
                                id="investigate_remark"
                                type="text"
                                name="investigate_remark"
                                value={data.investigate_remark}
                                className="w-full max-w-[500px] disabled:cursor-not-allowed"
                                placeholder="If yes, please specify"
                                autoComplete="investigate_remark"
                                disabled={data.investigate_type === 'No'}
                                onChange={(e) => setData('investigate_remark', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="convicted_type" value={<div className="flex gap-1">
                            <span>Have you been convicted by any court or law in any country? </span>
                        </div>} />
                        <div className="flex items-center justify-between">
                            <Radio.Group 
                                value={data.convicted_type}
                                onChange={(e) => setData('convicted_type', e.target.value)}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <TextInput 
                                id="convicted_remark"
                                type="text"
                                name="convicted_remark"
                                value={data.convicted_remark}
                                className="w-full max-w-[500px] disabled:cursor-not-allowed"
                                placeholder="If yes, please specify"
                                autoComplete="convicted_remark"
                                disabled={data.convicted_type === 'No'}
                                onChange={(e) => setData('convicted_remark', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="bankrupt_type" value={<div className="flex gap-1">
                            <span>Are you currently declared bankrupt?</span>
                        </div>} />
                        <div className="flex items-center justify-between">
                            <Radio.Group 
                                value={data.bankrupt_type}
                                onChange={(e) => setData('bankrupt_type', e.target.value)}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <TextInput 
                                id="bankrupt_remark"
                                type="text"
                                name="bankrupt_remark"
                                value={data.bankrupt_remark}
                                className="w-full max-w-[500px] disabled:cursor-not-allowed"
                                placeholder="If yes, please specify"
                                autoComplete="bankrupt_remark"
                                disabled={data.bankrupt_type === 'No'}
                                onChange={(e) => setData('bankrupt_remark', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="suspended_type" value={<div className="flex gap-1">
                            <span>Have you ever been dismissed or suspended from any position? </span>
                        </div>} />
                        <div className="flex items-center justify-between">
                            <Radio.Group 
                                value={data.suspended_type}
                                onChange={(e) => setData('suspended_type', e.target.value)}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <TextInput 
                                id="suspended_remark"
                                type="text"
                                name="suspended_remark"
                                value={data.suspended_remark}
                                className="w-full max-w-[500px] disabled:cursor-not-allowed"
                                placeholder="If yes, please specify"
                                autoComplete="suspended_remark"
                                disabled={data.suspended_type === 'No'}
                                onChange={(e) => setData('suspended_remark', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="directorship_type" value={<div className="flex gap-1">
                            <span>Are you holding a directorship or other appointment in any company? </span>
                        </div>} />
                        <div className="flex items-center justify-between">
                            <Radio.Group 
                                value={data.directorship_type}
                                onChange={(e) => setData('directorship_type', e.target.value)}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <TextInput 
                                id="directorship_remark"
                                type="text"
                                name="directorship_remark"
                                value={data.directorship_remark}
                                className="w-full max-w-[500px] disabled:cursor-not-allowed"
                                placeholder="If yes, please specify"
                                autoComplete="directorship_remark"
                                disabled={data.directorship_type === 'No'}
                                onChange={(e) => setData('directorship_remark', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="relative_type" value={<div className="flex gap-1">
                            <span>Do you have friends or relatives in this company? </span>
                        </div>} />
                        <div className="flex items-center justify-between">
                            <Radio.Group 
                                value={data.relative_type}
                                onChange={(e) => setData('relative_type', e.target.value)}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <TextInput 
                                id="relative_remark"
                                type="text"
                                name="relative_remark"
                                value={data.relative_remark}
                                className="w-full max-w-[500px] disabled:cursor-not-allowed"
                                placeholder="If yes, please specify"
                                autoComplete="relative_remark"
                                disabled={data.relative_type === 'No'}
                                onChange={(e) => setData('relative_remark', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}