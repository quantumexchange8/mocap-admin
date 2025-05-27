import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import React, { useState, useRef, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import ChangeName from "./ChangeName";
import ChangeTitle from "./ChangeTitle";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import { XIcon } from "@/Components/Icon/Outline";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import { Upload } from "antd";

export default function AccountSetting({user, show, onClose}) {
    const { data, setData, post, reset } = useForm({
            profile_image: null,
    });
    // Reset form when modal opens/closes or user changes
    
    const [isChangeNameOpen, setIsChangeNameOpen] = useState(false);
    const [isChangeEmailOpen, setIsChangeEmailOpen] = useState(false);
    const [isChangeTitleOpen, setIsChangeTitleOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

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
        const file = info.file.originFileObj || info.file;
        console.log('Selected file:', file); // should log a File object
        console.log('Is File:', file instanceof File); // should log `true`
        setData('profile_image',  file);
        // const formData = new FormData();
        // formData.append('profile_image', file);

        post(route('update-profile-pic'), {
            forceFormData: true,
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
    };
    
    return (
        <>
            <Modal 
                show={show} 
                onClose={onClose}
                maxWidth='md'
                title='Account Settings'
            >
                <div className="py-5 px-10 flex justify-center items-start gap-10 self-stretch">
                    <div className="flex flex-col items-center gap-3">
                        {
                            data.profile_image ? (
                                <div className="relative w-40 h-40 group">
                                    <img
                                        src={
                                            typeof data.profile_image === 'string'
                                                ? data.profile_image
                                                : URL.createObjectURL(data.profile_image)
                                        }
                                        className="w-40 h-40"
                                    />
                                    <Button
                                        type="button"
                                        onClick={handleRemovePhoto}
                                        className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 group-hover:bg-gray-100 transition-opacity"
                                        title="Remove photo"
                                    >
                                        <XIcon className="w-5 h-5" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="relative w-40 h-40 group">
                                    <img
                                        src="/asset/default_profile_pic.png"
                                        alt="Default Profile"
                                        className="w-full h-full"
                                    />
                                </div>
                            )
                        }
                        <div className="flex justify-center items-center gap-2">
                            <Upload
                                name="profile_image"
                                beforeUpload={() => false}
                                showUploadList={false}
                                onChange={handlePhotoSelected}
                            >
                                <Button variant="text" size="sm">Change</Button>
                            </Upload>
                        </div>
                    </div>
                    <div className="w-[600px] flex flex-col items-center gap-8 flex-[1_0_0]">
                        <div className="flex pb-8 flex-col items-center gap-6 self-stretch border-b border-gray-200">
                            <div className="flex flex-col items-start gap-3 self-stretch">
                                <div className="flex flex-col items-start gap-1">
                                    <div className="text-gray-950 text-base font-semibold">Preferred Name</div>
                                    <div className="text-gray-500 text-sm">{user.username}</div>
                                </div>
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={() => setIsChangeNameOpen(true)}
                                >
                                    Change name
                                </Button>
                            </div>
                            <div className="flex flex-col items-start gap-3 self-stretch">
                                <div className="flex flex-col items-start gap-1">
                                    <div className="text-gray-950 text-base font-semibold">Email</div>
                                    <div className="text-gray-500 text-sm">{user.email}</div>
                                </div>
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={() => setIsChangeEmailOpen(true)}
                                >
                                        Change email
                                </Button>
                            </div>
                            <div className="flex flex-col items-start gap-3 self-stretch">
                                <div className="flex flex-col items-start gap-1">
                                    <div className="text-gray-950 text-base font-semibold">Title</div>
                                    <div className="text-gray-500 text-sm">{user.title}</div>
                                </div>
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={() => setIsChangeTitleOpen(true)}
                                >
                                        Change title
                                </Button>
                            </div>
                            <div className="flex flex-col items-start gap-3 self-stretch">
                                <div className="flex flex-col items-start gap-1">
                                    <div className="text-gray-950 text-base font-semibold">Password</div>
                                </div>
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={() => setIsChangePasswordOpen(true)}
                                >
                                        Change password
                                </Button>
                            </div>
                        </div>
                        <div className="flex pb-8 flex-col items-start gap-3 self-stretch">
                            <div className="text-gray-950 text-base font-semibold">Account</div>
                            <Button
                                variant="outlined-danger"
                                size="sm">
                                    Delete Account
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>

            <ChangeName
                show={isChangeNameOpen}
                onClose={() => setIsChangeNameOpen(false)}
                user={user}
            />
            <ChangeEmail
                show={isChangeEmailOpen}
                onClose={() => setIsChangeEmailOpen(false)}
                user={user}
            />
            <ChangeTitle
                show={isChangeTitleOpen}
                onClose={() => setIsChangeTitleOpen(false)}
                user={user}
            />
            <ChangePassword
                show={isChangePasswordOpen}
                onClose={() => setIsChangePasswordOpen(false)}
                user={user}
            />
        </>
    )
}