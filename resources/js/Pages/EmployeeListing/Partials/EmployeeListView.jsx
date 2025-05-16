import Button from "@/Components/Button";
import { DefaultSortIcon, DotVerticalIcon, SortAsc, SortDesc, TagActiveIcon, TagInvitedIcon, TagSuspendedIcon } from "@/Components/Icon/Outline";
import { Table, Tag } from "antd";
import React, { useState } from "react";

export default function EmployeeListView({ getEmployeeListing, isLoading}) {

    const [sortOrder, setSortOrder] = useState(null); 

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
            render: (_, record) => (
                <div className="flex items-center justify-center gap-1">
                    <div>
                        <Button iconOnly variant="text" size="sm">
                            <DotVerticalIcon />
                        </Button>
                    </div>
                </div>
            )
        }, 
    ];

    const directEmployeeDetails = (record) => {
        window.location.href = `/employee-details/${record.id}`;
    };

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
        </>
    )
}