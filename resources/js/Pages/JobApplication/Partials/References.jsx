import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import InputError from "@/Components/InputError";

export default function Language({data, setData, errors}) {
    const [getPhoneCode, setGetPhoneCode] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPhoneCode = async  () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/getPhoneCode');
            
            setGetPhoneCode(response.data);
            
        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPhoneCode();
    }, []);
    
    return(
        <div className="flex w-full px-0 flex-col items-center gap-5">
            {/* Reference */}
            <div className="flex w-[728px] flex-col items-center border border-gray-200 rounded-sm">
                <div className="flex px-5 py-4 flex-col items-start self-stretch border-b border-b-gray-200">
                    <div className="self-stretch text-gray-950 font-semibold">References</div>
                    <div className="self-stretch text-gray-500 text-sm">List professional references who can provide information about your work performance, skills, and character. Avoid using family members or friends.</div>
                </div>
                
                {/* Reference 1 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Reference 1</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="refer1_name" value="Full Name"/><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput 
                            id="refer1_name"
                            type="text"
                            name="refer1_name"
                            value={data.refer1_name}
                            className="w-full"
                            autoComplete="refer1_name"
                            onChange={(e) => setData('refer1_name', e.target.value)}
                            hasError={!!errors.refer1_name}
                        />
                        <InputError message={errors.refer1_name}  />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="relation1" value="Relationship"/><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput 
                            id="relation1"
                            type="text"
                            name="relation1"
                            value={data.relation1}
                            className="w-full"
                            autoComplete="relation1"
                            onChange={(e) => setData('relation1', e.target.value)}
                            hasError={!!errors.relation1}
                        />
                        <InputError message={errors.relation1}  />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="refer1_phoneno" value="Phone Number" /><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex items-center gap-2 self-stretch"> 
                            <Dropdown 
                                value={data.refer1_dailcode} 
                                onChange={(e) => setData('refer1_dailcode', e.value)} 
                                options={getPhoneCode.map((item) => ({
                                    label: item.phoneCode, // What user sees
                                    value: `${item.phoneCode}`, // Ensures it prefixes with +
                                }))}
                                loading={isLoading}
                                optionLabel="label"
                                placeholder="Select"
                                className="w-full max-w-[100px] text-sm"
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
                            <TextInput 
                                id="refer1_phoneno"
                                type="number"
                                name="refer1_phoneno"
                                value={data.refer1_phoneno}
                                className="w-full"
                                placeholder="Phone Number"
                                autoComplete="refer1_phoneno"
                                onChange={(e) => setData('refer1_phoneno', e.target.value)}
                                hasError={!!errors.refer1_phoneno}
                            />
                        </div> 
                        <InputError message={errors.refer1_phoneno}  /> 
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="refer1_email" value="Email" /><div className="text-sm text-error-600">*</div>
                        </div>
                       <TextInput 
                            id="refer1_email"
                            type="text"
                            name="refer1_email"
                            value={data.refer1_email}
                            className="w-full"
                            placeholder="you@example.com"
                            autoComplete="refer1_email"
                            onChange={(e) => setData('refer1_email', e.target.value)}
                            hasError={!!errors.refer1_email}
                        />
                        <InputError message={errors.refer1_email}  />
                    </div>
                </form>

                {/* Reference 2 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Reference 2</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="refer2_name" value="Full Name"/>
                        </div>
                        <TextInput 
                            id="refer2_name"
                            type="text"
                            name="refer2_name"
                            value={data.refer2_name}
                            className="w-full"
                            autoComplete="refer2_name"
                            onChange={(e) => setData('refer2_name', e.target.value)}
                            hasError={!!errors.refer2_name}
                        />
                        <InputError message={errors.refer2_name}  />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="relation2" value="Relationship"/>
                        </div>
                        <TextInput 
                            id="relation2"
                            type="text"
                            name="relation2"
                            value={data.relation2}
                            className="w-full"
                            autoComplete="relation2"
                            onChange={(e) => setData('relation2', e.target.value)}
                            hasError={!!errors.relation2}
                        />
                        <InputError message={errors.relation2}  />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="refer2_phoneno" value="Phone Number" />
                        </div>
                        <div className="flex items-center gap-2 self-stretch"> 
                            <Dropdown 
                                value={data.refer2_dailcode} 
                                onChange={(e) => setData('refer2_dailcode', e.value)} 
                                options={getPhoneCode.map((item) => ({
                                    label: item.phoneCode, // What user sees
                                    value: `${item.phoneCode}`, // Ensures it prefixes with +
                                }))}
                                loading={isLoading}
                                optionLabel="label"
                                placeholder="Select"
                                className="w-full max-w-[100px] text-sm"
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
                            <TextInput 
                                id="refer2_phoneno"
                                type="number"
                                name="refer2_phoneno"
                                value={data.refer2_phoneno}
                                className="w-full"
                                placeholder="Phone Number"
                                autoComplete="refer2_phoneno"
                                onChange={(e) => setData('refer2_phoneno', e.target.value)}
                                hasError={!!errors.refer2_phoneno}                            
                            />
                        </div>
                        <InputError message={errors.refer2_phoneno}  />   
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="refer2_email" value="Email" />
                        </div>
                       <TextInput 
                            id="refer2_email"
                            type="text"
                            name="refer2_email"
                            value={data.refer2_email}
                            className="w-full"
                            placeholder="you@example.com"
                            autoComplete="refer2_email"
                            onChange={(e) => setData('refer2_email', e.target.value)}
                            hasError={!!errors.refer2_email}
                        />
                        <InputError message={errors.refer2_email}  />
                    </div>
                </form>

                {/* Reference 3 */}
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="min-w-[500px] flex-[1_0_0] text-gray-950 font-semibold">Reference 3</div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="refer3_name" value="Full Name"/>
                        </div>
                        <TextInput 
                            id="refer3_name"
                            type="text"
                            name="refer3_name"
                            value={data.refer3_name}
                            className="w-full"
                            autoComplete="refer3_name"
                            onChange={(e) => setData('refer3_name', e.target.value)}
                            hasError={!!errors.refer3_name}
                        />
                        <InputError message={errors.refer3_name}  />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="relation3" value="Relationship"/>
                        </div>
                        <TextInput 
                            id="relation3"
                            type="text"
                            name="relation3"
                            value={data.relation3}
                            className="w-full"
                            autoComplete="relation3"
                            onChange={(e) => setData('relation3', e.target.value)}
                            hasError={!!errors.relation3}
                        />
                        <InputError message={errors.relation3}  />
                    </div>
                    <div className="flex flex-col min-w-[300px] max-w-[334px] items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="refer3_phoneno" value="Phone Number" />
                        </div>
                        <div className="flex items-center gap-2 self-stretch"> 
                            <Dropdown 
                                value={data.refer3_dailcode} 
                                onChange={(e) => setData('refer3_dailcode', e.value)} 
                                options={getPhoneCode.map((item) => ({
                                    label: item.phoneCode, // What user sees
                                    value: `${item.phoneCode}`, // Ensures it prefixes with +
                                }))}
                                loading={isLoading}
                                optionLabel="label"
                                placeholder="Select"
                                className="w-full max-w-[100px] text-sm"
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
                            <TextInput 
                                id="refer3_phoneno"
                                type="number"
                                name="refer3_phoneno"
                                value={data.refer3_phoneno}
                                className="w-full"
                                placeholder="Phone Number"
                                autoComplete="refer3_phoneno"
                                onChange={(e) => setData('refer3_phoneno', e.target.value)}
                                hasError={!!errors.refer3_phoneno}
                            />
                        </div>
                        <InputError message={errors.refer3_phoneno}  />
                    </div>
                    <div className="flex min-w-[300px] max-w-[334px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="refer3_email" value="Email" />
                        </div>
                       <TextInput 
                            id="refer3_email"
                            type="text"
                            name="refer3_email"
                            value={data.refer3_email}
                            className="w-full"
                            placeholder="you@example.com"
                            autoComplete="refer3_email"
                            onChange={(e) => setData('refer3_email', e.target.value)}
                            hasError={!!errors.refer3_email}
                        />
                        <InputError message={errors.refer3_email}  />
                    </div>
                </form>
            </div>
        </div>
    )
}