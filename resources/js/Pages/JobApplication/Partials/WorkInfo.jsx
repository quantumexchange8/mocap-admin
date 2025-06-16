import {Checkbox} from 'antd';
import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { ClearIcon, DatePickerIcon } from "@/Components/Icon/Outline";
import InputError from '@/Components/InputError';
import { InputNumber } from 'primereact/inputnumber';

export default function WorkInfo({data, setData, errors}) {
    const [disabled, setDisabled] = useState(false);
    const [getPhoneCode, setGetPhoneCode] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleForm = (e) => {
        const hasExperience = e.target.checked;
    
        // Toggle experience value based on checkbox
        setData('experience', hasExperience ? 'no' : 'yes');
    };
    

    const fetchPhoneCode = async  () => {
        setIsLoading(true);
        try {

            const response = await axios.get('/getPhoneCode');
            
            setGetPhoneCode(response.data);
            
        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPhoneCode();
    }, []);

    return(
        <div className="flex w-full px-0 flex-col items-center gap-5">
            {/* Work Experience */}
            <div className="flex w-[728px] flex-col items-center border border-gray-200 rounded-sm">
                <div className="flex px-5 py-4 flex-col items-start self-stretch border-b border-b-gray-200">
                    <div className="self-stretch text-gray-950 font-semibold">Work Experience</div>
                    <div className="self-stretch text-gray-500 text-sm">Share your current or most recent professional journey with us.</div>
                </div>
                <label className="flex p-5 items-center gap-4 self-stretch">
                    <Checkbox
                        checked={data.experience === 'no'} // checked if experience is 'no'
                        onChange={handleForm}
                    />
                    <div className="text-gray-950 cursor-pointer">I do not have any work experience</div>
                </label >
                {/* Experience 1 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Experience 1</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="job1_title" value="Job Title" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput 
                            id="job1_title"
                            type="text"
                            name="job1_title"
                            value={data.job1_title}
                            className="w-full"
                            autoComplete="job1_title"
                            onChange={(e) => setData('job1_title', e.target.value)}
                            disabled={data.experience === 'no'}
                            hasError={!!errors.job1_title}
                        />
                        <InputError message={errors.job1_title}  />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="job1_period" value="Period" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex items-center self-stretch relative">
                            <Calendar
                                value={data.job1_period}
                                onChange={(e) => setData('job1_period', e.value)} 
                                className="w-full h-[46px] text-sm"
                                placeholder="dd/mm/yyyy - dd/mm/yyyy"
                                selectionMode="range"
                                dateFormat="dd/mm/yy"
                                readOnlyInput
                                disabled={data.experience === 'no'}
                                invalid={!!errors.job1_period}
                                pt={{
                                    input: {
                                        className: 'w-full py-3 px-4 text-sm text-gray-950 border border-gray-300 rounded-sm hover:border-gray-400 focus:border-gray-950 focus:ring-0 focus:outline-none'
                                    },
                                }}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {
                                    data.job1_period === null ? (
                                        <DatePickerIcon />
                                    ) : (
                                        <span className="cursor-pointer" onClick={() => setData('job1_period', null)}>
                                            <ClearIcon />
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                        <InputError message={errors.job1_period} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="job1_company" value="Company Name" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput 
                            id="job1_company"
                            type="text"
                            name="job1_company"
                            value={data.job1_company}
                            className="w-full"
                            autoComplete="job1_company"
                            onChange={(e) => setData('job1_company', e.target.value)}
                            disabled={data.experience === 'no'}
                            hasError={!!errors.job1_company}
                        />
                        <InputError message={errors.job1_company} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="job1_address" value="Address/City/State" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput 
                            id="job1_address"
                            type="text"
                            name="job1_address"
                            value={data.job1_address}
                            className="w-full"
                            autoComplete="job1_address"
                            onChange={(e) => setData('job1_address', e.target.value)}
                            disabled={data.experience === 'no'}
                            hasError={!!errors.job1_address}
                        />
                        <InputError message={errors.job1_address} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="job1_supervisor" value="Supervisor Name" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput 
                            id="job1_supervisor"
                            type="text"
                            name="job1_supervisor"
                            value={data.job1_supervisor}
                            className="w-full"
                            autoComplete="job1_supervisor"
                            onChange={(e) => setData('job1_supervisor', e.target.value)}
                            disabled={data.experience === 'no'}
                            hasError={!!errors.job1_supervisor}
                        />
                        <InputError message={errors.job1_supervisor} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="job1_phonecode" value="Phone Number" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex items-center gap-2 self-stretch"> 
                            <Dropdown 
                                value={data.job1_dailcode} 
                                onChange={(e) => setData('job1_dailcode', e.value)} 
                                options={getPhoneCode.map((item) => ({
                                    label: item.phoneCode, // What user sees
                                    value: `${item.phoneCode}`, // Ensures it prefixes with +
                                }))}
                                loading={isLoading}
                                optionLabel="label"
                                placeholder="Select"
                                className="w-full max-w-[100px] text-sm"
                                disabled={data.experience === 'no'}
                                pt={{
                                    root: { className: 'border border-gray-300 rounded-sm px-4 py-3 text-gray-950 focus-within:border-gray-950 transition-colors duration-200 cursor' }, // main box
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
                            <TextInput 
                                id="job1_phonecode"
                                type="number"
                                name="job1_phonecode"
                                value={data.job1_phonecode}
                                className="w-full"
                                placeholder="Phone Number"
                                autoComplete="job1_phonecode"
                                onChange={(e) => setData('job1_phonecode', e.target.value)}
                                disabled={data.experience === 'no'}
                                hasError={!!errors.job1_phonecode}
                            />
                        </div>
                        <InputError message={errors.job1_phonecode} />    
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="job1_reason" value="Reason for Leaving" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput 
                            id="job1_reason"
                            type="text"
                            name="job1_reason"
                            value={data.job1_reason}
                            className="w-full"
                            placeholder=" "
                            autoComplete="job1_reason"
                            onChange={(e) => setData('job1_reason', e.target.value)}
                            disabled={data.experience === 'no'}
                            hasError={!!errors.job1_reason}
                        />
                        <InputError message={errors.job1_reason} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="job1_startsalary" value="Starting Salary" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex items-center gap-3 self-stretch">
                            <InputNumber 
                                inputId="rm"
                                value={data.job1_startsalary || 0} 
                                onValueChange={(e) => setData('job1_startsalary', e.value)} 
                                prefix="RM " 
                                className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                min={0}
                                invalid={!!errors.job1_startsalary}
                                disabled={data.experience === 'no'}
                            />
                        </div>
                        <InputError message={errors.job1_startsalary} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="job1_endsalary" value="Ending Salary" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex items-center gap-3 self-stretch">
                            <InputNumber 
                                inputId="rm"
                                value={data.job1_endsalary || 0} 
                                onValueChange={(e) => setData('job1_endsalary', e.value)} 
                                prefix="RM " 
                                className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                min={0}
                                invalid={!!errors.job1_endsalary}
                                disabled={data.experience === 'no'}
                            />
                        </div>
                        <InputError message={errors.job1_endsalary} />
                    </div>
                </form>

                {/* Experience 2 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Experience 2</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="job2_title" value="Job Title" />
                        <TextInput 
                            id="job2_title"
                            type="text"
                            name="job2_title"
                            value={data.job2_title}
                            className="w-full"
                            autoComplete="job2_title"
                            onChange={(e) => setData('job2_title', e.target.value)}
                            disabled={data.experience === 'no'}
                            hasError={!!errors.job2_title}
                        />
                        <InputError message={errors.job2_title} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="job2_period" value="Period" />
                        <div className="flex items-center self-stretch relative">
                            <Calendar
                                value={data.job2_period}
                                onChange={(e) => setData('job2_period', e.value)} 
                                className="w-full text-sm"
                                placeholder="dd/mm/yyyy - dd/mm/yyyy"
                                selectionMode="range"
                                dateFormat="dd/mm/yy"
                                readOnlyInput
                                disabled={data.experience === 'no'}
                                invalid={!!errors.job2_period}
                                pt={{
                                    input: {
                                        className: 'w-full py-3 px-4 text-sm text-gray-950 border border-gray-300 rounded-sm hover:border-gray-400 focus:border-gray-950 focus:ring-0 focus:outline-none'
                                    },
                                }}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {
                                    data.job2_period === null ? (
                                        <DatePickerIcon />
                                    ) : (
                                        <span className="cursor-pointer" onClick={() => setData('job2_period', null)}>
                                            <ClearIcon />
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                        <InputError message={errors.job2_period} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="job2_company" value="Company Name" />
                        <TextInput 
                            id="job2_company"
                            type="text"
                            name="job2_company"
                            value={data.job2_company}
                            className="w-full"
                            autoComplete="job2_company"
                            onChange={(e) => setData('job2_company', e.target.value)}
                            disabled={data.experience === 'no'}
                            hasError={!!errors.job2_company}
                        />
                        <InputError message={errors.job2_company} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="job2_address" value="Address/City/State" />
                        <TextInput 
                            id="job2_address"
                            type="text"
                            name="job2_address"
                            value={data.job2_address}
                            className="w-full"
                            autoComplete="job2_address"
                            onChange={(e) => setData('job2_address', e.target.value)}
                            disabled={data.experience === 'no'}
                            hasError={!!errors.job2_address}
                        />
                        <InputError message={errors.job2_address} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="job2_supervisor" value="Supervisor Name" />
                        <TextInput 
                            id="job2_supervisor"
                            type="text"
                            name="job2_supervisor"
                            value={data.job2_supervisor}
                            className="w-full"
                            autoComplete="job2_supervisor"
                            onChange={(e) => setData('job2_supervisor', e.target.value)}
                            disabled={data.experience === 'no'}
                            hasError={!!errors.job2_supervisor}
                        />
                        <InputError message={errors.job2_supervisor} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="job2_phonecode" value="Phone Number" />
                        <div className="flex items-center gap-2 self-stretch"> 
                            <Dropdown 
                                value={data.job2_dailcode} 
                                onChange={(e) => setData('job2_dailcode', e.value)} 
                                options={getPhoneCode.map((item) => ({
                                    label: item.phoneCode, // What user sees
                                    value: `${item.phoneCode}`, // Ensures it prefixes with +
                                }))}
                                loading={isLoading}
                                optionLabel="label"
                                placeholder="Select "
                                className="w-full max-w-[100px] text-sm"
                                disabled={data.experience === 'no'}
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
                            <TextInput 
                                id="job2_phonecode"
                                type="number"
                                name="job2_phonecode"
                                value={data.job2_phonecode}
                                className="w-full"
                                placeholder="Phone Number"
                                autoComplete="job2_phonecode"
                                onChange={(e) => setData('job2_phonecode', e.target.value)}
                                disabled={data.experience === 'no'}
                                hasError={!!errors.job2_phonecode}
                            />
                        </div>
                        <InputError message={errors.job2_phonecode} />
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">                        
                        <InputLabel htmlFor="job2_reason" value="Reason for Leaving" />
                        <TextInput 
                            id="job2_reason"
                            type="text"
                            name="job2_reason"
                            value={data.job2_reason}
                            className="w-full"
                            placeholder=" "
                            autoComplete="job2_reason"
                            onChange={(e) => setData('job2_reason', e.target.value)}
                            disabled={data.experience === 'no'}
                            hasError={!!errors.job2_reason}
                        />
                        <InputError message={errors.job2_reason} />
                    </div>

                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="job2_startsalary" value="Starting Salary" />
                        <div className="flex items-center gap-3 self-stretch">
                            <InputNumber 
                                inputId="rm"
                                value={data.job2_startsalary || 0} 
                                onValueChange={(e) => setData('job2_startsalary', e.value)} 
                                prefix="RM " 
                                className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                min={0}
                                invalid={!!errors.job2_startsalary}
                                disabled={data.experience === 'no'}
                            />
                        </div>
                        <InputError message={errors.job2_startsalary} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="job2_endsalary" value="Ending Salary" />
                        <div className="flex items-center gap-3 self-stretch">
                            <InputNumber 
                                inputId="rm"
                                value={data.job2_endsalary || 0} 
                                onValueChange={(e) => setData('job2_endsalary', e.value)} 
                                prefix="RM " 
                                className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                min={0}
                                invalid={!!errors.job2_endsalary}
                                disabled={data.experience === 'no'}
                            />
                        </div>
                        <InputError message={errors.job2_endsalary} />
                    </div>
                </form>

                {/* Experience 3 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Experience 3</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="job3_title" value="Job Title" />
                        <TextInput 
                            id="job3_title"
                            type="text"
                            name="job3_title"
                            value={data.job3_title}
                            className="w-full"
                            autoComplete="job3_title"
                            onChange={(e) => setData('job3_title', e.target.value)}
                            disabled={data.experience === 'no'}
                            hasError={!!errors.job3_title}
                        />
                        <InputError message={errors.job3_title} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="job3_period" value="Period" />
                        <div className="flex items-center self-stretch relative">
                            <Calendar
                                value={data.job3_period}
                                onChange={(e) => setData('job3_period', e.value)} 
                                className="w-full text-sm"
                                placeholder="dd/mm/yyyy - dd/mm/yyyy"
                                selectionMode="range"
                                dateFormat="dd/mm/yy"
                                readOnlyInput
                                disabled={data.experience === 'no'}
                                invalid={!!errors.job3_period}
                                pt={{
                                    input: {
                                        className: 'w-full py-3 px-4 text-sm text-gray-950 border border-gray-300 rounded-sm hover:border-gray-400 focus:border-gray-950 focus:ring-0 focus:outline-none'
                                    },
                                }}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {
                                    data.job3_period === null ? (
                                        <DatePickerIcon />
                                    ) : (
                                        <span className="cursor-pointer" onClick={() => setData('job3_period', null)}>
                                            <ClearIcon />
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                        <InputError message={errors.job3_period} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="job3_company" value="Company Name" />
                        <TextInput 
                            id="job3_company"
                            type="text"
                            name="job3_company"
                            value={data.job3_company}
                            className="w-full"
                            autoComplete="job3_company"
                            onChange={(e) => setData('job3_company', e.target.value)}
                            disabled={data.experience === 'no'}
                            hasError={!!errors.job3_company}
                        />
                        <InputError message={errors.job3_company} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="job3_address" value="Address/City/State" />
                        <TextInput 
                            id="job3_address"
                            type="text"
                            name="job3_address"
                            value={data.job3_address}
                            className="w-full"
                            autoComplete="job3_address"
                            onChange={(e) => setData('job3_address', e.target.value)}
                            disabled={data.experience === 'no'}
                            hasError={!!errors.job3_address}
                        />
                        <InputError message={errors.job3_address} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="job3_supervisor" value="Supervisor Name" />
                        <TextInput 
                            id="job3_supervisor"
                            type="text"
                            name="job3_supervisor"
                            value={data.job3_supervisor}
                            className="w-full"
                            autoComplete="job3_supervisor"
                            onChange={(e) => setData('job3_supervisor', e.target.value)}
                            disabled={data.experience === 'no'}
                            hasError={!!errors.job3_supervisor}
                        />
                        <InputError message={errors.job3_supervisor} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="job3_phonecode" value="Phone Number" />
                        <div className="flex items-center gap-2 self-stretch"> 
                            <Dropdown 
                                value={data.job3_dailcode} 
                                onChange={(e) => setData('job3_dailcode', e.value)} 
                                options={getPhoneCode.map((item) => ({
                                    label: item.phoneCode, // What user sees
                                    value: `${item.phoneCode}`, // Ensures it prefixes with +
                                }))}
                                loading={isLoading}
                                optionLabel="label"
                                placeholder="Select "
                                className="w-full max-w-[100px] text-sm"
                                disabled={data.experience === 'no'}
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
                            <TextInput 
                                id="job3_phonecode"
                                type="number"
                                name="job3_phonecode"
                                value={data.job3_phonecode}
                                className="w-full"
                                placeholder="Phone Number"
                                autoComplete="job3_phonecode"
                                onChange={(e) => setData('job3_phonecode', e.target.value)}
                                disabled={data.experience === 'no'}
                                hasError={!!errors.job3_phonecode}
                            />
                        </div>
                        <InputError message={errors.job3_phonecode} />
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">                        
                        <InputLabel htmlFor="job3_reason" value="Reason for Leaving" />
                        <TextInput 
                            id="job3_reason"
                            type="text"
                            name="job3_reason"
                            value={data.job3_reason}
                            className="w-full"
                            placeholder=" "
                            autoComplete="job3_reason"
                            onChange={(e) => setData('job3_reason', e.target.value)}
                            disabled={data.experience === 'no'}
                            hasError={!!errors.job3_reason}
                        />
                        <InputError message={errors.job3_reason} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="job3_startsalary" value="Starting Salary" />
                        <div className="flex items-center gap-3 self-stretch">
                            <InputNumber 
                                inputId="rm"
                                value={data.job3_startsalary || 0} 
                                onValueChange={(e) => setData('job3_startsalary', e.value)} 
                                prefix="RM " 
                                className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                min={0}
                                invalid={!!errors.job3_startsalary}
                                disabled={data.experience === 'no'}
                            />
                        </div>
                        <InputError message={errors.job3_startsalary} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <InputLabel htmlFor="job3_endsalary" value="Ending Salary" />
                        <div className="flex items-center gap-3 self-stretch">
                            <InputNumber 
                                inputId="rm"
                                value={data.job3_endsalary || 0} 
                                onValueChange={(e) => setData('job3_endsalary', e.value)} 
                                prefix="RM " 
                                className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                min={0}
                                invalid={!!errors.job3_endsalary}
                                disabled={data.experience === 'no'}
                            />
                        </div>
                        <InputError message={errors.job3_endsalary} />
                    </div>
                </form>
            </div>
        </div>
    )
}