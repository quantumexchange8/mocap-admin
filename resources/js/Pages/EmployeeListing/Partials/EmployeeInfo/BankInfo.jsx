import React, { useEffect, useState } from "react";
import { usePage, useForm, router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from 'primereact/dropdown';
import toast from "react-hot-toast";

export default function BankInfo({isBankInfoOpen, setIsBankInfoOpen, closeBankInfo, user_details}) {

    const { data, setData, errors, post, reset } = useForm({
        id: user_details.employeebank.id || '',
        bank_name: user_details.employeebank.bank_name || '',
        acc_type: user_details.employeebank.acc_type || '',
        acc_no: user_details.employeebank.acc_no || '',
        income_tax_no: user_details.employeebank.income_tax_no || '',
        epf_no: user_details.employeebank.epf_no || '',
        socso_no: user_details.employeebank.socso_no || '',
    });

    const [getBank, setGetBank] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const accType = [
        {name: 'Saving Account'},
        {name: 'Current Account'},
        {name: 'Islamic Account'},
    ];

    const fetchBank = async  () => {
        setIsLoading(true);
        try {

            const response = await axios.get('/getBank');
            
            setGetBank(response.data);
            
        } catch (error) {
            console.error('error', error);
        }  finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchBank();
    }, []);

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        post('/update-bank-info', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                closeBankInfo();
                reset();

                // 🔁 Refresh only user_details prop from the backend
                router.reload({ only: ['user_details'] });

                toast.success(`Bank and contribution information updated successfully for ${user_details.username}.`, {
                    title: `Bank and contribution information updated successfully for ${user_details.username}.`,
                    duration: 3000,
                    variant: 'variant1',
                });
            },
        })
    }

    return(
        <>
            <Modal
                show={isBankInfoOpen}
                maxWidth='md'
                title='Bank and Contribution Information'
                onClose={closeBankInfo}
                footer={
                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button variant="outlined" size="sm" onClick={closeBankInfo}>Cancel</Button>
                        <Button size="sm" onClick={submit} >Save Changes</Button>
                    </div>
                }
            >
                <div className="py-3 px-6 grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="bank_name" value="Bank Name" />
                        <Dropdown 
                            value={data.bank_name} 
                            onChange={(e) => setData('bank_name', e.value)} 
                            options={getBank.map((item) => ({
                                label: item.name,
                                value: item.name
                            }))}
                            optionLabel="label"
                            placeholder="Select "
                            className="w-full text-sm"
                            invalid={!!errors.bank_name}
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
                        <InputError message={errors.bank_name}  />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="acc_type" value="Bank Account Type" />
                        <Dropdown 
                            value={data.acc_type} 
                            onChange={(e) => setData('acc_type', e.value)} 
                            options={accType.map((item) => ({
                                label: item.name,
                                value: item.name,
                            }))}
                            optionLabel="label"
                            placeholder="Select "
                            className="w-full text-sm"
                            invalid={!!errors.acc_type}
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
                        <InputError message={errors.acc_type}  />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="acc_no" value="Bank Account No."/>
                        <TextInput 
                            id="acc_no"
                            type="number"
                            name="acc_no"
                            value={data.acc_no}
                            className="w-full"
                            autoComplete="acc_no"
                            onChange={(e) => setData('acc_no', e.target.value)}
                            hasError={!!errors.acc_no}
                        />
                        <InputError message={errors.acc_no}  />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="income_tax_no" value="Income Tax No. (PCB No.)" />
                        <TextInput 
                            id="income_tax_no"
                            type="text"
                            name="income_tax_no"
                            value={data.income_tax_no}
                            className="w-full"
                            autoComplete="income_tax_no"
                            onChange={(e) => setData('income_tax_no', e.target.value)}
                            hasError={!!errors.income_tax_no}
                        />
                        <InputError message={errors.income_tax_no}  />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="epf_no" value="EPF No." />
                        <TextInput 
                            id="epf_no"
                            type="text"
                            name="epf_no"
                            value={data.epf_no}
                            className="w-full"
                            autoComplete="epf_no"
                            onChange={(e) => setData('epf_no', e.target.value)}
                            hasError={!!errors.epf_no}
                        />
                        <InputError message={errors.epf_no}  />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="socso_no" value="SOCSO No."/>
                        <TextInput 
                            id="socso_no"
                            type="text"
                            name="socso_no"
                            value={data.socso_no}
                            className="w-full"
                            onChange={(e) => setData('socso_no', e.target.value)}
                            hasError={!!errors.socso_no}
                        />
                        <InputError message={errors.socso_no}  />
                    </div>
                </div>

            </Modal>
        
        </>
    )
}