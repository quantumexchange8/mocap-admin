import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Radio } from "antd";
import React from "react";
import { Checkbox } from 'antd';
import { InputNumber } from 'primereact/inputnumber';


export default function EmployeeInfo({employee, contentRef}) {

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

    const isNoneSelected = employee.transportinfo.own_transport?.includes('None');

    const transportsOption = transports.map(option => ({
        label: option,
        value: option,
        disabled: isNoneSelected && option !== 'None'
    }));

    const isLicenseNoneSelected = employee.transportinfo.license_id?.includes('None');

    const licenseOption = licenses.map(option => ({
        label: option,
        value: option,
        disabled: isLicenseNoneSelected && option !== 'None'
    }));

    const bloodType = [
        {value: 'A+', label: 'A+'},
        {value: 'A-', label: 'A-'},
        {value: 'B+', label: 'B+'},
        {value: 'B-', label: 'B-'},
        {value: 'AB+', label: 'AB+'},
        {value: 'AB-', label: 'AB-'},
        {value: 'O+', label: 'O+'},
        {value: 'O-', label: 'O-'},
    ]

    const insurance  = [
        'None', 
        'Life Insurance', 
        'Medical Plan', 
        'Accident Insurance',
        'Critical Illness Insurance',
        'Savings or Investment-Linked Policies',
    ];

    const isNoneInsuranceSelected = employee.beneficiaryinfo.insurance_id?.includes('None');

    const insuranceOption = insurance.map(option => ({
        label: option,
        value: option,
        disabled: isNoneInsuranceSelected && option !== 'None'
    }));

    return(

    <div ref={contentRef} className="flex flex-col gap-5 items-center">
        {/* Personal Info */}
        <div className="flex max-w-[728px] w-full flex-col border border-gray-200 bg-white rounded-sm shadow-smShadow">
            <div className="flex flex-col py-4 px-5 border-b border-gray-200">
                <div className="text-gray-950 text-base font-semibold">Personal Information</div>
            </div>
            <div className="p-5 grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="name" value="Full Name"/>
                    <TextInput 
                        id="name"
                        type="text"
                        name="name"
                        value={employee.name}
                        className="w-full"
                        placeholder="as per NRIC/Passport"
                        autoComplete="name"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="username" value="Preferred Name" />
                    <TextInput 
                        id="username"
                        type="text"
                        name="username"
                        value={employee.username}
                        className="w-full"
                        placeholder="Your name as it will appear in the app"
                        autoComplete="username"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="nationality" value="Nationality"/>
                    <TextInput 
                        id="nationality"
                        type="text"
                        name="nationality"
                        value={employee.nationality}
                        className="w-full"
                        autoComplete="nationality"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="identity_no" value="NRIC/Passport No."/>
                    <TextInput 
                        id="identity_no"
                        type="text"
                        name="identity_no"
                        value={employee.identity_no}
                        className="w-full"
                        placeholder="901223145678 / A12345678"
                        autoComplete="identity_no"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="gender" value="Gender"/>
                    <Radio.Group 
                        value={employee.gender}
                        options={[
                            {value: 'male', label: 'Male'},
                            {value: 'female', label: 'Female'},
                        ]}
                        className="py-3"
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="dob" value="Date of Birth " />
                    <TextInput 
                        id="dob"
                        type="text"
                        name="dob"
                        value={employee.dob}
                        className="w-full"
                        autoComplete="dob"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="race" value="Race"/>
                    <TextInput 
                        id="race"
                        type="text"
                        name="race"
                        value={employee.race}
                        className="w-full"
                        autoComplete="gender"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="religion" value="Religion"/>
                    <TextInput 
                        id="religion"
                        type="text"
                        name="religion"
                        value={employee.religion}
                        className="w-full"
                        autoComplete="gender"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="place_of_birth" value="Place of Birth"/>
                    <TextInput 
                        id="place_of_birth"
                        type="text"
                        name="place_of_birth"
                        value={employee.place_of_birth}
                        className="w-full"
                        autoComplete="gender"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="marital_status" value="Marital Status" />
                    <TextInput 
                        id="marital_status"
                        type="text"
                        name="marital_status"
                        value={employee.maritial_status}
                        className="w-full"
                        autoComplete="gender"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="phone_no" value="Phone Number" />
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <TextInput 
                                id="dial_code"
                                type="text"
                                name="dial_code"
                                value={employee.dial_code}
                                className="w-full"
                                autoComplete="dial_code"
                                onChange={(e) => setData('', e.target.value)}
                                readOnly={true}
                            />
                        </div>
                        <div className="col-span-2">
                            <TextInput 
                                id="phone_no"
                                type="text"
                                name="phone_no"
                                value={employee.phone_no}
                                className="w-full "
                                autoComplete="phone_no"
                                onChange={(e) => setData('', e.target.value)}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput 
                        id="email"
                        type="text"
                        name="email"
                        value={employee.email}
                        className="w-full"
                        placeholder="you@example.com"
                        autoComplete="email"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="col-span-2  flex flex-col gap-2">
                    <InputLabel htmlFor="address" value="Current Address"/>
                    <TextInput 
                        id="address"
                        type="text"
                        name="address"
                        value={employee.address}
                        className="w-full"
                        placeholder="House no./unit no., building name, street name/district, etc."
                        autoComplete="address"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="col-span-2 grid grid-cols-3 gap-5">
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="postcode" value="Postcode"/>
                        <TextInput 
                            id="postcode"
                            type="number"
                            name="postcode"
                            value={employee.postcode}
                            className="w-full"
                            placeholder="e.g. 50000"
                            autoComplete="postcode"
                            onChange={(e) => setData('', e.target.value)}
                            readOnly={true}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="city" value="City"/>
                        <TextInput 
                            id="city"
                            type="text"
                            name="address"
                            value={employee.city}
                            className="w-full"
                            placeholder="e.g. Kuala Lumpur"
                            autoComplete="city"
                            readOnly={true}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="state" value="State" />
                        <TextInput 
                            id="state"
                            type="text"
                            name="state"
                            value={employee.state}
                            className="w-full"
                            placeholder="e.g. Kuala Lumpur"
                            autoComplete="city"
                            onChange={(e) => setData('', e.target.value)}
                            readOnly={true}
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Bank Info */}
        <div className="flex max-w-[728px] w-full flex-col border border-gray-200 bg-white rounded-sm shadow-smShadow">
            <div className="flex flex-col py-4 px-5 border-b border-gray-200">
                <div className="text-gray-950 text-base font-semibold">Bank and Contribution Information</div>
            </div>
            <div className="p-5 grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="bank_name" value="Bank Name" />
                    <TextInput 
                        id="bank_name"
                        type="text"
                        name="bank_name"
                        value={employee.employeebank.bank_name}
                        className="w-full"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="acc_type" value="Bank Account Type" />
                    <TextInput 
                        id="acc_type"
                        type="text"
                        name="acc_type"
                        value={employee.employeebank.acc_type}
                        className="w-full"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="acc_no" value="Bank Account No." />
                    <TextInput 
                        id="acc_no"
                        type="text"
                        name="acc_no"
                        value={employee.employeebank.acc_no}
                        className="w-full"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="income_tax_no" value="Income Tax No. (PCB No.)"/>
                    <TextInput 
                        id="income_tax_no"
                        type="text"
                        name="income_tax_no"
                        value={employee.employeebank.income_tax_no}
                        className="w-full"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="epf_no" value="EPF No." />
                    <TextInput 
                        id="epf_no"
                        type="text"
                        name="epf_no"
                        value={employee.employeebank.epf_no}
                        className="w-full"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="socso_no" value="SOCSO No." />
                    <TextInput 
                        id="socso_no"
                        type="text"
                        name="socso_no"
                        value={employee.employeebank.socso_no}
                        className="w-full"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
            </div>
        </div>

        {/* Emergency Info */}
        <div className="flex max-w-[728px] w-full flex-col border border-gray-200 bg-white rounded-sm shadow-smShadow">
            <div className="flex flex-col py-4 px-5 border-b border-gray-200">
                <div className="text-gray-950 text-base font-semibold">Emergency Contact Information</div>
            </div>
            <div className="p-5 grid grid-cols-2 gap-5">
                <div className="col-span-2 text-gray-950 text-base font-semibold">
                    Primary
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="emerge1_fullname" value="Full Name"/>
                    <TextInput 
                        id="emerge1_fullname"
                        type="text"
                        name="emerge1_fullname"
                        value={employee.emergencyinfo[0].full_name}
                        className="w-full"
                        placeholder="as per NRIC/Passport"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="relation1" value="Relationship"/>
                    <TextInput 
                        id="relation1"
                        type="text"
                        name="relation1"
                        value={employee.emergencyinfo[0].relationship}
                        className="w-full"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="phone_no" value="Phone Number" />
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <TextInput 
                                id="emer1_dial_code"
                                type="text"
                                name="emer1_dial_code"
                                value={employee.emergencyinfo[0].dial_code}
                                className="w-full"
                                onChange={(e) => setData('', e.target.value)}
                                readOnly={true}
                            />
                        </div>
                        <div className="col-span-2">
                            <TextInput 
                                id="emer1_phone_no"
                                type="text"
                                name="emer1_phone_no"
                                value={employee.emergencyinfo[0].phone_no}
                                className="w-full "
                                autoComplete="emer1_phone_no"
                                onChange={(e) => setData('', e.target.value)}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5 grid grid-cols-2 gap-5">
                <div className="col-span-2 text-gray-950 text-base font-semibold">
                    Secondary
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="emerge2_fullname" value="Full Name"/>
                    <TextInput 
                        id="emerge2_fullname"
                        type="text"
                        name="emerge2_fullname"
                        value={employee.emergencyinfo[1].full_name}
                        className="w-full"
                        placeholder="as per NRIC/Passport"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="relation2" value="Relationship"/>
                    <TextInput 
                        id="relation2"
                        type="text"
                        name="relation2"
                        value={employee.emergencyinfo[1].relationship}
                        className="w-full"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="phone_no" value="Phone Number" />
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <TextInput 
                                id="emer2_dial_code"
                                type="text"
                                name="emer2_dial_code"
                                value={employee.emergencyinfo[1].dial_code}
                                className="w-full"
                                autoComplete="emer2_dial_code"
                                onChange={(e) => setData('', e.target.value)}
                                readOnly={true}
                            />
                        </div>
                        <div className="col-span-2">
                            <TextInput 
                                id="emer2_phone_no"
                                type="text"
                                name="emer2_phone_no"
                                value={employee.emergencyinfo[1].phone_no}
                                className="w-full "
                                autoComplete="emer2_phone_no"
                                onChange={(e) => setData('', e.target.value)}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Transport Info */}
        <div className="flex max-w-[728px] w-full flex-col border border-gray-200 bg-white rounded-sm shadow-smShadow">
            <div className="flex flex-col py-4 px-5 border-b border-gray-200">
                <div className="text-gray-950 text-base font-semibold">Transportation and Location</div>
            </div>
            <div className="p-5 flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="own_transport" value="Do you have your own transportation?"/>
                    <div className="py-3">
                        <Checkbox.Group 
                            options={transportsOption}
                            value={employee.transportinfo.own_transport}
                            className="gap-x-8 gap-y-5 text-sm text-gray-950"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="license_id" value="Do you have a driver's license?" />
                    <div className="py-3">
                        <Checkbox.Group 
                            options={licenseOption}
                            value={employee.transportinfo.license_id}
                            className="gap-x-8 gap-y-5 text-sm text-gray-950"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="work_transport" value="Transportation Used to Work" />
                    <div className="py-3">
                        <Checkbox.Group 
                            options={worksTransport}
                            value={employee.transportinfo.work_transportation}
                            className="gap-x-8 gap-y-5 text-sm text-gray-950"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="work_transport" value="Approximate Distance from Your Residence to Our Company" />
                    <InputNumber 
                        inputId="km"
                        value={employee.transportinfo.approximate_distance || 0} 
                        suffix=" km" 
                        className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                        minFractionDigits={1}
                        maxFractionDigits={2}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="work_transport" value="Approximate Time Needed from Your Residence to Our Company"/>
                    <div className="flex items-center gap-5 w-full">
                        <div className="flex flex-col gap-2 w-full ">
                            <InputNumber 
                                inputId="hours"
                                value={employee.transportinfo.approximate_hours || 0} 
                                suffix=" hour(s)" 
                                className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                max={24}
                                readOnly={true}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <InputNumber 
                                inputId="minutes"
                                value={employee.transportinfo.approximate_minutes || 0.0} 
                                suffix=" minute(s)" 
                                className="w-full border-gray-300 hover:border-gray-400 focus:border-gray-950"
                                max={59}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Medical Information */}
        <div className="flex max-w-[728px] w-full flex-col border border-gray-200 bg-white rounded-sm shadow-smShadow">
            <div className="flex flex-col py-4 px-5 border-b border-gray-200">
                <div className="text-gray-950 text-base font-semibold">Medical Information</div>
            </div>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="blood_type" value="What is your blood type?"/>
                    <Radio.Group 
                        value={employee.medicalinfo.blood_type}
                        options={bloodType}
                        className="py-3 flex gap-x-4"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="allergic_type" value="Are you allergic to any food?"/>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <Radio.Group 
                                value={employee.medicalinfo.allergic_type}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <div className="w-full max-w-[500px]">
                                <TextInput 
                                    id="allergic_remark"
                                    type="text"
                                    name="allergic_remark"
                                    value={employee.medicalinfo.allergic_remark || ''}
                                    className="disabled:cursor-not-allowed"
                                    autoComplete="allergic_remark"
                                    disabled={employee.medicalinfo.allergic_type === 'No'}
                                    onChange={(e) => setData('', e.target.value)}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="medical_type" value="Are you being treated for any medical (including mental health) condition?"/>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <Radio.Group 
                                value={employee.medicalinfo.medical_type}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <div className="w-full max-w-[500px]">
                                <TextInput 
                                    id="medical_remark"
                                    type="text"
                                    name="medical_remark"
                                    value={employee.medicalinfo.medical_remark || ''}
                                    className="disabled:cursor-not-allowed"
                                    autoComplete="medical_remark"
                                    disabled={employee.medicalinfo.medical_type === 'No'}
                                    onChange={(e) => setData('', e.target.value)}
                                    readOnly={true}
                                />
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="medication_type" value="Are you currently taking any medications?" />
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <Radio.Group 
                                value={employee.medicalinfo.medication_type}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <div className="w-full max-w-[500px]">
                                <TextInput 
                                    id="medication_remark"
                                    type="text"
                                    name="medication_remark"
                                    value={employee.medicalinfo.medication_remark || ''}
                                    className="disabled:cursor-not-allowed"
                                    autoComplete="medication_remark"
                                    disabled={employee.medicalinfo.medication_type === 'No'}
                                    onChange={(e) => setData('', e.target.value)}
                                    readOnly={true}
                                />
                            </div>                            
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="pregnant_type" value="Are you currently pregnant?"/>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <Radio.Group 
                                value={employee.medicalinfo.pregnant_type}
                                options={['No', 'Yes']}
                                className="py-3"
                            />
                            <div className="w-full max-w-[500px]">
                                <TextInput 
                                    id="pregnant_remark"
                                    type="text"
                                    name="pregnant_remark"
                                    value={employee.medicalinfo.pregnant_remark || ''}
                                    className="disabled:cursor-not-allowed"
                                    autoComplete="pregnant_remark"
                                    disabled={employee.medicalinfo.pregnant_type === 'No' || employee.medicalinfo.gender === 'male'}
                                    onChange={(e) => setData('', e.target.value)}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="pregnant_delivery_date" value="If you are pregnant, when is your expected date of delivery?" />
                    <div className="max-w-[220px]">
                        <TextInput 
                            id="pregnant_delivery_date"
                            type="text"
                            name="pregnant_delivery_date"
                            value={employee.medicalinfo.pregnant_delivery_date || ''}
                            className="disabled:cursor-not-allowed"
                            onChange={(e) => setData('', e.target.value)}
                            readOnly={true}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="pregnancy_medication_type" value="If you are pregnant, are you taking any pregnancy medications?" />
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <Radio.Group 
                                value={employee.medicalinfo.pregnancy_medication_type}
                                options={['No', 'Yes']}
                                className="py-3"
                                disabled={employee.medicalinfo.gender === 'male'}
                            />
                            <div className="w-full max-w-[500px]">
                                <TextInput 
                                    id="pregnancy_medication_remark"
                                    type="text"
                                    name="pregnancy_medication_remark"
                                    value={employee.medicalinfo.pregnancy_medication_remark || ''}
                                    className="disabled:cursor-not-allowed"
                                    autoComplete="pregnancy_medication_remark"
                                    disabled={employee.medicalinfo.pregnancy_medication_type === 'No' || employee.medicalinfo.gender === 'male'}
                                    onChange={(e) => setData('', e.target.value)}
                                    readOnly={true}
                                />
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="gynaecological_type" value="Do you suffer from any gynaecological diseases?"/>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <Radio.Group 
                                value={employee.medicalinfo.gynaecological_type}
                                options={['No', 'Yes']}
                                className="py-3"
                                disabled={employee.medicalinfo.gender === 'male'}
                            />
                            <div className="w-full max-w-[500px]">
                                <TextInput 
                                    id="gynaecological_remark"
                                    type="text"
                                    name="gynaecological_remark"
                                    value={employee.medicalinfo.gynaecological_remark || ''}
                                    className="disabled:cursor-not-allowed"
                                    autoComplete="gynaecological_remark"
                                    disabled={employee.medicalinfo.gynaecological_type === 'No' || employee.medicalinfo.gender === 'male'}
                                    onChange={(e) => setData('', e.target.value)}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Beneficiary Info */}
        <div className="flex max-w-[728px] w-full flex-col border border-gray-200 bg-white rounded-sm shadow-smShadow">
            <div className="flex flex-col py-4 px-5 border-b border-gray-200">
                <div className="text-gray-950 text-base font-semibold">Beneficiary/Nominee Information</div>
            </div>
            <div className="p-5 grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="beneficiary_fullname" value="Full Name"/>
                    <TextInput 
                        id="beneficiary_fullname"
                        type="text"
                        name="beneficiary_fullname"
                        value={employee.beneficiaryinfo.full_name}
                        className="w-full"
                        placeholder="as per NRIC/Passport"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="beneficiary_relation" value="Relationship" />
                    <TextInput 
                        id="beneficiary_relation"
                        type="text"
                        name="beneficiary_relation"
                        value={employee.beneficiaryinfo.relationship}
                        className="w-full"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="beneficiary_identity" value="NRIC/Passport No."/>
                    <TextInput 
                        id="beneficiary_identity"
                        type="text"
                        name="beneficiary_identity"
                        value={employee.beneficiaryinfo.indentity_no}
                        className="w-full"
                        onChange={(e) => setData('', e.target.value)}
                        readOnly={true}
                    />
                </div>
               <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="beneficiary_phone_no" value="Phone Number" />
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <TextInput 
                                id="beneficiary_dial_code"
                                type="text"
                                name="beneficiary_dial_code"
                                value={employee.beneficiaryinfo.dial_code}
                                className="w-full"
                                onChange={(e) => setData('', e.target.value)}
                                readOnly={true}
                            />
                        </div>
                        <div className="col-span-2">
                            <TextInput 
                                id="beneficiary_phone_no"
                                type="text"
                                name="beneficiary_phone_no"
                                value={employee.beneficiaryinfo.phone_no}
                                className="w-full "
                                autoComplete="beneficiary_phone_no"
                                onChange={(e) => setData('', e.target.value)}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                    <InputLabel htmlFor="personal_insurance" value="Do you have any personal insurance?"/>
                    <Checkbox.Group 
                        options={insuranceOption}
                        value={employee.beneficiaryinfo.insurance_id}
                        className="gap-x-8 gap-y-5 text-sm text-gray-950 py-3"
                    />
                </div>
            </div>
        </div>

        {/* Declaration */}
        <div className="flex max-w-[728px] w-full flex-col border border-gray-200 shadow-smShadow">
            <div className="py-4 px-5 text-gray-950 text-base font-semibold border-b border-gray-200">
                Declaration
            </div>
            <div className="p-5 flex flex-col gap-8">
                <div className="flex flex-col gap-5 text-gray-700 text-sm">
                    <span>
                        I hereby affirm the accuracy, truthfulness, and completeness of all information provided in this form,
                        including my medical history. I understand that any intentional misstatement or omission, whether related
                        to medical history or other details, may have serious consequences, potentially affecting offers of permanent
                        or internship employment. Such actions may result in the withdrawal of an employment offer or immediate
                        termination, as deemed appropriate by the company.
                    </span>
                    <span>
                        Furthermore, I acknowledge that the company shall not be held liable for any consequences arising from my
                        failure to declare relevant details. I authorise the company to verify all information provided herein,
                        including conducting background checks and medical assessments if required, for the purpose of evaluating
                        my suitability for permanent or internship employment. I am fully aware of the importance of providing
                        precise information and commit to adhering to the company’s policies and procedures throughout my
                        tenure.
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-gray-700 text-sm">Employee’s Signature</div>
                    <div className="w-full bg-gray-50 h-80 border-[0.5px] border-gray-200">
                        <img src={employee?.digital_signature} alt="" />
                    </div>
                    <div className="text-xs text-gray-950">
                        Date: {employee.employee_date}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}