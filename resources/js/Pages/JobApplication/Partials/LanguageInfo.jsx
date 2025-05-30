import React from "react"
import { Radio } from "antd"
import { useState } from "react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function LanguageInfo({data, setData, errors}) {
    const rating = [
        { label: ' ', value: '1' },
        { label: ' ', value: '2' },
        { label: ' ', value: '3' },
        { label: ' ', value: '4' },
        { label: ' ', value: '5' },
    ];

    const languages = [
        { name: 'English', prefix: 'eng' },
        { name: 'Bahasa Malaysia', prefix: 'malay' },
        { name: 'Chinese', prefix: 'chinese' },
        { name: 'other', prefix: 'other'}
    ];

    const skills = ['speak', 'write', 'listen'];

    return (
        <div className="flex w-full px-0 flex-col items-center gap-5">
            {/* Language Proficiency */}
            <div className="flex w-[728px] flex-col items-center border border-gray-200 rounded-sm">
                <div className="flex px-5 py-4 flex-col items-start self-stretch border-b border-b-gray-200">
                    <div className="self-stretch text-gray-950 font-semibold">Language Proficiency</div>
                    <div className="self-stretch text-gray-500 text-sm">Rate your speaking, writing, and listening skills for each language.</div>
                </div>
                {languages.map((languages) => (
                    <form key={languages.prefix} className="flex p-5 flex-col items-center gap-5 self-stretch">
                        <div className="flex justify-between items-center self-stretch gap-5">
                            {languages.name === 'other' ? (
                                <TextInput
                                    id="other_language"
                                    type="text"
                                    name="other_language"
                                    value={data.other_language|| ""}
                                    className="max-w-[168px] w-full"
                                    placeholder="Other Language"
                                    onChange={(e) => setData('other_language', e.target.value)}
                                />
                            ) : (
                                <div className="text-gray-950 font-semibold">{languages.name}</div>
                            )}
                            <label className="flex min-w-[500px] h-4 text-gray-700 text-xs justify-between">
                                <div>Very Poor</div>
                                <div>Poor</div>
                                <div>Fair</div>
                                <div>Good</div>
                                <div>Very Good</div>
                            </label>
                        </div>
                        {languages.name === 'other' ? (
                            skills.map((skill) => (
                                <div key={`other_${skill}`} className="flex-col gap-1 self-stretch">
                                    <div className="flex  justify-between items-center text-gray-700 text-sm">                                        
                                        {skill === 'speak' ? 'Speaking' : 
                                         skill === 'write' ? 'Writing' : 'Listening'}
                                        <Radio.Group 
                                            value={data[`other_${skill}`]}
                                            onChange={(e) => setData(`other_${skill}`, e.target.value)}
                                            options={rating}
                                            className="flex w-[500px] px-5 py-0 justify-between items-center"
                                            disabled={!data.other_language}
                                        />
                                    </div>
                                    <InputError message={errors[`other_${skill}`]} />
                                </div>
                                
                            ))
                        ):(
                            skills.map((skill) => (
                            <div key={`${languages.prefix}_${skill}`} className="flex-col gap-1 self-stretch">
                                <div className="flex  justify-between items-center text-gray-700 text-sm">
                                    {skill === 'speak' ? 'Speaking' : 
                                    skill === 'write' ? 'Writing' : 'Listening'}
                                
                                <Radio.Group 
                                    value={data[`${languages.prefix}_${skill}`]}
                                    onChange={(e) => setData(`${languages.prefix}_${skill}`, e.target.value)}
                                    options={rating}
                                    className="flex w-[500px] px-5 py-0 justify-between items-center"
                                />
                                </div>
                                <InputError message={errors[`${languages.prefix}_${skill}`]} />
                            </div>
                            ))
                        )} 
                    </form>
                ))}
            </div>
        </div>
    )
}