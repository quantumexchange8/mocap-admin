import React from "react";
import { Checkbox } from "antd";
import MegaPhoneIllus from "../Icon/PinIllus/MegaPhone";
import NotepadIllus from "../Icon/PinIllus/Notepad";
import CalendarPin from "../Icon/PinIllus/CalendarPin";
import Balloon from "../Icon/PinIllus/Balloon";
import Coffee from "../Icon/PinIllus/Coffee";
import Pins from "../Icon/PinIllus/Pins";
import { LearnMoreArrowIcon } from "../Icon/Outline";

const Pin = ({ id, title1, title2, selected, onSelect, value }) => {
    return (
        <div
            onClick={() => onSelect(id)}
            className={`relative w-[150px] h-[81px] border rounded-sm bg-white p-3 cursor-pointer
                ${selected ? 'border-gray-950' : 'border-gray-200'}`}
        >
            {/* Checkbox top right */}
            <div className="absolute -top-1 right-1">
                <input type="checkbox" checked={selected} readOnly className={`w-3 h-3 ${selected ? 'bg-gray-950 border-gray-950 ' : 'bg-white border-gray-300 ' } rounded-sm`} />
            </div>

            <div className="flex flex-col justify-between gap-6 w-full h-full">
                <div className="flex flex-col">
                    <span className="uppercase text-black font-bold text-xxs">{title1}</span>
                    <span className="uppercase text-gray-400 font-bold text-xxs">{title2}</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="bg-gray-950 w-[7.5px] h-[7.5px] rounded-full p-[0.75px] flex items-center">
                        <LearnMoreArrowIcon />
                    </div>
                    <span className="uppercase text-[5px] text-black font-semibold">Learn more</span>
                </div>
            </div>

            {
                value === '1' && (
                    <div className="absolute bottom-0 right-0 overflow-hidden">
                        <MegaPhoneIllus />
                    </div>
                )
            }
            {
                value === '2' && (
                    <div className="absolute bottom-0 right-0 overflow-hidden">
                        <NotepadIllus />
                    </div>
                )
            }
            {
                value === '3' && (
                    <div className="absolute bottom-0 right-0 overflow-hidden">
                        <CalendarPin />
                    </div>
                )
            }
            {
                value === '4' && (
                    <div className="absolute bottom-0 right-0 overflow-hidden">
                        <Balloon />
                    </div>
                )
            }
            {
                value === '5' && (
                    <div className="absolute bottom-0 right-0 overflow-hidden">
                        <Coffee />
                    </div>
                )
            }
            {
                value === '6' && (
                    <div className="absolute bottom-0 right-0 overflow-hidden">
                        <Pins />
                    </div>
                )
            }
        </div>
    );
};

export default Pin;