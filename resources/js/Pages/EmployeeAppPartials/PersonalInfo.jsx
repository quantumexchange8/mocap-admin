import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { DatePicker, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import dayjs from "dayjs";
import { Calendar } from 'primereact/calendar';
import { CalendarIcon, ClearIcon, DatePickerIcon } from "@/Components/Icon/Outline";
        
export default function PersonalInfo({ data, setData }) {

    const races = [
        {name: 'Malay'},
        {name: 'Chinese'},
        {name: 'Indian'},
    ];

    const religions = [
        {name: 'Islam'},
        {name: 'Buddhism'},
        {name: 'Christianity'},
        {name: 'Hinduism'},
        {name: 'No Religion'},
    ];

    const accType = [
        {name: 'Saving Account'},
        {name: 'Current Account'},
        {name: 'Islamic Account'},
    ];


    const [getNationlity, setGetNationality] = useState([]);
    const [getPhoneCode, setGetPhoneCode] = useState([]);
    const [getStates, setGetStates] = useState([]);
    const [getBank, setGetBank] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
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

    const fetchBank = async  () => {
        setIsLoading(true);
        try {

            const response = await axios.get('/getBank');
            
            setGetBank(response.data);
            
        } catch (error) {
            console.error('error', error);
        }  finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchNationality();
        fetchPhoneCode();
        fetchState();
        fetchBank();
    }, []);

    const today = new Date();
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(today.getFullYear() - 10);
    const defaultViewDate = new Date(2000, 0, 1); // January 1, 2000
    
    const clearDate = () => {
        setData('dob', null);
    }

    return (
        <>
            {/* Personal Info */}
            <div className="flex flex-col border border-gray-200 bg-white rounded-sm">
                <div className="flex flex-col py-4 px-5 border-b border-gray-200">
                    <div className="text-gray-950 text-base font-semibold">Personal Information</div>
                    <div className="text-gray-500 text-sm">Basic details to identify and contact you.</div>
                </div>
                <div className="p-5 grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="full_name" value={<div className="flex gap-1">
                            <span>Full Name</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <TextInput 
                            id="full_name"
                            type="text"
                            name="full_name"
                            value={data.full_name}
                            className="w-full"
                            placeholder="as per NRIC/Passport"
                            autoComplete="full_name"
                            isFocused={true}
                            onChange={(e) => setData('full_name', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="username" value={<div className="flex gap-1">
                            <span>Preferred Name</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <TextInput 
                            id="username"
                            type="text"
                            name="username"
                            value={data.username}
                            className="w-full"
                            placeholder="Your name as it will appear in the app"
                            autoComplete="username"
                            onChange={(e) => setData('username', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="nationality" value={<div className="flex gap-1">
                            <span>Nationality</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <Dropdown 
                            value={data.nationality} 
                            onChange={(e) => setData('nationality', e.value)} 
                            options={getNationlity.map((item) => ({
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
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="identity_no" value={<div className="flex gap-1">
                            <span>NRIC/Passport No.</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <TextInput 
                            id="identity_no"
                            type="text"
                            name="identity_no"
                            value={data.identity_no}
                            className="w-full"
                            placeholder="901223145678 / A12345678"
                            autoComplete="identity_no"
                            onChange={(e) => setData('identity_no', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="gender" value={<div className="flex gap-1">
                            <span>Gender </span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <Radio.Group 
                            value={data.gender}
                            onChange={(e) => setData('gender', e.target.value)}
                            options={[
                                {value: 'male', label: 'Male'},
                                {value: 'female', label: 'Female'},
                            ]}
                            className="py-3"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="dob" value={<div className="flex gap-1">
                            <span>Date of Birth </span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <div className="relative">
                            <Calendar 
                                value={data.dob} 
                                onChange={(e) => setData('dob', e.value)} 
                                className="w-full text-sm"
                                minDate={new Date(1900, 0, 1)} // Minimum date allowed (e.g., year 1900)
                                maxDate={tenYearsAgo} // Restricts to dates 10+ years ago
                                viewDate={defaultViewDate}
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
                                    data.dob === null ? (
                                        <DatePickerIcon />
                                    ) : (
                                        <span className="cursor-pointer" onClick={clearDate}>
                                            <ClearIcon />
                                        </span>
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="race" value={<div className="flex gap-1">
                            <span>Race</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <Dropdown 
                            value={data.race} 
                            onChange={(e) => setData('race', e.value)} 
                            options={races}
                            optionLabel="name"
                            placeholder="Select "
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
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="religion" value={<div className="flex gap-1">
                            <span>Religion </span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <Dropdown 
                            value={data.religion} 
                            onChange={(e) => setData('religion', e.value)} 
                            options={religions}
                            optionLabel="name"
                            placeholder="Select "
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
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="phone_no" value={<div className="flex gap-1">
                            <span>Phone Number </span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <div className="flex items-center gap-2">
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
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="email" value={<div className="flex gap-1">
                            <span>Email</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <TextInput 
                            id="email"
                            type="text"
                            name="email"
                            value={data.email}
                            className="w-full"
                            placeholder="you@example.com"
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <div className="col-span-2  flex flex-col gap-2">
                        <InputLabel htmlFor="address" value={<div className="flex gap-1">
                            <span>Current Address</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <TextInput 
                            id="address"
                            type="text"
                            name="address"
                            value={data.address}
                            className="w-full"
                            placeholder="House no./unit no., building name, street name/district, etc."
                            autoComplete="address"
                            onChange={(e) => setData('address', e.target.value)}
                        />
                        <div className="text-gray-500 text-xs">
                            Enter your full address, including street name and unit number.
                        </div>
                    </div>
                    <div className="col-span-2 grid grid-cols-3 gap-5">
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="postcode" value={<div className="flex gap-1">
                                <span>Postcode</span>
                                <span className="text-error-600">*</span>
                            </div>} />
                            <TextInput 
                                id="postcode"
                                type="text"
                                name="postcode"
                                value={data.postcode}
                                className="w-full"
                                placeholder="e.g. 50000"
                                autoComplete="postcode"
                                onChange={(e) => setData('postcode', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="city" value={<div className="flex gap-1">
                                <span>City</span>
                                <span className="text-error-600">*</span>
                            </div>} />
                            <TextInput 
                                id="city"
                                type="text"
                                name="address"
                                value={data.city}
                                className="w-full"
                                placeholder="e.g. Kuala Lumpur"
                                autoComplete="city"
                                onChange={(e) => setData('city', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="state" value={<div className="flex gap-1">
                                <span>State</span>
                                <span className="text-error-600">*</span>
                            </div>} />
                            <Dropdown 
                                value={data.state} 
                                onChange={(e) => setData('state', e.value)} 
                                options={getStates}
                                optionLabel="name"
                                placeholder="Select "
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
                        </div>
                    </div>
                </div>
            </div>

            {/* Bank Info */}
            <div className="flex flex-col border border-gray-200 bg-white rounded-sm">
                <div className="flex flex-col py-4 px-5 border-b border-gray-200">
                    <div className="text-gray-950 text-base font-semibold">Bank and Contribution Information</div>
                    <div className="text-gray-500 text-sm">Share your bank account details for salary payments and contribution information for statutory purposes.</div>
                </div>
                <div className="p-5 grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="bank_name" value={<div className="flex gap-1">
                            <span>Bank Name</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <Dropdown 
                            value={data.bank_name} 
                            onChange={(e) => setData('bank_name', e.value)} 
                            options={getBank}
                            optionLabel="name"
                            placeholder="Select "
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
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="acc_type" value={<div className="flex gap-1">
                            <span>Bank Account Type</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <Dropdown 
                            value={data.acc_type} 
                            onChange={(e) => setData('acc_type', e.value)} 
                            options={accType}
                            optionLabel="name"
                            placeholder="Select "
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
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="acc_no" value={<div className="flex gap-1">
                            <span>Bank Account No.</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <TextInput 
                            id="acc_no"
                            type="text"
                            name="acc_no"
                            value={data.acc_no}
                            className="w-full"
                            autoComplete="acc_no"
                            onChange={(e) => setData('acc_no', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="income_tax_no" value={<div className="flex gap-1">
                            <span>Income Tax No. (PCB No.)</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <TextInput 
                            id="income_tax_no"
                            type="text"
                            name="income_tax_no"
                            value={data.income_tax_no}
                            className="w-full"
                            autoComplete="income_tax_no"
                            onChange={(e) => setData('income_tax_no', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="epf_no" value={<div className="flex gap-1">
                            <span>EPF No.</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <TextInput 
                            id="epf_no"
                            type="text"
                            name="epf_no"
                            value={data.epf_no}
                            className="w-full"
                            autoComplete="epf_no"
                            onChange={(e) => setData('epf_no', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="socso_no" value={<div className="flex gap-1">
                            <span>SOCSO No.</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <TextInput 
                            id="socso_no"
                            type="text"
                            name="socso_no"
                            value={data.socso_no}
                            className="w-full"
                            autoComplete="socso_no"
                            onChange={(e) => setData('socso_no', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}