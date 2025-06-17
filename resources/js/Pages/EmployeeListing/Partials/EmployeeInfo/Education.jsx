import React, { useEffect, useState } from "react";
import { usePage, useForm, router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import toast from "react-hot-toast";
import { Calendar } from 'primereact/calendar';
import { ClearIcon, DatePickerIcon } from "@/Components/Icon/Outline";

export default function Education({isEducationOpen, setIsEducationOpen, closeEducation, user_details, getEduBg, fetchEduBg }) {
   
    const [isLoading, setIsLoading] = useState(false);
    
    const { data, setData, errors, post, reset } = useForm({
        id: '',
        education: [],
    });

    useEffect(() => {
        if (getEduBg) {
            setData('id', getEduBg.id)

            if (getEduBg?.education?.length > 0) {
                // Deep copy to avoid mutating props
                const initialEducation = getEduBg.education.map(edu => ({
                    id: edu.id || '',
                    from_date: edu.from_date || '',
                    to_date: edu.to_date || '',
                    school_name: edu.school_name || '',
                    course_name: edu.course_name || '',
                }));
                setData('education', initialEducation);
            }
        }
    }, [getEduBg]);

    const formatDateToString = (date) => {
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        return `${year}-${month}-01`;
    };

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        post('/update-education', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                fetchEduBg();
                closeEducation();
                reset();

                // 🔁 Refresh only user_details prop from the backend
                router.reload({ only: ['user_details'] });

                toast.success(`Education background updated successfully for ${user_details.username}.`, {
                    title: `Education background updated successfully for ${user_details.username}.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            },
        })
    }

    return(
        <>
            <Modal
                show={isEducationOpen}
                maxWidth='md'
                title='Education Background'
                onClose={closeEducation}
                footer={
                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button variant="outlined" size="sm" onClick={closeEducation}>Cancel</Button>
                        <Button size="sm" onClick={submit} >Save Changes</Button>
                    </div>
                }
            >
                {
                    getEduBg.education.length > 0 ? (
                        <div className="py-3 px-6 flex flex-col gap-8">
                            {
                                getEduBg.education.map((edu, index) => (
                                    <div key={index} className="flex flex-col gap-5">
                                        <div className="flex flex-col col-span-2 text-gray-950 font-semibold">Education {index + 1}</div>
                                        <div className="grid grid-cols-2 gap-5">
                                            <div className="flex flex-col gap-2">
                                                <InputLabel htmlFor="from_date" value="From" />
                                                <div className="flex items-center self-stretch relative">
                                                   <Calendar 
                                                        value={data.education[index]?.from_date ? new Date(data.education[index].from_date) : null}
                                                        onChange={(e) => {
                                                            const updated = data.education.map((item, i) =>
                                                              i === index ? { ...item, from_date: formatDateToString(e.value) } : item
                                                            );
                                                            setData('education', updated);
                                                        }} 
                                                        className="w-full text-sm"
                                                        placeholder="mm/yyyy"
                                                        view="month" 
                                                        dateFormat="mm/yy"
                                                        invalid={!!errors[`education.${index}.from_date`]}
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
                                                            edu.from_date === null ? (
                                                                <DatePickerIcon />
                                                            ) : (
                                                                <span className="cursor-pointer" 
                                                                onClick={() => {
                                                                    const updated = [...data.education];
                                                                    updated[index].from_date = null;
                                                                    setData('education', updated);
                                                                }}>
                                                                    <ClearIcon />
                                                                </span>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <InputError message={errors[`education.${index}.from_date`]} />                                            
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <InputLabel htmlFor="to_date" value="To" />
                                                <div className="flex items-center self-stretch relative">
                                                    <Calendar
                                                        value={data.education[index]?.to_date ? new Date(data.education[index].to_date) : null}
                                                        onChange={(e) => {
                                                            const updated = data.education.map((item, i) =>
                                                              i === index ? { ...item, to_date: formatDateToString(e.value) } : item
                                                            );
                                                            setData('education', updated);
                                                        }} 
                                                        className="w-full text-sm"
                                                        placeholder="mm/yyyy"
                                                        view="month" 
                                                        dateFormat="mm/yy"
                                                        readOnlyInput
                                                        invalid={!!errors[`education.${index}.to_date`]}
                                                    />
                                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                        {
                                                            edu.to_date === null ? (
                                                                <DatePickerIcon />
                                                            ) : (
                                                                <span className="cursor-pointer"  
                                                                onClick={() => {
                                                                    const updated = [...data.education];
                                                                    updated[index].to_date = null;
                                                                    setData('education', updated);
                                                                }}>
                                                                    <ClearIcon />
                                                                </span>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <InputError message={errors[`education.${index}.to_date`]} />
                                            </div>
                                            <div className="flex flex-col gap-2 col-span-2">
                                                <InputLabel htmlFor="school_name" value="School Name" />
                                                <TextInput 
                                                    id="school_name"
                                                    type="text"
                                                    value={data.education[index]?.school_name}
                                                    className="w-full"
                                                    placeholder=" "
                                                    onChange={(e) => {
                                                        const updated = [...data.education];
                                                        updated[index].school_name = e.target.value;
                                                        setData('education', updated);
                                                    }}                                                    
                                                    hasError={!!errors[`education.${index}.school_name`]}
                                                />
                                                <InputError message={errors[`education.${index}.school_name`]} />
                                            </div>
                                            <div className="flex flex-col gap-2 col-span-2">
                                                <InputLabel htmlFor="course_name" value="Course Name/Major Subject" />
                                                <TextInput 
                                                    id="course_name"
                                                    type="text"
                                                    name="course_name"
                                                    value={data.education[index]?.course_name}
                                                    className="w-full"
                                                    placeholder="e.g. Bachelor of Computer Science (Hons)"
                                                    onChange={(e) => {
                                                        const updated = [...data.education];
                                                        updated[index].course_name = e.target.value;
                                                        setData('education', updated);
                                                    }}  
                                                    hasError={!!errors[`education.${index}.course_name`]}
                                                />
                                                <InputError message={errors[`education.${index}.course_name`]} />
                                            </div>
                                        </div>
                                    </div>    
                                ))
                            }
                        </div>
                    ) : (
                        null
                    )
                }
            </Modal>
        </>
    )
}