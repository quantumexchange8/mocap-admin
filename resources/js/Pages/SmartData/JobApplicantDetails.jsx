import Button from "@/Components/Button";
import { ExportIcon, PrintIcon, SmartData } from "@/Components/Icon/Outline";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { formatAmount, formatDate } from "@/Composables";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Breadcrumb, Checkbox, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import { InputNumber } from "primereact/inputnumber";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function JobApplicantDetails({ jobApplicant }) {


    const formatSalary = () => {
        const formattedValue = formatAmount(jobApplicant.expected_salary);

        return formattedValue;
    }

    const contentRef = useRef(null);

    const reactToPrintFn = useReactToPrint({ contentRef });


    const setRefs = (node) => {
        contentRef.current = node;
        // targetRef.current = node;
    };

      
    const worksTransport  = ['Walk', 'Bicycle', 'Motorcycle', 'Car', 'Public Transport'];

    return (
        <AuthenticatedLayout
            header="Smart Data"
        >

            <Head title="Job Application Details" />

            <div className="flex flex-col">
                <div className="w-full sticky top-[55px] bg-white z-30 py-2 px-5 flex justify-between items-center border-b border-gray-200">
                    <Breadcrumb 
                        items={[
                            {
                                href: '/smart-data',
                                title: (
                                    <div className="flex items-center gap-2">
                                        <SmartData />
                                        <span>Smart Data</span>
                                    </div>
                                ),
                            },
                            {
                                title: (
                                    <span className="text-gray-950 text-sm font-semibold">{jobApplicant.full_name}- Job Application Details</span>
                                )
                            }
                        ]}
                    />
                    <div className="flex items-center gap-3">
                        <Button variant="outlined" size="sm" className="flex items-center gap-2" ><ExportIcon />Export</Button>
                        <Button variant="outlined" size="sm" className="flex items-center gap-2" onClick={reactToPrintFn} ><PrintIcon />Print</Button>
                    </div>
                </div>
                <div ref={contentRef} className="pdf-content p-5 flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-5 max-w-[728px] w-full" >
                        <div className="flex flex-col border border-gray-200 shadow-smShadow ">
                            <div className="py-4 px-5 text-gray-950 text-base font-semibold border-b border-gray-200">
                                Job Preferences
                            </div>
                            <div className="p-5 grid grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Position Apply For' />
                                    <TextInput 
                                        id="position"
                                        type="text"
                                        name="position"
                                        value={jobApplicant.position}
                                        className="w-full"
                                        autoComplete="position"
                                        isFocused={false}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Expected Salary' />
                                    <TextInput 
                                        id="expected_salary"
                                        type="text"
                                        name="expected_salary"
                                        value={formatSalary()}
                                        className="w-full"
                                        autoComplete="expected_salary"
                                        isFocused={false}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                        prefix="RM"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Available Date to Start Work' />
                                    <TextInput 
                                        id="start_date"
                                        type="text"
                                        name="start_date"
                                        value={formatDate(jobApplicant.start_date)}
                                        className="w-full"
                                        autoComplete="start_date"
                                        isFocused={false}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="flex flex-col border border-gray-200 shadow-smShadow ">
                            <div className="py-4 px-5 text-gray-950 text-base font-semibold border-b border-gray-200">
                                Personal Information
                            </div>
                            <div className="p-5 grid grid-cols-2 gap-5">
                                <div className=" col-span-2 flex flex-col gap-2">
                                    <InputLabel value='Full Name' />
                                    <TextInput 
                                        id="full_name"
                                        type="text"
                                        name="full_name"
                                        value={jobApplicant.full_name}
                                        className="w-full"
                                        autoComplete="full_name"
                                        isFocused={false}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='NRIC/Passport No.' />
                                    <TextInput 
                                        id="identity_no"
                                        type="text"
                                        name="identity_no"
                                        value={jobApplicant.identity_no}
                                        className="w-full"
                                        autoComplete="identity_no"
                                        isFocused={false}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Nationality' />
                                    <TextInput 
                                        id="nationality"
                                        type="text"
                                        name="nationality"
                                        value={jobApplicant.nationality}
                                        className="w-full"
                                        autoComplete="nationality"
                                        isFocused={false}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Place of Birth' />
                                    <TextInput 
                                        id="place_of_birth"
                                        type="text"
                                        name="place_of_birth"
                                        value={jobApplicant.place_of_birth}
                                        className="w-full"
                                        autoComplete="place_of_birth"
                                        isFocused={false}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Marital Status' />
                                    <TextInput 
                                        id="marital_status"
                                        type="text"
                                        name="marital_status"
                                        value={jobApplicant.marital_status}
                                        className="w-full"
                                        autoComplete="marital_status"
                                        isFocused={false}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Race' />
                                    <TextInput 
                                        id="race"
                                        type="text"
                                        name="race"
                                        value={jobApplicant.race}
                                        className="w-full"
                                        autoComplete="race"
                                        isFocused={false}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Religion' />
                                    <TextInput 
                                        id="religion"
                                        type="text"
                                        name="religion"
                                        value={jobApplicant.religion}
                                        className="w-full"
                                        autoComplete="religion"
                                        isFocused={false}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Phone Number' />
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <TextInput 
                                                id="dial_code"
                                                type="text"
                                                name="dial_code"
                                                value={jobApplicant.dial_code}
                                                className="w-full"
                                                autoComplete="dial_code"
                                                isFocused={false}
                                                onChange={(e) => setData('', e.target.value)}
                                                readOnly={true}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <TextInput 
                                                id="phone_no"
                                                type="text"
                                                name="phone_no"
                                                value={jobApplicant.phone_no}
                                                className="w-full "
                                                autoComplete="phone_no"
                                                isFocused={false}
                                                onChange={(e) => setData('', e.target.value)}
                                                readOnly={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Email' />
                                    <TextInput 
                                        id="email"
                                        type="text"
                                        name="email"
                                        value={jobApplicant.email}
                                        className="w-full"
                                        autoComplete="email"
                                        isFocused={false}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 col-span-2">
                                    <InputLabel value='Current Address' />
                                    <TextInput 
                                        id="address"
                                        type="text"
                                        name="address"
                                        value={jobApplicant.address}
                                        className="w-full"
                                        autoComplete="address"
                                        isFocused={false}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="flex gap-5 col-span-2">
                                    <div className="flex flex-col gap-2 col-span-2">
                                        <InputLabel value='Postcode' />
                                        <TextInput 
                                            id="postcode"
                                            type="text"
                                            name="postcode"
                                            value={jobApplicant.postcode}
                                            className="w-full"
                                            autoComplete="postcode"
                                            isFocused={false}
                                            onChange={(e) => setData('', e.target.value)}
                                            readOnly={true}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 col-span-2">
                                        <InputLabel value='City' />
                                        <TextInput 
                                            id="city"
                                            type="text"
                                            name="city"
                                            value={jobApplicant.city}
                                            className="w-full"
                                            autoComplete="city"
                                            isFocused={false}
                                            onChange={(e) => setData('', e.target.value)}
                                            readOnly={true}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 col-span-2">
                                        <InputLabel value='State' />
                                        <TextInput 
                                            id="state"
                                            type="text"
                                            name="state"
                                            value={jobApplicant.state}
                                            className="w-full"
                                            autoComplete="state"
                                            isFocused={false}
                                            onChange={(e) => setData('', e.target.value)}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Special Skills */}
                        <div className="flex flex-col border border-gray-200 shadow-smShadow ">
                            <div className="py-4 px-5 text-gray-950 text-base font-semibold border-b border-gray-200">
                                Special Skills
                            </div>
                            <div className="p-5 ">
                                <TextArea 
                                    value={jobApplicant.special_skill}
                                    rows={6}
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Work Experience */}
                        <div className="flex flex-col border border-gray-200 shadow-smShadow ">
                            <div className="py-4 px-5 text-gray-950 text-base font-semibold border-b border-gray-200">
                                Work Experience
                            </div>
                            {
                                jobApplicant.work_experience.length > 0 ? (
                                    <>
                                    {
                                        jobApplicant.work_experience.map((experience, index) => (
                                            <div className="p-5 flex flex-col gap-5" key={index}>
                                                <div className="text-gray-950 text-base font-semibold">
                                                    Experience {index + 1}
                                                </div>
                                                <div className="grid grid-cols-2 gap-5">
                                                    <div className="flex flex-col gap-2">
                                                        <InputLabel value='Job Title' />
                                                        <TextInput 
                                                            id="title"
                                                            type="text"
                                                            name="title"
                                                            value={experience.title}
                                                            className="w-full"
                                                            autoComplete="title"
                                                            isFocused={false}
                                                            onChange={(e) => setData('', e.target.value)}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <InputLabel value='Period' />
                                                        <TextInput 
                                                            id="title"
                                                            type="text"
                                                            name="title"
                                                            value={formatDate(experience.period_from) + ' - ' + formatDate(experience.period_to)}
                                                            className="w-full"
                                                            autoComplete="title"
                                                            isFocused={false}
                                                            onChange={(e) => setData('', e.target.value)}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <InputLabel value='Company Name' />
                                                        <TextInput 
                                                            id="company_name"
                                                            type="text"
                                                            name="company_name"
                                                            value={experience.company_name}
                                                            className="w-full"
                                                            autoComplete="company_name"
                                                            isFocused={false}
                                                            onChange={(e) => setData('', e.target.value)}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <InputLabel value='Address/City/State' />
                                                        <TextInput 
                                                            id="address"
                                                            type="text"
                                                            name="address"
                                                            value={experience.address}
                                                            className="w-full"
                                                            autoComplete="address"
                                                            isFocused={false}
                                                            onChange={(e) => setData('', e.target.value)}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <InputLabel value='Supervisor Name' />
                                                        <TextInput 
                                                            id="supervisor_name"
                                                            type="text"
                                                            name="supervisor_name"
                                                            value={experience.supervisor_name}
                                                            className="w-full"
                                                            autoComplete="supervisor_name"
                                                            isFocused={false}
                                                            onChange={(e) => setData('', e.target.value)}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <InputLabel value='Phone Number' />
                                                        <div className="grid grid-cols-3 gap-2">
                                                            <div>
                                                                <TextInput 
                                                                    id="dial_code"
                                                                    type="text"
                                                                    name="dial_code"
                                                                    value={experience.dial_code}
                                                                    className="w-full"
                                                                    autoComplete="dial_code"
                                                                    isFocused={false}
                                                                    onChange={(e) => setData('', e.target.value)}
                                                                    readOnly={true}
                                                                />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <TextInput 
                                                                    id="phone_no"
                                                                    type="text"
                                                                    name="phone_no"
                                                                    value={experience.phone_no}
                                                                    className="w-full "
                                                                    autoComplete="phone_no"
                                                                    isFocused={false}
                                                                    onChange={(e) => setData('', e.target.value)}
                                                                    readOnly={true}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <InputLabel value='Starting Salary' />
                                                        <TextInput 
                                                            id="starting_salary"
                                                            type="text"
                                                            name="starting_salary"
                                                            value={formatAmount(experience.starting_salary)}
                                                            className="w-full"
                                                            autoComplete="starting_salary"
                                                            isFocused={false}
                                                            onChange={(e) => setData('', e.target.value)}
                                                            prefix="RM"
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <InputLabel value='Ending Salary' />
                                                        <TextInput 
                                                            id="ending_salary"
                                                            type="text"
                                                            name="ending_salary"
                                                            value={formatAmount(experience.ending_salary)}
                                                            className="w-full"
                                                            autoComplete="ending_salary"
                                                            isFocused={false}
                                                            onChange={(e) => setData('', e.target.value)}
                                                            prefix="RM"
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    </>
                                ) : (
                                    <div className="p-5">
                                        <Checkbox checked={true} onChange={() => {}} >I do not have any work experience</Checkbox>
                                    </div>
                                )
                            }
                        </div>

                        {/* References */}
                        <div className="flex flex-col border border-gray-200 shadow-smShadow ">
                            <div className="py-4 px-5 text-gray-950 text-base font-semibold border-b border-gray-200">
                                References
                            </div>
                            {
                                jobApplicant.job_reference.length > 0 ? (
                                    <>
                                        {
                                            jobApplicant.job_reference.map((reference, index) => (
                                                <div className="p-5 flex flex-col gap-5" key={index}>
                                                    <div className="text-gray-950 text-base font-semibold">
                                                        Reference {index + 1}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-5">
                                                        <div className="flex flex-col gap-2">
                                                            <InputLabel value='Full Name' />
                                                            <TextInput 
                                                                id="full_name"
                                                                type="text"
                                                                name="full_name"
                                                                value={reference.full_name}
                                                                className="w-full"
                                                                autoComplete="full_name"
                                                                isFocused={false}
                                                                onChange={(e) => setData('', e.target.value)}
                                                                readOnly={true} 
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <InputLabel value='Relationship' />
                                                            <TextInput 
                                                                id="relationship"
                                                                type="text"
                                                                name="relationship"
                                                                value={reference.relationship}
                                                                className="w-full"
                                                                autoComplete="relationship"
                                                                isFocused={false}
                                                                onChange={(e) => setData('', e.target.value)}
                                                                readOnly={true} 
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <InputLabel value='Phone Number' />
                                                            <div className="grid grid-cols-3 gap-2">
                                                                <div>
                                                                    <TextInput 
                                                                        id="dial_code"
                                                                        type="text"
                                                                        name="dial_code"
                                                                        value={reference.dial_code}
                                                                        className="w-full"
                                                                        autoComplete="dial_code"
                                                                        isFocused={false}
                                                                        onChange={(e) => setData('', e.target.value)}
                                                                        readOnly={true}
                                                                    />
                                                                </div>
                                                                <div className="col-span-2">
                                                                    <TextInput 
                                                                        id="phone_no"
                                                                        type="text"
                                                                        name="phone_no"
                                                                        value={reference.phone_no}
                                                                        className="w-full "
                                                                        autoComplete="phone_no"
                                                                        isFocused={false}
                                                                        onChange={(e) => setData('', e.target.value)}
                                                                        readOnly={true}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <InputLabel value='Email' />
                                                            <TextInput 
                                                                id="relationship"
                                                                type="text"
                                                                name="relationship"
                                                                value={reference.email}
                                                                className="w-full"
                                                                autoComplete="relationship"
                                                                isFocused={false}
                                                                onChange={(e) => setData('', e.target.value)}
                                                                readOnly={true} 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                ) : <span>Do not have any reference</span>
                            }
                        </div>

                        {/* Language */}
                        <div className="flex flex-col border border-gray-200 shadow-smShadow ">
                            <div className="py-4 px-5 text-gray-950 text-base font-semibold border-b border-gray-200">
                                Language Proficiency
                            </div>
                            <div className="flex flex-col">
                                <div className="p-5 flex flex-col gap-5">
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-950 text-base font-semibold">English</div>
                                        <div className="max-w-[500px] w-full flex justify-between">
                                            <div className="text-gray-700 text-xs w-20 text-center">Very Poor</div>
                                            <div className="text-gray-700 text-xs w-20 text-center">Poor</div>
                                            <div className="text-gray-700 text-xs w-20 text-center">Fair</div>
                                            <div className="text-gray-700 text-xs w-20 text-center">Good</div>
                                            <div className="text-gray-700 text-xs w-20 text-center">Very Good</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-700 text-sm">Speaking</div>
                                        <Radio.Group
                                            value={jobApplicant.job_language.en_speaking}
                                            onChange={(e) => setData('', e.target.value)}
                                            className="max-w-[500px] w-full flex justify-between px-8"
                                            >
                                            {['1', '2', '3', '4', '5'].map((value) => (
                                                <Radio key={value} value={value} />
                                            ))}
                                        </Radio.Group>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-700 text-sm">Writing</div>
                                        <Radio.Group
                                            value={jobApplicant.job_language.en_writting}
                                            onChange={(e) => setData('', e.target.value)}
                                            className="max-w-[500px] w-full flex justify-between px-8"
                                            >
                                            {['1', '2', '3', '4', '5'].map((value) => (
                                                <Radio key={value} value={value} />
                                            ))}
                                        </Radio.Group>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-700 text-sm">Listening</div>
                                        <Radio.Group
                                            value={jobApplicant.job_language.en_listening}
                                            onChange={(e) => setData('', e.target.value)}
                                            className="max-w-[500px] w-full flex justify-between px-8"
                                            >
                                            {['1', '2', '3', '4', '5'].map((value) => (
                                                <Radio key={value} value={value} />
                                            ))}
                                        </Radio.Group>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col gap-5">
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-950 text-base font-semibold">Bahasa Malaysia</div>
                                        <div className="max-w-[500px] w-full flex justify-between">
                                            <div className="text-gray-700 text-xs w-20 text-center">Very Poor</div>
                                            <div className="text-gray-700 text-xs w-20 text-center">Poor</div>
                                            <div className="text-gray-700 text-xs w-20 text-center">Fair</div>
                                            <div className="text-gray-700 text-xs w-20 text-center">Good</div>
                                            <div className="text-gray-700 text-xs w-20 text-center">Very Good</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-700 text-sm">Speaking</div>
                                        <Radio.Group
                                            value={jobApplicant.job_language.bm_speaking}
                                            onChange={(e) => setData('', e.target.value)}
                                            className="max-w-[500px] w-full flex justify-between px-8"
                                            >
                                            {['1', '2', '3', '4', '5'].map((value) => (
                                                <Radio key={value} value={value} />
                                            ))}
                                        </Radio.Group>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-700 text-sm">Writing</div>
                                        <Radio.Group
                                            value={jobApplicant.job_language.bm_writting}
                                            onChange={(e) => setData('', e.target.value)}
                                            className="max-w-[500px] w-full flex justify-between px-8"
                                            >
                                            {['1', '2', '3', '4', '5'].map((value) => (
                                                <Radio key={value} value={value} />
                                            ))}
                                        </Radio.Group>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-700 text-sm">Listening</div>
                                        <Radio.Group
                                            value={jobApplicant.job_language.bm_listening}
                                            onChange={(e) => setData('', e.target.value)}
                                            className="max-w-[500px] w-full flex justify-between px-8"
                                            >
                                            {['1', '2', '3', '4', '5'].map((value) => (
                                                <Radio key={value} value={value} />
                                            ))}
                                        </Radio.Group>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col gap-5">
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-950 text-base font-semibold">Chinese</div>
                                        <div className="max-w-[500px] w-full flex justify-between">
                                            <div className="text-gray-700 text-xs w-20 text-center">Very Poor</div>
                                            <div className="text-gray-700 text-xs w-20 text-center">Poor</div>
                                            <div className="text-gray-700 text-xs w-20 text-center">Fair</div>
                                            <div className="text-gray-700 text-xs w-20 text-center">Good</div>
                                            <div className="text-gray-700 text-xs w-20 text-center">Very Good</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-700 text-sm">Speaking</div>
                                        <Radio.Group
                                            value={jobApplicant.job_language.cn_speaking}
                                            onChange={(e) => setData('', e.target.value)}
                                            className="max-w-[500px] w-full flex justify-between px-8"
                                            >
                                            {['1', '2', '3', '4', '5'].map((value) => (
                                                <Radio key={value} value={value} />
                                            ))}
                                        </Radio.Group>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-700 text-sm">Writing</div>
                                        <Radio.Group
                                            value={jobApplicant.job_language.cn_writting}
                                            onChange={(e) => setData('', e.target.value)}
                                            className="max-w-[500px] w-full flex justify-between px-8"
                                            >
                                            {['1', '2', '3', '4', '5'].map((value) => (
                                                <Radio key={value} value={value} />
                                            ))}
                                        </Radio.Group>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-700 text-sm">Listening</div>
                                        <Radio.Group
                                            value={jobApplicant.job_language.cn_listening}
                                            onChange={(e) => setData('', e.target.value)}
                                            className="max-w-[500px] w-full flex justify-between px-8"
                                            >
                                            {['1', '2', '3', '4', '5'].map((value) => (
                                                <Radio key={value} value={value} />
                                            ))}
                                        </Radio.Group>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col gap-5">
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-950 text-base font-semibold">{jobApplicant.job_language.others_language}</div>
                                        <div className="max-w-[500px] w-full flex justify-between">
                                            <div className="text-gray-700 text-xs w-20 text-center">Very Poor</div>
                                            <div className="text-gray-700 text-xs w-20 text-center">Poor</div>
                                            <div className="text-gray-700 text-xs w-20 text-center">Fair</div>
                                            <div className="text-gray-700 text-xs w-20 text-center">Good</div>
                                            <div className="text-gray-700 text-xs w-20 text-center">Very Good</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-700 text-sm">Speaking</div>
                                        <Radio.Group
                                            value={jobApplicant.job_language.others_speaking}
                                            onChange={(e) => setData('', e.target.value)}
                                            className="max-w-[500px] w-full flex justify-between px-8"
                                            >
                                            {['1', '2', '3', '4', '5'].map((value) => (
                                                <Radio key={value} value={value} />
                                            ))}
                                        </Radio.Group>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-700 text-sm">Writing</div>
                                        <Radio.Group
                                            value={jobApplicant.job_language.others_writting}
                                            onChange={(e) => setData('', e.target.value)}
                                            className="max-w-[500px] w-full flex justify-between px-8"
                                            >
                                            {['1', '2', '3', '4', '5'].map((value) => (
                                                <Radio key={value} value={value} />
                                            ))}
                                        </Radio.Group>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-gray-700 text-sm">Listening</div>
                                        <Radio.Group
                                            value={jobApplicant.job_language.others_listening}
                                            onChange={(e) => setData('', e.target.value)}
                                            className="max-w-[500px] w-full flex justify-between px-8"
                                            >
                                            {['1', '2', '3', '4', '5'].map((value) => (
                                                <Radio key={value} value={value} />
                                            ))}
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Transportation */}
                        <div className="flex flex-col border border-gray-200 shadow-smShadow ">
                            <div className="py-4 px-5 text-gray-950 text-base font-semibold border-b border-gray-200">
                                Transportation and Location
                            </div>
                            <div className="p-5 flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Transportation Used to Work' />
                                    <div className="py-3">
                                        <Checkbox.Group 
                                            options={worksTransport}
                                            value={jobApplicant.job_transport.work_transportation}
                                            onChange={() => {}}
                                            className="gap-x-8 gap-y-5 text-sm text-gray-950"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Approximate Distance from Your Residence to Our Company' />
                                    <InputNumber 
                                        inputId="km"
                                        value={jobApplicant.job_transport.approximate_distance} 
                                        onValueChange={(e) => setData('approximate_distance', e.value)} 
                                        suffix=" km" 
                                        className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                        minFractionDigits={1}
                                        maxFractionDigits={2}
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Approximate Time Needed from Your Residence to Our Company' />
                                    <div className="flex items-center gap-5 w-full">
                                        <InputNumber 
                                            inputId="hours"
                                            value={jobApplicant.job_transport.approximate_hours} 
                                            onValueChange={(e) => setData('approximate_hours', e.value)} 
                                            suffix=" hour(s)" 
                                            className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                            max={24}
                                            readOnly
                                        />
                                        <InputNumber 
                                            inputId="minutes"
                                            value={jobApplicant.job_transport.approximate_minutes
                                            } 
                                            onValueChange={(e) => setData('approximate_minutes', e.value)} 
                                            suffix=" minute(s)" 
                                            className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                            max={59}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="flex flex-col border border-gray-200 shadow-smShadow ">
                            <div className="py-4 px-5 text-gray-950 text-base font-semibold border-b border-gray-200">
                                Additional Information
                            </div>
                            <div className="p-5 flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Available for overtime when necessary?' />
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Radio.Group 
                                                    options={['Yes', 'No']}
                                                    value={jobApplicant.job_additional.overtime_type}
                                                    className="flex gap-x-6 gap-y-5 text-sm text-gray-950"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Are you currently under investigation by the authorities?' />
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Radio.Group 
                                                    options={['Yes', 'No']}
                                                    value={jobApplicant.job_additional.investigate_type}
                                                    className="flex gap-x-6 gap-y-5 text-sm text-gray-950"
                                                />
                                            </div>
                                            <div className="w-full max-w-[500px]">
                                                <TextInput 
                                                    id="allergic_remark"
                                                    type="text"
                                                    name="allergic_remark"
                                                    value={jobApplicant.job_additional.investigate_remark || ''}
                                                    className=" disabled:cursor-not-allowed"
                                                    autoComplete="allergic_remark"
                                                    onChange={(e) => setData('allergic_remark', e.target.value)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Have you been convicted by any court or law in any country?' />
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Radio.Group 
                                                    options={['Yes', 'No']}
                                                    value={jobApplicant.job_additional.convicted_type}
                                                    className="flex gap-x-6 gap-y-5 text-sm text-gray-950"
                                                />
                                            </div>
                                            <div className="w-full max-w-[500px]">
                                                <TextInput 
                                                    id="allergic_remark"
                                                    type="text"
                                                    name="allergic_remark"
                                                    value={jobApplicant.job_additional.convicted_remark || ''}
                                                    className=" disabled:cursor-not-allowed"
                                                    autoComplete="allergic_remark"
                                                    onChange={(e) => setData('allergic_remark', e.target.value)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Have you ever been dismissed or suspended from any position?' />
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Radio.Group 
                                                    options={['Yes', 'No']}
                                                    value={jobApplicant.job_additional.suspended_type}
                                                    className="flex gap-x-6 gap-y-5 text-sm text-gray-950"
                                                />
                                            </div>
                                            <div className="w-full max-w-[500px]">
                                                <TextInput 
                                                    id="allergic_remark"
                                                    type="text"
                                                    name="allergic_remark"
                                                    value={jobApplicant.job_additional.suspended_remark || ''}
                                                    className=" disabled:cursor-not-allowed"
                                                    autoComplete="allergic_remark"
                                                    onChange={(e) => setData('allergic_remark', e.target.value)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Are you holding a directorship or other appointment in any company?' />
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Radio.Group 
                                                    options={['Yes', 'No']}
                                                    value={jobApplicant.job_additional.directorship_type}
                                                    className="flex gap-x-6 gap-y-5 text-sm text-gray-950"
                                                />
                                            </div>
                                            <div className="w-full max-w-[500px]">
                                                <TextInput 
                                                    id="allergic_remark"
                                                    type="text"
                                                    name="allergic_remark"
                                                    value={jobApplicant.job_additional.directorship_remark || ''}
                                                    className=" disabled:cursor-not-allowed"
                                                    autoComplete="allergic_remark"
                                                    onChange={(e) => setData('allergic_remark', e.target.value)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Do you have friends or relatives in this company?' />
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Radio.Group 
                                                    options={['Yes', 'No']}
                                                    value={jobApplicant.job_additional.relative_type}
                                                    className="flex gap-x-6 gap-y-5 text-sm text-gray-950"
                                                />
                                            </div>
                                            <div className="w-full max-w-[500px]">
                                                <TextInput 
                                                    id="allergic_remark"
                                                    type="text"
                                                    name="allergic_remark"
                                                    value={jobApplicant.job_additional.relative_remark || ''}
                                                    className=" disabled:cursor-not-allowed"
                                                    autoComplete="allergic_remark"
                                                    onChange={(e) => setData('allergic_remark', e.target.value)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='Do you suffer from or are you being treated for any medical (including mental health) condition?' />
                                    
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputLabel value='How did you find out about this job?' />
                                    <div className="flex w-full items-center">
                                        <Checkbox.Group 
                                            options={[
                                                { label:'Internet Posting', value:'Internet Posting'},
                                                { label:'Employee Referral', value:'Employee Referral'}, 
                                                { label:'Others:', value: 'Other'}
                                            ]}
                                            value={jobApplicant.job_additional.job_type}
                                            onChange={() => {}}
                                            className="gap-x-8 gap-y-5 text-sm text-gray-950"
                                        />
                                        <div className="flex flex-col max-w-[252px] w-full">
                                            <TextInput
                                                id="find_job_remark"
                                                type="text"
                                                name="find_job_remark"
                                                value={jobApplicant.job_additional.job_remark || ''}
                                                className="flex flex-col items-start gap-2 w-full"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Declaration */}
                        <div className="flex flex-col border border-gray-200 shadow-smShadow ">
                            <div className="py-4 px-5 text-gray-950 text-base font-semibold border-b border-gray-200">
                                Declaration
                            </div>
                            <div className="p-5 flex flex-col gap-8">
                                <div className="flex flex-col gap-5 text-gray-700 text-sm">
                                    <span>
                                        I affirm that all Personal Data provided by me, along with the certificates and supporting documents<br />
                                        mentioned in this form, are accurate, current, and complete. I acknowledge that any intentional<br />
                                        misrepresentation or omission may impact my eligibility for employment, internship, or scholarship offers,<br />
                                        potentially resulting in the withdrawal of such offers or immediate termination if discovered.
                                    </span>
                                    <span>
                                        I authorise and consent to you contacting my current and previous employers and character referees for<br />
                                        reference requests, confirming that I have obtained their consent to disclose their contact details to you.
                                    </span>
                                    <span>
                                        I further authorise and consent to any third party involved in conducting character, credit, medical, or<br />
                                        compliance checks—such as present and previous employers, character referees, or medical professionals—<br />
                                        to disclose information pertaining to me, including opinions about me, for the purpose of processing my<br />
                                        application for employment, internship, or scholarship with your organisation.
                                    </span>
                                    <span>
                                        I explicitly authorise and consent to the processing of my Personal Data for the purpose of evaluating my<br />
                                        application for employment, internship, or scholarship, as well as for the necessary administrative functions
                                        associated with these opportunities.
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-gray-700 text-sm">Applicant’s Signature</div>
                                    <div className="w-full bg-gray-50 h-80">
                                        <img src={jobApplicant?.digital_signature} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}