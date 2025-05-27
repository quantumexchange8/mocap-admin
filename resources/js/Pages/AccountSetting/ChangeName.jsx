import React, { useEffect } from "react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Button from "@/Components/Button";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import toast from "react-hot-toast";

export default function ChangeName({user, show, onClose}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: user.username,
    });

    // Reset form when modal opens/closes or user changes
    useEffect(() => {
        if (show) {
            setData("username", user.username);
        }
    }, [show, user.username, setData]);

    const saveChange = (e) => {
        e.preventDefault();
        post(route('update-name'), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                reset();
                toast.success(`Preferred Name successfully change.`, {
                    title: `Preferred Name successfully change.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            },
            onError: () => {
                setIsConfirmDialog(false);
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
                title='Change Name'
                footer={
                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button size="sm" 
                            onClick={saveChange}
                        >
                            Save Changes
                        </Button>
                    </div>
                }
            >
                <div className="flex flex-col items-center">
                    <div className="flex px-6 py-3 flex-col items-center gap-8 self-stretch">
                        <div className="flex flex-col items-start gap-2 self-stretch">
                            <InputLabel htmlFor="preferred_name" value="Preferred Name" />
                            <TextInput
                                id="preferred_name"
                                type="text"
                                name="preferred_name"
                                value={data.username}
                                className="w-full"
                                placeholder={user.username}
                                isFocused={true}
                                onChange={e => setData("username", e.target.value)}
                            />
                            <InputError message={errors.username} />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}