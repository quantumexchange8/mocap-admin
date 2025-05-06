import Button from "@/Components/Button";
import { DepartmentIllus } from "@/Components/Icon/Illustration";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";


export default function Department() {

    const [getDepartment, setGetDepartment] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <AuthenticatedLayout header="Departments">

            <Head title="Departments" />


            {
                getDepartment.length > 0 ? (
                    <div className="flex flex-col gap-5 p-5">
                        <div className="flex justify-between">
                            <div></div>
                            <div></div>
                        </div>
                        <div></div>
                    </div>
                ) : (
                    <>
                        {
                            isLoading ? (
                                <>
                                </>
                            ) : (
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
                    </>
                )
            }
            
        </AuthenticatedLayout>
    )
}