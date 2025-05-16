import { JobApplicationIcon9 } from "@/Components/Icon/Outline";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function SuccessSubmit({ }) {
    
    return (
    <GuestLayout>
        <Head title="Forgot Password" />
        <div className="flex w-[488px] flex-col justify-center items-center gap-8 flex-[1_0_0]">
            <JobApplicationIcon9/>
            <div className="flex flex-col items-center gap-2 self-stretch">
                <div className="text-gray-950 text-center text-lg font-bold">
                    Your Application is In!
                </div>
                <div className="text-gray-700 text-center text-sm">
                    Thank you for applying! We’ve received your application and our team is reviewing it. We’ll get back to you soon. Good luck!
                </div>
            </div>
        </div>
    </GuestLayout>
    );
}
