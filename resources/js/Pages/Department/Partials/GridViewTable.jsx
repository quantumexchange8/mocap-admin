import Button from "@/Components/Button";
import { GripVerticalIcon, PencilIcon, SiteMapIcon, TrashIcon, DepartmentIcon1, DepartmentIcon10, DepartmentIcon2, DepartmentIcon3, DepartmentIcon4, DepartmentIcon5, DepartmentIcon6, DepartmentIcon7, DepartmentIcon8, DepartmentIcon9, WarningIcon } from "@/Components/Icon/Outline";
import { Tooltip } from "antd";
import React, { useState } from "react";
import { motion } from 'framer-motion';
import Modal from "@/Components/Modal";
import { DeleteIllus } from "@/Components/Icon/Illustration";
import ConfirmDialog from "@/Components/ConfirmDialog";

export default function GridViewTable ({ getDepartment, isLoading, fetchDepartment }) {

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

    const editDepartment = (data) => {
        window.location.href = `/edit-department/${data.id}`
    }

    const deleteDepartmemt = (data) => {
        setDelVal(data);
        checkEmployee(data);
        
    }

    const closeDepartWarning = () => {
        setDelDepartWarningIsOpen(false);
        setDelVal(null);
    }

    const checkEmployee = async (data) => {
        // check is assign deparment to user
        try {
            
            const response = await axios.post('/validate-department', data);

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
                fetchDepartment();
                toast.success('Department has been deleted.', {
                    title: 'Department has been deleted.',
                    duration: 3000,
                    variant: 'variant1',
                });
            }

        } catch (error) {
            console.error('error', error);
        }
    }

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

    return (
        <>
            {
                getDepartment && (
                    <motion.div 
                        className="flex flex-col gap-5 xl:grid xl:grid-cols-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {
                            getDepartment.map((department, index) => {
                                const IconComponent = iconComponents[department.icon];

                                return (
                                    <motion.div 
                                        key={index} 
                                        variants={itemVariants}
                                        className="p-5 bg-white shadow-toast flex gap-3"
                                    >
                                        <div className="max-w-[100px] w-full h-[100px]">
                                            {
                                                department.department_image ? (
                                                    <img src={department.department_image} alt="department-image" />
                                                ) : (
                                                    IconComponent && (
                                                        <IconComponent color={department.color} className="w-full h-full" />
                                                    )
                                                )
                                            }
                                        </div>
                                        <div className="flex flex-col justify-between w-full">
                                            <div className="flex justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <div className="text-gray-950 text-base font-semibold">{department.name}</div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="text-gray-700 text-sm">{department.position_count} positions</div>
                                                        <div className="text-gray-400 text-sm">|</div>
                                                        <div className="text-gray-700 text-sm">{department.total_user_count} employees</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div>
                                                        <Tooltip title="Org Chart">
                                                            <div>
                                                                <Button iconOnly variant="text" size="sm" onClick={() => openOrganisChart(department)}><SiteMapIcon /></Button>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip title="Edit">
                                                            <div>
                                                                <Button iconOnly variant="text" size="sm" onClick={() => editDepartment(department)} ><PencilIcon /></Button>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip title="Delete">
                                                            <div>
                                                                <Button iconOnly variant="text" size="sm" onClick={() => deleteDepartmemt(department)} ><TrashIcon /></Button>
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
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div></div>
                                                <div className="text-gray-950 text-sm">
                                                    {department.headuser.username}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })
                        }
                    </motion.div>
                )
            }

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