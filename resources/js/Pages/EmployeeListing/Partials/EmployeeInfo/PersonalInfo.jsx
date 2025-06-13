import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { Radio } from "antd";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PersonalInfo({ 
    isPersonalInfoOpen,
    setIsPersonalInfoOpen,
    closePersonalInfo,
    user_details, 
}) {

    const races = [
        {name: 'Malay'},
        {name: 'Chinese'},
        {name: 'Indian'},
        {name: 'Others'},
    ];

    const religions = [
        {name: 'Islam'},
        {name: 'Buddhism'},
        {name: 'Christianity'},
        {name: 'Hinduism'},
        {name: 'No Religion'},
    ];

    const maritalType = [
        {name: 'Single'},
        {name: 'Married'},
        {name: 'Divorced'},
        {name: 'Widowed'},
    ];

    const [isLoading, setIsLoading] = useState(false);
    const [getNationality, setGetNationality] = useState([]);
    const [filterNationalityState, setFilterNationalityState] = useState([]);
    const [getStates, setGetStates] = useState([]);

    const fetchNationality = async  () => {
        setIsLoading(true);
        try {

            const response = await axios.get('/getNationality');
            
            setGetNationality(response.data);
            
        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchState = async  () => {
        setIsLoading(true);
        try {

            const response = await axios.get('/getState');
            
            setGetStates(response.data);
            
        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchNationality();
        fetchState();
    }, []);
    
    const { data, setData, post, processing, errors, reset, isDirty } = useForm({
        id: '',
        nationality: '',
        identity_no: '',
        gender: '',
        race: '',
        religion: '',
        place_of_birth: '',
        marital_status: '',
        postcode: '',
        city: '',
        state: '',
    });

    useEffect(() => {
        if (user_details) {
            setData('id', user_details.id)
            setData('nationality', user_details.nationality)
            setData('identity_no', user_details.identity_no)
            setData('gender', user_details.gender)
            setData('race', user_details.race)
            setData('religion', user_details.religion)
            setData('place_of_birth', user_details.place_of_birth)
            setData('marital_status', user_details.maritial_status)
            setData('postcode', user_details.postcode)
            setData('city', user_details.city)
            setData('state', user_details.state)
        }
    }, [user_details]);

    useEffect(() => {
        if (data.nationality && getNationality.length > 0) {
            const selected = getNationality.find(n => n.name === data.nationality);
            if (selected && selected.states) {
                setFilterNationalityState(selected.states);
            } else {
                setFilterNationalityState([]);
            }
        }
    }, [data.nationality, getNationality]);

    const closePersonalInfoDialog = () => {
        if (user_details) {
            setData({
                id: user_details.id || '',
                nationality: user_details.nationality || '',
                identity_no: user_details.identity_no || '',
                gender: user_details.gender || '',
                race: user_details.race || '',
                religion: user_details.religion || '',
                place_of_birth: user_details.place_of_birth || '',
                marital_status: user_details.maritial_status || '',
                postcode: user_details.postcode || '',
                city: user_details.city || '',
                state: user_details.state || '',
            });
        }
        closePersonalInfo();
    }

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        post('/update-personal-info', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                closePersonalInfo();
                reset();

                // 🔁 Refresh only user_details prop from the backend
                router.reload({ only: ['user_details'] });

                toast.success(`Personal information updated successfully for ${user_details.username}.`, {
                    title: `Personal information updated successfully for ${user_details.username}.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            },
        })
    }

    return (
        <>
            <Modal
                show={isPersonalInfoOpen}
                maxWidth='md'
                title='Personal Information'
                onClose={closePersonalInfoDialog}
                footer={
                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button variant="outlined" size="sm" onClick={closePersonalInfoDialog}>Cancel</Button>
                        <Button size="sm" onClick={submit} >Save Changes</Button>
                    </div>
                }
            >
                {
                    user_details && (
                        <div className="py-3 px-6 grid grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <InputLabel htmlFor="nationality" value={<div className="flex gap-1">
                                    <span>Nationality</span>
                                </div>} />
                                <Dropdown 
                                    value={data.nationality} 
                                    onChange={(e) => setData('nationality', e.value)} 
                                    options={getNationality.map((item) => ({
                                        label: item.name,
                                        value: item.name,
                                    }))}
                                    optionLabel="label"
                                    placeholder="Select a Nationality" 
                                    loading={isLoading}
                                    filter
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
                                <InputLabel htmlFor="identity_no" value={<div className="flex gap-1">
                                    <span>NRIC/Passport No.</span>
                                </div>} />
                                <TextInput 
                                    id="identity_no"
                                    type="text"
                                    name="identity_no"
                                    value={data.identity_no}
                                    className="w-full"
                                    placeholder="901223145678 / A12345678"
                                    autoComplete="identity_no"
                                    onChange={(e) => setData('identity_no', e.target.value)}
                                    hasError={!!errors.identity_no}
                                />
                                <InputError message={errors.identity_no}  />
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputLabel htmlFor="gender" value={<div className="flex gap-1">
                                    <span>Gender </span>
                                </div>} />
                                <Radio.Group 
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                    options={[
                                        {value: 'male', label: 'Male'},
                                        {value: 'female', label: 'Female'},
                                    ]}
                                    className="py-3"
                                />
                                <InputError message={errors.gender}  />
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputLabel htmlFor="race" value={<div className="flex gap-1">
                                    <span>Race</span>
                                </div>} />
                                <Dropdown 
                                    value={data.race} 
                                    onChange={(e) => setData('race', e.value)} 
                                    options={races.map((item) => ({
                                        label: item.name,
                                        value: item.name,
                                    }))}
                                    optionLabel="label"
                                    placeholder="Select "
                                    className="w-full text-sm"
                                    invalid={!!errors.race}
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
                                <InputError message={errors.race}  />
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputLabel htmlFor="religion" value={<div className="flex gap-1">
                                    <span>Religion </span>
                                </div>} />
                                <Dropdown 
                                    value={data.religion} 
                                    onChange={(e) => setData('religion', e.value)} 
                                    options={religions.map((item) => ({
                                        label: item.name,
                                        value: item.name,
                                    }))}
                                    optionLabel="label"
                                    placeholder="Select "
                                    className="w-full text-sm"
                                    invalid={!!errors.religion}
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
                                <InputError message={errors.religion}  />
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputLabel htmlFor="place_of_birth" value={<div className="flex gap-1">
                                    <span>Place of Birth </span>
                                </div>} />
                                <Dropdown 
                                    value={data.place_of_birth} 
                                    onChange={(e) => setData('place_of_birth', e.value)} 
                                    options={filterNationalityState.map((item) => ({
                                        label: item.name,
                                        value: item.name,
                                    }))}
                                    optionLabel="label"
                                    placeholder="Select "
                                    className="w-full text-sm"
                                    invalid={!!errors.place_of_birth}
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
                                <InputError message={errors.place_of_birth}  />
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputLabel htmlFor="marital_status" value={<div className="flex gap-1">
                                    <span>Marital Status </span>
                                </div>} />
                                <Dropdown 
                                    value={data.marital_status} 
                                    onChange={(e) => setData('marital_status', e.value)} 
                                    options={maritalType.map((item) => ({
                                        label: item.name,
                                        value: item.name,
                                    }))}
                                    optionLabel="label"
                                    placeholder="Select "
                                    className="w-full text-sm"
                                    invalid={!!errors.marital_status}
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
                                <InputError message={errors.marital_status}  />
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputLabel htmlFor="postcode" value={<div className="flex items-center gap-1">
                                    <span>Postcode </span><span className="text-gray-500 text-xs">(Current)</span>
                                </div>} />
                                <TextInput 
                                    id="postcode"
                                    type="number"
                                    name="postcode"
                                    value={data.postcode}
                                    className="w-full"
                                    placeholder="e.g. 50000"
                                    autoComplete="postcode"
                                    onChange={(e) => setData('postcode', e.target.value)}
                                    hasError={!!errors.postcode}
                                />
                                <InputError message={errors.postcode}  />
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputLabel htmlFor="city" value={<div className="flex items-center gap-1">
                                    <span>City</span>
                                    <span className="text-gray-500 text-xs">(Current)</span>
                                </div>} />
                                <TextInput 
                                    id="city"
                                    type="text"
                                    name="address"
                                    value={data.city}
                                    className="w-full"
                                    placeholder="e.g. Kuala Lumpur"
                                    autoComplete="city"
                                    onChange={(e) => setData('city', e.target.value)}
                                    hasError={!!errors.city}
                                />
                                <InputError message={errors.city}  />
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputLabel htmlFor="state" value={<div className="flex items-center gap-1">
                                    <span>State</span>
                                    <span className="text-gray-500 text-xs">(Current)</span>
                                </div>} />
                                <Dropdown 
                                    value={data.state} 
                                    onChange={(e) => setData('state', e.value)} 
                                    options={getStates.map((item) => ({
                                        label: item.name,
                                        value: item.name,
                                    }))}
                                    optionLabel="label"
                                    placeholder="Select "
                                    className="w-full text-sm"
                                    invalid={!!errors.state}
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
                                <InputError message={errors.state}  />
                            </div>
                        </div>
                    )
                }
            </Modal>
        </>
    )
}