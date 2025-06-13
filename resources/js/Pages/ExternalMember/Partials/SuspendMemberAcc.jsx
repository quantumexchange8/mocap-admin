import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import React from "react";
import toast from "react-hot-toast";

export default function SuspendMemberAcc({
    member,
    isSuspendDialogOpen,
    setIsSuspendDialogOpen,
    closeSuspendDialog,
    fetchExternalMember,
}) {

    const confirmSuspend = async () => {
        try {

            const response = await axios.post('/suspend-member', member);
            
            if (response.status === 200) {
                closeSuspendDialog();
                fetchExternalMember();
                toast.success(`Account has been suspended.`, {
                    title: `Account has been suspended.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            }

        } catch (error) {
            console.error('error', error);
        }
    }

    return (
        <Modal
            show={isSuspendDialogOpen}
            maxWidth='lg'
            title='Suspend Account'
            onClose={closeSuspendDialog}
            footer={
                <div className="flex items-center justify-end gap-4 w-full">
                    <Button variant="outlined" size="sm" onClick={closeSuspendDialog}>Cancel</Button>
                    <Button size="sm" onClick={confirmSuspend}>Confirm</Button>
                </div>
            }
        >
            {
                member && (
                    <div className="py-3 px-6 flex flex-col gap-8">
                        <div className="flex items-center gap-3">
                            <div className="max-w-12 min-w-12 w-full h-12 rounded-full">
                                <img src="https://p3-pc-sign.douyinpic.com/tos-cn-i-0813c001/oAfOa6PAAACEAugW6GDACmQZzIALKx9fWFAAGA~tplv-dy-aweme-images:q75.webp?biz_tag=aweme_images&from=327834062&lk3s=138a59ce&s=PackSourceEnum_SEARCH&sc=image&se=false&x-expires=1749913200&x-signature=8ldN187mrrYJJqeL%2BC%2FwLbAM%2Bmk%3D" alt="" className="rounded-full w-12 h-12" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="text-gray-950 text-base font-semibold">{member.name}</div>
                                <div className="text-gray-500 text-sm">CTID: {member.employee_id}</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 py-5 px-4 bg-gray-100 rounded-sm">
                            <div className="px-4">
                                <ul className="list-outside list-disc marker:text-error-600 text-gray-700 text-sm flex flex-col gap-3">
                                    <li>The external member will lose access to the Motion Capture Mobile App.</li>
                                    <li>All data associated with the suspended external member will be retained, and their account status will be marked as “Suspended”.</li>
                                    <li>Suspended accounts can still receive announcements and project assignments from others.</li>
                                    <li>Suspended accounts can be restored as long as they have not been permanently deleted.</li>
                                    <li>The external member will not receive emails through their registered email address while their account is suspended. Any emails sent to this address will bounce back to the sender.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </Modal>
    )
}