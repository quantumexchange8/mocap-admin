import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Tabs } from "antd";
import React from "react";
import JobApplicants from "./Partials/JobApplicants";
import EmployeeInformation from "./Partials/EmployeeInformation";

export default function SmartData() {

    const items = [
        { key: '1', label: 'Job Applications', children: <JobApplicants /> },
        { key: '2', label: 'Employee Information', children: <EmployeeInformation /> },
    ];

    return (
        <AuthenticatedLayout
            header="Smart Data"
        >

            <Head title="Smart Data" />

            <div className="flex flex-col">
                <div className="sticky top-0 px-5">
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