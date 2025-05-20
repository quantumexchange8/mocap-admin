import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/Components/Button";
import { BirthdayIcon, DateJoinedIcon, EditIcon, EmailIcon, Employee, HomeIcon, PhoneIcon, TagActiveIcon, TagInvitedIcon, TagSuspendedIcon } from "@/Components/Icon/Outline";
import { Image, Tabs, Tag } from "antd";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import ProfileInfo from "./EmployeeInfo/ProfileInfo";
import Profile from "./EmployeeInfo/Profile";
import Company from "./EmployeeInfo/Company";
import Documents from "./EmployeeInfo/Documents";

export default function EmployeeDetails({user_details}) {

    const [isLoading, setIsLoading] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const openProfileInfo = () => {
        setIsProfileOpen(true);
    }
    const closeProfileInfo = () => {
        setIsProfileOpen(false);
    }

    const items = [
        { key: '1', label: 'Profile', children: <Profile user_details={user_details} /> },
        { key: '2', label: 'Company Assets', disabled: true, children: <Company /> },
        { key: '3', label: 'Employee Documents', disabled: true, children: <Documents /> },
    ];

    return (
        <AuthenticatedLayout
            header="Employee Listing"
        >

            <Head title="Employee Listing" />

            <div className="flex flex-col gap-5 p-5">
                <div className="w-full sticky top-[55px] bg-white z-30 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <span><Employee /></span>
                            <span>Employee Listing</span>
                        </div>
                        <div className="text-gray-400 text-base">/</div>
                        <div className="text-gray-950 text-sm font-semibold">{user_details.name} - Employee Details</div>
                    </div>
                    
                </div>

                <div className="flex shadow-smShadow border border-gray-200">
                    <div className="max-w-60 min-w-60 w-full h-60 ">
                        <Image 
                            width={240}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-6Wi3i1iTyPXaKenHPXvyc89PNv5-nHBYw&s"
                            preview={{
                                movable: false
                            }}
                        />
                    </div>
                    <div className="flex flex-col justify-between p-5 w-full">
                        <div className="flex gap-5">
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-gray-950 text-xl font-bold">{user_details.name}</div>
                                <div className="flex items-center gap-2">
                                    <div className="text-gray-700 text-sm">{user_details.employee_id}</div>
                                    <div className="text-gray-400 text-sm">|</div>
                                    <div className="text-gray-700 text-sm">{user_details.username}</div>
                                    <div className="text-gray-400 text-sm">|</div>
                                    <div className="text-gray-700 text-sm">{user_details.position}</div>
                                </div>
                            </div>
                            <div>
                                <Button size="sm" iconOnly variant="text" onClick={openProfileInfo}>
                                    <EditIcon />
                                </Button>
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-3">
                                <span><PhoneIcon /></span>
                                <span className="text-gray-950 text-sm">{user_details.dial_code}{user_details.phone_no}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span><BirthdayIcon /></span>
                                <span className="text-gray-950 text-sm">{user_details.dob}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span><EmailIcon /></span>
                                <span className="text-gray-950 text-sm">{user_details.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span><DateJoinedIcon /></span>
                                <span className="text-gray-950 text-sm">{user_details.employee_date}</span>
                            </div>
                            <div className="col-span-2 flex items-center gap-3">
                                <span><HomeIcon /></span>
                                <span className="text-gray-950 text-sm">{user_details.address}, {user_details.city}, {user_details.postcode}, {user_details.state}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div>
                                {
                                    user_details.status === 'active' && (
                                        <Tag bordered={false} color="info" className='ant-tag-info text-xs font-medium py-1 px-2 flex items-center gap-1'>
                                            <span><TagActiveIcon /></span>
                                            <span>Active</span>
                                        </Tag>
                                    )
                                }
                                {
                                    user_details.status === 'invited' && (
                                        <Tag bordered={false} color="#884dff26" className='ant-tag-purple text-xs font-medium py-1 px-2 flex items-center gap-1'>
                                            <span><TagInvitedIcon /></span>
                                            <span>Invited</span>
                                        </Tag>
                                    )
                                }
                                {
                                    user_details.status === 'suspended' && (
                                        <Tag bordered={false} color="others" className='ant-tag-others text-xs font-medium py-1 px-2 flex items-center gap-1'>
                                            <span><TagSuspendedIcon /></span>
                                            <span>Suspended</span>
                                        </Tag>
                                    )
                                }
                            </div>
                            <div>
                                <Tag bordered={false} color={user_details.department.color} className='text-xs font-medium py-1 px-2 flex items-center gap-1'>
                                    <span>{user_details.department.name}</span>
                                </Tag>
                            </div>
                            <div>
                                <Tag bordered={false} color='others' className='ant-tag-others text-xs font-medium py-1 px-2 flex items-center gap-1'>
                                    <span>{user_details.employee_type}</span>
                                </Tag>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <Tabs 
                        defaultActiveKey="1"
                        items={items}
                    />
                </div>
            </div>

            <ProfileInfo 
                user_details={user_details}
                isProfileOpen={isProfileOpen}
                setIsProfileOpen={setIsProfileOpen}
                closeProfileInfo={closeProfileInfo}
            />
        </AuthenticatedLayout>
    )
}