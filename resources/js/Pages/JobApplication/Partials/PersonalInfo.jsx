import React, { useEffect, useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { CalendarIcon, ClearIcon, DatePickerIcon } from "@/Components/Icon/Outline";
import InputError from "@/Components/InputError";
import { Select } from "antd";
import { InputNumber } from "primereact/inputnumber";

export default function PersonalInfo({ data, setData, errors }) {
    
    const races = [
        {name: 'Malay'},
        {name: 'Chinese'},
        {name: 'Indian'},
        {name: 'Others'},
    ];

    const religions = [
        {name: 'Islam'},
        {name: 'Buddhism'},
        {name: 'Christianity'},
        {name: 'Hinduism'},
        {name: 'No Religion'},
    ];

    const marital = [
        {name: 'Single'},
        {name: 'Married'},
        {name: 'Divorced'},
        {name: 'Widowed'},
    ];

    const noticePeriod = [
        {name: '1 months', value: '1'},
        {name: '2 months', value: '2'},
        {name: '3 months', value: '3'},
        {name: '4 months', value: '4'},
        {name: '5 months', value: '5'},
        {name: '6 months', value: '6'},
    ];

    const [isLoading, setIsLoading] = useState(false);
    const [getNationality, setGetNationality] = useState([]);
    const [filterNationalityState, setFilterNationalityState] = useState([]);
    const [getPhoneCode, setGetPhoneCode] = useState([]);
    const [getStates, setGetStates] = useState([]);
    const [getPosition, setGetPosition] = useState([]);
    let minDate = new Date();

    const fetchPosition = async  () => {
        setIsLoading(true);
        try {

            const response = await axios.get('/getPosition');
            
            setGetPosition(response.data);
            
        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchNationality = async  () => {
        setIsLoading(true);
        try {

            const response = await axios.get('/getNationality');
            
            setGetNationality(response.data);
            
        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }
    
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

    const fetchState = async  () => {
        setIsLoading(true);
        try {

            const response = await axios.get('/getState');
            
            setGetStates(response.data);
            
        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPosition();
        fetchNationality();
        fetchPhoneCode();
        fetchState();
    }, []);

    useEffect(() => {
        if (data.nationality && getNationality.length > 0) {
            const selected = getNationality.find(n => n.name === data.nationality);
            if (selected && selected.states) {
                setFilterNationalityState(selected.states);
            } else {
                setFilterNationalityState([]);
            }
        }
    }, [data.nationality, getNationality]);

    const today = new Date();
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(today.getFullYear() - 10);
    const defaultViewDate = new Date(2000, 0, 1); // January 1, 2000
    
    const clearDate = () => {
        setData('start_date', null);
    }

    const handleSelectChange = (selected) => {
        setData('position', selected)
    }

    return (
        <div className="flex w-full px-0 flex-col items-center gap-5">
            {/* Job Preferences */}
            <div className="flex w-[728px] flex-col items-center rounded-sm border border-gray-200 bg-white">
                <div className="flex px-5 py-4 flex-col items-start self-stretch border-b border-b-gray-200">
                    <div className="self-stretch text-gray-950 text-md font-semibold">Job Preferences </div>
                    <div className="self-stretch text-gray-500 text-sm">Let us know your position of interest and salary expectations.</div>
                </div>
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="position" value="Position Apply For" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <Select 
                            value={data.position}
                            showSearch
                            placeholder="Select"
                            className="antd-select-custom focus:ring-offset-transparent"
                            onChange={handleSelectChange}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={getPosition.map(user => ({
                                label: user.name,
                                value: user.name,
                            }))}
                        />
                        <InputError message={errors.position}  />  
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="expected_salary" value="Expected Salary" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex items-center gap-3 self-stretch">
                            <InputNumber 
                                inputId="rm"
                                value={data.expected_salary || 0} 
                                onValueChange={(e) => setData('expected_salary', e.value)} 
                                prefix="RM " 
                                className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                min={0}
                                invalid={!!errors.expected_salary}
                            />
                        </div>
                        <InputError message={errors.expected_salary}  />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="start_date" value="Available Date to Start Work" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex items-center self-stretch relative">
                            <Calendar
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.value)} 
                                className="w-full text-sm"
                                placeholder="dd/mm/yyyy"
                                minDate={minDate}
                                dateFormat="dd/mm/yy"
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
                                invalid={!!errors.start_date}
                                readOnlyInput
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {
                                    data.start_date === null ? (
                                        <DatePickerIcon />
                                    ) : (
                                        <span className="cursor-pointer" onClick={clearDate}>
                                            <ClearIcon />
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                        <InputError message={errors.start_date}  />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="start_date" value="Notice Period" />
                        </div>
                        <div className="flex items-center self-stretch">
                            <Select 
                                value={data.notice_period}
                                placeholder="Select"
                                className="antd-select-custom focus:ring-offset-transparent"
                                onChange={(value) => setData('notice_period', value)}
                                options={noticePeriod.map(user => ({
                                    label: user.name,
                                    value: user.name,
                                }))}
                            />
                        </div>
                    </div>
                </form>
            </div>

            {/* Personal Information */}
            <div className="flex w-[728px] flex-col items-center rounded-sm border border-gray-200 bg-white">
                <div className="flex px-5 py-4 flex-col items-start self-stretch border-b border-b-gray-200">
                    <div className="self-stretch text-gray-950 text-md font-semibold">Personal Information </div>
                    <div className="self-stretch text-gray-500 text-sm">Basic details to identify and contact you.</div>
                </div>
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="full_name" value="Full Name" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput 
                            id="full_name"
                            type="text"
                            name="full_name"
                            value={data.full_name}
                            className="w-full"
                            placeholder="as per NRIC/Passport"
                            autoComplete="full_name"
                            isFocused={false}
                            onChange={(e) => setData('full_name', e.target.value)}
                            hasError={!!errors.full_name}
                        />
                        <InputError message={errors.full_name}  />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="identity_no" value="NRIC/Passport No." /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput
                            id="identity_no"
                            type="text"
                            name="identity_no"
                            value={data.identity_no}
                            className="w-full"
                            placeholder="901223145678 / A12345678"
                            autoComplete="identity_no"
                            onChange={(e) => setData('identity_no', e.target.value)}
                            hasError={!!errors.identity_no}
                        />
                        <InputError message={errors.identity_no}  />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="nationality" value="Nationality" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <Dropdown
                            value={data.nationality} 
                            onChange={(e) => setData('nationality', e.value)} 
                            options={getNationality.map((item) => ({
                                label: item.name,
                                value: item.name,
                            }))}
                            optionLabel="label"
                            placeholder="Select a Country" 
                            loading={isLoading}
                            filter
                            className="w-full text-sm"
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
                        <InputError message={errors.nationality}  />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="place_of_birth" value="Place of Birth" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                       <Dropdown 
                            value={data.place_of_birth} 
                            onChange={(e) => setData('place_of_birth', e.value)} 
                            options={filterNationalityState.map((item) => ({
                                label: item.name,
                                value: item.name,
                            }))}
                            optionLabel="label"
                            placeholder="Select "
                            className="w-full text-sm"
                            invalid={!!errors.place_of_birth}
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
                        <InputError message={errors.place_of_birth}  />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="marital status" value="Marital Status" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <Dropdown 
                            value={data.marital_status} 
                            onChange={(e) => setData('marital_status', e.value)} 
                            options={marital}
                            optionLabel="name"
                            placeholder="Select "
                            className="w-full text-sm"
                            invalid={!!errors.marital_status}
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
                        <InputError message={errors.marital_status}  />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="race" value="Race" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <Dropdown 
                            value={data.race} 
                            onChange={(e) => setData('race', e.value)} 
                            options={races.map((item) => ({
                                label: item.name,
                                value: item.name,
                            }))}
                            optionLabel="label"
                            placeholder="Select "
                            className="w-full text-sm"
                            invalid={!!errors.race}
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
                        <InputError message={errors.race} />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="religion" value="Religion" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <Dropdown 
                            value={data.religion} 
                            onChange={(e) => setData('religion', e.value)} 
                            options={religions.map((item) => ({
                                label: item.name,
                                value: item.name,
                            }))}
                            optionLabel="label"
                            placeholder="Select "
                            className="w-full text-sm"
                            invalid={!!errors.religion}
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
                        <InputError message={errors.religion} />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="phone no" value="Phone Number" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex items-center gap-2 self-stretch"> 
                            <Dropdown 
                                value={data.dial_code} 
                                onChange={(e) => setData('dial_code', e.value)} 
                                options={getPhoneCode.map((item) => ({
                                    label: item.phoneCode, // What user sees
                                    value: `${item.phoneCode}`, // Ensures it prefixes with +
                                }))}
                                loading={isLoading}
                                optionLabel="label"
                                placeholder="Select "
                                className="w-full max-w-[100px] text-sm"
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
                                id="phone_no"
                                type="number"
                                name="phone_no"
                                value={data.phone_no}
                                className="w-full"
                                placeholder="Phone Number"
                                autoComplete="phone_no"
                                onChange={(e) => setData('phone_no', e.target.value)}
                                hasError={!!errors.phone_no}
                            />
                        </div>
                        <InputError message={errors.phone_no} />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="email" value="Email" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput 
                            id="email"
                            type="text"
                            name="email"
                            value={data.email}
                            className="w-full"
                            placeholder="you@example.com"
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                            hasError={!!errors.email}
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="address" value="Current Address" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput 
                            id="address"
                            type="text"
                            name="address"
                            value={data.address}
                            className="w-full"
                            placeholder="House no./unit no., building name, street name/district, etc."
                            autoComplete="address"
                            onChange={(e) => setData('address', e.target.value)}
                            hasError={!!errors.address}
                        />
                        <InputError message={errors.address} />
                        <div className="flex self-stretch text-gray-500 text-xs">Enter your full address, including street name and unit number.</div>
                    </div>
                    <div className="flex min-w-[200px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="postcode" value="Postcode" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput 
                            id="postcode"
                            type="number"
                            name="postcode"
                            value={data.postcode}
                            className="w-full"
                            placeholder="e.g. 50000"
                            autoComplete="postcode"
                            onChange={(e) => setData('postcode', e.target.value)}
                            hasError={!!errors.postcode}
                        />
                        <InputError message={errors.postcode} />
                    </div>
                    <div className="flex min-w-[200px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="city" value="City" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput 
                            id="city"
                            type="text"
                            name="address"
                            value={data.city}
                            className="w-full"
                            placeholder="e.g. Kuala Lumpur"
                            autoComplete="city"
                            onChange={(e) => setData('city', e.target.value)}
                            hasError={!!errors.city}
                        />
                        <InputError message={errors.city} />
                    </div>
                    <div className="flex min-w-[200px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="state" value="State" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                       <Dropdown 
                            value={data.state} 
                            onChange={(e) => setData('state', e.value)} 
                            options={getStates.map((item) => ({
                                label: item.name,
                                value: item.name,
                            }))}
                            optionLabel="label"
                            placeholder="Select "
                            className="w-full text-sm"
                            invalid={!!errors.state}
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
                        <InputError message={errors.state} />
                    </div>
                </form>
            </div>
        </div>
    )
}