import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DepartmentIllus } from "@/Components/Icon/Illustration";
import { Segmented } from "antd";
import { GridViewIcon, ListViewIcon, XIcon, SearchIcon } from "@/Components/Icon/Outline";
import SearchInput from "@/Components/SearchInput";
import EmployeeListView from "./Partials/EmployeeListView";
import EmployeeGridView from "./Partials/EmployeeGridView";

export default function EmployeeListing() {

    const [isLoading, setIsLoading] = useState(false);
    const [getEmployeeListing, setGetEmployeeListing] = useState([]);
    const [viewType, setViewType] = useState('list');
    const [searchFilter, setSearchFilter] = useState('');

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

    const fetchEmployee = async () => {
        setIsLoading(true);
        try {
            
            const response = await axios.get('/getEmployeeListing');

            setGetEmployeeListing(response.data);

        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchEmployee();
    }, []);

    const clearFilter = () => {
        setSearchFilter('');
    }

    return (
        <AuthenticatedLayout
            header="Employee Listing"
        >
            <Head title="Employee Listing" />

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
                                getEmployeeListing.length > 0 ? (
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
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                viewType === 'list' && (
                                                    <EmployeeListView getEmployeeListing={getEmployeeListing} isLoading={isLoading} />
                                                )
                                            }
                                            {
                                                viewType === 'grid' && (
                                                    <EmployeeGridView getEmployeeListing={getEmployeeListing} isLoading={isLoading} />
                                                )
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-10 px-[200px] min-h-[90vh] flex flex-col items-center justify-center gap-3">
                                        <div>
                                            <DepartmentIllus />
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="text-gray-950 text-base font-bold">Oops! No Employee Here Yet</div>
                                            <div className="text-gray-700 text-sm">Seems like no employee have been added yet. Add a new employee to see them listed here.</div>
                                        </div>
                                    </div>
                                )
                            }
                        </motion.div>
                    )
                }
            </AnimatePresence>
            <div className="flex flex-col">
                
            </div>

        </AuthenticatedLayout>
    )
}