import React from "react";
import { Checkbox } from 'antd';
import InputLabel from "@/Components/InputLabel";
import { InputNumber } from 'primereact/inputnumber';
import InputError from "@/Components/InputError";
        
export default function TransportInfo({ data, setData, errors }) {

    const transports  = ['None', 'Bicycle', 'Motorcycle', 'Car'];
    const licenses  = [
        'None', 
        'Motorcycle License (Class B/B1/B2)', 
        'Car License (Class D/DA)', 
        'Commercial Vehicle License (Class E - H)',
        'Heavy Vehicle License (Class I, J)',
        'Public Service Vehicle License (PSV)',
        'Goods Driving License (GDL)',
        'International Driving Permit (IDP)',
    ];
    const worksTransport  = ['Walk', 'Bicycle', 'Motorcycle', 'Car', 'Public Transport'];

    const handleChange = (checkedValues) => {
        // If "None" is selected along with other options, keep only "None"
        if (checkedValues.includes('None') && checkedValues.length > 1) {
            setData('own_transport', ['None']);
        } else {
            setData('own_transport', checkedValues);
        }
    };

    const isNoneSelected = data.own_transport?.includes('None');

    const transportsOption = transports.map(option => ({
        label: option,
        value: option,
        disabled: isNoneSelected && option !== 'None'
    }));

    const handleLicenseChange = (values) => {
        // If "None" is selected along with other options, keep only "None"
        if (values.includes('None') && values.length > 1) {
            setData('license_id', ['None']);
        } else {
            setData('license_id', values);
        }
    };

    const isLicenseNoneSelected = data.license_id?.includes('None');

    const licenseOption = licenses.map(option => ({
        label: option,
        value: option,
        disabled: isLicenseNoneSelected && option !== 'None'
    }));

    return (
        <>
            {/* Transport Info */}
            <div className="flex flex-col border border-gray-200 bg-white rounded-sm">
                <div className="flex flex-col py-4 px-5 border-b border-gray-200">
                    <div className="text-gray-950 text-base font-semibold">Transportation and Location</div>
                    <div className="text-gray-500 text-sm">Let us know your commuting preferences and location for easier coordination.</div>
                </div>
                <div className="p-5 flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="own_transport" value={<div className="flex gap-1">
                            <span>Do you have your own transportation?</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <div className="py-3">
                            <Checkbox.Group 
                                options={transportsOption}
                                value={data.own_transport}
                                onChange={handleChange}
                                className="gap-x-8 gap-y-5 text-sm text-gray-950"
                            />
                        </div>
                        <InputError message={errors.own_transport} />  
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="license_id" value={<div className="flex gap-1">
                            <span>Do you have a driver's license?</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <div className="py-3">
                            <Checkbox.Group 
                                options={licenseOption}
                                value={data.license_id}
                                onChange={handleLicenseChange}
                                className="gap-x-8 gap-y-5 text-sm text-gray-950"
                            />
                        </div>
                        <InputError message={errors.license_id} />  
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="work_transport" value={<div className="flex gap-1">
                            <span>Transportation Used to Work</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <div className="py-3">
                            <Checkbox.Group 
                                options={worksTransport}
                                value={data.work_transportation}
                                onChange={(checkedValues) => setData('work_transportation', checkedValues)}
                                className="gap-x-8 gap-y-5 text-sm text-gray-950"
                            />
                        </div>
                        <InputError message={errors.work_transportation} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="work_transport" value={<div className="flex gap-1">
                            <span>Approximate Distance from Your Residence to Our Company</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <InputNumber 
                            inputId="km"
                            value={data.approximate_distance || 0} 
                            onValueChange={(e) => setData('approximate_distance', e.value)} 
                            suffix=" km" 
                            className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                            minFractionDigits={1}
                            maxFractionDigits={2}
                        />
                        <InputError message={errors.approximate_distance} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="work_transport" value={<div className="flex gap-1">
                            <span>Approximate Time Needed from Your Residence to Our Company</span>
                            <span className="text-error-600">*</span>
                        </div>} />
                        <div className="flex items-center gap-5 w-full">
                            <div className="flex flex-col gap-2 w-full ">
                                <InputNumber 
                                    inputId="hours"
                                    value={data.approximate_hours || 0} 
                                    onValueChange={(e) => setData('approximate_hours', e.value)} 
                                    suffix=" hour(s)" 
                                    className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                    max={24}
                                />
                                <InputError message={errors.approximate_hours} />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <InputNumber 
                                    inputId="minutes"
                                    value={data.approximate_minutes || 0.0} 
                                    onValueChange={(e) => setData('approximate_minutes', e.value)} 
                                    suffix=" minute(s)" 
                                    className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                    max={59}
                                />
                                <InputError message={errors.approximate_minutes} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}