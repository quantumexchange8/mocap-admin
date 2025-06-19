import React, { useEffect, useState } from "react";
import { usePage, useForm, router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import toast from "react-hot-toast";
import { Calendar } from 'primereact/calendar';
import { ClearIcon, DatePickerIcon } from "@/Components/Icon/Outline";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

export default function WorkInfo({isWorkInfoOpen, setIsWorkInfoOpen, closeWorkInfo, user_details, work_info}) {

    const [isLoading, setIsLoading] = useState(false);
    const [getPhoneCode, setGetPhoneCode] = useState([]);

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

    const { data, setData, errors, post, reset } = useForm({
        id: '',
        work_info: [{
            id: '',
            title: '',
            period_from: null,
            period_to: null,
            company_name: '',
        }],
        type: '',
        // create new 
        job1_title: '',
        job1_period: null,
        job1_company: '',
        job1_address: '',
        job1_supervisor: '',
        job1_dailcode: '+60',
        job1_phonecode: '',
        job1_reason: '',
        job1_startsalary: '',
        job1_endsalary: '',
        job2_title: '',
        job2_period: null,
        job2_company: '',
        job2_address: '',
        job2_supervisor: '',
        job2_dailcode: '+60',
        job2_phonecode: '',
        job2_reason: '',
        job2_startsalary: '',
        job2_endsalary: '',
        job3_title: '',
        job3_period: null,
        job3_company: '',
        job3_address: '',
        job3_supervisor: '',
        job3_dailcode: '+60',
        job3_phonecode: '',
        job3_reason: '',
        job3_startsalary: '',
        job3_endsalary: '',

    });

    useEffect(() => {
        if (work_info) {
            setData('work_info', work_info);
            setData('type', 'edit')
        } else {
            setData('id', user_details.id)
            setData('type', 'create')
        }
    }, [work_info]);

    const formatDateToString = (date) => {
        if (!date) return null; // or return '' if you prefer
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        post('/update-work-info', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                closeWorkInfo();
                reset();

                // 🔁 Refresh only user_details prop from the backend
                router.reload({ only: ['work_info'] });

                toast.success(`Work experience updated successfully for ${user_details.username}.`, {
                    title: `Work experience updated successfully for ${user_details.username}.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            },
        })
    }

    return(
        <>
            <Modal
                show={isWorkInfoOpen}
                maxWidth='md'
                title='Work Experience'
                onClose={closeWorkInfo}
                footer={
                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button variant="outlined" size="sm" onClick={closeWorkInfo}>Cancel</Button>
                        <Button size="sm" onClick={submit} >Save Changes</Button>
                    </div>
                }
            >
                {
                    work_info?.experience ? (
                        <div className="py-3 px-6 flex flex-col gap-8">
                            {
                                work_info?.experience?.map((experience, index) => (
                                    <div key={index} className="flex flex-col gap-5">
                                        <div className="flex flex-col col-span-2 text-gray-950 font-semibold">Experience {index + 1}</div>
                                        <div className="grid grid-cols-2 gap-5">
                                            <div className="flex flex-col gap-2">
                                                <InputLabel htmlFor="title" value="Job Title" />
                                                <TextInput 
                                                    id="title"
                                                    type="text"
                                                    value={experience.title}
                                                    className="w-full"
                                                    placeholder=" "
                                                    onChange={(e) => {
                                                        const updated = [...data.work_info];
                                                        updated[index].title = e.target.value;
                                                        setData('work_info', updated);
                                                    }}                                                    
                                                    hasError={!!errors[`work_info.${index}.title`]}
                                                />
                                                <InputError message={errors[`work_info.${index}.title`]} />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <InputLabel htmlFor="from_date" value="From" />
                                                <div className="flex items-center self-stretch relative">
                                                   <Calendar
                                                        value={
                                                           [
                                                            experience.period_from ? new Date(experience.period_from) : null,
                                                            experience.period_to ? new Date(experience.period_to) : null,
                                                            ]
                                                        }
                                                        onChange={(e) => {
                                                            const updated = [...data.work_info];
                                                            updated[index].period_from = formatDateToString(e.value[0]);
                                                            updated[index].period_to = formatDateToString(e.value[1]);
                                                            setData('work_info', updated);
                                                        }}
                                                        className="w-full h-[46px] text-sm"
                                                        placeholder="dd/mm/yyyy - dd/mm/yyyy"
                                                        selectionMode="range"
                                                        dateFormat="dd/mm/yy"
                                                        readOnlyInput
                                                        invalid={!!errors[`work_info.${index}.period_from`]}
                                                        pt={{
                                                            input: {
                                                                className: 'w-full py-3 px-4 text-sm text-gray-950 border border-gray-300 rounded-sm hover:border-gray-400 focus:border-gray-950 focus:ring-0 focus:outline-none'
                                                            },
                                                        }}
                                                    />
                                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                        <DatePickerIcon />
                                                    </div>
                                                </div>
                                                <InputError message={errors[`work_info.${index}.period_from`]} />
                                                <InputError message={errors[`work_info.${index}.period_to`]} />

                                            </div>
                                            <div className="flex flex-col gap-2 col-span-2">
                                                <InputLabel htmlFor="company_name" value="Company Name" />
                                                <TextInput 
                                                    id="company_name"
                                                    type="text"
                                                    value={experience.company_name}
                                                    className="w-full"
                                                    placeholder=" "
                                                    onChange={(e) => {
                                                        const updated = [...data.work_info];
                                                        updated[index].company_name = e.target.value;
                                                        setData('work_info', updated);
                                                    }}                                                    
                                                    hasError={!!errors[`work_info.${index}.company_name`]}
                                                />
                                                <InputError message={errors[`work_info.${index}.company_name`]} />
                                            </div>
                                        </div>
                                    </div>    
                                ))
                            }
                        </div>
                    ) : (

                        //create new
                        <div className="py-3 px-6 flex flex-col gap-8">
                            {/* Experience 1 */}
                            <div className="flex flex-col gap-5">
                                <div className="text-gray-950 text-base font-semibold">Experience 1</div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Job Title' />
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
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <InputLabel value='Period' />
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Company Name' />
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Address/City/State' />
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Supervisor Name' />
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Phone Number' />
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full col-span-2">
                                        <InputLabel value='Reason for Leaving' />
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Starting Salary' />
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
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Ending Salary' />
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
                                </div>
                            </div>
                            {/* Experience 2 */}
                            <div className="flex flex-col gap-5">
                                <div className="text-gray-950 text-base font-semibold">Experience 2</div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Job Title' />
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
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <InputLabel value='Period' />
                                        <div className="flex items-center self-stretch relative">
                                            <Calendar
                                                value={data.job2_period}
                                                onChange={(e) => setData('job2_period', e.value)} 
                                                className="w-full h-[46px] text-sm"
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Company Name' />
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Address/City/State' />
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Supervisor Name' />
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Phone Number' />
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full col-span-2">
                                        <InputLabel value='Reason for Leaving' />
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Starting Salary' />
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
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Ending Salary' />
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
                                </div>
                            </div>
                            {/* Experience 3 */}
                            <div className="flex flex-col gap-5">
                                <div className="text-gray-950 text-base font-semibold">Experience 3</div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Job Title' />
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
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <InputLabel value='Period' />
                                        <div className="flex items-center self-stretch relative">
                                            <Calendar
                                                value={data.job3_period}
                                                onChange={(e) => setData('job3_period', e.value)} 
                                                className="w-full h-[46px] text-sm"
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Company Name' />
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Address/City/State' />
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Supervisor Name' />
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Phone Number' />
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full col-span-2">
                                        <InputLabel value='Reason for Leaving' />
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Starting Salary' />
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
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Ending Salary' />
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
                                </div>
                            </div>
                            
                        </div>
                    )
                }
            </Modal>
        </>
    )
}