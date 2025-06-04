import React, { useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Breadcrumb, Checkbox, Radio, Tabs } from "antd";
import { ExportIcon, PrintIcon, SmartData } from "@/Components/Icon/Outline";
import Button from "@/Components/Button";
import { useReactToPrint } from "react-to-print";
import EmployeeInfo from "./Partials/EmployeeInfo";
import EmployeeEmployment from "./Partials/EmployeeEmployment";
import EmployeeOffboarding from "./Partials/EmployeeOffboarding";

export default function EmployeeDetails({ employee }) {

    const contentRef = useRef(null);

    const reactToPrintFn = useReactToPrint({ contentRef });
    
    const items = [
        { key: '1', label: 'Information Form', children: <EmployeeInfo employee={employee} contentRef={contentRef}/> },
        { key: '2', label: 'Employment Details', children: <EmployeeEmployment employee={employee} contentRef={contentRef}/> },
        { key: '3', label: 'Offboarding Details', disabled: employee.status !== 'deleted', children: <EmployeeOffboarding employee={employee} contentRef={contentRef}/> },
    ];

    return(
        <AuthenticatedLayout
            header="Smart Data"
        >

            <Head title="Employee Information Details" />

            <div className="flex flex-col">
                <div className="w-full sticky top-[55px] bg-white z-30 py-2 px-5 flex justify-between items-center border-b border-gray-200">
                    <Breadcrumb 
                        items={[
                            {
                                href: '/smart-data',
                                title: (
                                    <div className="flex items-center gap-2">
                                        <SmartData />
                                        <span>Smart Data</span>
                                    </div>
                                ),
                            },
                            {
                                title: (
                                    <span className="text-gray-950 text-sm font-semibold">{employee.name} - Employee Information</span>
                                )
                            }
                        ]}
                    />
                    <div className="flex items-center gap-3">
                        <Button variant="outlined" size="sm" className="flex items-center gap-2" ><ExportIcon />Export</Button>
                        <Button variant="outlined" size="sm" className="flex items-center gap-2" onClick={reactToPrintFn} ><PrintIcon />Print</Button>
                    </div>
                </div>

                <div className="flex w-full px-5 pt-5 pb-12 flex-col items-center gap-5 mx-auto">
                    <Tabs
                        defaultActiveKey="1"
                        destroyInactiveTabPane={true}
                        items={items}
                        />
                </div>

            </div>
        </AuthenticatedLayout>
                
    )
}