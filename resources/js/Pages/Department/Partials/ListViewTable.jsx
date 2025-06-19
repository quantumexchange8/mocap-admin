import Button from "@/Components/Button";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { DeleteIllus } from "@/Components/Icon/Illustration";
import { GripVerticalIcon, PencilIcon, SiteMapIcon, TrashIcon, WarningIcon, DepartmentIcon1, DepartmentIcon10, DepartmentIcon2, DepartmentIcon3, DepartmentIcon4, DepartmentIcon5, DepartmentIcon6, DepartmentIcon7, DepartmentIcon8, DepartmentIcon9 } from "@/Components/Icon/Outline";
import Modal from "@/Components/Modal";
import { Table, Tooltip } from "antd";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from 'framer-motion';

export default function ListViewTable ({ getDepartment, isLoading }) {

    const iconComponents = {
        icon1: DepartmentIcon1,
        icon2: DepartmentIcon2,
        icon3: DepartmentIcon3,
        icon4: DepartmentIcon4,
        icon5: DepartmentIcon5,
        icon6: DepartmentIcon6,
        icon7: DepartmentIcon7,
        icon8: DepartmentIcon8,
        icon9: DepartmentIcon9,
        icon10: DepartmentIcon10,
    };
    
    const [orgChartIsOpen, setOrgChartIsOpen] = useState(false);
    const [orgVal, setOrgVal] = useState(null);
    const [delDepartIsOpen, setDelDepartIsOpen] = useState(false);
    const [delVal, setDelVal] = useState(null);
    const [delDepartWarningIsOpen, setDelDepartWarningIsOpen] = useState(false);

    const openOrganisChart = (data) => {
        setOrgChartIsOpen(true);
        setOrgVal(data);
    }

    const closeOrganisChart = () => {
        setOrgChartIsOpen(false);
        setOrgVal(null);
    }

    const editDepartment = (record) => {
        window.location.href = `/edit-department/${record.id}`
    }

    const deleteDepartmemt = (record) => {
        setDelVal(record);
        checkEmployee(record);
        
    }

    const closeDepartWarning = () => {
        setDelDepartWarningIsOpen(false);
        setDelVal(null);
    }

    const checkEmployee = async (record) => {
        // check is assign deparment to user
        try {
            
            const response = await axios.post('/validate-department', record);

            if (response.data.value === 'no') {
                // confirm dialog
                setDelDepartIsOpen(true);
            } else {
                // show message dialog
                setDelDepartWarningIsOpen(true);
            }

        } catch (error) {
            console.error('error', error);
        }
    }

    const cancelDeleteDepartment = () => {
        setDelDepartIsOpen(false);
    }

    const confirmDelete = async () => {
        try {
            
            const response = await axios.post('/delete-department', delVal);

            if (response.status === 200) {
                cancelDeleteDepartment();
                toast.success('Department has been deleted.', {
                    title: 'Department has been deleted.',
                    duration: 3000,
                    variant: 'variant1',
                });
            }

        } catch (error) {
            console.error('error', error);
            cancelDeleteDepartment();
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (_, record) => {
                const IconComponent = iconComponents[record.icon];

                return (
                    <div className="flex items-center gap-3">
                        <div className="rounded-full">
                            {/* icon */}
                            {IconComponent && <IconComponent color={record.color} className="w-6 h-6 rounded-full" />}
                        </div>
                        <div>
                            {record.name}
                        </div>
                    </div>
                )
            }
        },
        {
            title: 'Head of Department',
            dataIndex: 'headuser',
            render: (headuser) => headuser?.username || '-'
        },
        {
            title: 'Total Position',
            dataIndex: 'position_count'
        },
        {
            title: 'Size',
            dataIndex: 'total_user_count'
        },
        {
            title: '',
            key: 'action',
            width: 300,
            align: 'center',
            render: (_, record) => (
                <div className="flex items-center justify-center gap-1">
                    <div>
                        <Tooltip title="Org Chart">
                            <div>
                                <Button iconOnly variant="text" size="sm" onClick={() => openOrganisChart(record)}><SiteMapIcon /></Button>
                            </div>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip title="Edit">
                            <div>
                                <Button iconOnly variant="text" size="sm" onClick={() => editDepartment(record)} ><PencilIcon /></Button>
                            </div>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip title="Delete">
                            <div>
                                <Button iconOnly variant="text" size="sm" onClick={() => deleteDepartmemt(record)} ><TrashIcon /></Button>
                            </div>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip title="Move">
                            <div>
                                <Button iconOnly variant="text" size="sm" className=" cursor-move"><GripVerticalIcon /></Button>
                            </div>
                        </Tooltip>
                    </div>
                </div>
            )
        }
    ];

    return (
        <>
            <Table 
                columns={columns}
                dataSource={isLoading ? [] : getDepartment}
                loading={isLoading}
                pagination={false}
                rowKey="id"
                
            />
            <Modal
                show={orgChartIsOpen}
                maxWidth='lg'
                title='Organisation Chart'
                onClose={closeOrganisChart}
            >
                <div className="py-3 px-6">
                    Coming soon...
                </div>
            </Modal>

            <Modal
                show={delDepartWarningIsOpen}
                maxWidth='sm'
                title='Delete Department'
                onClose={closeDepartWarning}
                footer={
                    <div className="flex justify-end w-full" onClick={closeDepartWarning}>
                        <Button size="sm">
                            Alright
                        </Button>
                    </div>
                }
            >
                <div className="flex items-center gap-4 py-3 px-6">
                    <div>
                        <WarningIcon />
                    </div>
                    <div className="text-gray-700 text-sm">
                        All employees must be removed before deleting the department.
                    </div>
                </div>
            </Modal>

            <ConfirmDialog show={delDepartIsOpen}>
                <div className='flex flex-col gap-8 p-6'>
                    <div className="flex flex-col items-center gap-3">
                        <div>
                            <DeleteIllus />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-gray-950 text-lg font-bold">Delete Department</div>
                            <div className="text-gray-700 text-sm text-center">
                                Are you sure you want to delete this department? All associated data will be permanently removed. This action cannot be undone.
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 justify-center'>
                        <div><Button size='sm' variant='outlined' onClick={cancelDeleteDepartment}>Cancel</Button></div>
                        <div><Button size='sm' variant='danger' onClick={confirmDelete}>Yes, Delete</Button></div>
                    </div>
                </div>
            </ConfirmDialog>
        </>
    )
}