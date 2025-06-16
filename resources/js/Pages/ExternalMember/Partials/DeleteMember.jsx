import Button from "@/Components/Button";
import ConfirmDialog from "@/Components/ConfirmDialog";
import Modal from "@/Components/Modal";
import { Checkbox } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { DeleteIllus } from "@/Components/Icon/Illustration";
import { FemaleAvatar, MaleAvatar } from "@/Components/Icon/ProfilePhoto";

export default function DeleteMember({
    member,
    isDeleteMemberOpen,
    setIsDeleteMemberOpen,
    closeDeleteMember,
    fetchExternalMember,
}) {

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [checked, setChecked] = useState(false);

    const handleConfirmDialogClose = () => {
        setIsConfirmDialogOpen(false);
    }

    const openConfirmDialog = () => {
        if (!checked) {
            toast.error(`Please check the confirmation box to proceed.`, {
                    title: `Please check the confirmation box to proceed.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            return;
        }
        setIsConfirmDialogOpen(true);
    }

    const confirmDelete = async () => {
        try {

            const response = await axios.post('/delete-member', member);
            
            if (response.status === 200) {
                closeDeleteMember();
                handleConfirmDialogClose();
                fetchExternalMember();
                toast.success(`External Member has been deleted.`, {
                    title: `External Member has been deleted.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            }

        } catch (error) {
            console.error('error', error);
        }
    }

    return (
        <>
            <Modal
                show={isDeleteMemberOpen}
                maxWidth='lg'
                title='Delete External Member'
                onClose={closeDeleteMember}
                footer={
                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button variant="outlined" size="sm" onClick={closeDeleteMember}>Cancel</Button>
                        <Button size="sm" onClick={openConfirmDialog}>Confirm</Button>
                    </div>
                }
            >
                {
                    member && (
                        <div className="py-3 px-6 flex flex-col gap-8">
                            <div className="flex items-center gap-3">
                                {
                                    member.profile_image ? (
                                        <div className="max-w-12 min-w-12 w-full h-12 rounded-full">
                                            <img src={member.profile_image} alt="" className="rounded-full w-12 h-12" />
                                        </div>
                                    ) : (
                                        <div className="rounded-full w-12 h-12">
                                            {
                                                member.gender === 'male' ? (
                                                    <MaleAvatar className='w-12 h-12 rounded-full' />
                                                ) : (
                                                    <FemaleAvatar className='w-12 h-12 rounded-full' />
                                                )
                                            }
                                        </div>
                                    )
                                }
                                <div className="flex flex-col gap-1">
                                    <div className="text-gray-950 text-base font-semibold">{member.name}</div>
                                    <div className="text-gray-500 text-sm">CTID: {member.employee_id}</div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 py-5 px-4 bg-gray-100 rounded-sm">
                                <div className="px-4">
                                    <ul className="list-outside list-disc marker:text-error-600 text-gray-700 text-sm flex flex-col gap-3">
                                        <li>The external member's access to the Motion Capture Mobile App and all associated tools will be immediately revoked.</li>
                                        <li>Shared resources, like uploaded files or comments, may still be accessible.</li>
                                        <li>Once deleted, the external member cannot be restored unless re-added manually, and their history may not be recoverable.</li>
                                        <li>You may consider suspending the external member’s account temporarily instead of deleting it, preserving their data and access settings for potential future reactivation.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 self-stretch">
                                 <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}> 
                                    <div className="text-sm text-gray-950">I confirm that I have reviewed the above details and approve the deletion of this external member's account.</div>
                                </Checkbox>
                            </div>
                        </div>
                    )
                }
            </Modal>
            
            <ConfirmDialog show={isConfirmDialogOpen}>
                <div className="flex flex-col gap-8 p-6" >
                    <div className="flex flex-col items-center">
                        <div><DeleteIllus /></div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-gray-950 text-lg font-bold">Delete External Member</div>
                            <div className="text-gray-700 text-sm text-center">
                                Are you sure you want to delete <span className="font-semibold">{member?.name}</span>? This action will permanently remove the account, and it cannot be undone. Please confirm to proceed.
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <Button size="sm" variant="outlined" onClick={handleConfirmDialogClose}>Cancel</Button>
                        <Button size="sm" variant="danger" onClick={confirmDelete}>Confirm and Delete</Button>
                    </div>
                </div>
            </ConfirmDialog>
        </>
    )
}