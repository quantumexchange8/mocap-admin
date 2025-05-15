import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import InputError from "@/Components/InputError";

export default function UrgentInfo({ data, setData, errors }) {

    const relationships = [
        {name: 'Father'},
        {name: 'Mother'},
        {name: 'Husband'},
        {name: 'Wife'},
        {name: 'Son'},
        {name: 'Daughter'},
        {name: 'Brother'},
        {name: 'Sister'},
        {name: 'Guardian'},
    ];

    const [getPhoneCode, setGetPhoneCode] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <>
            {/* Emergency Info */}
            <div className="flex flex-col border border-gray-200 bg-white rounded-sm">
                <div className="flex flex-col py-4 px-5 border-b border-gray-200">
                    <div className="text-gray-950 text-base font-semibold">Emergency Contact Information</div>
                    <div className="text-gray-500 text-sm">Provide contact details of someone we can reach out to in case of an emergency.</div>
                </div>
                <div className="p-5 grid grid-cols-2 gap-5">
                    <div className="col-span-2 text-gray-950 text-base font-semibold">
                        Primary
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="emerge1_fullname" value={<div className="flex gap-1">
                            <span>Full Name</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <TextInput 
                            id="emerge1_fullname"
                            type="text"
                            name="emerge1_fullname"
                            value={data.emerge1_fullname}
                            className="w-full"
                            placeholder="as per NRIC/Passport"
                            autoComplete="emerge1_fullname"
                            isFocused={true}
                            onChange={(e) => setData('emerge1_fullname', e.target.value)}
                            hasError={!!errors.emerge1_fullname}
                        />
                        <InputError message={errors.emerge1_fullname} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="relation1" value={<div className="flex gap-1">
                            <span>Relationship</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <Dropdown 
                            value={data.relation1} 
                            onChange={(e) => setData('relation1', e.value)} 
                            options={relationships}
                            optionLabel="name"
                            placeholder="Select a relation"
                            className="w-full text-sm"
                            invalid={!!errors.relation1}
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
                        <InputError message={errors.relation1} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="emerge1_phone_no" value={<div className="flex gap-1">
                            <span>Phone Number </span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <div className="flex items-center gap-2">
                            <Dropdown 
                                value={data.emerge1_dialcode} 
                                onChange={(e) => setData('emerge1_dialcode', e.value)} 
                                options={getPhoneCode.map((item) => ({
                                    label: item.phoneCode, // What user sees
                                    value: `${item.phoneCode}`, // Ensures it prefixes with +
                                }))}
                                optionLabel="label"
                                placeholder="Select "
                                className="w-full max-w-[100px] text-sm"
                                loading={isLoading}
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
                                id="emerge1_phone_no"
                                type="number"
                                name="emerge1_phone_no"
                                value={data.emerge1_phone_no}
                                className="w-full"
                                placeholder="Phone Number"
                                autoComplete="emerge1_phone_no"
                                onChange={(e) => setData('emerge1_phone_no', e.target.value)}
                                hasError={!!errors.emerge1_phone_no}
                            />
                        </div>
                        <InputError message={errors.emerge1_phone_no} />
                    </div>
                </div>
                <div className="p-5 grid grid-cols-2 gap-5">
                    <div className="col-span-2 text-gray-950 text-base font-semibold">
                        Secondary
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="emerge2_fullname" value={<div className="flex gap-1">
                            <span>Full Name</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <TextInput 
                            id="emerge2_fullname"
                            type="text"
                            name="emerge2_fullname"
                            value={data.emerge2_fullname}
                            className="w-full"
                            placeholder="as per NRIC/Passport"
                            autoComplete="emerge2_fullname"
                            isFocused={true}
                            onChange={(e) => setData('emerge2_fullname', e.target.value)}
                            hasError={!!errors.emerge2_fullname}
                        />
                        <InputError message={errors.emerge2_fullname} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="relation2" value={<div className="flex gap-1">
                            <span>Relationship</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <Dropdown 
                            value={data.relation2} 
                            onChange={(e) => setData('relation2', e.value)} 
                            options={relationships}
                            optionLabel="name"
                            placeholder="Select a relation"
                            className="w-full text-sm"
                            invalid={!!errors.relation2}
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
                        <InputError message={errors.relation2} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="emerge2_phone_no" value={<div className="flex gap-1">
                            <span>Phone Number </span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <div className="flex items-center gap-2">
                            <Dropdown 
                                value={data.emerge1_dialcode} 
                                onChange={(e) => setData('emerge2_dialcode', e.value)} 
                                options={getPhoneCode.map((item) => ({
                                    label: item.phoneCode, // What user sees
                                    value: `${item.phoneCode}`, // Ensures it prefixes with +
                                }))}
                                optionLabel="label"
                                placeholder="Select "
                                className="w-full max-w-[100px] text-sm"
                                loading={isLoading}
                                invalid={!!errors.emerge1_dialcode}
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
                                id="emerge2_phone_no"
                                type="number"
                                name="emerge2_phone_no"
                                value={data.emerge2_phone_no}
                                className="w-full"
                                placeholder="Phone Number"
                                autoComplete="emerge2_phone_no"
                                onChange={(e) => setData('emerge2_phone_no', e.target.value)}
                                hasError={!!errors.emerge2_phone_no}
                            />
                        </div>
                        <InputError message={errors.emerge2_phone_no} />
                    </div>
                </div>
            </div>
        </>
    )
}