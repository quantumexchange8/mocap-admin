import Button from "@/Components/Button";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminTitle({ 
    isAdminTitleOpen,
    setIsAdminTitleOpen,
    closeTitle, 
    selectedRowDetail,
    fetchAdministrator,
}) {

    const [isLoading, setIsLoading] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        title: '',
    });


    useEffect(() => {
        if(selectedRowDetail) {
            setData('id', selectedRowDetail.id);
            setData('title', selectedRowDetail.title);
        }
    }, [selectedRowDetail])

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post('/update-admin-title', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                closeTitle();
                fetchAdministrator();

                toast.success('Title updated', {
                    title: `Title updated`,
                    duration: 3000,
                    variant: 'variant1',
                });
            }
        });
    }

    return (
        <>
            <Modal
                show={isAdminTitleOpen}
                maxWidth='md'
                title='Change Title'
                onClose={closeTitle}
                footer={
                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button variant="outlined" size="sm" onClick={closeTitle}>Cancel</Button>
                        <Button size="sm" onClick={submit}>Add</Button>
                    </div>
                }
            >
                <div className="py-3 px-6 flex flex-col gap-2">
                    <InputLabel value='Title' />
                    <TextInput 
                        id="title"
                        type="text"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('title', e.target.value)}
                    />
                </div>
            </Modal>
        </>
    )
}