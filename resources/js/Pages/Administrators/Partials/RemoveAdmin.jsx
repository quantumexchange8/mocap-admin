import Button from "@/Components/Button";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { BrokerIllus } from "@/Components/Icon/Illustration/BrokenIllus";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function RemoveAdmin({
    isRemoveOpen,
    setIsRemoveOpen,
    closeConfirmRemove,
    selectedRowDetail,
    fetchAdministrator,
}) {

    const [isLoading, setIsLoading] = useState(false);

     const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
    }); 

    useEffect(() => {
        if(selectedRowDetail) {
            setData('id', selectedRowDetail.id);
        }
    }, [selectedRowDetail])

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post('/remove-administrator', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                closeConfirmRemove();
                fetchAdministrator();

                toast.success('Administrator has been removed.', {
                    title: `Administrator has been removed.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            }
        });
    }

    return (
        <>
            <ConfirmDialog show={isRemoveOpen} >
                <div className="p-6 flex flex-col items-center gap-8">
                    <div className="flex flex-col items-center gap-3">
                        <div>
                            <BrokerIllus />
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <div className="text-gray-950 font-bold text-lg">Remove Administrator</div>
                            <div className="text-gray-700 text-sm text-center">
                                Are you sure you want to remove <span className="font-semibold">{selectedRowDetail?.name}</span> as administrator? They will lose all assigned permissions and access to the system."
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <Button variant="outlined" size="sm" onClick={closeConfirmRemove}>Cancel</Button>
                        <Button variant="danger" size="sm" onClick={submit}>Remove</Button>
                    </div>
                </div>
            </ConfirmDialog>
        </>
    )
}