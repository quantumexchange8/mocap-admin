import React from "react";
import { Bell, BellBadge, Earth, LogOut, Sidebar } from "./Icon/Outline";
import { useForm
    
 } from "@inertiajs/react";
export default function Navbar({ header, toggleSidebar }){
    const { post } = useForm({}); 

    const logout = () => {
        post(route('logout'));
    }

    return (
        <nav className={`sticky top-0 z-10 ease-in duration-500 w-full bg-white md:shadow-navbar py-2 px-3 border-b border-gray-200`}>
            <div className='flex items-center gap-3'>
                <div className='flex p-[9px] items-center justify-center cursor-pointer hover:bg-gray-50 rounded-full' onClick={toggleSidebar}>
                    <Sidebar />
                </div>
                <div className='text-gray-950 text-lg font-semibold flex-[1_0_0]'>
                    {header}
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex p-[9px] items-center justify-center cursor-pointer hover:bg-gray-50 rounded-full">
                        <Earth/>
                    </div>
                    <div className="flex p-[9px] items-center justify-center cursor-pointer hover:bg-gray-50 rounded-full">
                        <Bell/>
                    </div>
                    <div className="flex p-[9px] items-center justify-center cursor-pointer hover:bg-gray-50 rounded-full" 
                        onClick={() => {logout()}}
                    >
                        <LogOut className="w-5 h-5"/>
                    </div>
                </div>
            </div>
        </nav>

    )
}