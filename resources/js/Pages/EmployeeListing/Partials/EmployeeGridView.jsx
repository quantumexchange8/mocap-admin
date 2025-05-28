import React, { useState } from "react";
import { motion } from 'framer-motion';
import { CalendarIcon, DateJoinedIcon, DotVerticalIcon, EmailIcon, HierarchyIcon, TagActiveIcon, TagInvitedIcon, TagSuspendedIcon } from "@/Components/Icon/Outline";
import Button from "@/Components/Button";
import { Dropdown, Tag } from "antd";
import { FemaleAvatar, MaleAvatar } from "@/Components/Icon/ProfilePhoto";
import UpdateEmploymentDetails from "./UpdateEmploymentDetails";
import toast from "react-hot-toast";
import SuspendEmployeeAcc from "./SuspendEmployeeAcc";
import RestoreEmployeeAcc from "./RestoreEmployeeAcc";
import DeleteEmployee from "./DeleteEmployee";
import ResetEmployeePass from "./ResetEmployeePass";

export default function EmployeeGridView({ getEmployeeListing, fetchEmployee, isLoading }) {

    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
    };

    const [sortOrder, setSortOrder] = useState(null); 
    const [isOpenEmploymentDetail, setIsOpenEmploymentDetail] = useState(false);
    const [employmentDetails, setEmploymentDetails] = useState(null);
    const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
    const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
    const [isResetPwOpen, setIsResetPwOpen] = useState(false);
    const [pwResetedDialog, setPwResetedDialog ] = useState(false);
    const [isDeleteEmployeeOpen, setIsDeleteEmployeeOpen ] = useState(false);
    const [newRespPw , setNewRespPw ] = useState('');

    const directEmployeeDetails = (record) => {
        window.location.href = `/employee-details/${record.id}`;
    };
    
    // employee details
    const openEmploymentDetails = (data) => {
        setEmploymentDetails(data);
        setIsOpenEmploymentDetail(true);
    }

    const closeEmploymentDetails = () => {
        setIsOpenEmploymentDetail(false);
        setEmploymentDetails(null);
    }

    // restore account
    const openRestoreDialog = (data) => {
        setEmploymentDetails(data);
        setIsRestoreDialogOpen(true);
    }
    const closeRestoreDialog = () => {
        setIsRestoreDialogOpen(false);
        setEmploymentDetails(null);
    }

    // suspend account
    const openSuspendDialog = (data) => {
        setEmploymentDetails(data);
        setIsSuspendDialogOpen(true);

    }
    const closeSuspendDialog = () => {
        setIsSuspendDialogOpen(false);
        setEmploymentDetails(null);
    }

    // reset pw
    const openResetPwDialog = (data) => {
        setEmploymentDetails(data);
        setIsResetPwOpen(true);

    }
    const closeResetPwDialog = () => {
        setIsResetPwOpen(false);
        setEmploymentDetails(null);
    }

    // delete employee
    const openDeleteEmployee = (data) => {
        setEmploymentDetails(data);
        setIsDeleteEmployeeOpen(true)
    }

    const closeDeleteEmployee = () => {
        setIsDeleteEmployeeOpen(false);
        setEmploymentDetails(null);
    }

    const closePwResetedDialog = () => {
        setPwResetedDialog(false);
        setNewRespPw(null);
        setEmploymentDetails(null);
    }

    return (
        <>
            {
                getEmployeeListing && (
                    <motion.div 
                        className="grid grid-cols-2 gap-5"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {
                            getEmployeeListing.map((employee, index) => {

                                const items = [
                                    {
                                        key: '1',
                                        label: (
                                            <div onClick={() => openEmploymentDetails(employee)}>
                                                Update Employment
                                            </div>
                                        ),
                                    },
                                    {
                                        key: '2',
                                        label: (
                                            <>
                                                {
                                                    employee.status === 'suspended' ? (
                                                        <span onClick={() => openRestoreDialog(employee)}>
                                                            Restore Account
                                                        </span>
                                                    ) : (
                                                        <span onClick={() => openSuspendDialog(employee)}>
                                                            Suspend Account
                                                        </span>
                                                    )
                                                }
                                            </>
                                        ),
                                    },
                                    {
                                        key: '3',
                                        label: (
                                            <div onClick={() => openDeleteEmployee(employee)}>
                                                Delete
                                            </div>
                                        ),
                                    },
                                    {
                                        key: '4',
                                        label: (
                                            <div onClick={() => openResetPwDialog(employee)}>
                                                Reset Login Password
                                            </div>
                                        ),
                                    }
                                ];

                                return (
                                    <motion.div  
                                            key={index} 
                                            variants={itemVariants}
                                            className="p-5 bg-white shadow-toast flex flex-col gap-5 cursor-pointer hover:bg-gray-50"
                                            onClick={() => directEmployeeDetails(employee)}
                                    >
                                        <div className="flex gap-3">
                                            <div className="max-w-[100px] min-w-[100px] w-full h-[100px] ">
                                                {
                                                    employee.profile_image ? (
                                                        <img src="https://p3-pc-sign.douyinpic.com/tos-cn-i-0813c001/oAfOa6PAAACEAugW6GDACmQZzIALKx9fWFAAGA~tplv-dy-aweme-images:q75.webp?biz_tag=aweme_images&from=327834062&lk3s=138a59ce&s=PackSourceEnum_SEARCH&sc=image&se=false&x-expires=1749913200&x-signature=8ldN187mrrYJJqeL%2BC%2FwLbAM%2Bmk%3D" alt="" className=" w-full h-full" />
                                                    ) : (
                                                        <div>
                                                            {
                                                                employee.gender === 'male' && (
                                                                    <MaleAvatar className="" />
                                                                )
                                                            }
                                                            {
                                                                employee.gender === 'female' && (
                                                                    <FemaleAvatar className="" />
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                                
                                            </div>
                                            <div className="flex flex-col justify-between w-full">
                                                <div className="flex gap-3 w-full">
                                                    <div className="flex flex-col w-full">
                                                        <div className="text-gray-950 text-base font-semibold">{employee.name}</div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-gray-700 text-sm">{employee.employee_id} </span>
                                                            <span className="text-gray-400">|</span>
                                                            <span className="text-gray-700 text-sm">{employee.position}</span>
                                                        </div>
                                                    </div>
                                                    <div onClick={(e) => e.stopPropagation()}>
                                                        <Dropdown menu={{ items }} placement="bottomRight" arrow trigger={['click']} >
                                                            <div>
                                                                <Button variant="text" size="sm" iconOnly >
                                                                    <DotVerticalIcon />
                                                                </Button>
                                                            </div>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        {
                                                            employee.status === 'active' && (
                                                                <Tag bordered={false} color="info" className='ant-tag-info text-xs font-medium py-1 px-2 flex items-center gap-1 mr-0'>
                                                                    <span><TagActiveIcon /></span>
                                                                    <span>Active</span>
                                                                </Tag>
                                                            )
                                                        }
                                                        {
                                                            employee.status === 'invited' && (
                                                                <Tag bordered={false} color="#884dff26" className='ant-tag-purple text-xs font-medium py-1 px-2 flex items-center gap-1 mr-0'>
                                                                    <span><TagInvitedIcon /></span>
                                                                    <span>Invited</span>
                                                                </Tag>
                                                            )
                                                        }
                                                        {
                                                            employee.status === 'suspended' && (
                                                                <Tag bordered={false} color="others" className='ant-tag-others text-xs font-medium py-1 px-2 flex items-center gap-1 mr-0'>
                                                                    <span><TagSuspendedIcon /></span>
                                                                    <span>Suspended</span>
                                                                </Tag>
                                                            )
                                                        }
                                                    </div>
                                                    <div>
                                                        <Tag bordered={false} color='others' className='ant-tag-others text-xs font-medium py-1 px-2 flex items-center gap-1 mr-0'>
                                                            <span>{employee.employee_type}</span>
                                                        </Tag>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-3">
                                                <span><HierarchyIcon /></span>
                                                <span className="text-gray-950 text-sm">{employee.department.name}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span><EmailIcon /></span>
                                                <span className="text-gray-950 text-sm">{employee.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span><DateJoinedIcon /></span>
                                                <span className="text-gray-950 text-sm">{employee.dob}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })
                        }
                    </motion.div>
                )
            }

            {/* suspend employee account */}
            <SuspendEmployeeAcc 
                fetchEmployee={fetchEmployee} 
                employmentDetails={employmentDetails} 
                isSuspendDialogOpen={isSuspendDialogOpen} 
                setIsSuspendDialogOpen={setIsSuspendDialogOpen} 
                closeSuspendDialog={closeSuspendDialog} 
            />

            {/* restore employee account */}
            <RestoreEmployeeAcc 
                fetchEmployee={fetchEmployee} 
                employmentDetails={employmentDetails} 
                isRestoreDialogOpen={isRestoreDialogOpen} 
                setIsRestoreDialogOpen={setIsRestoreDialogOpen} 
                closeRestoreDialog={closeRestoreDialog} 
            />

            {/* update employee details */}
            <UpdateEmploymentDetails 
                fetchEmployee={fetchEmployee} 
                employmentDetails={employmentDetails} 
                isOpenEmploymentDetail={isOpenEmploymentDetail} 
                setIsOpenEmploymentDetail={setIsOpenEmploymentDetail} 
                closeEmploymentDetails={closeEmploymentDetails}  
            />

            {/* reset employee password */}
            <ResetEmployeePass 
                fetchEmployee={fetchEmployee} 
                employmentDetails={employmentDetails} 
                isResetPwOpen={isResetPwOpen}  
                setIsResetPwOpen={setIsResetPwOpen} 
                closeResetPwDialog={closeResetPwDialog} 
                closePwResetedDialog={closePwResetedDialog} 
                pwResetedDialog={pwResetedDialog} 
                setPwResetedDialog={setPwResetedDialog} 
                newRespPw={newRespPw}
                setNewRespPw={setNewRespPw}
            />

            {/* delete employee password */}
            <DeleteEmployee 
                fetchEmployee={fetchEmployee} 
                employmentDetails={employmentDetails} 
                isDeleteEmployeeOpen={isDeleteEmployeeOpen} 
                setIsDeleteEmployeeOpen={setIsDeleteEmployeeOpen} 
                closeDeleteEmployee={closeDeleteEmployee}  
            />
        </>
    )
}