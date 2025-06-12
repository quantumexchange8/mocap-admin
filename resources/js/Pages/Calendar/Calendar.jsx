import Button from "@/Components/Button";
import { PlusIcon } from "@/Components/Icon/Outline";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Calendar() {

    return (
        <AuthenticatedLayout header='Calendar'>

            <Head title="Calendar" />

            <div className="flex flex-row w-full">
                <div className="max-w-[220px] w-full flex flex-col gap-4">
                    <div className="p-3 flex flex-col gap-3">
                        <Button size="sm" className="flex items-center justify-center gap-2">
                            <PlusIcon />
                            <span>New Event</span>
                        </Button>
                        <div>
                            
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                </div>
                <div className="w-full">2</div>
                <div className="max-w-[200px] w-full">3</div>
            </div>

        </AuthenticatedLayout>
    )
}