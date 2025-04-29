import { ChevronDown } from '@/Components/Icon/Outline';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Select, Tag } from 'antd';

export default function Dashboard() {

    const options = [
        { value: '1', label: 'Jack' },
        { value: '2', label: 'Lucy' },
    ]

    const handleChange = (value) => {
        console.log(value);
    }

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <Select
                            onChange={handleChange}
                            options={options}
                            mode="multiple"
                            placeholder="Placeholder"
                            suffixIcon={<ChevronDown />}
                        />
                        <Tag bordered={false} color="info" className='ant-tag-info text-xs font-medium py-1 px-2' >Placeholder</Tag>
                        <Tag bordered={false} color="warning" className='text-xs font-medium py-1 px-2' >Placeholder</Tag>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
