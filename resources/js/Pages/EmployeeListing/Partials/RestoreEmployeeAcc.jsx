import Button from "@/Components/Button";
import ConfirmDialog from "@/Components/ConfirmDialog";
import React from "react";
import toast from "react-hot-toast";

export default function RestoreEmployeeAcc ({
    fetchEmployee,
    employmentDetails,
    isRestoreDialogOpen,
    setIsRestoreDialogOpen,
    closeRestoreDialog,
}) {

    const confirmRestoreEmployee = async () => {
        try {

            const response = await axios.post('/restore-employee', employmentDetails);
            
            if (response.status === 200) {
                closeRestoreDialog();
                fetchEmployee();
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
                employmentDetails && (
                    <div className="p-6 flex flex-col gap-8">
                        <div className="flex flex-col gap-2 items-center">
                            <div className="text-gray-950 text-lg font-bold">
                                Restore Account?
                            </div>
                            <div className="text-gray-700 text-sm text-center">
                                Are you sure you want to restore account for <span className="font-semibold">{employmentDetails.name}</span>? Restoring will reactivate access and return the account to active status.
                            </div>
                        </div>
                        <div className='flex items-center gap-4 justify-center'>
                            <div><Button size='sm' variant='outlined' onClick={closeRestoreDialog}>Cancel</Button></div>
                            <div><Button size='sm' onClick={confirmRestoreEmployee}>Confirm</Button></div>
                        </div>
                    </div>
                )
            }
        </ConfirmDialog>
    )
}