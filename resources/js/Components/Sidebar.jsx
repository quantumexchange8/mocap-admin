import React from "react";
import { Link, usePage, useForm } from '@inertiajs/react';
import { ChevronDown, Dashboard, Request, Calendar, Announcement, Report, Employee, Attendance, SalaryProfile, PerformanceData, Department, ProjectFolder, Tickets, SalaryIncrement, Bonus, Gift, Ranking, PointSettings, Assets, PoolFund, ExternalMember, Authority, SmartData, Setting, Activity, VersionHistory, LogOut, LogoIcon, } from "./Icon/Outline";
import { Tag, Badge } from "antd";

export default function SideBar({expanded, toggleSidebar}) {
    const { url } = usePage();

    const { post } = useForm({}); 
    
    const logout = () => {
        post(route('logout'));
    };

    return (
    <>
        <div className={`${expanded ? 'fixed inset-0 z-20 bg-black/50 lg:hidden' : ''} `} onClick={toggleSidebar}></div>
        <aside className={`fixed flex flex-col inset-y-0 z-20 overflow-auto border-r border-gray-200 bg-gray-100 
            ${!expanded ? 'translate-x-[-100%]' : 'translate-x-0 w-[230px]'}
            ease-in-out duration-300`}>
            <div className="flex items-center px-3 py-2 gap-3 border-b border-gray-200 bg-gray-100 sticky top-0 z-10">
                <div className="">
                    {/* <img src="" className="w-8 h-8"/> */}
                    <LogoIcon />
                </div>
                <div className="flex flex-col items-start gap-0.5 flex-[1_0_0]">
                    <div className="text-sm font-semibold"> CT Admin </div>
                    <div className="flex items-center gap-2">
                        <div className="text-xs font-normal text-gray-700"> CT00000 </div>
                        <Tag bordered={false} color="black" className="text-xxs"> Admin </Tag>
                    </div>
                </div>
                <ChevronDown/>
            </div>
            <div className="flex flex-col items-center px-3 py-5 gap-6 ">
                {/* General */}
                <div className="flex flex-col items-stretch self-stretch gap-2">
                    <div className="sticky top-[54px] text-xxs text-gray-500 bg-gray-100"> GENERAL </div>
                    <div className="flex flex-col items-center gap-1 self-stretch">
                        <Link href={route('dashboard')} className="flex flex-col items-center gap-1 self-stretch">
                            <div className={`${url === '/dashboard' ?' bg-gray-950' :' cursor-pointer hover:bg-gray-200'} flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm`}>
                                <Dashboard color='currentColor' className={`${url === '/dashboard' ? 'text-white' : 'text-gray-950'}`}/>
                                <div className={`${url === '/dashboard' ? 'text-white text-sm' :'text-gray-950 text-sm'} max-w-[106px] w-full`}> Dashboard </div>
                            </div>
                        </Link>
                        <div className={`${url === '/' ?' bg-gray-950' :' cursor-pointer hover:bg-gray-200'} flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm`}>
                            <div className="w-4 h-4">
                                <Request color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'} `}/>
                            </div>
                            <div className={`${url === '/' ? 'text-white ' :'text-gray-950 '} max-w-[106px] w-full text-sm`}> Requests </div>
                            <Badge count={1} className="flex flex-col min-w-5 justify-center items-center"/> 
                        </div>
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <Calendar color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Calendar </div>
                        </div>
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <Announcement color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Announcement </div>
                        </div>
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <Report color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Reports </div>
                        </div>
                    </div>
                </div>
                {/* Request */}
                <div className="flex flex-col items-stretch self-stretch gap-2">
                    <div className="sticky top-[54px] text-xxs text-gray-500 bg-gray-100"> EMPLOYEE </div>
                    <div className="flex flex-col items-center gap-1 self-stretch">
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <Employee color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Employee Listing </div>
                        </div>
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <Attendance color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Attendance </div>
                        </div>
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <SalaryProfile color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Payslips </div>
                        </div>
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <PerformanceData color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Performance Data </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-stretch self-stretch gap-2">
                    <div className="sticky top-[54px] text-xxs text-gray-500 bg-gray-100"> DEPARTMENT </div>
                    <Link href={route('department')} className="flex flex-col items-center gap-1 self-stretch">
                        <div className={`${url === '/department' || url === '/create-department' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <Department color='currentColor' className={`${url === '/department' || url === '/create-department' ? 'text-white ' : 'text-gray-950'}`}/>
                            <div className={`${url === '/department' || url === '/create-department' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Departments </div>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col items-stretch self-stretch gap-2">
                    <div className="sticky top-[54px] text-xxs text-gray-500 bg-gray-100"> WORK </div>
                    <div className="flex flex-col items-center gap-1 self-stretch">
                    <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                    <ProjectFolder color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Projects </div>
                        </div>
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <Tickets color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Tickets </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-stretch self-stretch gap-2">
                    <div className="sticky top-[54px] text-xxs text-gray-500 bg-gray-100"> BENEFITS </div>
                    <div className="flex flex-col items-center gap-1 self-stretch">
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <SalaryIncrement color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Salary Increment </div>
                        </div>
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <Bonus color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Year-End Bonus </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-stretch self-stretch gap-2">
                    <div className="sticky top-[54px] text-xxs text-gray-500 bg-gray-100"> REWARDS </div>
                    <div className="flex flex-col items-center gap-1 self-stretch">
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <Gift color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Gifts & Redemptions </div>
                        </div>
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <Ranking color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Billboard Rankings </div>
                        </div>
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <PointSettings color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Point Settings </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-stretch self-stretch gap-2">
                    <div className="sticky top-[54px] text-xxs text-gray-500 bg-gray-100"> COMPANY </div>
                    <div className="flex flex-col items-center gap-1 self-stretch">
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <Assets color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Assets & Stocks </div>
                        </div>
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <PoolFund color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Pooled Fund </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-stretch self-stretch gap-2">
                    <div className="sticky top-[54px] text-xxs text-gray-500 bg-gray-100"> CONFIGURATION </div>
                    <div className="flex flex-col items-center gap-1 self-stretch">
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <ExternalMember color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> External Members </div>
                        </div>
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <Authority color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Administrators </div>
                        </div>
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <SmartData color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Smart Data </div>
                        </div>
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <Setting color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Settings </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-stretch self-stretch gap-2">
                    <div className="sticky top-[54px] text-xxs text-gray-500 bg-gray-100"> SYSTEM </div>
                        <div className="flex flex-col items-center gap-1 self-stretch">
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <Activity color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Activity Log </div>
                        </div>
                        <div className={`${url === '/' ?'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm bg-gray-950' :'flex items-center px-3 py-1.5 gap-3 self-stretch rounded-sm cursor-pointer hover:bg-gray-200'}`}>
                            <VersionHistory color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className={`${url === '/' ? 'text-white text-sm' :'text-gray-950 text-sm'}`}> Version History </div>
                        </div>
                        <div className="flex items-center px-3 py-1.5 gap-3 self-stretch cursor-pointer hover:bg-gray-200" onClick={() => {logout()}}>
                            <LogOut color='currentColor' className={`${url === '/' ? 'text-white' : 'text-gray-950'}`}/>
                            <div className="text-gray-950 text-sm"> Log Out </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    </>
    )
}

