import React from "react";
import { Select } from "antd";
import { ChevronDown } from "@/Components/Icon/Outline";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function Form1({ data, setData }) {

    return (
        <div className="flex w-full px-0 flex-col items-center gap-5">
            {/* Job Preferences */}
            <div className="flex w-[728px] flex-col items-center rounded-sm border border-gray-200 bg-white">
                <div className="flex px-5 py-4 flex-col items-start self-stretch border-b border-b-gray-200">
                    <div className="self-stretch text-gray-950 text-md font-semibold">Job Preferences </div>
                    <div className="self-stretch text-gray-500 text-sm">Let us know your position of interest and salary expectations.</div>
                </div>
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="position" value="Position Apply For" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput 
                            id="position"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="Select"
                            required
                        />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="salary" value="Expected Salary" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="relative flex items-center gap-3 self-stretch">
                            <span className="absolute left-4 text-sm text-gray-950">RM</span>
                            <TextInput
                                id="salary"
                                type="number"
                                name="salary"
                                className="pl-10 w-full" // Add left padding to make space for RM
                                placeholder="0"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="date" value="Available Date to Start Work" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput 
                            id="date"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="Select"
                        />
                    </div>
                </form>
            </div>

            {/* Personal Information */}
            <div className="flex w-[728px] flex-col items-center rounded-sm border border-gray-200 bg-white">
                <div className="flex px-5 py-4 flex-col items-start self-stretch border-b border-b-gray-200">
                    <div className="self-stretch text-gray-950 text-md font-semibold">Personal Information </div>
                    <div className="self-stretch text-gray-500 text-sm">Basic details to identify and contact you.</div>
                </div>
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="name" value="Full Name" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="name"
                            type="text"
                            name=" "
                            className="flex items-center gap-3 self-stretch"
                            placeholder="as per NRIC/Passport"
                        />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="ic" value="NRIC/Passport No." /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput
                            id="ic"
                            type="text"
                            name=" "
                            className="flex items-center gap-3 self-stretch"
                            placeholder="901223145678 / A12345678"
                        />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="nationality" value="Nationality" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput 
                            id="nationality"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="Select"
                        />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="place of birth" value="Place of Birth" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput 
                            id="place of birth"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="Select"
                        />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="marital status" value="Marital Status" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput 
                            id="marital status"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="Select"
                        />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="race" value="Race" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput 
                            id="race"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="Select"
                        />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="religion" value="Religion" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput 
                            id="religion"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="Select"
                        />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="phone no" value="Phone Number" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex items-center gap-2 self-stretch"> 
                            <TextInput 
                                id=" "
                                className="w-[100px]"
                                placeholder="+60"
                            />                    
                            <TextInput 
                                id="phone no"
                                className=""
                                placeholder="Phone Number"
                            />
                        </div>   
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="email" value="Email" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput
                            id="email"
                            type="text"
                            name="email"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="address" value="Current Address" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput
                            id="address"
                            type="text"
                            name=" "
                            className="flex items-center gap-3 self-stretch"
                            placeholder="House no./unit no., building name, street name/district, etc."
                        />
                        <div className="flex self-stretch text-gray-500 text-xs">Enter your full address, including street name and unit number.</div>
                    </div>
                    <div className="flex min-w-[200px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="postcode" value="Postcode" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput
                            id="postcode"
                            type="number"
                            name=" "
                            className="flex items-center gap-3 self-stretch"
                            placeholder="e.g. 50000"
                        />
                    </div>
                    <div className="flex min-w-[200px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="city" value="City" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput
                            id="city"
                            type="text"
                            name=" "
                            className="flex items-center gap-3 self-stretch"
                            placeholder="e.g. Kuala Lumpur"
                        />
                    </div>
                    <div className="flex min-w-[200px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="state" value="State" /><div className="text-sm text-error-600">*</div>
                        </div>                        
                        <TextInput 
                            id="state"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="Select"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}