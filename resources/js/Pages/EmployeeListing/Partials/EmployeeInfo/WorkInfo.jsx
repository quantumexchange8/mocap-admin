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

export default function WorkInfo({isWorkInfoOpen, setIsWorkInfoOpen, closeWorkInfo, user_details, work_info}) {
    const [isLoading, setIsLoading] = useState(false);
    
    const { data, setData, errors, post, reset } = useForm({
        work_info: [{
            id: '',
            title: '',
            period_from: null,
            period_to: null,
            company_name: '',
        }],
        // create new 
        
    });

    useEffect(() => {
        if (work_info) {
            setData('work_info', work_info);
        }
    }, [work_info]);

    const formatDateToString = (date) => {
        if (!date) return null; // or return '' if you prefer
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        post('/update-work-info', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                closeWorkInfo();
                reset();

                // 🔁 Refresh only user_details prop from the backend
                router.reload({ only: ['work_info'] });

                toast.success(`Work experience updated successfully for ${user_details.username}.`, {
                    title: `Work experience updated successfully for ${user_details.username}.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            },
        })
    }

    return(
        <>
            <Modal
                show={isWorkInfoOpen}
                maxWidth='md'
                title='Work Experience'
                onClose={closeWorkInfo}
                footer={
                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button variant="outlined" size="sm" onClick={closeWorkInfo}>Cancel</Button>
                        <Button size="sm" onClick={submit} >Save Changes</Button>
                    </div>
                }
            >
                {
                    work_info?.experience ? (
                        <div className="py-3 px-6 flex flex-col gap-8">
                            {
                                work_info?.experience?.map((experience, index) => (
                                    <div key={index} className="flex flex-col gap-5">
                                        <div className="flex flex-col col-span-2 text-gray-950 font-semibold">Experience {index + 1}</div>
                                        <div className="grid grid-cols-2 gap-5">
                                            <div className="flex flex-col gap-2">
                                                <InputLabel htmlFor="title" value="Job Title" />
                                                <TextInput 
                                                    id="title"
                                                    type="text"
                                                    value={experience.title}
                                                    className="w-full"
                                                    placeholder=" "
                                                    onChange={(e) => {
                                                        const updated = [...data.work_info];
                                                        updated[index].title = e.target.value;
                                                        setData('work_info', updated);
                                                    }}                                                    
                                                    hasError={!!errors[`work_info.${index}.title`]}
                                                />
                                                <InputError message={errors[`work_info.${index}.title`]} />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <InputLabel htmlFor="from_date" value="From" />
                                                <div className="flex items-center self-stretch relative">
                                                   <Calendar
                                                        value={
                                                           [
                                                            experience.period_from ? new Date(experience.period_from) : null,
                                                            experience.period_to ? new Date(experience.period_to) : null,
                                                            ]
                                                        }
                                                        onChange={(e) => {
                                                            const updated = [...data.work_info];
                                                            updated[index].period_from = formatDateToString(e.value[0]);
                                                            updated[index].period_to = formatDateToString(e.value[1]);
                                                            setData('work_info', updated);
                                                        }}
                                                        className="w-full h-[46px] text-sm"
                                                        placeholder="dd/mm/yyyy - dd/mm/yyyy"
                                                        selectionMode="range"
                                                        dateFormat="dd/mm/yy"
                                                        readOnlyInput
                                                        invalid={!!errors[`work_info.${index}.period_from`]}
                                                        pt={{
                                                            input: {
                                                                className: 'w-full py-3 px-4 text-sm text-gray-950 border border-gray-300 rounded-sm hover:border-gray-400 focus:border-gray-950 focus:ring-0 focus:outline-none'
                                                            },
                                                        }}
                                                    />
                                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                        <DatePickerIcon />
                                                    </div>
                                                </div>
                                                <InputError message={errors[`work_info.${index}.period_from`]} />
                                                <InputError message={errors[`work_info.${index}.period_to`]} />

                                            </div>
                                            <div className="flex flex-col gap-2 col-span-2">
                                                <InputLabel htmlFor="company_name" value="Company Name" />
                                                <TextInput 
                                                    id="company_name"
                                                    type="text"
                                                    value={experience.company_name}
                                                    className="w-full"
                                                    placeholder=" "
                                                    onChange={(e) => {
                                                        const updated = [...data.work_info];
                                                        updated[index].company_name = e.target.value;
                                                        setData('work_info', updated);
                                                    }}                                                    
                                                    hasError={!!errors[`work_info.${index}.company_name`]}
                                                />
                                                <InputError message={errors[`work_info.${index}.company_name`]} />
                                            </div>
                                        </div>
                                    </div>    
                                ))
                            }
                        </div>
                    ) : (

                        //create new
                        <div className="py-3 px-6 flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <InputLabel value='Job Title' />
                                <TextInput 
                                    id="title"
                                    type="text"
                                    value={experience.title}
                                    className="w-full"
                                    placeholder=" "
                                    onChange={(e) => {
                                        const updated = [...data.work_info];
                                        updated[index].title = e.target.value;
                                        setData('work_info', updated);
                                    }}                                                    
                                    hasError={!!errors[`work_info.${index}.title`]}
                                />
                            </div>
                        </div>
                    )
                }
            </Modal>
        </>
    )
}