import React, { useEffect, useState } from "react";
import { Checkbox } from 'antd';
import InputLabel from "@/Components/InputLabel";
import { InputNumber } from 'primereact/inputnumber';
import TextInput from "@/Components/TextInput";
import { Dropdown } from 'primereact/dropdown';

export default function BeneficiaryInfo({ data, setData}) {

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

    const insurance  = [
        'None', 
        'Life Insurance', 
        'Medical Plan', 
        'Accident Insurance',
        'Critical Illness Insurance',
        'Savings or Investment-Linked Policies',
    ];

    const handleChange = (checkedValues) => {
        // If "None" is selected along with other options, keep only "None"
        if (checkedValues.includes('None') && checkedValues.length > 1) {
            setData('personal_insurance', ['None']);
        } else {
            setData('personal_insurance', checkedValues);
        }
    };

    const isNoneSelected = data.personal_insurance?.includes('None');

    const insuranceOption = insurance.map(option => ({
        label: option,
        value: option,
        disabled: isNoneSelected && option !== 'None'
    }));

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
            {/* Beneficiary Info */}
            <div className="flex flex-col border border-gray-200 bg-white rounded-sm">
                <div className="flex flex-col py-4 px-5 border-b border-gray-200">
                    <div className="text-gray-950 text-base font-semibold">Beneficiary/Nominee Information</div>
                    <div className="text-gray-500 text-sm">Provide details of the person who should be contacted or receive benefits in the event of an unforeseen circumstance.</div>
                </div>
                <div className="p-5 grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="beneficiary_fullname" value={<div className="flex gap-1">
                            <span>Full Name</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <TextInput 
                            id="beneficiary_fullname"
                            type="text"
                            name="beneficiary_fullname"
                            value={data.beneficiary_fullname}
                            className="w-full"
                            placeholder="as per NRIC/Passport"
                            autoComplete="beneficiary_fullname"
                            isFocused={true}
                            onChange={(e) => setData('beneficiary_fullname', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="beneficiary_relation" value={<div className="flex gap-1">
                            <span>Relationship</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <Dropdown 
                            value={data.beneficiary_relation} 
                            onChange={(e) => setData('beneficiary_relation', e.value)} 
                            options={relationships}
                            optionLabel="name"
                            placeholder="Select"
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
                        <InputLabel htmlFor="beneficiary_identity" value={<div className="flex gap-1">
                            <span>NRIC/Passport No.</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <TextInput 
                            id="beneficiary_identity"
                            type="text"
                            name="beneficiary_identity"
                            value={data.beneficiary_identity}
                            className="w-full"
                            placeholder="901223145678 / A12345678"
                            autoComplete="beneficiary_identity"
                            isFocused={true}
                            onChange={(e) => setData('beneficiary_identity', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="beneficiary_dialcode" value={<div className="flex gap-1">
                            <span>Phone Number </span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <div className="flex items-center gap-2">
                            <Dropdown 
                                value={data.beneficiary_dialcode} 
                                onChange={(e) => setData('beneficiary_dialcode', e.value)} 
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
                                id="beneficiary_phoneNo"
                                type="number"
                                name="beneficiary_phoneNo"
                                value={data.beneficiary_phoneNo}
                                className="w-full"
                                placeholder="Phone Number"
                                autoComplete="beneficiary_phoneNo"
                                onChange={(e) => setData('beneficiary_phoneNo', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-col gap-2">
                        <InputLabel htmlFor="beneficiary_dialcode" value={<div className="flex gap-1">
                            <span>Do you have any personal insurance? </span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <Checkbox.Group 
                            options={insuranceOption}
                            value={data.personal_insurance}
                            onChange={handleChange}
                            className="gap-x-8 gap-y-5 text-sm text-gray-950 py-3"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}