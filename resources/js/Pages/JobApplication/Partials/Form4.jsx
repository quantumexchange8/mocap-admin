import React from "react"
import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"

export default function Form4() {
    return(
        <div className="flex w-full px-0 flex-col items-center gap-5">
            {/* Reference */}
            <div className="flex w-[728px] flex-col items-center border border-gray-200 rounded-sm">
                <div className="flex px-5 py-4 flex-col items-start self-stretch border-b border-b-gray-200">
                    <div className="self-stretch text-gray-950 font-semibold">References</div>
                    <div className="self-stretch text-gray-500 text-sm">List professional references who can provide information about your work performance, skills, and character. Avoid using family members or friends.</div>
                </div>
                
                {/* Reference 1 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Reference 1</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="name1" value="Full Name"/><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="name1"
                            type="text"
                            name="name"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="relationship1" value="Relationship"/><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="relationship1"
                            type="text"
                            name="relationship"
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
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="email1" value="Email" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="email1"
                            type="number"
                            name="email"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="you@example.com"
                        />
                    </div>
                </form>

                {/* Reference 2 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Reference 2</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="name2" value="Full Name"/><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="name2"
                            type="text"
                            name="name"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="relationship2" value="Relationship"/><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="relationship2"
                            type="text"
                            name="relationship"
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
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="email2" value="Email" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="email2"
                            type="number"
                            name="email"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="you@example.com"
                        />
                    </div>
                </form>

                {/* Reference 3 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Reference 3</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="name3" value="Full Name"/><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="name3"
                            type="text"
                            name="name"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="relationship3" value="Relationship"/><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="relationship3"
                            type="text"
                            name="relationship"
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
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="email3" value="Email" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="email3"
                            type="number"
                            name="email"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="you@example.com"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}