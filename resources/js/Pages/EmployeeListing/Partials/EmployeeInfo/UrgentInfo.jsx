import React, { useEffect, useState } from "react";
import { usePage, useForm, router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from 'primereact/dropdown';
import toast from "react-hot-toast";

export default function UrgentInfo({isUrgentInfoOpen, setIsUrgentInfoOpen, closeUrgentInfo, user_details}) {

    const { data, setData, errors, post, reset } = useForm({
        emergency_infos: [
            {
                id: user_details.emergencyinfo[0]?.id || '',
                full_name: user_details.emergencyinfo[0]?.full_name || '',
                relationship: user_details.emergencyinfo[0]?.relationship || '',
                dial_code: user_details.emergencyinfo[0]?.dial_code || '',
                phone_no: user_details.emergencyinfo[0]?.phone_no || '',
            },
            {
                id: user_details.emergencyinfo[1]?.id || '',
                full_name: user_details.emergencyinfo[1]?.full_name || '',
                relationship: user_details.emergencyinfo[1]?.relationship || '',
                dial_code: user_details.emergencyinfo[1]?.dial_code || '',
                phone_no: user_details.emergencyinfo[1]?.phone_no || '',
            }
        ]
    });

    const [getPhoneCode, setGetPhoneCode] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

        post('/update-urgent-info', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                closeUrgentInfo();
                reset();

                // 🔁 Refresh only user_details prop from the backend
                router.reload({ only: ['user_details'] });

                toast.success(`Emergency contact information updated successfully for ${user_details.username}.`, {
                    title: `Emergency contact information updated successfully for ${user_details.username}.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            },
        })
    }

    return(
        <>
            <Modal
                show={isUrgentInfoOpen}
                maxWidth='md'
                title='Emergency Contact Information'
                onClose={closeUrgentInfo}
                footer={
                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button variant="outlined" size="sm" onClick={closeUrgentInfo}>Cancel</Button>
                        <Button size="sm" onClick={submit} >Save Changes</Button>
                    </div>
                }
            >
                <div className="py-3 px-6 grid grid-cols-2 gap-5">
                    <div className="flex flex-col col-span-2 text-gray-950 font-semibold">Primary</div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="emerge1_fullname" value="Full Name" />
                        <TextInput 
                            id="emerge1_fullname"
                            type="text"
                            name="emerge1_fullname"
                            value={data.emergency_infos[0].full_name}
                            className="w-full"
                            placeholder="as per NRIC/Passport"
                            autoComplete="emerge1_fullname"
                            onChange={(e) => setData('emergency_infos[0].full_name', e.target.value)}
                            hasError={!!errors['emergency_infos.0.full_name']}
                        />
                        <InputError message={errors['emergency_infos.0.full_name']} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="relation1" value="Relationship" />
                        <Dropdown 
                            value={data.emergency_infos[0].relationship}
                            onChange={(e) => setData('emergency_infos[0].relationship', e.value)} 
                            options={relationships.map((item) => ({
                                label: item.name,
                                value: item.name,
                            }))}
                            optionLabel="label"
                            placeholder="Select a relation"
                            className="w-full text-sm"
                            invalid={!!errors['emergency_infos.0.relationship']}
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
                        <InputError message={errors['emergency_infos.0.relationship']} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="emerge1_phone_no" value={<div className="flex gap-1">
                            <span>Phone Number </span>
                        </div>} />
                        <div className="flex items-center gap-2">
                            <Dropdown 
                                value={data.emergency_infos[0].dial_code}                                
                                onChange={(e) => setData('emergency_infos[0].dial_code', e.value)} 
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
                                id="phone_no"
                                type="number"
                                name="phone_no"
                                value={data.emergency_infos[0].phone_no}                                
                                className="w-full"
                                placeholder="Phone Number"
                                autoComplete="phone_no"
                                onChange={(e) => setData('emergency_infos[0].phone_no', e.target.value)}
                                hasError={!!errors['emergency_infos.0.phone_no']}
                            />
                        </div>
                        <InputError message={errors['emergency_infos.0.phone_no']} />
                    </div>
                </div>

                <div className="py-3 px-6 grid grid-cols-2 gap-5">
                    <div className="flex flex-col col-span-2 text-gray-950 font-semibold">Secondary</div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="full_name" value="Full Name" />
                        <TextInput 
                            id="full_name"
                            type="text"
                            name="full_name"
                            value={data.emergency_infos[1].full_name}                                
                            className="w-full"
                            placeholder="as per NRIC/Passport"
                            autoComplete="full_name"
                            onChange={(e) => setData('emergency_infos[1].full_name', e.target.value)}
                            hasError={!!errors['emergency_infos.1.full_name']}
                        />
                        <InputError message={errors['emergency_infos.1.full_name']} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="relation2" value="Relationship" />
                        <Dropdown 
                            value={data.emergency_infos[1].relationship}                                
                            onChange={(e) => setData('emergency_infos[1].relationship', e.value)} 
                            options={relationships.map((item) => ({
                                label: item.name,
                                value: item.name,
                            }))}
                            optionLabel="label"
                            placeholder="Select a relation"
                            className="w-full text-sm"
                            invalid={!!errors['emergency_infos.1.relationship']}
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
                        <InputError message={errors['emergency_infos.1.relationship']} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="emerge2_phone_no" value={<div className="flex gap-1">
                            <span>Phone Number </span>
                        </div>} />
                        <div className="flex items-center gap-2">
                            <Dropdown 
                                value={data.emergency_infos[1].dial_code}                                
                                onChange={(e) => setData('emergency_infos[1].dial_code', e.value)} 
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
                                id="emerge2_phone_no"
                                type="number"
                                name="emerge2_phone_no"
                                value={data.emergency_infos[1].phone_no}                                
                                className="w-full"
                                placeholder="Phone Number"
                                autoComplete="emerge2_phone_no"
                                onChange={(e) => setData('emergency_infos[1].phone_no', e.target.value)}
                                hasError={!!errors['emergency_infos.1.phone_no']}
                            />
                        </div>
                        <InputError message={errors['emergency_infos.1.phone_no']} />
                    </div>
                </div>

            </Modal>
        
        </>
    )
}