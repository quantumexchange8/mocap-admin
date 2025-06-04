import React, { useEffect, useState } from "react";
import { Tag, Image } from "antd";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Radio, Input, Checkbox } from 'antd';
import { LogoIcon } from "@/Components/Icon/Outline";

export default function EmployeeOffboarding({employee, contentRef}) {
    const { TextArea } = Input;
    
    const negativeOption = [
        'Frequently late',
        'Frequently clock-out early',
        'Frequently apply leave',
        'Frequently absent',
        'Frequently lied about work',
        'Frequently slept during work',
        'Emotionally unstable',
        'Easily irritated or loses temper',
        'Does not participate in meetings',
        'Does not participate in company events',
        'Frequently fails to complete work tasks',
        'Frequently argues with other colleagues',
        'Frequently fights with other colleagues',
        'Frequently fails to repay borrowed money from colleagues',
        'Does not take care of company cleanliness',
    ];

    const positionOption = [
        'Work on time',
        'Friendly with colleagues',
        'Willing to assist colleagues',
        'Communicates well with colleagues',
        'Proactively handles work tasks',
        'Actively responds to work problems',
        'Shows initiative in projects',
        'Completes assigned projects on time',
        'Proactively solves problems',
        'Actively participates in meetings',
        'Actively participates in company events',
        'Frequently completes work ahead of deadlines',
        'Cares about company property',
        'Helps maintain a clean company environment',
    ];

    const confirmCheck = [
        "I confirm that I have reviewed the above details and approve the deletion of this employee's records.",
    ]

    const ratings = [
        {name: '1 - Unacceptable', value: '1'},
        {name: '2 - Very Poor', value: '2'},
        {name: '3 - Poor', value: '3'},
        {name: '4 - Fair', value: '4'},
        {name: '5 - Satisfactory', value: '5'},
        {name: '6 - Good', value: '6'},
        {name: '7 - Very Good', value: '7'},
        {name: '8 - Excellent', value: '8'},
        {name: '9 - Most Worth Hiring', value: '9'},
    ];
    return(
    <div ref={contentRef} className="flex flex-col gap-5 items-center">
        <div className="flex w-[728px] items-center gap-3">
            <div className="max-w-12 min-w-12 w-full h-12 rounded-full">
                {employee.deletedemployee.handle_by_user.profile_image ? (
                    <Image 
                        width={48}
                        src={employee.deletedemployee.handle_by_user.profile_image}
                        preview={{
                            movable: false
                        }}
                    />
                    ) : (
                            <LogoIcon className="min-w-12 min-h-12"/>
                    )}
            </div>
            <div className="flex flex-col items-start gap-1">
                <div className="text-gray-950 text-md font-semibold">{employee.deletedemployee.handle_by_user.name}</div>
                <div className="text-gray-500 text-sm">{employee.deletedemployee.formatted_created_at}</div>
            </div>
        

        </div>
        <div className="flex w-[728px] flex-col items-center border border-gray-200 rounded-sm shadow-smShadow">
            <div className="flex flex-col py-4 px-5 items-start self-stretch border-b border-gray-200">
                <div className="text-gray-950 text-base font-semibold">Confirmation of Employee Actions</div>
            </div>
            <div className="flex p-5 items-start gap-5 self-stretch">
                <div className="flex flex-col">
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="reason_deletion" value="Reason for Deletion"/>
                        <TextInput 
                            id="reason_deletion"
                            type="text"
                            name="reason_deletion"
                            value={employee.deletedemployee.reason_deletion}
                            className="w-full"
                            onChange={(e) => setData('', e.target.value)}
                            readOnly={true}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="reason_leaving" value="Reason for Leaving" />
                        <TextArea 
                            value={employee.deletedemployee.reason_leaving}
                            onChange={(e) => setData('', e.target.value)}       
                            rows={4}
                            readOnly={true}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="misconduct_type" value="Has the employee exhibited any misconduct during employment?" />
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <Radio.Group 
                                    value={employee.deletedemployee.misconduct_type}
                                    options={['Yes', 'No']}
                                    className="py-3"
                                />
                                    <div className="w-full max-w-[500px]">
                                    <TextInput 
                                        id="misconduct_remark"
                                        type="text"
                                        name="misconduct_remark"
                                        value={employee.deletedemployee.misconduct_remark || ""}
                                        className="disabled:cursor-not-allowed"
                                        disabled={employee.deletedemployee.misconduct_type === 'No'}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="criminal_type" value="Has the employee committed any criminal acts during employment?"/>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <Radio.Group 
                                    value={employee.deletedemployee.criminal_type}
                                    options={['Yes', 'No']}
                                    className="py-3"
                                />
                                <div className="w-full max-w-[500px]">
                                    <TextInput 
                                        id="criminal_remark"
                                        type="text"
                                        name="criminal_remark"
                                        value={employee.deletedemployee.criminal_remark || ""}
                                        className="w-full max-w-[500px] disabled:cursor-not-allowed"
                                        disabled={employee.deletedemployee.criminal_type === 'No'}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="illegal_type" value="Has the employee used illegal substances during employment?" />
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <Radio.Group 
                                    value={employee.deletedemployee.illegal_type}
                                    options={['Yes', 'No']}
                                    className="py-3"
                                />
                                <div className="w-full max-w-[500px]">
                                    <TextInput 
                                        id="illegal_remark"
                                        type="text"
                                        name="illegal_remark"
                                        value={employee.deletedemployee.illegal_remark || ""}
                                        className="w-full max-w-[500px] disabled:cursor-not-allowed"
                                        disabled={employee.deletedemployee.illegal_type === 'No'}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="disclosed_type" value="Has the employee publicly or privately disclosed confidential company information?" />
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <Radio.Group 
                                    value={employee.deletedemployee.disclosed_type}
                                    options={['Yes', 'No']}
                                    className="py-3"
                                />
                                <div className="w-full max-w-[500px]">
                                    <TextInput 
                                        id="disclosed_remark"
                                        type="text"
                                        name="disclosed_remark"
                                        value={employee.deletedemployee.disclosed_remark || ""}
                                        className="w-full max-w-[500px] disabled:cursor-not-allowed"
                                        disabled={employee.deletedemployee.disclosed_type === 'No'}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="encouraged_type" value="Has the employee publicly or privately encouraged other employees to leave the company during employment?"/>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <Radio.Group 
                                    value={employee.deletedemployee.encouraged_type}
                                    options={['Yes', 'No']}
                                    className="py-3"
                                />
                                <div className="w-full max-w-[500px]">
                                    <TextInput 
                                        id="encouraged_remark"
                                        type="text"
                                        name="encouraged_remark"
                                        value={employee.deletedemployee.encouraged_remark || ""}
                                        className="w-full max-w-[500px] disabled:cursor-not-allowed"
                                        disabled={employee.deletedemployee.encouraged_type === 'No'}
                                        onChange={(e) => setData('', e.target.value)}
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex w-[728px] flex-col items-center border border-gray-200 rounded-sm shadow-smShadow">
            <div className="flex flex-col py-4 px-5 items-start self-stretch border-b border-gray-200">
                <div className="text-gray-950 text-base font-semibold">Employee's Attitude During Employment (Multiple Selection)</div>
            </div>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="negative_attidude" value="Negative Attitude:" />
                    <div className="py-3">
                        <Checkbox.Group
                            options={negativeOption}
                            value={employee.deletedemployee.negative_attidude}
                            className="gap-x-8 gap-y-5 text-sm text-gray-950"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="negative_attidude" value={<div className="flex gap-1">
                        <span>Positive Attitude:</span>
                    </div>} />
                    <div className="py-3">
                        <Checkbox.Group
                            options={positionOption}
                            value={employee.deletedemployee.positive_attidude}
                            className="gap-x-8 gap-y-5 text-sm text-gray-950"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className="flex w-[728px] flex-col items-center border border-gray-200 rounded-sm shadow-smShadow">
            <div className="flex flex-col py-4 px-5 items-start self-stretch border-b border-gray-200">
                <div className="text-gray-950 text-base font-semibold">Overall Employee Rating</div>
            </div>
            <div className="flex flex-col items-start gap-2 p-5 self-stretch">
                <div className="flex flex-col items-start self-stretch gap-2">
                    <InputLabel htmlFor="overall_rating" value="Overall Rating:"/>
                    <TextInput 
                            id="overall_rating"
                            type="text"
                            name="overall_rating"
                            value={ratings.find(r => r.value === String(employee.deletedemployee.overall_rating))?.name || ''}                            
                            className="w-full"
                            onChange={(e) => setData('', e.target.value)}
                            readOnly={true}
                        />
                    <TextArea 
                        value={employee.deletedemployee.overall_remark}
                        onChange={(e) => setData('', e.target.value)}    
                        rows={4}
                        readOnly={true}                  
                    />
                </div>
            </div>
        </div>
        <div>
            <Checkbox
                options={confirmCheck}
                checked
                className="flex w-[728px] items-center gap-2 text-sm text-gray-950"
            > 
            I confirm that I have reviewed the above details and approve the deletion of this employee's records.
            </Checkbox>
        </div>
    </div>
    )
}