import Button from "@/Components/Button";
import { Dashboard, DotVerticalIcon, PlusIcon, SearchIcon, XIcon } from "@/Components/Icon/Outline";
import SearchInput from "@/Components/SearchInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DepartmentIllus } from "@/Components/Icon/Illustration";
import { Dropdown, Switch, Table, Tag } from "antd";
import Modal from "@/Components/Modal";
import Permission from "./Partials/Permission";
import InputLabel from "@/Components/InputLabel";
import NewAdministrator from "./Partials/NewAdministrator";
import AdminTitle from "./Partials/AdminTitle";
import RemoveAdmin from "./Partials/RemoveAdmin";

export default function administrators() {

    const [searchFilter, setSearchFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [getAdmin, setGetAdmin] = useState([]);
    const [getEmployees, setGetEmployees] = useState([]);
    const [selectedRowDetail, setSelectedRowDetail] = useState(null);
    const [isPermissionOpen, setIsPermissionOpen] = useState(false);
    const [isNewAdminOpen, setIsNewAdminOpen] = useState(false);
    const [isAdminTitleOpen, setIsAdminTitleOpen] = useState(false);
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);

    const fetchAdministrator = async () => {
        setIsLoading(true);
        try {
            
            const response = await axios.get('/getAdministrator');

            setGetAdmin(response.data.admins);
            setGetEmployees(response.data.employees)

        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAdministrator();
    }, []);

    const clearFilter = () => {
        setSearchFilter('');
    }

    const openNewAdmin = () => {
        setIsNewAdminOpen(true);
    }
    const closeNewAdmin = () => {
        setIsNewAdminOpen(false);
    }

    const openPermission = (record) => {
        setIsPermissionOpen(true);
        setSelectedRowDetail(record);
    }

    const closePermission = () => {
        setIsPermissionOpen(false);
        setSelectedRowDetail(null);
    }

    const openTitle = (record) => {
        setIsAdminTitleOpen(true);
        setSelectedRowDetail(record);
    }

    const closeTitle = () => {
        setIsAdminTitleOpen(false);
        setSelectedRowDetail(null);
    }

    const openConfirmRemove = (record) => {
        setIsRemoveOpen(true)
        setSelectedRowDetail(record);
    }
    const closeConfirmRemove = () => {
        setIsRemoveOpen(false);
        setSelectedRowDetail(null);
    }

    const columns = [
        {
            title: 'Administrator',
            dataIndex: 'name',
            render: (_, record) => {

                return (
                    <div className="flex items-center gap-3">
                        <div className="rounded-full">
                            <img src="" alt="" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-950 font-medium">{record.name}</span>
                            <span className="text-xs text-gray-500">{record.email}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            title: 'System Role',
            dataIndex: 'role',
            render: (_, record) => {

                return (
                    <div className="flex">
                        {
                            record.role === 'superadmin' && (
                                <Tag bordered={false} color="success" className='ant-tag-success text-xs font-medium py-1 px-2 flex items-center gap-1'>
                                    <span>Primary Administrator</span>
                                </Tag>
                            )
                        }
                        {
                            record.role === 'admin' && (
                                <Tag bordered={false} color="info" className='ant-tag-info text-xs font-medium py-1 px-2 flex items-center gap-1'>
                                    <span>Employee</span>
                                </Tag>
                            )
                        }
                        {
                            record.role === 'external' && (
                                <Tag bordered={false} color="others" className='ant-tag-others text-xs font-medium py-1 px-2 flex items-center gap-1'>
                                    <span>External Member</span>
                                </Tag>
                            )
                        }
                    </div>
                )
            }
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: 105,
            // sort
        }, 
        {
            title: 'Scope of Permissions',
            dataIndex: 'permission',
            width: 177,
            render: (_, record) => {

                return (
                    <div>
                        {
                            record.permissions.length === 21 || record.roles[0].name === 'superadmin' ? (
                                <div>
                                    All permissions
                                </div>
                            ) : (
                                <div>
                                    Limited
                                </div>
                            )
                        }
                    </div>
                )
            }
        }, 
        {
            title: 'Last Active',
            dataIndex: 'permission',
            width: 105,
        }, 
        {
            title: '',
            dataIndex: '',
            key: 'action',
            width: 100,
            align: 'center',
            fixed: 'right',
            render: (_, record) => {

                const items = [
                    {
                        key: '1',
                        label: (
                            <>
                                {
                                    record.role === 'superadmin' ? (
                                        <div className="cursor-not-allowed">
                                            Permissions
                                        </div>
                                    ) : (
                                        <div onClick={() => openPermission(record)}>
                                            Permissions
                                        </div>
                                    )
                                }
                            </>
                        ),
                    },
                    {
                        key: '2',
                        label: (
                            <>
                                {
                                    record.role === 'superadmin' ? (
                                        <div className="cursor-not-allowed">
                                            Change Title
                                        </div>
                                    ) : (
                                        <div onClick={() => openTitle(record)}>
                                            Change Title
                                        </div>
                                    )
                                }
                            </>
                        ),
                    },
                    {
                        key: '3',
                        label: (
                            <>
                                {
                                    record.role === 'superadmin' ? (
                                        <div className="cursor-not-allowed">
                                            Remove
                                        </div>
                                    ) : (
                                        <div onClick={() => openConfirmRemove(record)}>
                                            Remove
                                        </div>
                                    )
                                }
                            </>
                        ),
                    },
                ];

                return (
                    <div
                        className="flex items-center justify-center gap-1"
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

    return (
        <AuthenticatedLayout
            header="Administrators"
        >
            <Head title="Administrators" />

            <div className="p-5 flex flex-col gap-5">
                <div className="flex justify-end gap-3">
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
                        <Button size="sm" className="flex items-center gap-2" onClick={openNewAdmin}>
                            <PlusIcon />
                            <span>New Administrator</span>
                        </Button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {
                        isLoading ? (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="min-h-[50vh] flex items-center justify-center"
                            >
                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {
                                    getAdmin.length > 0 ? (
                                        <div>
                                            <Table 
                                                columns={columns}
                                                dataSource={isLoading ? [] : getAdmin}
                                                loading={isLoading}
                                                rowKey="id"
                                                pagination={{ 
                                                    position: ['bottomCenter'],
                                                    showSizeChanger: true,
                                                    pageSizeOptions: ['10', '25', '50', '100'],
                                                    defaultPageSize: 10, 
                                                    showQuickJumper: false,
                                                    total: getAdmin.length,
                                                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="py-5 px-[200px] min-h-[70vh] flex flex-col items-center justify-center gap-3">
                                            <div>
                                                <DepartmentIllus />
                                            </div>
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="text-gray-950 text-base font-bold">No Administrator Assigned Yet</div>
                                                <div className="text-gray-700 text-sm">It looks like no administrators have been added. Get started by assigning a secretary to assist with administrative tasks.</div>
                                            </div>
                                            <div> 
                                                {/* Open dialog create admin */}
                                                <Button size="sm" >Add Administrator</Button>
                                            </div>
                                        </div>
                                    )
                                }
                            </motion.div>
                        )
                    }
                </AnimatePresence>
                
            </div>

            {/* New Administrator */}
            <NewAdministrator 
                fetchAdministrator={fetchAdministrator}
                isNewAdminOpen={isNewAdminOpen}
                setIsNewAdminOpen={setIsNewAdminOpen}
                closeNewAdmin={closeNewAdmin}
                getEmployees={getEmployees}
            />

            {/* Permission */}
            <Permission
                fetchAdministrator={fetchAdministrator}
                closePermission={closePermission}
                selectedRowDetail={selectedRowDetail}
                isPermissionOpen={isPermissionOpen}
                setIsPermissionOpen={setIsPermissionOpen}
            />

            {/* Change Title */}
            <AdminTitle 
                isAdminTitleOpen={isAdminTitleOpen}
                setIsAdminTitleOpen={setIsAdminTitleOpen}
                closeTitle={closeTitle}
                selectedRowDetail={selectedRowDetail}
                fetchAdministrator={fetchAdministrator}
            />
            
            {/* Remove Admin */}
            <RemoveAdmin 
                isRemoveOpen={isRemoveOpen}
                setIsRemoveOpen={setIsRemoveOpen}
                closeConfirmRemove={closeConfirmRemove}
                selectedRowDetail={selectedRowDetail}
                fetchAdministrator={fetchAdministrator}
            />

        </AuthenticatedLayout>
    )
}