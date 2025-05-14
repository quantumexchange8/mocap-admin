import React, { useState } from "react";
import { Bell, BellBadge, Earth, LogOut, Sidebar } from "./Icon/Outline";
import { useForm } from "@inertiajs/react";
import ConfirmDialog from "./ConfirmDialog";
import Button from "./Button";

export default function Navbar({ header, toggleSidebar }){

    const [isOpen, setIsOpen] = useState(false);
    const { post } = useForm({}); 

    const confirmLogout = () => {
        setIsOpen(true);
    }

    const rejectLogout = () => {
        setIsOpen(false);
    }

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
                        // onClick={() => {logout()}}
                        onClick={confirmLogout}
                    >
                        <LogOut className="w-5 h-5"/>
                    </div>
                </div>
            </div>

            <ConfirmDialog
                show={isOpen}
            >
                <div className="p-6 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <div className="text-lg font-bold text-gray-950 text-center">Confirm Logout?</div>
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button variant="outlined" size="sm" onClick={rejectLogout}>Cancel</Button>
                        <Button size="sm" onClick={logout}>Confirm</Button>
                    </div>
                </div>
            </ConfirmDialog>
        </nav>

    )
}