import { ResetPassword } from "@/Components/Icon/Outline";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function SuccessResetPassword({ }) {
    
    return (
    <GuestLayout>
        <Head title="Forgot Password" />
        <div className="flex w-[488px] flex-col justify-center items-center gap-8 flex-[1_0_0]">
            <ResetPassword className="w-60 h-60"/>
            <div className="flex flex-col items-center gap-2 self-stretch">
                <div className="text-gray-950 text-center text-lg font-bold">
                    Password Reset Successful!
                </div>
                <div className="text-gray-700 text-center text-sm">
                    Your password has been updated. You can now log in with your new credentials.
                    If you have any issues, please contact support.
                </div>
            </div>
        </div>
    </GuestLayout>
    );
}

