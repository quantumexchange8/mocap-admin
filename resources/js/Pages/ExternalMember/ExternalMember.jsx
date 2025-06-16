import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link , usePage } from "@inertiajs/react";
import React, { useEffect, useState} from "react";
import { Checkbox, DatePicker, Dropdown, Popover, Select, Table, Tag, Tooltip } from "antd";
import { NoRecordIllus } from "@/Components/Icon/Illustration";
import Button from "@/Components/Button";
import SearchInput from "@/Components/SearchInput";
import { formatDate, formatDateTime } from "@/Composables";
import { PlusIcon, ClearIcon, ColumnIcon, DatePickerIcon, DefaultSortIcon, FilterIcon, SearchIcon, SortAsc, SortDesc, XIcon, DotVerticalIcon, TagActiveIcon, TagInvitedIcon, TagSuspendedIcon, LogoIcon } from "@/Components/Icon/Outline";
import AddNewMember from './Partials/AddNewMember'
import MemberDetails from './Partials/MemberDetails'
import { MaleAvatar } from "@/Components/Icon/ProfilePhoto";
import SuspendMemberAcc from "./Partials/SuspendMemberAcc";
import RestoreMemberAcc from "./Partials/RestoreMemberAcc";
import DeleteMember from "./Partials/DeleteMember";
import ResetMemberPass from "./Partials/ResetMemberPass";

export default function ExternalMember(member) {

    const [isNewMemberOpen, setNewMemberOpen] = useState(false);
    const [isMemberDetailsOpen, setMemberDetailsOpen] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [getExternalMembers, setGetExternalMembers] = useState([]);
    const [sortOrder, setSortOrder] = useState(null); 
    const [submissionSort, setSubmissionSort] = useState(null); // submission date sort
    const [filterStatus, setFilterStatus] = useState(null); 
    const [filterActive, setFilterActive] = useState(null); 
    const [filterJoinedDate, setFilterJoinedDate] = useState(null); 
    const [visibleColumns, setVisibleColumns] = useState([
            'member',
            'status',
            'employee_id',
            'invited_by',
            'joined_date',
            'last_active',
            'remarks',
        ]);
    const [memberSelected, setMemberSelected] = useState(null);
    const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
    const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
    const [isResetPwOpen, setIsResetPwOpen] = useState(false);
    const [pwResetedDialog, setPwResetedDialog ] = useState(false);
    const [isDeleteMemberOpen, setIsDeleteMemberOpen ] = useState(false);
    const [newRespPw , setNewRespPw ] = useState('');

    const columnOptions = [
        { label: 'Member', value: 'member' },
        { label: 'Status', value: 'status' },
        { label: 'CTID', value: 'employee_id' },
        { label: 'Invited By', value: 'invited_by' },
        { label: 'Joined Date', value: 'joined_date' },
        { label: 'Last Active', value: 'last_active' },
        { label: 'Remark', value: 'remarks' },
    ];
    const fetchExternalMember = async () => {
        setIsLoading(true);

        const hasFilter = filterJoinedDate || (filterActive && filterActive.length > 0) || (filterStatus && filterStatus.length > 0);

        if (hasFilter) {
            setIsLoading(true);
        }

        try {
            
            const response = await axios.get('/getExternalMembers', {
                params: {
                    joined_date: filterJoinedDate,
                    status: filterStatus,
                    last_active: filterActive 
                }
            });

            setGetExternalMembers(response.data);

        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchExternalMember();
    }, [filterJoinedDate, filterStatus, filterActive]);

    const filterExternalMember = getExternalMembers.filter((externalMember) =>
        externalMember.username.toLowerCase().includes(searchFilter.toLowerCase())
    );
      
    const onChange = (date, dateString) => {
        setFilterJoinedDate(dateString);
    };

    const columns = [
        {
            title: () => (
                <div className="flex items-center gap-2">
                Member
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
            key: 'member',
            dataIndex: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
            sortOrder,
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
                                    <img src={record.profile_image} alt="" className="rounded-full" />
                                ) : (
                                    <div>
                                        <MaleAvatar className="rounded-full w-8 h-8" />
                                    </div>
                                )
                            }
                        </div>
                        <div className="flex flex-col">
                            <div className="text-gray-950 font-medium text-sm max-w-[100px] truncate">{record.username}</div>
                            <div className="text-xs text-gray-500 max-w-[180px] truncate">{record.email}</div>
                        </div>
                    </div>
                )
            },
            ellipsis: true,
        }, 
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            width: 121,
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
            key: 'employee_id',
            dataIndex: 'employee_id',
            width: 121,
            // sort
        },
        {
            title: 'Invited By',
            key: 'invited_by',
            dataIndex: 'invited_by',
            width: 121,
             render: (_, record) => {
                return (
                    <div className="flex py-3 items-center gap-2">
                        <div className="w-6 h-6">{record.handle_by?.profile_image || <LogoIcon/> }</div>
                        {record.handle_by?.name}
                    </div>
                )
            },
        },
        {
            title: 'Joined Date',
            key: 'joined_date',
            dataIndex: 'employee_date',
            width: 121,
            // sort
        }, {
            title: () => (
                <div className="flex items-center gap-2">
                Last Active
                <span className="text-gray-500 flex items-center gap-1">
                    {submissionSort === null && <DefaultSortIcon className="w-4 h-4" />}
                    {
                        submissionSort === 'ascend' && (
                            <>
                                <SortAsc className="w-4 h-4 text-gray-950" />
                            </>
                        )
                    }
                    {
                        submissionSort === 'descend' && (
                            <>
                                <SortDesc className="w-4 h-4 text-gray-950" />
                            </>
                        )
                    }
                </span>
                </div>
            ),
            key: 'last_active',
            dataIndex: 'last_active',
            sorter: (a, b) => new Date(a.last_active) - new Date(b.last_active),
            sortOrder: submissionSort,
            width: 121,
            onHeaderCell: () => ({
                onClick: () => {
                if (submissionSort === null) {
                    setSubmissionSort('ascend');
                } else if (submissionSort === 'ascend') {
                    setSubmissionSort('descend');
                } else {
                    setSubmissionSort(null);
                }
                }
            }),
            render: (_, record) => {
                return (
                    <div className="flex flex-col">
                        {record.last_active ? formatDate(record.last_active) : '-'}
                    </div>
                )
            },
        },{
            title: 'Remark',
            key: 'remarks',
            dataIndex: 'remarks',
            width: 121,
            render: (_, record) => {
                return (
                    <div className="flex flex-col">
                        {record.remarks ? record.remarks : '-'}
                    </div>
                )
            },
        }, {
            title: '',
            key: 'action',
            width: 80,
            align: 'center',
            fixed: 'right',
            render: (_, record) => {
                const items = [
                    {
                        key: '1',
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
                        key: '2',
                        label: (
                            <div onClick={() => openDeleteMember(record)}>
                                Delete
                            </div>
                        ),
                    },
                    {
                        key: '3',
                        label: (
                            <div onClick={() => openResetPwDialog(record)}>
                                Reset Login Password
                            </div>
                        ),
                    },
                ]
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

    const clearFilter = () => {
        setSearchFilter('');
    }

    const getActiveFilterCount = () => {
        let count = 0;
    
        if (filterJoinedDate) count += 1;
        if (filterStatus?.includes('active')) count += 1;
        if (filterStatus?.includes('invited')) count += 1;
        if (filterStatus?.includes('suspended')) count += 1;
        if (filterActive?.includes('7days')) count += 1;
        if (filterActive?.includes('30days')) count += 1;
        if (filterActive?.includes('90days')) count += 1;

        return count;
    };

    const clearAllFilter = () => {
        setFilterStatus(null);
        setFilterActive(null);
        setFilterJoinedDate(null);
    }

    const filteredColumns = columns.filter(col => col.key === 'action' || visibleColumns.includes(col.key));

    const handleNewMemberClose = (data) => {
        setMemberSelected(data)
        setNewMemberOpen(false);
    }

    const handleMemberDetailsClose = () => {
        setMemberDetailsOpen(false);
        setMemberSelected(null)
    }

    // restore account
    const openRestoreDialog = (data) => {
        setMemberSelected(data);
        setIsRestoreDialogOpen(true);
    }
    const closeRestoreDialog = () => {
        setIsRestoreDialogOpen(false);
        setMemberSelected(null);
    }

    // suspend account
    const openSuspendDialog = (data) => {
        setMemberSelected(data)
        setIsSuspendDialogOpen(true);
    }
    const closeSuspendDialog = () => {
        setIsSuspendDialogOpen(false);
        setMemberSelected(null);
    }

    // reset pw
    const openResetPwDialog = (data) => {
        setMemberSelected(data);
        setIsResetPwOpen(true);

    }
    const closeResetPwDialog = () => {
        setIsResetPwOpen(false);
        setMemberSelected(null);
    }

    const closePwResetedDialog = () => {
        setPwResetedDialog(false);
        setNewRespPw(null);
        setMemberSelected(null);
    }

    // delete employee
    const openDeleteMember = (data) => {
        setMemberSelected(data);
        setIsDeleteMemberOpen(true)
    }

    const closeDeleteMember = () => {
        setIsDeleteMemberOpen(false);
        setMemberSelected(null);
    }

    return(
        <AuthenticatedLayout header="External Members">
            <Head title="External Members" />
        
            <div className="flex w-full flex-col px-5 pt-5 pb-12 items-center gap-5">
                <div className="flex justify-between items-center self-stretch">
                    <div>
                    <Popover
                        content={
                            <div className="flex flex-col gap-4">
                                {
                                    columnOptions.map((opt) => {
                                        const isMember = opt.value === 'member'; // or the correct `dataIndex` key
                                        const isChecked = visibleColumns.includes(opt.value);

                                        return (
                                            <Checkbox
                                                key={opt.value}
                                                value={opt.value}
                                                checked={isChecked}
                                                disabled={isMember}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;

                                                    setVisibleColumns((prev) => {
                                                        if (checked) {
                                                            return [...prev, opt.value];
                                                        } else {
                                                            return prev.filter((val) => val !== opt.value);
                                                        }
                                                    });
                                                }}
                                            >
                                                {opt.label}
                                            </Checkbox>
                                        );
                                    })
                                }
                            </div>
                        }
                        placement="bottomLeft"
                        trigger="click"
                    >
                        <div>
                            <Button variant="outlined" size="sm" className="flex items-center gap-2">
                                <ColumnIcon />
                                Columns
                            </Button>
                        </div>
                    </Popover>
                    </div>
                    <div className="flex justify-center items-center gap-3">
                        {/* Filter */}
                        <div>
                            <Popover content={
                                <div className="flex flex-col max-w-[208px] w-[208px] ">
                                    <div className="pt-4 pb-8 flex flex-col gap-8">
                                        <div className="flex flex-col gap-2">
                                            <div className="text-gray-950 font-bold text-xs">Filter by Status</div>
                                            <Checkbox.Group 
                                                options={[
                                                    { label: 'Active', value: 'active' },
                                                    { label: 'Invited', value: 'invited' },
                                                    { label: 'Suspended', value: 'suspended' },
                                                ]}
                                                value={filterStatus}
                                                onChange={(checkedValues) => setFilterStatus(checkedValues)}
                                                className="flex flex-col gap-4 text-sm text-gray-950"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="text-gray-950 font-bold text-xs">Filter by Joined Date</div>
                                            <DatePicker
                                                onChange={onChange}
                                                className="w-full py-3 px-4"
                                                renderExtraFooter={() => null}
                                                superNextIcon={false}
                                                superPrevIcon={false}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="text-gray-950 font-bold text-xs">Filter by Last Active</div>
                                            <Checkbox.Group 
                                                options={[
                                                    { label: 'Inactive for 7 days', value: '7days' },
                                                    { label: 'Inactive for 30 days or more', value: '30days' },
                                                    { label: 'Inactive for over 90 days', value: '90days' },
                                                ]}
                                                value={filterActive}
                                                onChange={(checkedValues) => setFilterActive(checkedValues)}
                                                className="flex flex-col gap-4 text-sm text-gray-950"
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-4 w-full border-t border-gray-200">
                                        <Button size="sm" variant="outlined-danger" className="w-full flex justify-center" onClick={clearAllFilter}>
                                            Clear All
                                        </Button>
                                    </div>
                                </div>
                            } placement="bottomRight" trigger="click" >
                                <div>
                                    <Button variant="outlined" size="sm" className="flex items-center gap-2">
                                        <div><FilterIcon /></div>
                                        <div className="text-gray-950 text-sm">Filter</div>
                                        <div className="px-1 text-white text-xs bg-gray-950 rounded-sm flex items-center justify-center h-full">
                                            {getActiveFilterCount()}
                                        </div>
                                    </Button>
                                </div>
                            </Popover>
                            
                        </div>
                        <div>
                            <SearchInput 
                                withIcon
                                IconComponent={SearchIcon}
                                placeholder='Search'
                                value={searchFilter}
                                onChange={(e) => setSearchFilter(e.target.value)}
                                dataValue={searchFilter != ''}
                                clearfunc={
                                    <div className="absolute inset-y-0 right-4 flex items-center text-gray-500 cursor-pointer" onClick={clearFilter}>
                                        <XIcon className="w-4 h-4" />
                                    </div>
                                }
                            />
                        </div>
                        <div>
                            <Button className="flex items-center gap-2" size="sm" onClick={()=>setNewMemberOpen(true)}>
                                <PlusIcon />
                                <span>New Member</span>
                            </Button>
                        </div>
                    </div>
                </div>
                    <Table 
                        columns={filteredColumns}
                        dataSource={isLoading ? [] : filterExternalMember}
                        loading={isLoading}
                        pagination={{ 
                            position: ['bottomCenter'],
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '25', '50', '100'],
                            defaultPageSize: 10, 
                            showQuickJumper: false,
                            total: filterExternalMember.length,
                            showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        }}
                        rowKey="id"
                        onRow={(record) => ({
                            onClick: () => {
                                setMemberDetailsOpen(true);
                                setMemberSelected(record);  
                            }                   
                            })}
                        scroll={{  y: '65vh' }}
                        locale={{
                        emptyText: (
                                <div className="flex flex-col justify-center items-center gap-3 text-center py-20 text-gray-400">
                                    <div><NoRecordIllus /></div>
                                    <div className="text-gray-950 text-base font-bold">No External Members Added Yet</div>
                                    <div className="text-gray-700 text-sm">No external members have been added yet. Start by inviting or adding members to collaborate effectively.</div>
                                    <Button size="sm"  onClick={()=>setNewMemberOpen(true)}>Add External Member</Button>
                                </div>
                            ),
                        }}
                    />
            </div>
           
            <AddNewMember
                show={isNewMemberOpen}
                onClose={handleNewMemberClose}
            />

            {
                isMemberDetailsOpen ? (
                    <div>
                        <MemberDetails
                            show={isMemberDetailsOpen}
                            onClose={handleMemberDetailsClose}
                            member={memberSelected}
                            fetchExternalMember={fetchExternalMember}
                        />
                    </div>
                ) : null
            }   

            <SuspendMemberAcc
                member={memberSelected}
                fetchExternalMember={fetchExternalMember}
                isSuspendDialogOpen={isSuspendDialogOpen} 
                setIsSuspendDialogOpen={setIsSuspendDialogOpen} 
                closeSuspendDialog={closeSuspendDialog} 
            />

            <RestoreMemberAcc
                member={memberSelected}
                fetchExternalMember={fetchExternalMember}
                isRestoreDialogOpen={isRestoreDialogOpen}
                setIsRestoreDialogOpen={setIsRestoreDialogOpen}
                closeRestoreDialog={closeRestoreDialog}
            />

            <DeleteMember
                member={memberSelected}
                fetchExternalMember={fetchExternalMember}
                isDeleteMemberOpen={isDeleteMemberOpen}
                setIsDeleteMemberOpen={setIsDeleteMemberOpen}
                closeDeleteMember={closeDeleteMember}
            />

            <ResetMemberPass
                member={memberSelected}
                fetchExternalMember={fetchExternalMember}
                isResetPwOpen={isResetPwOpen}
                setIsResetPwOpen={setIsResetPwOpen} 
                closeResetPwDialog={closeResetPwDialog} 
                closePwResetedDialog={closePwResetedDialog} 
                pwResetedDialog={pwResetedDialog} 
                setPwResetedDialog={setPwResetedDialog} 
                newRespPw={newRespPw}
                setNewRespPw={setNewRespPw}
            />

        </AuthenticatedLayout>
            
    )
}
