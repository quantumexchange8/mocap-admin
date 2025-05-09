
import React, { useState } from "react"
import InputLabel from "@/Components/InputLabel"
import { Radio } from 'antd';
import Checkbox from "@/Components/Checkbox";
import TextInput from "@/Components/TextInput";

export default function Form7() {
    const [value, setValue] = useState({
        overtime: 'no',
        investigation: 'no',
        convicted: 'no',
        bankrupt: 'no',
        dismissed: 'no',
        directorship: 'no',
        friends: 'no',
        health: 'no'
    });

    const handleRadioChange = (fieldName) => (e) => {
        const newValue = e.target.value;
        setValue(prev => ({ ...prev, [fieldName]: newValue }));
        console.log(`${fieldName}:`, newValue);
    };

    const radioOptions = [
        { value: 'no', label: 'No' },
        { value: 'yes', label: 'Yes' }
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
                        <InputLabel htmlFor="overtime" value="Available for overtime when necessary?"/>
                        <Radio.Group
                            id="overtime"
                            name="overtime"
                            onChange={handleRadioChange('overtime')}
                            value={value.overtime}
                            options={radioOptions}
                        />
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="investigation" value="Are you currently under investigation by the authorities?"/>
                        <div className="flex justify-between items-center self-stretch">
                            <Radio.Group
                                id="investigation"
                                name="investigation"
                                onChange={handleRadioChange('investigation')}
                                value={value.investigation}
                                options={radioOptions}
                            />
                            <TextInput
                                id=" "
                                type="text"
                                name=" "
                                className="flex w-[500px] flex-col items-start gap-2"
                                placeholder="If yes, please specify"
                                disabled={value.investigation !== 'yes'}
                            />
                        </div>
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="convicted" value="Have you been convicted by any court or law in any country?"/>
                        <div className="flex justify-between items-center self-stretch">
                            <Radio.Group
                                id="convicted"
                                name="convicted"
                                onChange={handleRadioChange('convicted')}
                                value={value.convicted}
                                options={radioOptions}
                            />
                            <TextInput
                                id=" "
                                type="text"
                                name=" "
                                className="flex w-[500px] flex-col items-start gap-2"
                                placeholder="If yes, please specify"
                                disabled={value.convicted !== 'yes'}
                            />
                        </div>
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="bankrupt" value="Are you currently declared bankrupt?"/>
                        <div className="flex justify-between items-center self-stretch">
                            <Radio.Group
                                id="bankrupt"
                                name="bankrupt"
                                onChange={handleRadioChange('bankrupt')}
                                value={value.bankrupt}
                                options={radioOptions}
                            />
                            <TextInput
                                id=" "
                                type="text"
                                name=" "
                                className="flex w-[500px] flex-col items-start gap-2"
                                placeholder="If yes, please specify"
                                disabled={value.bankrupt !== 'yes'}
                            />
                        </div>
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="dismissed" value="Have you ever been dismissed or suspended from any position? "/>
                        <div className="flex justify-between items-center self-stretch">
                            <Radio.Group
                                id="dismissed"
                                name="dismissed"
                                onChange={handleRadioChange('dismissed')}
                                value={value.dismissed}
                                options={radioOptions}
                            />
                            <TextInput
                                id=" "
                                type="text"
                                name=" "
                                className="flex w-[500px] flex-col items-start gap-2"
                                placeholder="If yes, please specify"
                                disabled={value.dismissed !== 'yes'}
                            />
                        </div>
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="directorship" value="Are you holding a directorship or other appointment in any company?"/>
                        <div className="flex justify-between items-center self-stretch">
                            <Radio.Group
                                id="directorship"
                                name="directorship"
                                onChange={handleRadioChange('directorship')}
                                value={value.directorship}
                                options={radioOptions}
                            />
                            <TextInput
                                id=" "
                                type="text"
                                name=" "
                                className="flex w-[500px] flex-col items-start gap-2"
                                placeholder="If yes, please specify"
                                disabled={value.directorship !== 'yes'}
                            />
                        </div>
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="friends" value="Do you have friends or relatives in this company?"/>
                        <div className="flex justify-between items-center self-stretch">
                            <Radio.Group
                                id="friends"
                                name="friends"
                                onChange={handleRadioChange('friends')}
                                value={value.friends}
                                options={radioOptions}
                            />
                            <TextInput
                                id=" "
                                type="text"
                                name=" "
                                className="flex w-[500px] flex-col items-start gap-2"
                                placeholder="If yes, please specify"
                                disabled={value.friends !== 'yes'}
                            />
                        </div>
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="health" value="Do you suffer from or are you being treated for any medical (including mental health) condition?"/>
                        <div className="flex justify-between items-center self-stretch">
                            <Radio.Group
                                id="health"
                                name="health"
                                onChange={handleRadioChange('health')}
                                value={value.health}
                                options={radioOptions}
                            />
                            <TextInput
                                id=" "
                                type="text"
                                name=" "
                                className="flex w-[500px] flex-col items-start gap-2"
                                placeholder="If yes, please specify"
                                disabled={value.health !== 'yes'}
                            />
                        </div>
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="find" value="How did you find out about this job?"/><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex w-[688px] px-0 py-3 items-center gap-8">
                            <div className="flex items-center gap-2">
                                <Checkbox/>
                                <div className="text-sm text-gray-950">Internet Posting</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox/>
                                <div className="text-sm text-gray-950">Employee Referral</div>
                            </div>
                            <div className="flex items-center gap-2 flex-[1_0_0]">
                                <Checkbox/>
                                <div className="text-sm text-gray-950">Others:</div>
                                <TextInput
                                id=" "
                                type="text"
                                name=" "
                                className="flex flex-col items-start gap-2 flex-[1_0_0]"
                                placeholder="If yes, please specify"
                                disabled
                            />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}