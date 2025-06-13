import React, { useEffect, useState } from "react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Button from "@/Components/Button";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import toast from "react-hot-toast";
import { Dropdown } from 'primereact/dropdown';

export default function ChangeName({show, onClose}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        email: '',
        dial_code: '+60',
        phone_no: '',
        remarks: '',
    });

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

    const addMember = (e) => {
        e.preventDefault();
        post(route('create-member'), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                reset();
                toast.success(`You’ve successfully added a new member!`, {
                    title: `You’ve successfully added a new member!`,
                    duration: 3000,
                    variant: 'variant1',
                });
            },
            onError: () => {
                console.error('error', errors);
                setIsLoading(false);

            }
        });
    };

    return (
        <>
            <Modal 
                show={show} 
                onClose={onClose}
                maxWidth='sm'
                title='New Member'
                footer={
                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button size="sm"
                            variant="outlined"
                            onClose={onClose}
                        >
                            Cancel
                        </Button>
                        <Button size="sm" 
                            onClick={addMember}
                        >
                            Add
                        </Button>
                    </div>
                }
            >
                <div className="flex flex-col items-center">
                    <div className="flex px-6 py-3 flex-col items-center gap-5 self-stretch">
                        <div className="flex flex-col items-start gap-2 self-stretch">
                            <div className="flex gap-1">
                                <InputLabel htmlFor="username" value="Preferred Name" /><div className="text-sm text-error-600">*</div>
                            </div>
                            <TextInput
                                id="username"
                                type="text"
                                name="username"
                                value={data.username}
                                className="w-full"
                                placeholder='Enter preferred name'
                                isFocused={true}
                                onChange={e => setData("username", e.target.value)}
                                hasError={!!errors.username}
                            />
                            <InputError message={errors.username} />
                        </div>
                        <div className="flex flex-col items-start gap-2 self-stretch">
                            <div className="flex gap-1">
                                <InputLabel htmlFor="email" value="Email" /><div className="text-sm text-error-600">*</div>
                            </div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full"
                                placeholder='you@example.com'
                                onChange={e => setData("email", e.target.value)}
                                hasError={!!errors.email}
                            />
                            <InputError message={errors.email} />
                            <div className="text-xs text-gray-500 self-stretch">Member will receive CTID and reset login password via email.</div>
                        </div>
                        <div className="flex flex-col items-start gap-2 self-stretch">
                            <InputLabel htmlFor="phone no" value="Phone Number" />
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
                        <div className="flex flex-col items-start gap-2 self-stretch">
                            <InputLabel htmlFor="remarks" value="Remark" />
                            <TextInput
                                id="remarks"
                                type="text"
                                name="remarks"
                                value={data.remarks}
                                className="w-full"
                                placeholder='Add remark'
                                onChange={e => setData("remarks", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}