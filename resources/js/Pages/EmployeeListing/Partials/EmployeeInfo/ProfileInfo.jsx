import Button from "@/Components/Button";
import { ClearIcon, DatePickerIcon } from "@/Components/Icon/Outline";
import { FemaleAvatar, MaleAvatar } from "@/Components/Icon/ProfilePhoto";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { Upload } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfileInfo({ 
    user_details,
    isProfileOpen,
    setIsProfileOpen,
    closeProfileInfo,
}) {

    const [getPhoneCode, setGetPhoneCode] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

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

    const { data, setData, post, processing, errors, reset, isDirty } = useForm({
        id: '',
        full_name: '',
        username: '',
        dob: '',
        dial_code: '',
        phone_no: '',
        email: '',
        address: '',
        image: null,
    });

    useEffect(() => {
        if (user_details) {
            setData('id', user_details.id)
            setData('full_name', user_details.name)
            setData('username', user_details.username)
            setData('dob', new Date(user_details.dob))
            setData('dial_code', user_details.dial_code)
            setData('phone_no', user_details.phone_no)
            setData('email', user_details.email)
            setData('address', user_details.address)
        }
    }, [user_details]);

    const clearDate = () => {
        setData('dob', null)
    }

    const handleImageChange = (info) => {
        setUploading(true);

        const file = info.file;
        setData('image', file); // `image` key matches your form field
        
        setTimeout(() => {
            setUploading(false);
        }, 600);
    };

    const removeImage = () => {
        if (data.image) {
            setData('image', null);
        }
    }

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        post('/update-profile', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                closeProfileInfo();
                reset();

                // 🔁 Refresh only user_details prop from the backend
                router.reload({ only: ['user_details'] });

                toast.success('Succesfully Created Department.', {
                    title: 'Succesfully Created Department.',
                    duration: 3000,
                    variant: 'variant1',
                });
            },
        })
    }

    return (
        <Modal
            show={isProfileOpen}
            maxWidth='md'
            title='Profile Information'
            onClose={closeProfileInfo}
            footer={
                <div className="flex items-center justify-end gap-4 w-full">
                    <Button variant="outlined" size="sm" onClick={closeProfileInfo}>Cancel</Button>
                    <Button size="sm" onClick={submit} >Save Changes</Button>
                </div>
            }
        >
            <div className="flex flex-col gap-8 py-3 px-6">
                <div className="flex gap-5 items-end">
                    <div className="relative w-full max-w-40 h-40">
                        <AnimatePresence>
                            {
                                uploading && (
                                    <motion.div
                                        key="upload-spinner"
                                        className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <motion.div
                                            className="w-6 h-6 border-4 border-gray-300 border-t-gray-600 rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        />
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                        
                        {
                            data.image ? (
                                <motion.img
                                    key="uploaded-image"
                                    src={URL.createObjectURL(data.image)}
                                    alt="Uploaded preview"
                                    className="w-40 h-40 object-cover rounded"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            ) : user_details.profile_image ? (
                                <img
                                    src={user_details.profile_image}
                                    alt="Existing profile"
                                    className="w-40 h-40 object-cover rounded"
                                />
                            ) : user_details.gender === 'male' ? (
                                <MaleAvatar className="w-40 h-40" />
                            ) : (
                                <FemaleAvatar className="w-40 h-40" />
                            )
                        }
                    </div>
                    <div>
                        <Upload
                            beforeUpload={() => false}
                            showUploadList={false}
                            onChange={handleImageChange}
                        >
                            <Button variant="outlined" size="sm">Change</Button>
                        </Upload>
                    </div>
                    <div>
                        <Button variant="outlined-danger" size="sm" onClick={removeImage}>Remove</Button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="full_name" value='Full Name' />
                        <TextInput 
                            id="full_name"
                            type="text"
                            name="full_name"
                            value={data.full_name}
                            className="w-full"
                            placeholder="eg. amy tan jia yan"
                            autoComplete="full_name"
                            onChange={(e) => setData('full_name', e.target.value)}
                            hasError={!!errors.full_name}
                        />
                        <InputError message={errors.full_name}  />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="username" value='Preferred Name' />
                        <TextInput 
                            id="username"
                            type="text"
                            name="username"
                            value={data.username}
                            className="w-full"
                            placeholder="eg. amy tan"
                            autoComplete="username"
                            onChange={(e) => setData('username', e.target.value)}
                            hasError={!!errors.username}
                        />
                        <InputError message={errors.username}  />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="dob" value='Preferred Name' />
                        <div className="relative">
                            <Calendar 
                                value={data.dob}
                                onChange={(e) => setData('dob', e.value)} 
                                className="w-full text-sm"
                                placeholder="dd/mm/yyyy"
                                invalid={!!errors.dob}
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
                        <InputError message={errors.dob}  />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="phone_no" value='Phone Number' />
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
                                hasError={!!errors.phone_no}
                            />
                        </div>
                        <InputError message={errors.phone_no}  />
                    </div>
                    <div className=" col-span-2 flex flex-col gap-2">
                        <InputLabel htmlFor="email" value='Email' />
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
                        {
                            errors.email ? (
                                <InputError message={errors.email}  />
                            ) : (
                                <span className="text-gray-500 text-xs">This will update the email address and send a confirmation to the new address.</span>
                            )
                        }
                    </div>
                    <div className=" col-span-2 flex flex-col gap-2">
                        <InputLabel htmlFor="address" value='Current Address' />
                        <TextInput 
                            id="address"
                            type="text"
                            name="address"
                            value={data.address}
                            className="w-full"
                            placeholder="you@example.com"
                            autoComplete="address"
                            onChange={(e) => setData('address', e.target.value)}
                            hasError={!!errors.address}
                        />
                        {
                            errors.address ? (
                                <InputError message={errors.address}  />
                            ) : (
                                <span className="text-gray-500 text-xs">Enter full address, including street name and unit number.</span>
                            )
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}