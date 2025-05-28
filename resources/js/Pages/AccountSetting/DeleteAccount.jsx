import React, { useState, useEffect } from "react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Button from "@/Components/Button";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputIconWrapper from "@/Components/InputIconWrapper";
import { EyeOff, EyeOn } from "@/Components/Icon/Outline";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { DeleteAccountIllus } from "@/Components/Icon/Illustration";

export default function DeleteAccount({user, show, onClose}) {

    const { data, setData, post, processing, errors, reset } = useForm({
            password: "",

    });

    const [showPassword, setShowPassword] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);

    const handleConfirmationClose = () => {
        document.activeElement.blur();
        setConfirmationModal(false);
        reset();
    }

    const validatePassword = (e) => {
        e.preventDefault();
        post(route('validate-password'), {
            onSuccess: () => {
                setConfirmationModal(true);
            },
        });
    }

    // Reset form when modal opens/closes
    useEffect(() => {
        if (confirmationModal) {
            reset();
        }
    }, [confirmationModal, reset]);

    return (
        <>
            <Modal 
                show={show} 
                onClose={onClose}
                maxWidth='sm'
                title='Delete Account'
                footer={
                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button size="sm" 
                            onClick={onClose}
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                        <Button size="sm" 
                            onClick={validatePassword}
                            disabled={processing || user.role === 'superadmin'}
                        >
                            Continue
                        </Button>
                    </div>
                }
            >
                <div className="flex flex-col items-center">
                    <div className="flex px-6 py-3 flex-col items-center gap-8 self-stretch">
                        <div className="flex flex-col gap-2 self-stretch">
                            <InputLabel htmlFor="password" value="To ensure security, please provide your password to delete your account." />
                            <div>
                                <InputIconWrapper>
                                    <TextInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={data.password}
                                        className="w-full"
                                        placeholder="Current Password"
                                        autoComplete="current-password"
                                        isFocused={true}
                                        onChange={(e) => setData("password", e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff /> : <EyeOn />}
                                    </div>
                                </InputIconWrapper>
                                <InputError message={errors.password} className="mt-0"/>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <ConfirmDialog
                show={confirmationModal} 
                maxWidth='sm'
                title='Delete Account'
                >
                    <div className="flex p-6 flex-col justify-center items-center gap-8">
                        <div className="flex flex-col items-center gap-3 self-stretch">
                            <div className="flex flex-col items-center">
                                <DeleteAccountIllus/>
                            </div>
                            <div className="flex flex-col items-center gap-2 self-stretch">
                                <div className="self-stretch text-center text-gray-950 text-lg font-bold">Ready to Say Goodbye?</div>
                                <div className="self-stretch text-center text-gray-700 text-sm">If you proceed, all your account data will be permanently erased and cannot be restored.</div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            <Button
                                size="sm" 
                                onClick={handleConfirmationClose}
                                variant="outlined"
                            >
                                Keep Account
                            </Button>
                            <Button 
                                size="sm"
                                variant="danger"
                                onClick={() => post('/delete-account')}
                            >
                                Delete Permanently
                            </Button>
                        </div>
                    </div>
            </ConfirmDialog>
        </>
    )
}