import { DateJoinedIcon, EmailIcon, PhoneIcon, TagActiveIcon, TagDeletedIcon, TagInvitedIcon, TagSuspendedIcon } from "@/Components/Icon/Outline";
import { Tag, Image, Timeline } from "antd";
import React, { useEffect, useState } from "react";
import { FemaleAvatar, MaleAvatar } from "@/Components/Icon/ProfilePhoto";
import { formatDMYTime } from "@/Composables";


export default function EmployeeEmployment({employee, contentRef}) {

    const [getEmploymentHistory, setGetEmploymentHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchEmploymentHistory = async  () => {
        setIsLoading(true);
        try {

            const response = await axios.get('/getEmploymentHistory', {
                params: {
                    id: employee.id,
                }
            });
            
            setGetEmploymentHistory(response.data);
            
        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchEmploymentHistory();
    }, []);


    return(
    <div ref={contentRef} className="flex flex-col gap-5 items-center">
        <div className="flex max-w-[728px] w-full border border-gray-200 rounded-sm shadow-smShadow">
            <div className="max-w-60 min-w-60 w-full h-60 ">
                {employee.profile_image ? (
                    <Image 
                        width={240}
                        src={employee.profile_image}
                        preview={{
                            movable: false
                        }}
                    />
                    ) : employee.gender === 'male' ? (
                        <MaleAvatar className="w-60 h-60" />
                    ) : (
                        <FemaleAvatar className="w-60 h-60" />
                )}
            </div>
            <div className="flex p-5 flex-col justify-between items-start flex-[1_0_0] self-stretch rounded-sm">
                <div className="flex items-start gap-5 self-stretch">
                    <div className="flex flex-col items-start gap-1 flex-[1_0_0]">
                        <div className="text-xl font-bold text-gray-950 overflow-hidden">
                            {employee.name}
                        </div>
                        <div className="flex items-center gap-2 self-stretch ">
                            <div className="text-sm text-gray-700">{employee.employee_id}</div>
                            <div className="text-sm text-gray-400"> | </div>
                            <div className="text-sm text-gray-700">{employee.username}</div>
                            <div className="text-sm text-gray-400"> | </div>
                            <div className="text-sm text-gray-700">{employee.position}</div>
                        </div> 
                    </div>
                    <div className="flex">
                        {
                            employee.status === 'active' && (
                                <Tag bordered={false} color="info" className='ant-tag-info text-xs font-medium py-1 px-2 flex items-center gap-1 m-0'>
                                    <TagActiveIcon/>
                                    <span>Active</span>
                                </Tag>
                            )
                        }
                        {
                            employee.status === 'invited' && (
                                <Tag bordered={false} color="purple" className='ant-tag-purple text-xs font-medium py-1 px-2 flex items-center gap-1 m-0'>
                                    <TagInvitedIcon/>
                                    <span>Invited</span>
                                </Tag>
                            )
                        }
                        {
                            employee.status === 'suspended' && (
                                <Tag bordered={false} className='ant-tag-gray text-xs font-medium py-1 px-2 flex items-center gap-1 m-0'>
                                    <TagSuspendedIcon/>
                                    <span>Suspended</span>
                                </Tag>
                            )
                        }
                        {
                            employee.status === 'deleted' && (
                                <Tag bordered={false} color="error" className='text-xs font-medium py-1 px-2 flex items-center gap-1 m-0'>
                                    <TagDeletedIcon/>
                                    <span>Deleted</span>
                                </Tag>
                            )
                        }
                    </div>
                </div>
                <div className="flex max-w-[880px] items-center content-center gap-2 self-stretch flex-wrap">
                    <div className="flex min-w-[300px] items-center gap-3">
                        <PhoneIcon/>
                        {employee.dial_code} {employee.phone_no}
                    </div>
                    <div className="flex min-w-[300px] items-center gap-3">
                        <EmailIcon/>
                        {employee.email}
                    </div>
                    <div className="flex min-w-[300px] items-center gap-3">
                        <DateJoinedIcon/>
                        Joined on {employee.employee_date}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Tag bordered={false} color={employee.department.color} className='text-xs font-medium py-1 px-2 flex items-center gap-1 m-0'>
                        <span>{employee.department.name}</span>
                    </Tag>
                    <Tag bordered={false} color='others' className='ant-tag-others text-xs font-medium py-1 px-2 flex items-center gap-1 m-0'>
                        <span>{employee.employee_type}</span>
                    </Tag>      
                </div>
            </div>
        </div>
        <div className="flex max-w-[728px] w-full flex-col border border-gray-200 bg-white rounded-sm shadow-smShadow">
            <div className="flex flex-col py-4 px-5 border-b border-gray-200">
                <div className="text-gray-950 text-base font-semibold">Employment History</div>
            </div>
            <div className="flex p-5 items-start gap-5 self-stretch">
                {
                    isLoading ? (
                        <>
                        
                        </>
                    ) : (
                        <>
                            <Timeline 
                                items={getEmploymentHistory.map((item, index) => ({
                                    key: index,
                                    children: (
                                        <div className="flex flex-col gap-1">
                                            <div className="font-semibold text-gray-950 text-sm">{item.position}</div>
                                            <div className="text-gray-700 text-sm">{item.employment_type }</div>
                                            <div className="text-gray-500 text-xs">{item.employment_start ? formatDMYTime(item.employment_start) : 'N/A'} - {item.employment_end ? formatDMYTime(item.employment_end) : 'N/A'}</div>
                                        </div>
                                    )
                                }))}
                            />
                        </>
                    )
                }
            </div>
        </div>
    </div>
    )
}