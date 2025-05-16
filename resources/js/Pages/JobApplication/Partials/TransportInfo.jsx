import { Checkbox } from 'antd';
import InputLabel from "@/Components/InputLabel"
import React from "react"
import { InputNumber } from 'primereact/inputnumber';
import InputError from '@/Components/InputError';

export default function TransportInfo({data, setData, errors}) {
    const transports  = ['Walk', 'Bicycle', 'Motorcycle', 'Car', 'Public Transport'];

    const transportsOption = transports.map(option => ({
        label: option,
        value: option,
    }));
    
    const handleChange = (checkedValues) => {        
        setData('transport', checkedValues);
    };

    return(
        <div className="flex w-full px-0 flex-col items-center gap-5">
            {/* Transportation and Location */}
            <div className="flex w-[728px] flex-col items-center border border-gray-200 rounded-sm">
                <div className="flex px-5 py-4 flex-col items-start self-stretch border-b border-b-gray-200">
                    <div className="self-stretch text-gray-950 font-semibold">Transportation and Location</div>
                    <div className="self-stretch text-gray-500 text-sm">Information about your commute and proximity to the workplace.</div>
                </div>
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="transport" value="Transportation Used to Work"/><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex w-[688px] px-0 py-3 items-center gap-8">
                            <Checkbox.Group
                                options={transportsOption}
                                value={data.transport}
                                onChange={handleChange}
                                className="gap-x-8 gap-y-5 text-sm text-gray-950"
                            />
                        </div>
                        <InputError message={errors.transport} />
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="approximate_distance" value="Approximate Distance from Your Residence to Our Company"/><div className="text-sm text-error-600">*</div>
                        </div>
                        <InputNumber
                            inputId="approximate_distance"
                            value={data.approximate_distance || 0} 
                            onValueChange={(e) => setData('approximate_distance', e.value)} 
                            suffix=" km" 
                            className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                            minFractionDigits={1}
                            maxFractionDigits={2}
                        />
                        <InputError message={errors.approximate_distance} />
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="approximate_hours" value="Approximate Time Needed from Your Residence to Our Company"/><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex justify-center items-center gap-5 self-stretch">
                            <div className="flex flex-col gap-2 w-full ">
                                <InputNumber 
                                    inputId="approximate_hours"
                                    value={data.approximate_hours || 0} 
                                    onValueChange={(e) => setData('approximate_hours', e.value)} 
                                    suffix=" hour(s)" 
                                    className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                    max={24}
                                />
                                <InputError message={errors.approximate_hours} />
                            </div>
                            <div className="flex flex-col gap-2 w-full ">
                                <InputNumber 
                                    inputId="approximate_minutes"
                                    value={data.approximate_minutes || 0.0} 
                                    onValueChange={(e) => setData('approximate_minutes', e.value)} 
                                    suffix=" minutes(s)" 
                                    className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                    max={59}
                                />
                                <InputError message={errors.approximate_minutes} />
                            </div>
                        </div>
                    </div>
                </form>
               </div>
        </div>
    )
}