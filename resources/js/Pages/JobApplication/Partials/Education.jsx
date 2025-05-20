import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { CalendarIcon, ClearIcon, DatePickerIcon } from "@/Components/Icon/Outline";
import { Input } from 'antd';
import InputError from "@/Components/InputError";

export default function Education({data, setData, errors}) {
    const { TextArea } = Input;

    const [isLoading, setIsLoading] = useState(false);
    const [getQualification, setGetQualification] = useState([]);
    
    const fetchQualification = async  () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/getQualification');
            setGetQualification(response.data);
        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchQualification();
    }, []);

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
                            <InputLabel htmlFor="edu1_start" value="From" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex items-center self-stretch relative">
                            <Calendar
                                value={data.edu1_start}
                                onChange={(e) => setData('edu1_start', e.value)} 
                                className="w-full text-sm"
                                placeholder="mm/yyyy"
                                view="month" 
                                dateFormat="mm/yy"
                                readOnlyInput
                                invalid={!!errors.edu1_start}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {
                                    data.edu1_start === null ? (
                                        <DatePickerIcon />
                                    ) : (
                                        <span className="cursor-pointer" onClick={() => setData('edu1_start', null)}>
                                            <ClearIcon />
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                        <InputError message={errors.edu1_start} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu1_end" value="To" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex items-center self-stretch relative">
                            <Calendar
                                value={data.edu1_end}
                                onChange={(e) => setData('edu1_end', e.value)} 
                                className="w-full text-sm"
                                placeholder="mm/yyyy"
                                view="month" 
                                dateFormat="mm/yy"
                                readOnlyInput
                                invalid={!!errors.edu1_end}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {
                                    data.edu1_end === null ? (
                                        <DatePickerIcon />
                                    ) : (
                                        <span className="cursor-pointer"  onClick={() => setData('edu1_end', null)}>
                                            <ClearIcon />
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                        <InputError message={errors.edu1_end} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu1_school" value="School Name" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput 
                            id="edu1_school"
                            type="text"
                            name="edu1_school"
                            value={data.edu1_school}
                            className="w-full"
                            placeholder=" "
                            onChange={(e) => setData('edu1_school', e.target.value)}
                            hasError={!!errors.edu1_school}
                        />
                        <InputError message={errors.edu1_school} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu1_address" value="Address/City/State" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput 
                            id="edu1_address"
                            type="text"
                            name="edu1_address"
                            value={data.edu1_address}
                            className="w-full"
                            placeholder=" "
                            onChange={(e) => setData('edu1_address', e.target.value)}
                            hasError={!!errors.edu1_address}
                        />
                        <InputError message={errors.edu1_address} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu1_qualification" value="Qualification" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <Dropdown 
                            value={data.edu1_qualification} 
                            onChange={(e) => setData('edu1_qualification', e.value)} 
                            options={getQualification.map((item) => ({
                                label: item.name,
                                value: item.name,
                            }))}
                            optionLabel="label"
                            placeholder="Select" 
                            loading={isLoading}
                            filter
                            className="w-full text-sm"
                            invalid={!!errors.edu1_qualification}
                            pt={{
                                root: { className: 'border border-gray-300 rounded-sm px-4 py-3 text-gray-950 focus-within:border-gray-950 transition-colors duration-200' }, // main box
                                panel: { className: 'p-dropdown-panel bg-white border border-gray-300 shadow-lg mt-0.5 rounded-sm' }, // dropdown list
                                item: ({ context }) => ({
                                    className: `px-4 py-2 text-sm text-gray-950 hover:bg-gray-100 cursor-pointer ${
                                        context.selected ? 'bg-gray-950 font-semibold text-white hover:bg-gray-800 ' : ''
                                    }`
                                }),
                                filterInput: { className: 'px-4 py-2 text-sm border border-gray-300 rounded-sm ' },
                                filterContainer: { className: 'p-2'}
                            }}
                        />
                        <InputError message={errors.edu1_qualification} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu1_course" value="Course Name/Major Subject" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput 
                            id="edu1_course"
                            type="text"
                            name="edu1_course"
                            value={data.edu1_course}
                            className="w-full"
                            placeholder="e.g. Bachelor of Computer Science (Hons)"
                            onChange={(e) => setData('edu1_course', e.target.value)}
                            hasError={!!errors.edu1_course}
                        />
                        <InputError message={errors.edu1_course} />
                    </div>
                </form>
                {/* Education 2 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Education 2</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu2_start" value="From" />
                        </div>
                        <div className="flex items-center self-stretch relative">
                            <Calendar
                                value={data.edu2_start}
                                onChange={(e) => setData('edu2_start', e.value)} 
                                className="w-full text-sm"
                                placeholder="mm/yyyy"
                                view="month" 
                                dateFormat="mm/yy"
                                readOnlyInput
                                invalid={!!errors.edu2_start}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {
                                    data.edu2_start === null ? (
                                        <DatePickerIcon />
                                    ) : (
                                        <span className="cursor-pointer" onClick={() => setData('edu2_start', null)}>
                                            <ClearIcon />
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                        <InputError message={errors.edu2_start} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu2_end" value="To" />
                        </div>
                        <div className="flex items-center self-stretch relative">
                            <Calendar
                                value={data.edu2_end}
                                onChange={(e) => setData('edu2_end', e.value)} 
                                className="w-full text-sm"
                                placeholder="mm/yyyy"
                                view="month" 
                                dateFormat="mm/yy"
                                readOnlyInput
                                invalid={!!errors.edu2_end}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {
                                    data.edu2_end === null ? (
                                        <DatePickerIcon />
                                    ) : (
                                        <span className="cursor-pointer" onClick={() => setData('edu2_end', null)}>
                                            <ClearIcon />
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                        <InputError message={errors.edu2_end} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu2_school" value="School Name" />
                        </div>
                        <TextInput 
                            id="edu2_school"
                            type="text"
                            name="edu2_school"
                            value={data.edu2_school}
                            className="w-full"
                            placeholder=" "
                            onChange={(e) => setData('edu2_school', e.target.value)}
                            hasError={!!errors.edu2_school}
                        />
                        <InputError message={errors.edu2_school} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu2_address" value="Address/City/State" />
                        </div>
                        <TextInput 
                            id="edu2_address"
                            type="text"
                            name="edu2_address"
                            value={data.edu2_address}
                            className="w-full"
                            placeholder=" "
                            onChange={(e) => setData('edu2_address', e.target.value)}
                            hasError={!!errors.edu2_address}
                        />
                        <InputError message={errors.edu2_address} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu2_qualification" value="Qualification" />
                        </div>
                        <Dropdown 
                            value={data.edu2_qualification} 
                            onChange={(e) => setData('edu2_qualification', e.value)} 
                            options={getQualification.map((item) => ({
                                label: item.name,
                                value: item.name,
                            }))}
                            optionLabel="label"
                            placeholder="Select" 
                            loading={isLoading}
                            filter
                            className="w-full text-sm"
                            invalid={!!errors.edu2_qualification}
                            pt={{
                                root: { className: 'border border-gray-300 rounded-sm px-4 py-3 text-gray-950 focus-within:border-gray-950 transition-colors duration-200' }, // main box
                                panel: { className: 'p-dropdown-panel bg-white border border-gray-300 shadow-lg mt-0.5 rounded-sm' }, // dropdown list
                                item: ({ context }) => ({
                                    className: `px-4 py-2 text-sm text-gray-950 hover:bg-gray-100 cursor-pointer ${
                                        context.selected ? 'bg-gray-950 font-semibold text-white hover:bg-gray-800 ' : ''
                                    }`
                                }),
                                filterInput: { className: 'px-4 py-2 text-sm border border-gray-300 rounded-sm ' },
                                filterContainer: { className: 'p-2'}
                            }}
                        />
                        <InputError message={errors.edu2_qualification} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu2_course" value="Course Name/Major Subject" />
                        </div>
                        <TextInput 
                            id="edu2_course"
                            type="text"
                            name="edu2_course"
                            value={data.edu2_course}
                            className="w-full"
                            placeholder="e.g. Bachelor of Computer Science (Hons)"
                            onChange={(e) => setData('edu2_course', e.target.value)}
                            hasError={!!errors.edu2_course}
                        />
                        <InputError message={errors.edu2_course} />
                    </div>
                </form>
                {/* Education 3 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Education 3</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu3_start" value="From" />
                        </div>
                        <div className="flex items-center self-stretch relative">
                            <Calendar
                                value={data.edu3_start}
                                onChange={(e) => setData('edu3_start', e.value)} 
                                className="w-full text-sm"
                                placeholder="mm/yyyy"
                                view="month" 
                                dateFormat="mm/yy"
                                readOnlyInput
                                invalid={!!errors.edu3_start}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {
                                    data.edu2_start === null ? (
                                        <DatePickerIcon />
                                    ) : (
                                        <span className="cursor-pointer"  onClick={() => setData('edu3_start', null)}>
                                            <ClearIcon />
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                        <InputError message={errors.edu3_start} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu3_end" value="To" />
                        </div>
                        <div className="flex items-center self-stretch relative">
                            <Calendar
                                value={data.edu3_end}
                                onChange={(e) => setData('edu3_end', e.value)} 
                                className="w-full text-sm"
                                placeholder="mm/yyyy"
                                view="month" 
                                dateFormat="mm/yy"
                                readOnlyInput
                                invalid={!!errors.edu3_end}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {
                                    data.edu3_end === null ? (
                                        <DatePickerIcon />
                                    ) : (
                                        <span className="cursor-pointer" onClick={() => setData('edu3_end', null)}>
                                            <ClearIcon />
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                        <InputError message={errors.edu3_end} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu3_school" value="School Name" />
                        </div>
                        <TextInput 
                            id="edu3_school"
                            type="text"
                            name="edu3_school"
                            value={data.edu3_school}
                            className="w-full"
                            placeholder=" "
                            onChange={(e) => setData('edu3_school', e.target.value)}
                            hasError={!!errors.edu3_school}
                        />
                        <InputError message={errors.edu3_school} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu3_address" value="Address/City/State" />
                        </div>
                        <TextInput 
                            id="edu3_address"
                            type="text"
                            name="edu3_address"
                            value={data.edu3_address}
                            className="w-full"
                            placeholder=" "
                            onChange={(e) => setData('edu3_address', e.target.value)}
                            hasError={!!errors.edu3_address}
                        />
                        <InputError message={errors.edu3_address} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu3_qualification" value="Qualification" />
                        </div>
                        <Dropdown 
                            value={data.edu3_qualification} 
                            onChange={(e) => setData('edu3_qualification', e.value)} 
                            options={getQualification.map((item) => ({
                                label: item.name,
                                value: item.name,
                            }))}
                            optionLabel="label"
                            placeholder="Select" 
                            loading={isLoading}
                            filter
                            className="w-full text-sm"
                            invalid={!!errors.edu3_qualification}
                            pt={{
                                root: { className: 'border border-gray-300 rounded-sm px-4 py-3 text-gray-950 focus-within:border-gray-950 transition-colors duration-200' }, // main box
                                panel: { className: 'p-dropdown-panel bg-white border border-gray-300 shadow-lg mt-0.5 rounded-sm' }, // dropdown list
                                item: ({ context }) => ({
                                    className: `px-4 py-2 text-sm text-gray-950 hover:bg-gray-100 cursor-pointer ${
                                        context.selected ? 'bg-gray-950 font-semibold text-white hover:bg-gray-800 ' : ''
                                    }`
                                }),
                                filterInput: { className: 'px-4 py-2 text-sm border border-gray-300 rounded-sm ' },
                                filterContainer: { className: 'p-2'}
                            }}
                        />
                        <InputError message={errors.edu3_qualification} />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="edu2_course" value="Course Name/Major Subject" />
                        </div>
                        <TextInput 
                            id="edu3_course"
                            type="text"
                            name="edu3_course"
                            value={data.edu3_course}
                            className="w-full"
                            placeholder="e.g. Bachelor of Computer Science (Hons)"
                            onChange={(e) => setData('edu3_course', e.target.value)}
                            hasError={!!errors.edu3_course}
                        />
                        <InputError message={errors.edu3_course} />
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
                    <TextArea 
                        id="skills"
                        type="text"
                        name="skills"
                        value={data.skills}
                        autoSize={{ minRows: 8, maxRows: 8 }}
                        placeholder=" "
                        onChange={(e) => setData('skills', e.target.value)}
                        // haserror={!!errors.skills}
                    />
                    <InputError message={errors.skills}  />
                </div>
            </form>
        </div>
    )
}