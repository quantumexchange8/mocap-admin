import React, { useEffect, useState } from "react";
import { usePage, useForm, router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from 'primereact/dropdown';
import toast from "react-hot-toast";
import { Checkbox } from "antd";

export default function BeneficiaryInfo({isBeneficiaryInfoOpen, setIsBeneficiaryInfoOpen, closeBeneficiaryInfo, user_details}) {

    const { data, setData, errors, post, reset } = useForm({
        id: user_details.beneficiaryinfo.id || '',
        full_name: user_details.beneficiaryinfo.full_name || '',
        relationship: user_details.beneficiaryinfo.relationship || '',
        identity_no: user_details.beneficiaryinfo.indentity_no || '',
        dial_code: user_details.beneficiaryinfo.dial_code || '',
        phone_no: user_details.beneficiaryinfo.phone_no || '',
        insurance_id: user_details.beneficiaryinfo.insurance_id || '',
    });

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
        {name: 'Relatives'},
        {name: 'Boyfriend/Girlfriend'},
        {name: 'Aunty/Uncle'},
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
            setData('insurance_id', ['None']);
        } else {
            setData('insurance_id', checkedValues);
        }
    };

    const isNoneSelected = data.insurance_id?.includes('None');

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

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        post('/update-beneficiary-info', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                closeBeneficiaryInfo();
                reset();

                // 🔁 Refresh only user_details prop from the backend
                router.reload({ only: ['user_details'] });

                toast.success(`Beneficiary/nominee information updated successfully for ${user_details.username}.`, {
                    title: `Beneficiary/nominee information updated successfully for ${user_details.username}.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            },
        })
    }

    return(
        <>
            <Modal
                show={isBeneficiaryInfoOpen}
                maxWidth='md'
                title='Beneficiary/Nominee Information'
                onClose={closeBeneficiaryInfo}
                footer={
                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button variant="outlined" size="sm" onClick={closeBeneficiaryInfo}>Cancel</Button>
                        <Button size="sm" onClick={submit} >Save Changes</Button>
                    </div>
                }
            >
                <div className="py-3 px-6 grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="full_name" value="Full Name" />
                        <TextInput 
                            id="full_name"
                            type="text"
                            name="full_name"
                            value={data.full_name}
                            className="w-full"
                            placeholder="as per NRIC/Passport"
                            autoComplete="full_name"
                            onChange={(e) => setData('full_name', e.target.value)}
                            hasError={!!errors.full_name}
                        />
                        <InputError message={errors.full_name} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="relationship" value="Relationship" />
                        <Dropdown 
                            value={data.relationship} 
                            onChange={(e) => setData('relationship', e.value)} 
                            options={relationships.map((item) => ({
                                label: item.name,
                                value: item.name,
                            }))}
                            optionLabel="label"
                            placeholder="Select"
                            className="w-full text-sm"
                            invalid={!!errors.relationship}
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
                        <InputError message={errors.relationship} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="identity_no" value="NRIC/Passport No."/>
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
                        <InputError message={errors.identity_no} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="dial_code" value="Phone Number"/>
                        <div className="flex items-center gap-2">
                            <Dropdown 
                                value={data.dial_code} 
                                onChange={(e) => setData('dial_code', e.value)} 
                                options={getPhoneCode.map((item) => ({
                                    label: item.phoneCode, // What user sees
                                    value: `${item.phoneCode}`, // Ensures it prefixes with +
                                }))}
                                optionLabel="label"
                                placeholder="Select "
                                className="w-full max-w-[100px] text-sm"
                                loading={isLoading}
                                invalid={!!errors.dial_code}
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
                        <div className="col-span-2 flex flex-col gap-2">
                            <InputLabel htmlFor="beneficiary_dialcode" value={<div className="flex gap-1">
                                <span>Do you have any personal insurance? </span>
                            </div>} />
                            <Checkbox.Group 
                                options={insuranceOption}
                                value={data.insurance_id}
                                onChange={handleChange}
                                className="gap-x-7 gap-y-5 text-sm text-gray-950 py-3"
                            />
                            <InputError message={errors.insurance_id} />
                        </div>
                </div>

            </Modal>
        
        </>
    )
}