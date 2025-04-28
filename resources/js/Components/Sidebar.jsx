import React from "react";
import { ChevronDown, Dashboard, Request, Calendar, Announcement, Report, Employee, Attendance, SalaryProfile, PerformanceData, Department, ProjectFolder, Tickets, SalaryIncrement, Bonus, Gift, Ranking, PointSettings, Assets, PoolFund, ExternalMember, Authority, SmartData, Setting, Activity, VersionHistory, LogOut, } from "./Icon/Outline";

export default function SideBar(expanded) {
    return (
    <>
        <div className={`${expanded ? 'fixed inset-0 z-20 bg-black/50 lg:hidden' : ''} `}>
            <aside className="fixed flex flex-col w-[230px] inset-y-0 z-20 overflow-auto border-r border-gray-200 bg-gray-100">
                <div className="flex items-center px-3 py-2 gap-3 border-b border-gray-200 bg-gray-100 sticky top-0">
                    <div className="">
                        <img src="" className="w-8 h-8"/>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 flex-[1_0_0]">
                        <div className="text-sm font-semibold"> CT Admin </div>
                        <div className="flex items-center gap-2">
                            <div className="text-xs font-normal text-gray-700"> CT00000 </div>
                            {/* <Tag className="text-xxs" value="Admin"/> */}
                        </div>
                    </div>
                    <ChevronDown/>
                </div>
                <div className="flex flex-col items-stretch px-3 py-5 gap-6 flex-shrink-0">
                    <div className="flex flex-col items-stretch gap-2">
                        <div className="text-xxs text-gray-500"> GENERAL </div>
                        <div className="flex flex-col items-stretch gap-1">
                            <div className="flex items-center px-3 py-1.5 gap-3">
                                <Dashboard/>
                                <div className="text-gray-950 text-sm"> Dashboard </div>
                            </div>
                            <div className="flex items-center px-3 py-1.5 gap-3">
                                <Request/>
                                <div className="text-gray-950 text-sm"> Requests </div>
                            </div>
                            <div className="flex items-center px-3 py-1.5 gap-3">
                                <Calendar/>
                                <div className="text-gray-950 text-sm"> Calendar </div>
                            </div>
                            <div className="flex items-center px-3 py-1.5 gap-3">
                                <Announcement/>
                                <div className="text-gray-950 text-sm"> Announcement </div>
                            </div>
                            <div className="flex items-center px-3 py-1.5 gap-3">
                                <Report/>
                                <div className="text-gray-950 text-sm"> Reports </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-stretch gap-2">
                        <div className="text-xxs text-gray-500"> EMPLOYEE </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <Employee/>
                            <div className="text-gray-950 text-sm"> Employee Listing </div>
                        </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <Attendance/>
                            <div className="text-gray-950 text-sm"> Attendance </div>
                        </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <SalaryProfile/>
                            <div className="text-gray-950 text-sm"> Payslips </div>
                        </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <PerformanceData/>
                            <div className="text-gray-950 text-sm"> Performance Data </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-stretch gap-2">
                        <div className="text-xxs text-gray-500"> DEPARTMENT </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <Department/>
                            <div className="text-gray-950 text-sm"> Departments </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-stretch gap-2">
                        <div className="text-xxs text-gray-500"> WORK </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <ProjectFolder/>
                            <div className="text-gray-950 text-sm"> Projects </div>
                        </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <Tickets/>
                            <div className="text-gray-950 text-sm"> Tickets </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-stretch gap-2">
                        <div className="text-xxs text-gray-500"> BENEFITS </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <SalaryIncrement/>
                            <div className="text-gray-950 text-sm"> Salary Increment </div>
                        </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <Bonus/>
                            <div className="text-gray-950 text-sm"> Year-End Bonus </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-stretch gap-2">
                        <div className="text-xxs text-gray-500"> REWARDS </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <Gift/>
                            <div className="text-gray-950 text-sm"> Gifts & Redemptions </div>
                        </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <Ranking/>
                            <div className="text-gray-950 text-sm"> Billboard Rankings </div>
                        </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <PointSettings/>
                            <div className="text-gray-950 text-sm"> Point Settings </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-stretch gap-2">
                        <div className="text-xxs text-gray-500"> COMPANY </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <Assets/>
                            <div className="text-gray-950 text-sm"> Assets & Stocks </div>
                        </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <PoolFund/>
                            <div className="text-gray-950 text-sm"> Pooled Fund </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-stretch gap-2">
                        <div className="text-xxs text-gray-500"> CONFIGURATION </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <ExternalMember/>
                            <div className="text-gray-950 text-sm"> External Members </div>
                        </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <Authority/>
                            <div className="text-gray-950 text-sm"> Administrators </div>
                        </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <SmartData/>
                            <div className="text-gray-950 text-sm"> Smart Data </div>
                        </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <Setting/>
                            <div className="text-gray-950 text-sm"> Settings </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-stretch gap-2">
                        <div className="text-xxs text-gray-500"> SYSTEM </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <Activity/>
                            <div className="text-gray-950 text-sm"> Activity Log </div>
                        </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <VersionHistory/>
                            <div className="text-gray-950 text-sm"> Version History </div>
                        </div>
                        <div className="flex items-center px-3 py-1.5 gap-3">
                            <LogOut/>
                            <div className="text-gray-950 text-sm"> Log Out </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </>
    )
}

