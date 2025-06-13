import Button from "@/Components/Button";
import ConfirmDialog from "@/Components/ConfirmDialog";
import React from "react";
import toast from "react-hot-toast";

export default function RestoreMemberAcc ({
    member,
    isRestoreDialogOpen,
    setIsRestoreDialogOpen,
    closeRestoreDialog,
    fetchExternalMember,
}) {

    const confirmRestore = async () => {
        try {

            const response = await axios.post('/restore-member', member);
            
            if (response.status === 200) {
                closeRestoreDialog();
                fetchExternalMember();
                toast.success(`Account restored successfully!`, {
                    title: `Account restored successfully!`,
                    duration: 3000,
                    variant: 'variant1',
                });
            }

        } catch (error) {
            console.error('error', error);
        }
    }

    return (
        <ConfirmDialog show={isRestoreDialogOpen}>
            {
                member && (
                    <div className="p-6 flex flex-col gap-8">
                        <div className="flex flex-col gap-2 items-center">
                            <div className="text-gray-950 text-lg font-bold">
                                Restore Account?
                            </div>
                            <div className="text-gray-700 text-sm text-center">
                                Are you sure you want to restore account for <span className="font-semibold">{member.name}</span>? Restoring will reactivate access and return the account to active status.
                            </div>
                        </div>
                        <div className='flex items-center gap-4 justify-center'>
                            <div><Button size='sm' variant='outlined' onClick={closeRestoreDialog}>Cancel</Button></div>
                            <div><Button size='sm' onClick={confirmRestore}>Confirm</Button></div>
                        </div>
                    </div>
                )
            }
        </ConfirmDialog>
    )
}