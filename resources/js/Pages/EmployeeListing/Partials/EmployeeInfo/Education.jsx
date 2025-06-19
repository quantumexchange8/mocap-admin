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
import { Dropdown } from "primereact/dropdown";

export default function Education({isEducationOpen, setIsEducationOpen, closeEducation, user_details, getEduBg, getEmployeeEdu, fetchEduBg }) {
   
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

    
    const { data, setData, errors, post, reset } = useForm({
        id: '',
        education: [],
        type: '',
        // create new education
        edu1_start: null,
        edu1_end: null,
        edu1_school: '',
        edu1_address: '',
        edu1_qualification: '',
        edu1_course: '',
        edu2_start: null,
        edu2_end: null,
        edu2_school: '',
        edu2_address: '',
        edu2_qualification: '',
        edu2_course: '',
        edu3_start: null,
        edu3_end: null,
        edu3_school: '',
        edu3_address: '',
        edu3_qualification: '',
        edu3_course: '',

    });

    useEffect(() => {
        if (getEduBg) {

            if (getEduBg?.education?.length > 0) {
                setData('id', getEduBg.id)
                setData('type', 'edit')
                // Deep copy to avoid mutating props
                const initialEducation = getEduBg.education.map(edu => ({
                    id: edu.id || '',
                    from_date: edu.from_date || null,
                    to_date: edu.to_date || null,
                    school_name: edu.school_name || '',
                    course_name: edu.course_name || '',
                }));
                setData('education', initialEducation);
            } else {
                setData('id', user_details.id)
                setData('type', 'create')
            }
        }
        if (getEmployeeEdu && getEmployeeEdu.length > 0) {
            setData('id', user_details.id)
            setData('type', 'edit')
            const initialEducation = getEmployeeEdu.map(edu => ({
                id: edu.id || '',
                from_date: edu.from_date || null,
                to_date: edu.to_date || null,
                school_name: edu.school_name || '',
                course_name: edu.course_name || '',
            }));
            setData('education', initialEducation);
        } else {
            setData('id', user_details.id)
            setData('type', 'create')
        }

    }, [getEduBg, getEmployeeEdu]);

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
            onError: () => {
                setIsLoading(false);
            }
        })
    }

    return(
        <>
            <Modal
                show={isEducationOpen}
                maxWidth='lg'
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
                    getEduBg?.education ? (
                        <>
                            {/* Edit */}
                            {
                                getEduBg?.education?.length > 0 ? (
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
                                                                value={data.education[index]?.school_name  || ''}
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
                                                                value={data.education[index]?.course_name || ''}
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
                        </>
                    ) : getEmployeeEdu?.length > 0 ? (
                        <div className="py-3 px-6 flex flex-col gap-8">
                            {
                                getEmployeeEdu.map((edu, index) => (
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
                                                    value={data.education[index]?.school_name || ''}
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
                                                    value={data.education[index]?.course_name || ''}
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
                        //create new
                        <div className="py-3 px-6 flex flex-col gap-8">
                            {/* Education 1 */}
                            <div className="flex flex-col gap-5">
                                <div className="text-gray-950 text-base font-semibold">Education 1</div>
                                <div className="flex items-center gap-5 w-full">
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='From' />
                                        <div className="flex items-center relative">
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='To' />
                                        <div className="flex items-center relative">
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
                                                        <span className="cursor-pointer" onClick={() => setData('edu1_end', null)}>
                                                            <ClearIcon />
                                                        </span>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 w-full">
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='School Name' />
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
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Address/City/State' />
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
                                </div>
                                <div className="flex items-center gap-5 w-full">
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Qualification' />
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
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Course Name/Major Subject' />
                                        <TextInput 
                                            id="edu1_course"
                                            type="text"
                                            name="edu1_course"
                                            value={data.edu1_course}
                                            className="w-full"
                                            placeholder=" "
                                            onChange={(e) => setData('edu1_course', e.target.value)}
                                            hasError={!!errors.edu1_course}
                                        />
                                        <InputError message={errors.edu1_course} />
                                    </div>
                                </div>
                            </div>
                            {/* Education 2 */}
                            <div className="flex flex-col gap-5">
                                <div className="text-gray-950 text-base font-semibold">Education 2</div>
                                <div className="flex items-center gap-5 w-full">
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='From' />
                                        <div className="flex items-center relative">
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
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='To' />
                                        <div className="flex items-center relative">
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
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 w-full">
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='School Name' />
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
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Address/City/State' />
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
                                </div>
                                <div className="flex items-center gap-5 w-full">
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Qualification' />
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
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Course Name/Major Subject' />
                                        <TextInput 
                                            id="edu2_course"
                                            type="text"
                                            name="edu2_course"
                                            value={data.edu2_course}
                                            className="w-full"
                                            placeholder=" "
                                            onChange={(e) => setData('edu2_course', e.target.value)}
                                            hasError={!!errors.edu2_course}
                                        />
                                        <InputError message={errors.edu2_course} />
                                    </div>
                                </div>
                            </div>
                            {/* Education 3 */}
                            <div className="flex flex-col gap-5">
                                <div className="text-gray-950 text-base font-semibold">Education 3</div>
                                <div className="flex items-center gap-5 w-full">
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='From' />
                                        <div className="flex items-center relative">
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
                                                    data.edu3_start === null ? (
                                                        <DatePickerIcon />
                                                    ) : (
                                                        <span className="cursor-pointer" onClick={() => setData('edu3_start', null)}>
                                                            <ClearIcon />
                                                        </span>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='To' />
                                        <div className="flex items-center relative">
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
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 w-full">
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='School Name' />
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
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Address/City/State' />
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
                                </div>
                                <div className="flex items-center gap-5 w-full">
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Qualification' />
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
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel value='Course Name/Major Subject' />
                                        <TextInput 
                                            id="edu3_course"
                                            type="text"
                                            name="edu3_course"
                                            value={data.edu3_course}
                                            className="w-full"
                                            placeholder=" "
                                            onChange={(e) => setData('edu3_course', e.target.value)}
                                            hasError={!!errors.edu3_course}
                                        />
                                        <InputError message={errors.edu3_course} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                
                
            </Modal>
        </>
    )
}