import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { MocapLogo, Onboarding2Logo } from '@/Components/Icon/Logo';
import { Earth } from '@/Components/Icon/Outline';

export default function GuestLayout({ children }) {

    const redictHome = () => {
        window.location.href = `/`;
    }
    
    return (
        <div className="flex min-h-screen flex-col pb-5 justify-between items-center flex-shrink-0">
            <div className="flex w-full px-5 py-2 justify-between items-center">
                <div className="flex items-center gap-3 cursor-pointer" onClick={redictHome}>
                    <div><Onboarding2Logo /></div>
                    <div><MocapLogo /></div>
                </div>
                <div className='flex w-[38px] h-[38px] p-[9px] justify-center items-center flex-shrink-0'>
                    <Earth/>    
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-12 flex-[1_0_0]'>
                {children}
            </div>
            <div className='text-gray-500 text-center text-xs'>
                © {new Date().getFullYear()} Motion Capture Powered by Current Tech Industries
            </div>
        </div>
    );
}
