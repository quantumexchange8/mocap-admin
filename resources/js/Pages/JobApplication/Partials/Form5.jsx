import React from "react"
import { Radio, Table } from "antd"
import { useState } from "react";
import TextInput from "@/Components/TextInput";
export default function Form5() {
    const [proficiency, setProficiency] = useState({
        english: {},
        malay: {},
        chinese: {}
    });

    const levels = ['Very Poor', 'Poor', 'Fair', 'Good', 'Very Good'];
    const languages = [
        { key: 'english', name: 'English' },
        { key: 'malay', name: 'Bahasa Malaysia' },
        { key: 'chinese', name: 'Chinese' },
        { key: 'other', name: 'Other' }
    ];

    const handleChange = (language, skill, level) => {
        setProficiency(prev => ({
          ...prev,
          [language]: {
            ...prev[language],
              [skill]: level
          }
        }));
        console.log(language,skill,level)
    };
    
    const dataSource = (language) => [
    {
        key: 'speaking',
        skill: <span className="text-gray-700 text-sm">Speaking</span>,
        ...Object.fromEntries(levels.map(level => [level, (
        <Radio 
            checked={proficiency[language]?.speaking === level}
            onChange={() => handleChange(language,'speaking', level)}
        />
        )]))
    },
    {
        key: 'writing',
        skill: <span className="text-gray-700 text-sm">Writing</span>,
        ...Object.fromEntries(levels.map(level => [level, (
        <Radio 
            checked={proficiency[language]?.writing === level}
            onChange={() => handleChange(language,'writing', level)}
        />
        )]))
    },
    {
        key: 'listening',
        skill: <span className="text-gray-700 text-sm">Listening</span>,
        ...Object.fromEntries(levels.map(level => [level, (
        <Radio 
            checked={proficiency[language]?.listening === level}
            onChange={() => handleChange(language,'listening', level)}
        />
        )]))
    }
    ];
    const columns = (language) => [
    {
        title: language === 'Other' ? (
            <TextInput
                id="language"
                type="text"
                name="language"
                className="text-gray-500 font-normal text-sm"
                placeholder="Other Language"
            />
        ) : (
            <span className="text-gray-950 text-base">{language}</span>
        ),
        dataIndex: 'skill',
        key: 'skill',
        width: 300,
        
    },
    ...levels.map(level => ({
        title: <span className="text-gray-700 text-xs font-normal">{level}</span>,
        dataIndex: level,
        key: level,
        align: 'center',
        width:100,
    }))
    ];

    return(
        <div className="flex w-full px-0 flex-col items-center gap-5">
            {/* Language Proficiency */}
            <div className="flex w-[728px] flex-col items-center border border-gray-200 rounded-sm">
                <div className="flex px-5 py-4 flex-col items-start self-stretch border-b border-b-gray-200">
                    <div className="self-stretch text-gray-950 font-semibold">Language Proficiency</div>
                    <div className="self-stretch text-gray-500 text-sm">Rate your speaking, writing, and listening skills for each language.</div>
                </div>
                {languages.map(lang => (
                    <form key={lang.key} className="flex px-5 py-[10px] flex-col items-center gap-5 self-stretch">
                        <div className="flex justify-between items-center self-stretch">
                        <Table
                            dataSource={dataSource(lang.key)}
                            columns={columns(lang.name)}
                            pagination={false}
                            bordered={false}
                            rowHoverable={false}
                            className=" "
                        />
                        </div>
                    </form>
                ))}
            </div>
        </div>
    )
}