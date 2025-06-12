import Button from "@/Components/Button";
import { PlusIcon, SearchIcon, XIcon } from "@/Components/Icon/Outline";
import SearchInput from "@/Components/SearchInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Segmented } from "antd";
import React, { useState } from "react";
import Published from "./Partials/Published";
import Draft from "./Partials/Draft";
import Archive from "./Partials/Archive";

export default function Announcement() {

    const tabOptions = [
        {
          label: 'Published', 
          value: 'published',
        },
        {
          label: 'Draft', 
          value: 'draft',
        },
        {
            label: 'Archive', 
            value: 'archive',
          },
    ];

    const [viewType, setViewType] = useState('published');
    const [searchFilter, setSearchFilter] = useState('');

    const clearFilter = () => {
        setSearchFilter('');
    }

    return (
        <AuthenticatedLayout
            header="Announcement"
        >

            <Head title="Announcement" />

            <div className="flex flex-col w-full">
                {/* Header */}
                <div className="py-2 px-5 sticky top-[55px] flex justify-between items-center bg-white">
                    <div>
                        <Segmented 
                            options={tabOptions}
                            value={viewType}
                            onChange={setViewType}
                        />
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
                        <Button className="flex items-center gap-2" size="sm" onClick={() => window.location.href = `/create-announcement`}>
                            <PlusIcon/>
                            <span>New Announcement</span>
                        </Button>
                    </div>
                </div>

                {/* content */}
                {
                    viewType === 'published' && (
                        <Published />
                    )
                }
                {
                    viewType === 'draft' && (
                        <Draft />
                    )
                }
                {
                    viewType === 'archive' && (
                        <Archive />
                    )
                }
            </div>

        </AuthenticatedLayout>
    )
}