import Checkbox from "@/Components/Checkbox"
import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import React from "react"

export default function Form3() {
    return(
        <div className="flex w-full px-0 flex-col items-center gap-5">
            {/* Work Experience */}
            <div className="flex w-[728px] flex-col items-center border border-gray-200 rounded-sm">
                <div className="flex px-5 py-4 flex-col items-start self-stretch border-b border-b-gray-200">
                    <div className="self-stretch text-gray-950 font-semibold">Work Experience</div>
                    <div className="self-stretch text-gray-500 text-sm">Share your current or most recent professional journey with us.</div>
                </div>
                <div className="flex p-5 items-center gap-4 self-stretch">
                    <Checkbox/>
                    <div className="text-gray-950">I do not have any work experience</div>
                </div>
                {/* Experience 1 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Experience 1</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="jobtitle1" value="Job Title" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="jobtitle1"
                            type="text"
                            name="jobtitle"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="period1" value="Period" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="period1"
                            type="text"
                            name="period"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="dd/mm/yyyy - dd/mm/yyyy"
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="company1" value="Company Name" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="company1"
                            type="text"
                            name="company"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="address" value="Address/City/State" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="address"
                            type="text"
                            name="address"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="supervisor1" value="Supervisor Name" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="supervisor1"
                            type="text"
                            name="supervisor"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="phoneno1" value="Phone Number" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex items-center gap-2 self-stretch"> 
                            <TextInput 
                                id=" "
                                className="w-[100px]"
                                placeholder="+60"
                            />                    
                            <TextInput 
                                id="phoneno1"
                                className=""
                                placeholder="Phone Number"
                            />
                        </div> 
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="reason1" value="Reason for Leaving" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="reason1"
                            type="text"
                            name="reason"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="startsalary1" value="Starting Salary" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="relative flex items-center gap-3 self-stretch">
                            <span className="absolute left-4 text-sm text-gray-950">RM</span>
                            <TextInput
                                id="startsalary1"
                                type="number"
                                name="salary"
                                className="pl-10 w-full" // Add left padding to make space for RM
                                placeholder="0"
                            />
                        </div>
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="endsalary1" value="Ending Salary" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="relative flex items-center gap-3 self-stretch">
                            <span className="absolute left-4 text-sm text-gray-950">RM</span>
                            <TextInput
                                id="endsalary1"
                                type="number"
                                name="salary"
                                className="pl-10 w-full" // Add left padding to make space for RM
                                placeholder="0"
                            />
                        </div>
                    </div>
                </form>
                {/* Experience 2 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Experience 2</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="jobtitle2" value="Job Title" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="jobtitle2"
                            type="text"
                            name="jobtitle"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="period2" value="Period" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="period2"
                            type="text"
                            name="period"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="dd/mm/yyyy - dd/mm/yyyy"
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="company2" value="Company Name" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="company2"
                            type="text"
                            name="company"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="address2" value="Address/City/State" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="address2"
                            type="text"
                            name="address"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="supervisor2" value="Supervisor Name" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="supervisor2"
                            type="text"
                            name="supervisor"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="phoneno2" value="Phone Number" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex items-center gap-2 self-stretch"> 
                            <TextInput 
                                id=" "
                                className="w-[100px]"
                                placeholder="+60"
                            />                    
                            <TextInput 
                                id="phoneno2"
                                className=""
                                placeholder="Phone Number"
                            />
                        </div> 
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="reason2" value="Reason for Leaving" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="reason2"
                            type="text"
                            name="reason"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="startsalary2" value="Starting Salary" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="relative flex items-center gap-3 self-stretch">
                            <span className="absolute left-4 text-sm text-gray-950">RM</span>
                            <TextInput
                                id="startsalary2"
                                type="number"
                                name="salary"
                                className="pl-10 w-full" // Add left padding to make space for RM
                                placeholder="0"
                            />
                        </div>
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="endsalary2" value="Ending Salary" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="relative flex items-center gap-3 self-stretch">
                            <span className="absolute left-4 text-sm text-gray-950">RM</span>
                            <TextInput
                                id="endsalary2"
                                type="number"
                                name="salary"
                                className="pl-10 w-full" // Add left padding to make space for RM
                                placeholder="0"
                            />
                        </div>
                    </div>
                </form>
                {/* Experience 3 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Experience 3</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="jobtitle3" value="Job Title" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="jobtitle3"
                            type="text"
                            name="jobtitle"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="period3" value="Period" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="period3"
                            type="text"
                            name="period"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="dd/mm/yyyy - dd/mm/yyyy"
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="company3" value="Company Name" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="company3"
                            type="text"
                            name="company"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="address3" value="Address/City/State" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="address3"
                            type="text"
                            name="address"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="supervisor3" value="Supervisor Name" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="supervisor3"
                            type="text"
                            name="supervisor"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="phoneno3" value="Phone Number" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex items-center gap-2 self-stretch"> 
                            <TextInput 
                                id=" "
                                className="w-[100px]"
                                placeholder="+60"
                            />                    
                            <TextInput 
                                id="phoneno3"
                                className=""
                                placeholder="Phone Number"
                            />
                        </div> 
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="reason3" value="Reason for Leaving" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="reason3"
                            type="text"
                            name="reason"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="startsalary3" value="Starting Salary" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="relative flex items-center gap-3 self-stretch">
                            <span className="absolute left-4 text-sm text-gray-950">RM</span>
                            <TextInput
                                id="startsalary3"
                                type="number"
                                name="salary"
                                className="pl-10 w-full" // Add left padding to make space for RM
                                placeholder="0"
                            />
                        </div>
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="endsalary3" value="Ending Salary" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="relative flex items-center gap-3 self-stretch">
                            <span className="absolute left-4 text-sm text-gray-950">RM</span>
                            <TextInput
                                id="endsalary3"
                                type="number"
                                name="salary"
                                className="pl-10 w-full" // Add left padding to make space for RM
                                placeholder="0"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}