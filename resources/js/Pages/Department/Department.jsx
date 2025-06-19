import Button from "@/Components/Button";
import { DepartmentIllus } from "@/Components/Icon/Illustration";
import { GridViewIcon, ListViewIcon, PlusIcon, SearchIcon, XIcon } from "@/Components/Icon/Outline";
import SearchInput from "@/Components/SearchInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Segmented, Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ListViewTable from "./Partials/ListViewTable";
import GridViewTable from "./Partials/GridViewTable";
import { AnimatePresence, motion } from "framer-motion";


export default function Department() {

    const [getDepartment, setGetDepartment] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');
    const [viewType, setViewType] = useState('list');

    const tabOptions = [
        {
          label: <ListViewIcon />, // Icon for list
          value: 'list',
        },
        {
          label: <GridViewIcon />, // Icon for grid
          value: 'grid',
        },
    ];

    const fetchDepartment = async () => {
        setIsLoading(true);
        try {
            
            const response = await axios.get('/getDepartmentListing');

            setGetDepartment(response.data);

        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchDepartment();
    }, []);

    const filteredDepartments = getDepartment.filter((department) =>
        department.name.toLowerCase().includes(searchFilter.toLowerCase())
    );

    const clearFilter = () => {
        setSearchFilter('');
    }

    return (
        <AuthenticatedLayout header="Departments">

            <Head title="Departments" />

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
                                getDepartment.length > 0 ? (
                                    // your department list
                                    <div className="flex flex-col gap-5 p-5">
                                        <div className="flex justify-between">
                                            <div>
                                                <Segmented
                                                    value={viewType}
                                                    onChange={setViewType}
                                                    options={tabOptions}
                                                >
                                                </Segmented>
                                            </div>
                                            <div className="flex items-center gap-3">
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
                                                    <Link href={route('create-department')}>
                                                        <Button className="flex items-center gap-2" size="sm">
                                                            <PlusIcon />
                                                            <span>New Department</span>
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                viewType === 'list' && (
                                                    <ListViewTable getDepartment={filteredDepartments} isLoading={isLoading} fetchDepartment={fetchDepartment} />
                                                )
                                            }
                                            {
                                                viewType === 'grid' && (
                                                    <GridViewTable getDepartment={filteredDepartments} isLoading={isLoading} fetchDepartment={fetchDepartment} />
                                                )
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    // fallback for no data
                                    <div className="py-10 px-[200px] min-h-[90vh] flex flex-col items-center justify-center gap-3">
                                        <div>
                                            <DepartmentIllus />
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="text-gray-950 text-base font-bold">Oops! No Departments Here Yet</div>
                                            <div className="text-gray-700 text-sm">Seems like no departments have been added yet. Add a new department to see them listed here.</div>
                                        </div>
                                        <div>
                                            <Link href={route('create-department')}>
                                                <Button size="sm" >Add Department</Button>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        </motion.div>
                    )
                }
            </AnimatePresence>
            
        </AuthenticatedLayout>
    )
}