import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import React from "react"

export default function Form2() {
    return(
        <div className="flex w-full px-0 flex-col items-center gap-5">
            {/* Education Background */}
            <div className="flex w-[728px] flex-col items-center border border-gray-200 rounded-sm">
                <div className="flex px-5 py-4 flex-col items-start self-stretch border-b border-b-gray-200">
                    <div className="self-stretch text-gray-950 font-semibold">Education Background</div>
                    <div className="self-stretch text-gray-500 text-sm">Tell us about your academic qualifications that relate to the position for that would help you perform the work.</div>
                </div>
                {/* Education 1 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Education 1</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="from1" value="From" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="from1"
                            type="number"
                            name="startdate"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="mm/yyyy"
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="to1" value="To" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="to1"
                            type="number"
                            name="enddate"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="mm/yyyy"
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="schoolname1" value="School Name" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="schoolname1"
                            type="text"
                            name="schoolname1"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="address1" value="Address/City/State *" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="address1"
                            type="text"
                            name="address1"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="qualification1" value="Qualification" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="qualification1"
                            type="text"
                            name="qualification1"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="Select"
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="course1" value="Course Name/Major Subject" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="course1"
                            type="text"
                            name="course1"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="e.g. Bachelor of Computer Science (Hons)"
                        />
                    </div>
                </form>
                {/* Education 2 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Education 2</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="from2" value="From" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="from2"
                            type="number"
                            name="startdate"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="mm/yyyy"
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="to2" value="To" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="to2"
                            type="number"
                            name="enddate"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="mm/yyyy"
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="schoolname2" value="School Name" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="schoolname2"
                            type="text"
                            name="schoolname2"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="address2" value="Address/City/State *" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="address2"
                            type="text"
                            name="address2"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="qualification2" value="Qualification" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="qualification2"
                            type="text"
                            name="qualification"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="Select"
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="course2" value="Course Name/Major Subject" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="course2"
                            type="text"
                            name="course"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="e.g. Bachelor of Computer Science (Hons)"
                        />
                    </div>
                </form>
                {/* Education 3 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Education 3</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="from3" value="From" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="from3"
                            type="number"
                            name="startdate"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="mm/yyyy"
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="to3" value="To" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="to3"
                            type="number"
                            name="enddate"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="mm/yyyy"
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="schoolname3" value="School Name" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="schoolname3"
                            type="text"
                            name="schoolname"
                            className="flex items-center gap-3 self-stretch"
                            placeholder=" "
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="address3" value="Address/City/State *" /><div className="text-sm text-error-600">*</div>
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
                            <InputLabel htmlFor="qualification3" value="Qualification" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="qualification3"
                            type="text"
                            name="qualification"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="Select"
                        />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="course3" value="Course Name/Major Subject" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="course3"
                            type="text"
                            name="course"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="e.g. Bachelor of Computer Science (Hons)"
                        />
                    </div>
                </form>
            </div>

            {/* Special Skills */}
            <form className="flex w-[728px] flex-col items-center border border-gray-200 rounded-sm">
                <div className="flex px-5 py-4 flex-col items-start self-stretch border-b border-b-gray-200">
                    <div className="self-stretch text-gray-950 font-semibold">Special Skills</div>
                    <div className="self-stretch text-gray-500 text-sm"> Include skills such as software knowledge, project management, foreign languages, or any other competencies relevant to the job.</div>
                </div>
                <div className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <TextInput
                        id="skill"
                        type="text"
                        name="skill"
                        className="flex h-[200px] flex-col items-start gap-2 flex-[1_0_0]"
                        placeholder=""
                    />
                </div>
            </form>
        </div>
    )
}