import Button from "@/Components/Button";
import { EditIcon } from "@/Components/Icon/Outline";
import { Skeleton, Timeline } from "antd";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Modal from "@/Components/Modal";
import PersonalInfo from "./PersonalInfo";

export default function Profile({ user_details, id }) {

    const [isLoading, setIsLoading] = useState(false);
    const [getEduBg, setGetEduBg] = useState([]);
    const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
    
    const fetchEduBg = async  () => {
        setIsLoading(true);
        try {

            const response = await axios.get('/getEduBg', {
                params : {
                    id: user_details?.id,
                }
            });
            
            setGetEduBg(response.data);
            
        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchEduBg();
    }, []);

    const openPersonalInfo = () => {
        setIsPersonalInfoOpen(true);
    }
    const closePersonalInfo = () => {
        setIsPersonalInfoOpen(false);
    }


    return (
        <>
            <motion.div
                key="profile-tab" // make sure this key is unique if used in multiple tabs
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <div className="flex gap-5 w-full">
                    <div className="w-full flex flex-col gap-5">
                        {/* Personal Info */}
                        <div className="border border-gray-200 shadow-smShadow rounded-sm flex flex-col">
                            <div className="border-b border-gray-200 py-3 px-5 flex justify-between items-center">
                                <div className="text-gray-950 text-base font-semibold">Personal Information</div>
                                <div>
                                    <Button variant="text" size="sm" iconOnly onClick={openPersonalInfo}>
                                        <EditIcon />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 p-5">
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Nationality</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.nationality}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">NRIC/Passport No.</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.identity_no}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Gender</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.gender === 'male' ? 'Male' : 'Female'}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Race</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.race}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Religion</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.religion}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Place of Birth</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.place_of_birth}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Marital Status</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.maritial_status}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Postcode</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.postcode}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">City</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.city}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">State</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.state}</div>
                                </div>
                            </div>
                        </div>
                        {/* Bank */}
                        <div className="border border-gray-200 shadow-smShadow rounded-sm flex flex-col">
                            <div className="border-b border-gray-200 py-3 px-5 flex justify-between items-center">
                                <div className="text-gray-950 text-base font-semibold">Bank and Contribution Information</div>
                                <div>
                                    <Button variant="text" size="sm" iconOnly>
                                        <EditIcon />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 p-5">
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Bank Name</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.employeebank.bank_name}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Bank Account Type</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.employeebank.acc_type}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Bank Account No.</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.employeebank.acc_no}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Income Tax No. (PCB No.)</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.employeebank.income_tax_no ? user_details.employeebank.income_tax_no : '-'}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">EPF No.</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.employeebank.epf_no ? user_details.employeebank.epf_no : '-'}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">SOCSO No.</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.employeebank.socso_no ? user_details.employeebank.socso_no : ''}</div>
                                </div>
                            </div>
                        </div>
                        {/* Beneficiary */}
                        <div className="border border-gray-200 shadow-smShadow rounded-sm flex flex-col">
                            <div className="border-b border-gray-200 py-3 px-5 flex justify-between items-center">
                                <div className="text-gray-950 text-base font-semibold">Beneficiary/Nominee Information</div>
                                <div>
                                    <Button variant="text" size="sm" iconOnly>
                                        <EditIcon />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 p-5">
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Full Name</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.beneficiaryinfo.full_name}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Relationship</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.beneficiaryinfo.relationship}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">NRIC/Passport No.</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.beneficiaryinfo.indentity_no}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Phone Number</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.beneficiaryinfo.dial_code}{user_details.beneficiaryinfo.phone_no}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Personal Insurance</div>
                                    <div className="text-gray-950 text-sm w-full">
                                        {
                                            user_details.beneficiaryinfo.insurance_id ? (
                                                <>
                                                    {
                                                        user_details.beneficiaryinfo.insurance_id.map((insurance, index) => (
                                                            <div key={index}>
                                                                {user_details.beneficiaryinfo.insurance_id.join(', ')}
                                                            </div>
                                                        ))
                                                    }
                                                </>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-5">
                        <div className="border border-gray-200 shadow-smShadow rounded-sm flex flex-col">
                            <div className="border-b border-gray-200 py-3 px-5 flex justify-between items-center">
                                <div className="text-gray-950 text-base font-semibold">Emergency Contact Information</div>
                                <div>
                                    <Button variant="text" size="sm" iconOnly>
                                        <EditIcon />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 p-5">
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Full Name</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.emergencyinfo[0] ? user_details.emergencyinfo[0].full_name : '-'}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Relationship</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.emergencyinfo[0] ? user_details.emergencyinfo[0].relationship : '-'}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Phone Number</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.emergencyinfo[0] ? (<span>{user_details.emergencyinfo[0].dial_code} {user_details.emergencyinfo[0].phone_no}</span>) : '-'}</div>
                                </div>
                                <div className="bg-gray-200 h-[1px] w-full"></div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Full Name</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.emergencyinfo[1] ? user_details.emergencyinfo[1].full_name : '-'}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Relationship</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.emergencyinfo[1] ? user_details.emergencyinfo[1].relationship : '-'}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-gray-500 text-sm w-full">Phone Number</div>
                                    <div className="text-gray-950 text-sm w-full">{user_details.emergencyinfo[1] ? (<span>{user_details.emergencyinfo[1].dial_code} {user_details.emergencyinfo[1].phone_no}</span>) : '-'}</div>
                                </div>
                            </div>
                        </div>
                        <div className="border border-gray-200 shadow-smShadow rounded-sm flex flex-col">
                            <div className="border-b border-gray-200 py-3 px-5 flex justify-between items-center">
                                <div className="text-gray-950 text-base font-semibold">Education Background</div>
                                <div>
                                    <Button variant="text" size="sm" iconOnly>
                                        <EditIcon />
                                    </Button>
                                </div>
                            </div>
                            {
                                isLoading ? (
                                    <div className="p-5">
                                        <Skeleton active />
                                    </div>
                                ) : (
                                    <>
                                        {
                                            getEduBg?.education?.length > 0  ? (
                                                <div className="flex flex-col gap-3 p-5">
                                                    <Timeline 
                                                        items={getEduBg.education.map((item, index) => ({
                                                            key: index,
                                                            children: (
                                                                <div className="flex flex-col gap-1">
                                                                    <div className="font-semibold text-gray-950 text-sm">{item.school_name}</div>
                                                                    <div className="text-gray-700 text-sm">{item.qualification}</div>
                                                                    <div className="text-gray-500 text-xs">{item.from_date} - {item.to_date}</div>
                                                                </div>
                                                            )
                                                        }))}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-3 py-10 px-[60px]">
                                                    No data available
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                        <div className="border border-gray-200 shadow-smShadow rounded-sm flex flex-col">
                            <div className="border-b border-gray-200 py-3 px-5 flex justify-between items-center">
                                <div className="text-gray-950 text-base font-semibold">Work Experience</div>
                                <div>
                                    <Button variant="text" size="sm" iconOnly>
                                        <EditIcon />
                                    </Button>
                                </div>
                            </div>
                            {
                                isLoading ? (
                                    <div className="p-5">
                                        <Skeleton active />
                                    </div>
                                ) : (
                                    <>
                                        {
                                            getEduBg?.experience?.length > 0  ? (
                                                <div className="flex flex-col gap-3 p-5">
                                                    <Timeline 
                                                        items={getEduBg.experience.map((item, index) => ({
                                                            key: index,
                                                            children: (
                                                                <div className="flex flex-col gap-1">
                                                                    <div className="font-semibold text-gray-950 text-sm">{item.company_name}</div>
                                                                    <div className="text-gray-700 text-sm">{item.title}</div>
                                                                    <div className="text-gray-500 text-xs">{item.period_from} - {item.period_to}</div>
                                                                </div>
                                                            )
                                                        }))}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-3 py-10 px-[60px]">
                                                    No data available
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </motion.div>

            {
                isPersonalInfoOpen ? (
                    <div>
                        <PersonalInfo 
                            isPersonalInfoOpen={isPersonalInfoOpen}
                            setIsPersonalInfoOpen={setIsPersonalInfoOpen}
                            closePersonalInfo={closePersonalInfo}
                            user_details={user_details}
                        />
                    </div>
                ) : null
            }
            

            
        </>
    )
}