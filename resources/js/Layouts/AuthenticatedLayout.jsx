import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import SideBar from '@/Components/Sidebar';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import { CustomToaster } from '@/Components/CustomToaster';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth?.user;
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setIsSidebarExpanded(true);
            } else {
                setIsSidebarExpanded(false);
            }
        };

        // Set initial state
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <CustomToaster />
            
            <SideBar user={user} expanded={isSidebarExpanded} toggleSidebar={toggleSidebar}/>
            
            <div className={`min-h-screen flex flex-col transition-all duration-300 ${isSidebarExpanded ? 'lg:ml-[230px]' : 'translate-x-0'}`}>
                <Navbar header={header} toggleSidebar={toggleSidebar} expanded={isSidebarExpanded}/>
                <main className='w-full flex justify-center'>
                    <div className='w-full '>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
