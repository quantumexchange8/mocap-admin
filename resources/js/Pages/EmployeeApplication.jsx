import Button from "@/Components/Button";
import { MocapLogo, Onboarding2Logo } from "@/Components/Icon/Logo";
import { ArrowLeft, ArrowRight, ClearIcon, DatePickerIcon, JobApplicationIcon1, JobApplicationIcon6, JobApplicationIcon7, JobApplicationIcon8, LangIcon, Stethoscope, UrgentInfoIcon, UserShieldIcon } from "@/Components/Icon/Outline";
import React, { useEffect, useRef, useState } from "react";
import PersonalInfo from "./EmployeeAppPartials/PersonalInfo";
import { motion, AnimatePresence } from 'framer-motion';
import UrgentInfo from "./EmployeeAppPartials/UrgentInfo";
import TransportInfo from "./EmployeeAppPartials/TransportInfo";
import MedicalInfo from "./EmployeeAppPartials/MedicalInfo";
import BeneficiaryInfo from "./EmployeeAppPartials/BeneficiaryInfo";
import AdditionalInfo from "./EmployeeAppPartials/AdditionalInfo";
import DeclarationInfo from "./EmployeeAppPartials/Declaration";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import ConfirmDialog from "@/Components/ConfirmDialog";

export default function EmployeeApplication() {

    const employmentType = [
        {name: 'Internship'},
        {name: 'Probation'},
        {name: 'Permanent'},
    ]

    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState('forward');
    const sigCanvas = useRef(null);
    const intervalRef = useRef(null);
    const [sign, setSign] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const defaultViewDate = new Date();
    const today = new Date();
    const [getDepartment, setGetDepartment] = useState([]);
    const [getPosition, setGetPosition] = useState([]);
    const [getAdmin, setGetAdmin] = useState([]);
    const [confirmationDialog, setConfirmationDialog] = useState(false);

    const fetchDepartment = async  () => {
        setIsLoading(true);
        try {

            const response = await axios.get('/getDepartment');
            
            setGetDepartment(response.data);
            
        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchPosition = async  () => {
        setIsLoading(true);
        try {

            const response = await axios.get('/getDepartmentposition');
            
            setGetPosition(response.data);
            
        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchAdmin = async  () => {
        setIsLoading(true);
        try {

            const response = await axios.get('/getAllAdmin');
            
            setGetAdmin(response.data);
            
        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchDepartment();
        fetchPosition();
        fetchAdmin();
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        // personal
        full_name: '',
        username: '',
        nationality: 'Malaysian',
        identity_no: '',
        gender: '',
        dob: null,
        race: '',
        religion: '',
        dial_code: '+60',
        phone_no: '',
        email: '',
        address: '',
        postcode: '',
        city: '',
        state: '',

        // bank
        acc_type: '',
        acc_no: '',
        income_tax_no: '',
        epf_no: '',
        socso_no: '',

        // emergency
        emerge1_fullname: '',
        relation1: '',
        emerge1_dialcode: '+60',
        emerge1_phone_no: '',

        emerge2_fullname: '',
        relation2: '',
        emerge2_dialcode: '+60',
        emerge2_phone_no: '',

        // transport
        own_transport: '',
        license_id: '',
        work_transportation: '',
        approximate_distance: '',
        approximate_hours: '',
        approximate_minutes: '',

        // medical
        blood_type: 'A+',
        allergic_type: 'No',
        allergic_remark: '',
        medical_type: 'No',
        medical_remark: '',
        medication_type: 'No',
        medication_remark: '',
        pregnant_type: 'No',
        pregnant_remark: '',
        pregnant_delivery_date: null,
        pregnancy_medication_type: 'No',
        pregnancy_medication_remark: '',
        gynaecological_type: 'No',
        gynaecological_remark: '',

        // beneficiary
        beneficiary_fullname: '',
        beneficiary_relation: '',
        beneficiary_identity: '',
        beneficiary_dialcode: '+60',
        beneficiary_phoneNo: '',
        personal_insurance: '',

        // additional info
        investigate_type: 'No',
        investigate_remark: '',
        convicted_type: 'No',
        convicted_remark: '',
        bankrupt_type: 'No',
        bankrupt_remark: '',
        suspended_type: 'No',
        suspended_remark: '',
        directorship_type: 'No',
        directorship_remark: '',
        relative_type: 'No',
        relative_remark: '',

        // declaration
        digital_signature: null,

        // submit employee info
        employment_type: '',
        department_type: '',
        position_type: '',
        date_of_employment: today,
        intern_end_date: null,
        submitted_by: 'CT Admin',
    }); 

    const steps = [
        { icon: <JobApplicationIcon1 />, component: <PersonalInfo data={data} setData={setData} /> },
        { icon: <UrgentInfoIcon />, component: <UrgentInfo data={data} setData={setData} /> },
        { icon: <JobApplicationIcon6 />, component: <TransportInfo data={data} setData={setData} /> },
        { icon: <Stethoscope />, component: <MedicalInfo data={data} setData={setData} /> },
        { icon: <UserShieldIcon />, component: <BeneficiaryInfo data={data} setData={setData} /> },
        { icon: <JobApplicationIcon7 />, component: <AdditionalInfo data={data} setData={setData} /> },
        { icon: <JobApplicationIcon8 />, component: <DeclarationInfo data={data} setData={setData} sigCanvas={sigCanvas} /> }
    ];

    const navigate = (newStep) => {
        setDirection(newStep > step ? 'forward' : 'backward');
        setStep(newStep);
    };

    const nextStep = () => navigate(step + 1);
    const prevStep = () => navigate(step - 1);

    const clearForm = () => {
        // 清空表单逻辑

    };

    const variants = {
        enter: (direction) => ({
            x: direction === 'forward' ? 50 : -50,
            opacity: 0,
            scale: 0.98,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: 'spring', stiffness: 200, damping: 25 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
            }
        },
        exit: (direction) => ({
            x: direction === 'forward' ? -50 : 50,
            opacity: 0,
            scale: 0.98,
            transition: {
                duration: 0.25
            }
        })
    };

    const updateSignature = async () => {
        if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
            const dataUrl = sigCanvas.current.toDataURL("image/png");
            const blob = dataURLtoBlob(dataUrl);
            setSign(blob);
            setData("digital_signature", blob);

            try {
                const formData = new FormData();
                formData.append('digital_signature', blob, 'signature.png');

                const response = await axios.post('/check-signature', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })

                if (response.status === 200) {
                    setIsOpen(true);
                }

            } catch (error) {
                console.error('error', error)
            }
        }
    };

    useEffect(() => {
        if (data.digital_signature !== null) {
            setData('digital_signature', sign)
        }
    }, []);

    const closeEmployeeInfo = () => {
        setIsOpen(false);
        setData('employment_type', '');
        setData('department_type', '');
        setData('position_type', '');
        setData('date_of_employment', today);
        setData('intern_end_date', null);
        setData('submitted_by', 'CT Admin');
    }

    

    const clearDate = () => {
        setData('date_of_employment', null);
    }

    function dataURLtoBlob(dataurl) {
        const arr = dataurl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    const transformedOptions = getPosition.map(dept => ({
        label: dept.department_name,
        items: dept.positions.map(pos => ({
            label: pos.position_name,
            value: pos, // or pos.id if you only want the ID
        }))
    }));
      
    const confirmationEmployee = () => {
        setConfirmationDialog(true);
    }
    const rejectConfirmEmployee = () => {
        setConfirmationDialog(false);
    }

    const submit = (e) => {
        e.preventDefault();

        post('/store-employee', {
                
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
            }
        });
    }

    return (
        <div className="w-full flex flex-col min-h-screen">
            {/* 顶部导航 */}
            <div className="sticky top-0 w-full flex justify-between items-center py-2 px-5 bg-white z-30 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div><Onboarding2Logo /></div>
                    <div><MocapLogo /></div>
                </div>
                <div className="p-[9px]">
                    <LangIcon />
                </div>
            </div>

            {/* 主要内容 */}
            <div className="w-full flex flex-col items-center flex-grow">
                <div className="w-full flex flex-col items-center gap-5">
                    {/* Steps */}
                    <div className="w-full flex justify-center bg-white sticky top-[55px] z-10">
                        <div className="max-w-[728px] w-full flex items-center gap-2 py-4 bg-white ">
                            {
                                steps.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <motion.div
                                            onClick={() => navigate(index)}
                                            initial={false}
                                            animate={{
                                                scale: step === index ? 1.1 : 1,
                                                backgroundColor: step === index ? "#0a0a0a" : "#ffffff",
                                                color: step === index ? "#ffffff" : "#0a0a0a",
                                                borderColor: step === index ? "#0a0a0a" : "#e5e7eb"
                                            }}
                                            transition={{ type: "spring", stiffness: 250, damping: 20 }}
                                            className="p-3 border rounded-full cursor-pointer shadow-sm"
                                        >
                                            {item.icon}
                                        </motion.div>

                                        {index < steps.length - 1 && (
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{
                                                    width: "100%",
                                                    backgroundColor: step > index ? "#0a0a0a" : "#e5e7eb", // gray-950 or gray-200
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="h-0.5 flex-grow"
                                            />
                                        )}
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow relative w-full max-w-[728px] pb-5">
                        <AnimatePresence custom={direction} initial={false} mode="wait">
                            <motion.div
                                key={step}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="w-full h-full flex flex-col gap-5"
                            >
                                {steps[step].component}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 p-5 bg-white flex justify-between items-center w-full border-t border-gray-200">
                <div>
                    <Button variant="text" size="lg">Clear Form</Button>
                </div>
                <div className="flex items-center gap-4">
                    {
                        step > 0 && (
                            <Button 
                                variant="secondary" 
                                size="lg" 
                                onClick={prevStep}
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft />
                                <span>Back</span>
                            </Button>
                        )
                    }
                    {
                        step === 6 ? (
                            <Button 
                                size="lg" 
                                className="flex items-center gap-2" 
                                onClick={updateSignature}
                            >
                                Submit
                            </Button>
                        ) : (
                            <Button 
                                size="lg" 
                                className="flex items-center gap-2" 
                                onClick={nextStep}
                            >
                                <span>
                                    {step === steps.length - 1 ? 'Submit' : 'Next'}
                                </span>
                                {step < steps.length - 1 && <ArrowRight />}
                            </Button>
                        )
                    }
                    
                </div>
            </div>

            <Modal
                show={isOpen}
                maxWidth='md'
                title='Submit Employee Information'
                onClose={closeEmployeeInfo}
                footer={
                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button variant="outlined" size="sm" onClick={closeEmployeeInfo}>Cancel</Button>
                        <Button size="sm" onClick={confirmationEmployee}>Confirm</Button>
                    </div>
                }
            >
                <div className="py-3 px-6 flex flex-col gap-8">
                    <div className="text-gray-700 text-sm">
                        Hold on! Before submitting, please allow the HR admin to complete the remaining fields. Thank you for your patience!
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-2 flex flex-col gap-2">
                            <InputLabel value='Employment Type' />
                            <Dropdown 
                                value={data.employment_type} 
                                onChange={(e) => setData('employment_type', e.value)} 
                                options={employmentType.map((item) => ({
                                    label: item.name,
                                    value: item.name,
                                }))}
                                optionLabel="label"
                                placeholder="Select" 
                                loading={isLoading}
                                className="w-full text-sm"
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
                        </div>
                        <div className="flex flex-col gap-2">
                            <InputLabel value='Department' />
                            <Dropdown 
                                value={data.department_type} 
                                onChange={(e) => setData('department_type', e.value)} 
                                options={getDepartment}
                                optionLabel="name"
                                placeholder="Select" 
                                loading={isLoading}
                                className="w-full text-sm"
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
                        </div>
                        <div className="flex flex-col gap-2">
                            <InputLabel value='Position' />
                            <Dropdown 
                                value={data.position_type} 
                                onChange={(e) => setData('position_type', e.value)} 
                                options={transformedOptions}
                                optionGroupLabel="label"
                                optionGroupChildren="items"
                                placeholder="Select" 
                                loading={isLoading}
                                className="w-full text-sm"
                                pt={{
                                    root: { className: 'border border-gray-300 rounded-sm px-4 py-3 text-gray-950 focus-within:border-gray-950 transition-colors duration-200' }, // main box
                                    panel: { className: 'p-dropdown-panel bg-white border border-gray-300 shadow-lg mt-0.5 rounded-sm px-1 py-3' }, // dropdown list
                                    item: ({ context }) => ({
                                        className: `px-4 py-2 text-sm text-gray-950 hover:bg-gray-100 cursor-pointer ${
                                            context.selected ? 'bg-gray-950 font-semibold text-white hover:bg-gray-800 ' : ''
                                        }`
                                    }),
                                    
                                    itemGroup: { className: 'px-4' },
                                    itemGroupLabel: { className: 'text-gray-500 text-xs' },
                                    filterInput: { className: 'px-4 py-2 text-sm border border-gray-300 rounded-sm ' },
                                    filterContainer: { className: 'p-2'}
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <InputLabel value='Date of Employment' />
                            <div className="relative">
                                <Calendar 
                                    value={data.date_of_employment}
                                    onChange={(e) => setData('date_of_employment', e.value)} 
                                    className="w-full text-sm"
                                    viewDate={defaultViewDate}
                                    placeholder="dd/mm/yyyy"
                                    pt={{
                                        input: {
                                            className: 'w-full py-3 px-4 text-sm text-gray-950 border border-gray-300 rounded-sm hover:border-gray-400 focus:border-gray-950 focus:ring-0 focus:outline-none'
                                        },
                                        panel: {
                                            className: 'bg-white border border-gray-300 shadow-md rounded-md'
                                        },
                                        header: {
                                            className: 'bg-white text-gray-900 font-semibold px-4 py-3'
                                        },
                                        table: {
                                            className: 'w-full'
                                        },
                                        day: {
                                            className: 'w-10 h-10 text-center rounded-full transition-colors'
                                        },
                                        daySelected: {
                                            className: 'bg-gray-950 text-white font-bold rounded-full'
                                        },
                                        dayToday: {
                                            className: 'border border-gray-950'
                                        },
                                        month: {
                                            className: 'p-2 hover:bg-gray-100 rounded-md'
                                        },
                                        year: {
                                            className: 'p-2 hover:bg-gray-100 rounded-md'
                                        },
                                        monthPicker: {
                                            className: 'py-1 px-3'
                                        }
                                    }}
                                    readOnlyInput
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    {
                                        data.date_of_employment === null ? (
                                            <DatePickerIcon />
                                        ) : (
                                            <span className="cursor-pointer" onClick={clearDate}>
                                                <ClearIcon />
                                            </span>
                                        )
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <InputLabel value={
                                <>
                                    {
                                        data.employment_type === 'Probation' ? (
                                            'Probation End Date (if applicable)'
                                        ) : data.employment_type === 'Internship' ? (
                                            'Internship End Date (if applicable)'
                                        ) : (
                                            'End Date (if applicable)'
                                        )
                                    }
                                </>
                            } />
                            <div className="relative">
                                <Calendar 
                                    value={data.intern_end_date}
                                    onChange={(e) => setData('intern_end_date', e.value)} 
                                    className="w-full text-sm"
                                    placeholder="dd/mm/yyyy"
                                    pt={{
                                        input: {
                                            className: 'w-full py-3 px-4 text-sm text-gray-950 border border-gray-300 rounded-sm hover:border-gray-400 focus:border-gray-950 focus:ring-0 focus:outline-none'
                                        },
                                        panel: {
                                            className: 'bg-white border border-gray-300 shadow-md rounded-md'
                                        },
                                        header: {
                                            className: 'bg-white text-gray-900 font-semibold px-4 py-3'
                                        },
                                        table: {
                                            className: 'w-full'
                                        },
                                        day: {
                                            className: 'w-10 h-10 text-center rounded-full transition-colors'
                                        },
                                        daySelected: {
                                            className: 'bg-gray-950 text-white font-bold rounded-full'
                                        },
                                        dayToday: {
                                            className: 'border border-gray-950'
                                        },
                                        month: {
                                            className: 'p-2 hover:bg-gray-100 rounded-md'
                                        },
                                        year: {
                                            className: 'p-2 hover:bg-gray-100 rounded-md'
                                        },
                                        monthPicker: {
                                            className: 'py-1 px-3'
                                        }
                                    }}
                                    readOnlyInput
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    {
                                        data.intern_end_date === null ? (
                                            <DatePickerIcon />
                                        ) : (
                                            <span className="cursor-pointer" onClick={clearDate}>
                                                <ClearIcon />
                                            </span>
                                        )
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 flex flex-col gap-2">
                            <InputLabel value='Submitted by' />
                            <Dropdown 
                                value={data.submitted_by} 
                                onChange={(e) => setData('submitted_by', e.value)} 
                                options={getAdmin.map((item) => ({
                                    label: item.username,
                                    value: item.username,
                                }))}
                                optionLabel="label"
                                placeholder="Select"
                                loading={isLoading}
                                className="w-full text-sm"
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
                        </div>
                    </div>
                </div>
            </Modal>

            <ConfirmDialog show={confirmationDialog}>
                <div className='flex flex-col gap-8 p-6 '>
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-gray-950 text-lg font-bold text-center">Confirm New Employee Creation</div>
                        <div className="text-gray-700 text-sm text-center">
                            Are you ready to submit the employee information and welcome a new team member on board? Take a moment to review the details before moving forward.
                        </div>
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button variant="outlined" size="sm" onClick={rejectConfirmEmployee}>Cancel</Button>
                        <Button size="sm" onClick={submit}>Confirm</Button>
                    </div>
                </div>
            </ConfirmDialog>
        </div>
    )
}