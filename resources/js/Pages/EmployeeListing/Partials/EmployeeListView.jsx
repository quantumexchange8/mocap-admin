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

export default function EmployeeListView({ getEmployeeListing, fetchEmployee, isLoading}) {

    const [sortOrder, setSortOrder] = useState(null); 
    const [isOpenEmploymentDetail, setIsOpenEmploymentDetail] = useState(false);
    const [employmentDetails, setEmploymentDetails] = useState(null);
    const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
    const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
    const [isResetPwOpen, setIsResetPwOpen] = useState(false);
    const [pwVal, setPwVal] = useState('generate_by_system');
    const [inputPw, setInputPw] = useState('');
    const [showPassword, setShowPassword ] = useState(false);
    const [pwResetedDialog, setPwResetedDialog ] = useState(false);
    const [newRespPw , setNewRespPw ] = useState('');
    const [tooltipText, setTooltipText] = useState(null);
    const [isDeleteEmployeeOpen, setIsDeleteEmployeeOpen ] = useState(false);

    const requirements = {
        length: inputPw.length >= 8,
        uppercase: /[A-Z]/.test(inputPw),
        lowercase: /[a-z]/.test(inputPw),
        number: /\d/.test(inputPw),
        symbol: /[^A-Za-z0-9]/.test(inputPw),
    };

    const style = {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    }

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
                            <img src="https://p3-pc-sign.douyinpic.com/tos-cn-i-0813c001/oAfOa6PAAACEAugW6GDACmQZzIALKx9fWFAAGA~tplv-dy-aweme-images:q75.webp?biz_tag=aweme_images&from=327834062&lk3s=138a59ce&s=PackSourceEnum_SEARCH&sc=image&se=false&x-expires=1749913200&x-signature=8ldN187mrrYJJqeL%2BC%2FwLbAM%2Bmk%3D" alt="" className="rounded-full" />
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
            title: 'CTID',
            dataIndex: 'employee_id',
            // sort
        }, 
        {
            title: 'Department',
            dataIndex: 'department_id',
        }, 
        {
            title: 'Position',
            dataIndex: 'position',
        }, 
        {
            title: 'Employment',
            dataIndex: 'employee_type',
        }, 
        {
            title: 'Entry Date',
            dataIndex: 'employee_date',
        }, 
        {
            title: '',
            key: 'action',
            width: 100,
            align: 'center',
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
                        <Dropdown menu={{ items }} placement="bottomRight" arrow>
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

    const confirmSuspend = async () => {
        try {

            const response = await axios.post('/suspend-employee', employmentDetails);
            
            if (response.status === 200) {
                closeSuspendDialog();
                fetchEmployee();
                toast.success(`Account has been suspended.`, {
                    title: `Account has been suspended.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            }

        } catch (error) {
            console.error('error', error);
        }
    }

    const confirmRestoreEmployee = async () => {
        try {

            const response = await axios.post('/restore-employee', employmentDetails);
            
            if (response.status === 200) {
                closeRestoreDialog();
                fetchEmployee();
                toast.success(`Account restored successfully!`, {
                    title: `Account restored successfully!`,
                    duration: 3000,
                    variant: 'variant1',
                });
            }

        } catch (error) {
            console.error('error', error);
        }
    }

    const confirmResetPw = async () => {
        try {
            
            const response = await axios.post('/reset-employee-pw', {
                employmentDetails: employmentDetails,
                reset_type: pwVal,
                password: inputPw,
            });
            
            if (response.status === 200) {

                setIsResetPwOpen(false);
                setPwResetedDialog(true);
                setNewRespPw(response.data.password);

            }

        } catch (error) {
            console.error('error', error);
        }
    }

    const closePwResetedDialog = () => {
        setPwResetedDialog(true);
        setNewRespPw(null);
        setEmploymentDetails(null);
    }

    const handleCopy = (val) => {
        const textToCopy = val;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setTooltipText('Copied!');

            setTimeout(() => {
                setTooltipText(null);
            }, 3000);

        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }

    return (
        <>
            <Table 
                columns={columns}
                dataSource={isLoading ? [] : getEmployeeListing}
                loading={isLoading}
                pagination={false}
                rowKey="id"
                onRow={(record) => ({
                    onClick: () => directEmployeeDetails(record),
                })}
            />

            {
                employmentDetails && (
                    <>
                        <UpdateEmploymentDetails fetchEmployee={fetchEmployee} employmentDetails={employmentDetails} isOpenEmploymentDetail={isOpenEmploymentDetail} setIsOpenEmploymentDetail={setIsOpenEmploymentDetail} closeEmploymentDetails={closeEmploymentDetails}  />

                        <Modal
                            show={isSuspendDialogOpen}
                            maxWidth='lg'
                            title='Suspend Account'
                            onClose={closeSuspendDialog}
                            footer={
                                <div className="flex items-center justify-end gap-4 w-full">
                                    <Button variant="outlined" size="sm" onClick={closeSuspendDialog}>Cancel</Button>
                                    <Button size="sm" onClick={confirmSuspend}>Confirm</Button>
                                </div>
                            }
                        >
                            <div className="py-3 px-6 flex flex-col gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="max-w-12 min-w-12 w-full h-12 rounded-full">
                                        <img src="https://p3-pc-sign.douyinpic.com/tos-cn-i-0813c001/oAfOa6PAAACEAugW6GDACmQZzIALKx9fWFAAGA~tplv-dy-aweme-images:q75.webp?biz_tag=aweme_images&from=327834062&lk3s=138a59ce&s=PackSourceEnum_SEARCH&sc=image&se=false&x-expires=1749913200&x-signature=8ldN187mrrYJJqeL%2BC%2FwLbAM%2Bmk%3D" alt="" className="rounded-full w-12 h-12" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="text-gray-950 text-base font-semibold">{employmentDetails.name}</div>
                                        <div className="text-gray-500 text-sm">CTID: {employmentDetails.employee_id}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 py-5 px-4 bg-gray-100 rounded-sm">
                                    <div className="px-4">
                                        <ul class="list-outside list-disc marker:text-error-600 text-gray-700 text-sm flex flex-col gap-3">
                                            <li>The employee will lose access to the Motion Capture Mobile App.</li>
                                            <li>All data associated with the suspended employee will be retained, and their account status will be marked as “Suspended”.</li>
                                            <li>Suspended accounts can still receive announcements and project assignments from others.</li>
                                            <li>Suspended accounts can be restored as long as they have not been permanently deleted.</li>
                                            <li>The employee will not receive emails through their registered email address while their account is suspended. Any emails sent to this address will bounce back to the sender.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Modal>

                        <ConfirmDialog show={isRestoreDialogOpen}>
                            <div className="p-6 flex flex-col gap-8">
                                <div className="flex flex-col gap-2 items-center">
                                    <div className="text-gray-950 text-lg font-bold">
                                        Restore Account?
                                    </div>
                                    <div className="text-gray-700 text-sm text-center">
                                        Are you sure you want to restore account for <span className="font-semibold">{employmentDetails.name}</span>? Restoring will reactivate access and return the account to active status.
                                    </div>
                                </div>
                                <div className='flex items-center gap-4 justify-center'>
                                    <div><Button size='sm' variant='outlined' onClick={closeRestoreDialog}>Cancel</Button></div>
                                    <div><Button size='sm' onClick={confirmRestoreEmployee}>Confirm</Button></div>
                                </div>
                            </div>
                        </ConfirmDialog>

                        <Modal
                            show={isResetPwOpen}
                            maxWidth='md'
                            title='Reset Login Password'
                            onClose={closeResetPwDialog}
                            footer={
                                <div className="w-full flex justify-end gap-4">
                                    <Button size="sm" variant="outlined" onClick={closeResetPwDialog} >Cancel</Button>
                                    <Button size="sm" onClick={confirmResetPw} >Confirm</Button>
                                </div>
                            }
                        >
                            <div className="py-3 px-6 flex flex-col gap-8">
                                <div className="text-gray-700 text-sm">
                                    Please note that resetting the login password will take effect immediately by clicking “Confirm”. The current user session will be logged out, and the employee will be prompted to log in again using the new password.
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Radio.Group 
                                        value={pwVal}
                                        style={style}
                                        onChange={(e) => setPwVal(e.target.value)}
                                        options={[
                                            { value: 'generate_by_system', label: 'Generated password by system'},
                                            { value: 'manual_password', label: 'Set password manually'},
                                        ]}
                                    />
                                    {
                                        pwVal === 'manual_password' && (
                                            <div className="flex flex-col gap-2">
                                                <InputIconWrapper>
                                                    <TextInput 
                                                        id="password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="password"
                                                        value={inputPw}
                                                        className="w-full"
                                                        placeholder="Enter new password"
                                                        autoComplete="current-password"
                                                        onChange={(e) => setInputPw(e.target.value)}
                                                    />
                                                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? <EyeOn /> : <EyeOff /> }
                                                    </div>
                                                    
                                                </InputIconWrapper>
                                                <div className="text-gray-500 text-xs ">
                                                    Must be at least 8 characters containing uppercase letters, lowercase letters, numbers, and symbols.
                                                </div>
                                                {
                                                    inputPw && (
                                                        <div className="text-gray-500 text-xs space-y-1">
                                                            <div className={requirements.length ? 'text-green-600' : 'text-red-500'}>
                                                                {requirements.length ? '✔' : '✖'} At least 8 characters
                                                            </div>
                                                            <div className={requirements.uppercase ? 'text-green-600' : 'text-red-500'}>
                                                                {requirements.uppercase ? '✔' : '✖'} At least 1 uppercase letter
                                                            </div>
                                                            <div className={requirements.lowercase ? 'text-green-600' : 'text-red-500'}>
                                                                {requirements.lowercase ? '✔' : '✖'} At least 1 lowercase letter
                                                            </div>
                                                            <div className={requirements.number ? 'text-green-600' : 'text-red-500'}>
                                                                {requirements.number ? '✔' : '✖'} At least 1 number
                                                            </div>
                                                            <div className={requirements.symbol ? 'text-green-600' : 'text-red-500'}>
                                                                {requirements.symbol ? '✔' : '✖'} At least 1 symbol
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </Modal>

                        <Modal
                            show={pwResetedDialog}
                            maxWidth='md'
                            title={
                                <div className="flex items-center gap-3">
                                    <span>Password Set Successfully</span>
                                    <span><SuccessIcon /></span>
                                </div>
                            }
                            onClose={closePwResetedDialog}
                            showFooter='hidden'
                        >
                            <div className="pt-3 pb-6 px-6 flex flex-col gap-8">
                                <div className="text-gray-700 text-sm">
                                    You can copy the newly set password and share it directly with the employee or use the option to send an email notification to inform them about the password reset.
                                </div>
                                <div className="flex gap-5">
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Login Password' />
                                        <InputIconWrapper>
                                            <TextInput 
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={newRespPw}
                                                className="w-full"
                                                placeholder="Enter new password"
                                                autoComplete="current-password"
                                                onChange={(e) => setInputPw(e.target.value)}
                                                disabled
                                            />
                                            <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <EyeOn /> : <EyeOff /> }
                                            </div>
                                            
                                        </InputIconWrapper>
                                    </div>
                                    <div className="flex items-end">
                                        <Button size="md" onClick={() => handleCopy(newRespPw)}>
                                            {
                                                tooltipText ? tooltipText : 'Copy'
                                            }
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-[1px] bg-gray-200 w-full"></div>
                                    <div className="text-gray-500 text-xs min-w-[230px]">or send email notification to the employee.</div>
                                    <div className="h-[1px] bg-gray-200 w-full"></div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="flex flex-col gap-2 w-full">
                                        <div >
                                            <TextInput 
                                                id="email"
                                                type='email'
                                                name="email"
                                                value={employmentDetails.email}
                                                className="w-full"
                                                placeholder="Enter new password"
                                                autoComplete="current-password"
                                                onChange={(e) => setInputPw(e.target.value)}
                                                disabled
                                            />
                                        </div>
                                        <div className="text-gray-500 text-xs">Please ensure the email address is valid.</div>
                                    </div>
                                    <div className="flex">
                                        <Button size="md">Send</Button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        {
                            isDeleteEmployeeOpen && (
                                <DeleteEmployee fetchEmployee={fetchEmployee} employmentDetails={employmentDetails} isDeleteEmployeeOpen={isDeleteEmployeeOpen} setIsDeleteEmployeeOpen={setIsDeleteEmployeeOpen} closeDeleteEmployee={closeDeleteEmployee}  />
                            )
                        }
                    </>
                )
            }
        </>
    )
}