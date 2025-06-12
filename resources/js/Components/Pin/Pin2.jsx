import React from "react";
import { Checkbox } from "antd";
import MegaPhoneIllus from "../Icon/PinIllus/MegaPhone";
import NotepadIllus from "../Icon/PinIllus/Notepad";
import CalendarPin from "../Icon/PinIllus/CalendarPin";
import Balloon from "../Icon/PinIllus/Balloon";
import Coffee from "../Icon/PinIllus/Coffee";
import Pins from "../Icon/PinIllus/Pins";
import { LearnMoreArrowIcon } from "../Icon/Outline";

const Pin2 = ({ pin_type, title1, title2 }) => {

    return (
        <div className="bg-white max-w-80 w-full h-[180px] p-7 relative">

            <div className="flex flex-col justify-between w-full h-full">
                <div className="flex flex-col">
                    <span className="uppercase text-black font-bold text-lg">
                        {
                            pin_type === 'pin1' && "important"
                        }
                        {
                            pin_type === 'pin2' && "important"
                        }
                        {
                            pin_type === 'pin3' && "excited"
                        }
                        {
                            pin_type === 'pin4' && "SEASON’S"
                        }
                        {
                            pin_type === 'pin5' && "LATEST"
                        }
                        {
                            pin_type === 'pin6' && "QUICK"
                        }
                    </span>
                    <span className="uppercase text-gray-400 font-bold text-lg">
                        {
                            pin_type === 'pin1' && "action needed"
                        }
                        {
                            pin_type === 'pin2' && "event ahead!"
                        }
                        {
                            pin_type === 'pin3' && "greetings"
                        }
                        {
                            pin_type === 'pin4' && "SEASON’S"
                        }
                        {
                            pin_type === 'pin5' && "COMPANY NEWS"
                        }
                        {
                            pin_type === 'pin6' && "REMINDER"
                        }
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="bg-gray-950 w-[7.5px] h-[7.5px] rounded-full p-[0.75px] flex items-center">
                        <LearnMoreArrowIcon />
                    </div>
                    <span className="uppercase text-xxs text-black font-semibold">Learn more</span>
                </div>
            </div>

            {
                  pin_type === 'pin1' && (
                    <div className="absolute bottom-0 right-0 overflow-hidden">
                        <img src="/asset/pins/megaphone.png" alt="" />
                    </div>
                )
            }
            {
                  pin_type === 'pin2' && (
                    <div className="absolute bottom-0 right-0 overflow-hidden">
                        <img src="/asset/pins/notepad.png" alt="" className="w-36" />
                    </div>
                )
            }
            {
                  pin_type === 'pin3' && (
                    <div className="absolute bottom-0 right-0 overflow-hidden">
                        <img src="/asset/pins/calender.png" alt="" className="w-36" />
                    </div>
                )
            }
            {
                  pin_type === 'pin4' && (
                    <div className="absolute bottom-0 right-0 overflow-hidden">
                        <img src="/asset/pins/black-balloons-bunch.png" alt="" className="w-44" />
                    </div>
                )
            }
            {
                  pin_type === 'pin5' && (
                    <div className="absolute bottom-0 right-0 overflow-hidden">
                        <img src="/asset/pins/coffee-cup.png" alt="" className="w-36" />
                    </div>
                )
            }
            {
                  pin_type === 'pin6' && (
                    <div className="absolute bottom-0 right-0 overflow-hidden">
                        <img src="/asset/pins/pins.png" alt=""  className="w-36"/>
                    </div>
                )
            }
        </div>
    );
};

export default Pin2;