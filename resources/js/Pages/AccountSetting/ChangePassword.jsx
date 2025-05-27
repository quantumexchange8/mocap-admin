import React, { useState, useEffect } from "react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Button from "@/Components/Button";
import InputIconWrapper from "@/Components/InputIconWrapper";
import { EyeOff, EyeOn } from "@/Components/Icon/Outline";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function ChangePassword({ user, show, onClose }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
        new_password: "",
        new_password_confirmation : "",
    });

    // Reset form when modal opens/closes
    useEffect(() => {
        if (show) {
            reset();
        }
    }, [show, reset]);

    const requirements = {
        length: data.new_password.length >= 8,
        uppercase: /[A-Z]/.test(data.new_password),
        lowercase: /[a-z]/.test(data.new_password),
        number: /\d/.test(data.new_password),
        symbol: /[^A-Za-z0-9]/.test(data.new_password),
    };

    const saveChange = (e) => {
        e.preventDefault();
        post(route("update-password"), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                reset();
                toast.success(`Password changed successfully.`, {
                    title: `Password changed successfully.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            },
        });
    };


    return (
        <Modal
            show={show}
            onClose={onClose}
            maxWidth="sm"
            title="Change Password"
            footer={
                <div className="flex items-center justify-end gap-4 w-full">
                    <Button size="sm" onClick={saveChange} disabled={processing}>
                        Save Changes
                    </Button>
                </div>
            }
        >
            <div className="flex px-6 py-3 flex-col gap-5 self-stretch w-full">
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

                <div className="flex flex-col items-start gap-2 self-stretch">
                    <InputIconWrapper>
                        <TextInput
                            id="new_password"
                            type={showNewPassword ? "text" : "password"}
                            name="new_password"
                            value={data.new_password}
                            className="w-full"
                            placeholder="New Password"
                            isFocused={false}
                            onChange={(e) => setData("new_password", e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowNewPassword(!showNewPassword)}>
                            {showNewPassword ? <EyeOff /> : <EyeOn />}
                        </div>
                    </InputIconWrapper>
                    <div className="self-stretch text-gray-500 text-xs">
                        Must be at least 8 characters containing uppercase letters, lowercase letters, numbers, and symbols.
                    </div>
                    {
                        data.new_password && (
                            <div className="text-gray-500 text-xs space-y-1">
                                <div className={requirements.length ? 'text-green-600' : 'text-red-500'}>
                                    {requirements.length ? '✔' : '✖'} At least 8 characters
                                </div>
                                <div className={requirements.uppercase ? 'text-green-600' : 'text-red-500'}>
                                    {requirements.uppercase ? '✔' : '✖'} At least 1 uppercase letter
                                </div>
                                <div className={requirements.lowercase ? 'text-green-600' : 'text-red-500'}>
                                    {requirements.lowercase ? '✔' : '✖'} At least 1 lowercase letter
                                </div>
                                <div className={requirements.number ? 'text-green-600' : 'text-red-500'}>
                                    {requirements.number ? '✔' : '✖'} At least 1 number
                                </div>
                                <div className={requirements.symbol ? 'text-green-600' : 'text-red-500'}>
                                    {requirements.symbol ? '✔' : '✖'} At least 1 symbol
                                </div>
                            </div>
                        )
                    }
                </div>
                <div>
                    <InputIconWrapper>
                        <TextInput
                            id="new_password_confirmation "
                            type={showConfirmPassword ? "text" : "password"}
                            name="new_password_confirmation"
                            value={data.new_password_confirmation}
                            className="w-full"
                            placeholder="Confirm Password"
                            isFocused={false}
                            onChange={(e) => setData("new_password_confirmation", e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <EyeOff /> : <EyeOn />}
                        </div>
                    </InputIconWrapper>
                    <InputError message={errors.new_password } />
                </div>
            </div>
        </Modal>
    );
}