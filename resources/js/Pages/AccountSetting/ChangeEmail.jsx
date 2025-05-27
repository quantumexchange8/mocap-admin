import React, { useState, useEffect } from "react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Button from "@/Components/Button";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import InputIconWrapper from "@/Components/InputIconWrapper";
import { EyeOff, EyeOn } from "@/Components/Icon/Outline";

export default function ChangeEmail({user, show, onClose}) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        new_email: user.email,
        password: "",
    });
    
    const submit = (e) => {
        e.preventDefault();
        post(route('update-email'), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                reset();
                toast.success(`Check your email for the instruction.`, {
                    title: `Check your email for the instruction.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            },
            onError: () => {
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
            title='Change Email'
            footer={
                <div className="flex items-center justify-end gap-4 w-full">
                    <Button size="sm" 
                        variant="outlined"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button size="sm" 
                        onClick={submit}
                    >
                        Submit
                    </Button>
                </div>
            }
        >
            <div className="flex px-6 py-3 flex-col items-center gap-8 self-stretch">
                <div className="text-gray-700 text-sm">We’ll send an email to your new address with instructions on completing the change.</div>
                <div className="flex flex-col items-center gap-5 self-stretch">
                    <div className="flex flex-col self-stretch">
                    <TextInput
                        id="new_email"
                        type="email"
                        name="new_email"
                        value={data.new_email}
                        className="block w-full"
                        isFocused={true}
                        onChange={(e) => setData('new_email', e.target.value)}
                        placeholder="New Email Address"
                    />
                    <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="flex w-full">
                        <InputIconWrapper>
                            <TextInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                // value={data.password}
                                className="w-full"
                                placeholder="Current Password"
                                autoComplete="current-password"
                                isFocused={false}
                                onChange={(e) => setData("password", e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff /> : <EyeOn />}
                            </div>
                            <InputError message={errors.password} className="mt-0"/>
                        </InputIconWrapper>
                    </div>
                </div>
            </div>
        </Modal>
        </>
    );
}