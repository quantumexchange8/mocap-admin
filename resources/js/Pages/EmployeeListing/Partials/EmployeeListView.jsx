import Button from "@/Components/Button";
import { DefaultSortIcon, DotVerticalIcon, EyeOff, EyeOn, SortAsc, SortDesc, SuccessIcon, TagActiveIcon, TagInvitedIcon, TagSuspendedIcon } from "@/Components/Icon/Outline";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import { Dropdown, Table, Tag } from "antd";
import React, { useState } from "react";
import UpdateEmploymentDetails from "./UpdateEmploymentDetails";
import axios from "axios";
import toast from "react-hot-toast";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { Radio } from "antd";
import TextInput from "@/Components/TextInput";
import InputIconWrapper from "@/Components/InputIconWrapper";
import DeleteEmployee from "./DeleteEmployee";
import { FemaleAvatar, MaleAvatar } from "@/Components/Icon/ProfilePhoto";
import SuspendEmployeeAcc from "./SuspendEmployeeAcc";
import RestoreEmployeeAcc from "./RestoreEmployeeAcc";
import ResetEmployeePass from "./ResetEmployeePass";

export default function EmployeeListView({ getEmployeeListing, fetchEmployee, isLoading}) {

    const [sortOrder, setSortOrder] = useState(null); 
    const [sortCtidOrder, setSortCtidOrder] = useState(null); 
    const [sortEntryDate, setSortEntryDate] = useState(null);

    const [isOpenEmploymentDetail, setIsOpenEmploymentDetail] = useState(false);
    const [employmentDetails, setEmploymentDetails] = useState(null);
    const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
    const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
    const [isResetPwOpen, setIsResetPwOpen] = useState(false);
    const [pwResetedDialog, setPwResetedDialog ] = useState(false);
    const [isDeleteEmployeeOpen, setIsDeleteEmployeeOpen ] = useState(false);
    const [newRespPw , setNewRespPw ] = useState('');

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
        setIsSuspendDialogOpen(true);
        setEmploymentDetails(data);

    }
    const closeSuspendDialog = () => {
        setEmploymentDetails(null);
        setIsSuspendDialogOpen(false);
        
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


    const columns = [
        {
            title: () => (
                <div className="flex items-center gap-2">
                Employee
                <span className="text-gray-500 flex items-center gap-1">
                    {sortOrder === null && <DefaultSortIcon className="w-4 h-4" />}
                    {
                        sortOrder === 'ascend' && (
                            <>
                                <SortAsc className="w-4 h-4 text-gray-950" />
                            </>
                        )
                    }
                    {
                        sortOrder === 'descend' && (
                            <>
                                <SortDesc className="w-4 h-4 text-gray-950" />
                            </>
                        )
                    }
                </span>
                </div>
            ),
            dataIndex: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
            sortOrder, // bind the state
            width: 200,
            fixed: 'left',
            onHeaderCell: () => ({
                onClick: () => {
                if (sortOrder === null) {
                    setSortOrder('ascend');
                } else if (sortOrder === 'ascend') {
                    setSortOrder('descend');
                } else {
                    setSortOrder(null);
                }
                }
            }),
            render: (_, record) => {
                return (
                    <div className="flex gap-2 items-center">
                        <div className="max-w-8 min-w-8 w-full h-8">
                            {
                                record.profile_image ? (
                                    <img src="https://p3-pc-sign.douyinpic.com/tos-cn-i-0813c001/oAfOa6PAAACEAugW6GDACmQZzIALKx9fWFAAGA~tplv-dy-aweme-images:q75.webp?biz_tag=aweme_images&from=327834062&lk3s=138a59ce&s=PackSourceEnum_SEARCH&sc=image&se=false&x-expires=1749913200&x-signature=8ldN187mrrYJJqeL%2BC%2FwLbAM%2Bmk%3D" alt="" className="rounded-full" />
                                ) : (
                                    <div>
                                        {
                                            record.gender === 'male' && (
                                                <MaleAvatar className="rounded-full w-8 h-8" />
                                            )
                                        }
                                        {
                                            record.gender === 'female' && (
                                                <FemaleAvatar className="rounded-full w-8 h-8" />
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                        <div className="flex flex-col">
                            <div className="text-gray-950 font-medium text-sm max-w-[100px] truncate">{record.name}</div>
                            <div className="text-xs text-gray-500 max-w-[100px] truncate">{record.email}</div>
                        </div>
                    </div>
                )
            },
            ellipsis: true,
        }, 
        {
            title: 'Status',
            dataIndex: 'status',
            width: 120,
            render: (_, record) => {
                return (
                    <div className="flex">
                        {
                            record.status === 'active' && (
                                <Tag bordered={false} color="info" className='ant-tag-info text-xs font-medium py-1 px-2 flex items-center gap-1'>
                                    <span><TagActiveIcon /></span>
                                    <span>Active</span>
                                </Tag>
                            )
                        }
                        {
                            record.status === 'invited' && (
                                <Tag bordered={false} color="#884dff26" className='ant-tag-purple text-xs font-medium py-1 px-2 flex items-center gap-1'>
                                    <span><TagInvitedIcon /></span>
                                    <span>Invited</span>
                                </Tag>
                            )
                        }
                        {
                            record.status === 'suspended' && (
                                <Tag bordered={false} color="others" className='ant-tag-others text-xs font-medium py-1 px-2 flex items-center gap-1'>
                                    <span><TagSuspendedIcon /></span>
                                    <span>Suspended</span>
                                </Tag>
                            )
                        }
                    </div>
                )
            }
        }, 
        {
            title: () => (
                <div className="flex items-center gap-2">
                CTID
                <span className="text-gray-500 flex items-center gap-1">
                    {sortCtidOrder === null && <DefaultSortIcon className="w-4 h-4" />}
                    {
                        sortCtidOrder === 'ascend' && (
                            <>
                                <SortAsc className="w-4 h-4 text-gray-950" />
                            </>
                        )
                    }
                    {
                        sortCtidOrder === 'descend' && (
                            <>
                                <SortDesc className="w-4 h-4 text-gray-950" />
                            </>
                        )
                    }
                </span>
                </div>
            ),
            dataIndex: 'employee_id',
            width: 105,
            sorter: (a, b) => a.employee_id.localeCompare(b.employee_id),
            sortOrder: sortCtidOrder, // bind the state
            onHeaderCell: () => ({
                onClick: () => {
                if (sortCtidOrder === null) {
                    setSortCtidOrder('ascend');
                } else if (sortCtidOrder === 'ascend') {
                    setSortCtidOrder('descend');
                } else {
                    setSortCtidOrder(null);
                }
                }
            }),
            // sort
        }, 
        {
            title: 'Department',
            dataIndex: 'department_id',
            width: 140,
        }, 
        {
            title: 'Position',
            dataIndex: 'position',
            width: 140,
        }, 
        {
            title: 'Employment',
            dataIndex: 'employee_type',
            width: 105,
        }, 
        {
            title: () => (
                <div className="flex items-center gap-2">
                Entry Date
                <span className="text-gray-500 flex items-center gap-1">
                    {sortEntryDate === null && <DefaultSortIcon className="w-4 h-4" />}
                    {
                        sortEntryDate === 'ascend' && (
                            <>
                                <SortAsc className="w-4 h-4 text-gray-950" />
                            </>
                        )
                    }
                    {
                        sortEntryDate === 'descend' && (
                            <>
                                <SortDesc className="w-4 h-4 text-gray-950" />
                            </>
                        )
                    }
                </span>
                </div>
            ),
            dataIndex: 'employee_date',
            width: 105,
            sorter: (a, b) => new Date(a.employee_date) - new Date(b.employee_date),
            sortOrder: sortEntryDate, // bind the state
            onHeaderCell: () => ({
                onClick: () => {
                if (sortEntryDate === null) {
                    setSortEntryDate('ascend');
                } else if (sortEntryDate === 'ascend') {
                    setSortEntryDate('descend');
                } else {
                    setSortEntryDate(null);
                }
                }
            }),
        }, 
        {
            title: '',
            key: 'action',
            width: 100,
            align: 'center',
            fixed: 'right',
            render: (_, record) => {
                const items = [
                    {
                        key: '1',
                        label: (
                            <div onClick={() => openEmploymentDetails(record)}>
                                Update Employment
                            </div>
                        ),
                    },
                    {
                        key: '2',
                        label: (
                            <>
                                {
                                    record.status === 'suspended' ? (
                                        <span onClick={() => openRestoreDialog(record)}>
                                            Restore Account
                                        </span>
                                    ) : (
                                        <span onClick={() => openSuspendDialog(record)}>
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
                            <div onClick={() => openDeleteEmployee(record)}>
                                Delete
                            </div>
                        ),
                    },
                    {
                        key: '4',
                        label: (
                            <div onClick={() => openResetPwDialog(record)}>
                                Reset Login Password
                            </div>
                        ),
                    }
                ];

                return (
                    <div className="flex items-center justify-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Dropdown menu={{ items }} placement="bottomRight" arrow trigger={['click']}>
                            <div onClick={(e) => e.preventDefault()}>
                                <Button iconOnly variant="text" size="sm">
                                    <DotVerticalIcon />
                                </Button>
                            </div>
                        </Dropdown>
                    </div>
                )
            }
        }, 
    ];

    const directEmployeeDetails = (record) => {
        window.location.href = `/employee-details/${record.id}`;
    };

    const closePwResetedDialog = () => {
        setPwResetedDialog(false);
        setNewRespPw(null);
        setEmploymentDetails(null);
    }

    return (
        <>
            <Table 
                columns={columns}
                dataSource={isLoading ? [] : getEmployeeListing}
                loading={isLoading}
                pagination={{ 
                    position: ['bottomCenter'],
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '25', '50', '100'],
                    defaultPageSize: 10, 
                    showQuickJumper: false,
                    total: getEmployeeListing.length,
                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                }}
                rowKey="id"
                onRow={(record) => ({
                    onClick: () => directEmployeeDetails(record),
                })}
                scroll={{ x: 'max-content' }}
            />

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