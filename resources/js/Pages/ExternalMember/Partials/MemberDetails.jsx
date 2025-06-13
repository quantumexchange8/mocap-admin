import React, { useEffect, useState } from "react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Button from "@/Components/Button";
import { router, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import toast from "react-hot-toast";
import { Dropdown } from 'primereact/dropdown';
import { MaleAvatar } from "@/Components/Icon/ProfilePhoto";
import { Upload } from "antd";

export default function MemberDetails({show, onClose, member, fetchExternalMember}) {

    const [isLoading, setIsLoading] = useState(false);
    const [getPhoneCode, setGetPhoneCode] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        username: '',
        email: '',
        dial_code: '',
        phone_no: '',
        remarks: '',
        image: null,
    });

    // Reset form when modal opens/closes or user changes
    useEffect(() => {
        if (member) {
            setData('id', member.id)
            setData("username", member.username);
            setData("email", member.email);
            setData("dial_code", member.dial_code);
            setData("phone_no", member.phone_no);
            setData("remarks", member.remarks);
        }
    }, [member]);

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

    const handleRemovePhoto = () => {
        post(route('remove-profile-pic'), {
            onSuccess: () => {
                reset();
                toast.success('Profile picture removed successfully', {
                    title: `Profile Picture successfully removed.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            },
        });
    }

    const handlePhotoSelected = (info) => {
            const file = info.file;
            setData('profile_image',  file);
        };
    
    useEffect(() => {
        if (data.profile_image) {
            // If a new profile image is selected, reset the form
            post('/update-profile-pic', {
            preserveScroll: true,

            onSuccess: () => {
                // reset();
                toast.success(`Profile Picture successfully changed.`, {
                    title: `Profile Picture successfully changed.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
        }
    }, [data.profile_image]); 

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        post('/update-member', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                onClose();
                reset();
                fetchExternalMember();
                // 🔁 Refresh only user_details prop from the backend
                router.reload({ only: ['member'] });
                
                toast.success(`Profile information updated successfully for ${member.username}.`, {
                    title: `Profile information updated successfully for ${member.username}`,
                    duration: 3000,
                    variant: 'variant1',
                });
            },
        })
    };

    return (
        <>
            <Modal 
                show={show} 
                onClose={onClose}
                maxWidth='md'
                title='Profile Information'
                footer={
                    <div className="flex items-center justify-end gap-4 w-full">
                        {editMode ? (
                            <>
                                <Button size="sm" variant="outlined" onClick={() => setEditMode(false)}>
                                    Cancel
                                </Button>
                                <Button size="sm" onClick={handleSubmit}>
                                    Save Changes
                                </Button>
                            </>
                        ) : (
                            <Button size="sm" onClick={() => setEditMode(true)}>
                                Edit Info
                            </Button>
                        )}
                    </div>
                }
            >
                <div className="flex gap-8 px-6 py-3 flex-col items-center self-stretch">
                    <div className="flex items-end gap-5 self-stretch">
                        <div className="flex justify-center items-center">
                           {
                                member.profile_image ? (
                                    <div className="relative w-40 h-40 group">
                                        <img
                                            src={
                                                typeof member.profile_image === 'string'
                                                    ? member.profile_image
                                                    : URL.createObjectURL(member.profile_image)
                                            }
                                            className="w-40 h-40"
                                        />
                                    </div>
                                ) : (
                                    <MaleAvatar className="w-40 h-40 group" />
                                ) 
                            }
                        </div>
                        <Upload
                            name="profile_image"
                            beforeUpload={() => false}
                            showUploadList={false}
                            onChange={handlePhotoSelected}
                        >
                            <Button variant="outlined" size="sm">Change</Button>
                        </Upload>
                        <Button size="sm" variant="outlined" onClick={handleRemovePhoto}>Remove</Button>
                    </div>
                    <div className="flex flex-col items-center gap-5 self-stretch">
                        <div className="flex min-w-60 flex-col items-start gap-2 self-stretch">
                            <div className="text-gray-500 text-sm">Preferred Name</div>
                            {editMode ? (
                                <TextInput
                                    className="w-full"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                />
                            ) : (
                                <div className="text-sm text-gray-950">{member?.username}</div>
                            )}
                            <InputError message={errors.username} />
                        </div>
                        <div className="flex min-w-60 flex-col items-start gap-2 self-stretch">
                            <div className="text-gray-500 text-sm">Email</div>
                            {editMode ? (
                            <TextInput
                                className="w-full"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            ) : (
                                <div className="text-sm text-gray-950">{member?.email}</div>
                            )}
                            <InputError message={errors.email} />
                        </div>
                        <div className="flex min-w-60 flex-col items-start gap-2 self-stretch">
                            <div className="text-gray-500 text-sm">Phone Number</div>
                            {editMode ? (
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
                            ) : (
                                <div className="text-sm text-gray-950">{member?.phone_no ? member.dial_code+member.phone_no : '-'}</div>
                            )}
                            <InputError message={errors.phone_no} />
                        </div>
                        <div className="flex min-w-60 flex-col items-start gap-2 self-stretch">
                            <div className="text-gray-500 text-sm">Remark</div>
                            {editMode ? (
                                <TextInput
                                    className="w-full"
                                    value={data.remarks}
                                    onChange={(e) => setData('remarks', e.target.value)}
                                />
                            ) : (
                                <div className="text-sm text-gray-950">{member?.remarks ? member.remarks : '-'}</div>
                            )}
                            <InputError message={errors.remarks} />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}