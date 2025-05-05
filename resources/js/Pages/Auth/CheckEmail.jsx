import Button from '@/Components/Button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function CheckEmail({ }) {
    const { email } = usePage().props;
    const [countdown, setCountdown] = useState(60); 
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        // Start countdown when component mounts
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Clean up on unmount
    }, []);

    const handleResend = () => {
        router.post(route('password.email'), { 
            email: email 
        })
    };
   
    return (
        <GuestLayout>
            <Head title="Check Your Email" />

            <form className='flex w-[360px] px-5 py-8 flex-col items-center gap-8'>
                <div className='flex flex-col items-center gap-2 self-stretch'>
                    <div className='text-gray-950 text-center text-lg font-bold'>
                        Check Your Email
                    </div>
                    <div className='text-gray-700 text-center text-sm'>
                        We’ve sent the reset password instructions to 
                        <div className='text-gray-700 text-center text-sm font-semibold'>{email}</div>
                    </div>
                </div>

                <div className='flex flex-col items-center gap-5 self-stretch'>
                    <Link href={route('login')} className="block w-full">
                        <Button 
                            className="flex px-4 py-3 justify-center items-center w-full gap-2 self-stretch"
                            variant='primary'
                            size="md"
                        >
                            Back to Log In
                        </Button>
                    </Link>
                    <div className='flex justify-between items-center self-stretch'>
                        <div className='text-gray-700 text-sm'>Didn’t receive the email?</div>
                        {canResend ? (
                            <button 
                                onClick={handleResend}
                                className="text-gray-950 text-right text-sm font-semibold">
                                Resend Email
                            </button>
                        ) : (
                            <div className='text-gray-300 text-right text-sm font-semibold'>
                                Resend in {countdown}s
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}