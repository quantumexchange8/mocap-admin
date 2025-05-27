import React, { useEffect } from "react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Button from "@/Components/Button";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function ChangeName({user, show, onClose}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: user.title,
    });

    // Reset form when modal opens/closes or user changes
    useEffect(() => {
        if (show) {
            setData("title", user.title);
        }
    }, [show, user.title, setData]);

    const saveChange = (e) => {
        e.preventDefault();
        post(route('update-title'), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                reset();
                toast.success(`Title successfully change.`, {
                    title: `Title successfully change.`,
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
                title='Change Title'
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
                            <InputLabel htmlFor="title" value="Title" />
                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                className="w-full"
                                placeholder={user.title}
                                autoComplete="title"
                                isFocused={true}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}