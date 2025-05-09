import Checkbox from "@/Components/Checkbox"
import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import React from "react"

export default function Form6() {
    return(
        <div className="flex w-full px-0 flex-col items-center gap-5">
            {/* Transportation and Location */}
            <div className="flex w-[728px] flex-col items-center border border-gray-200 rounded-sm">
                <div className="flex px-5 py-4 flex-col items-start self-stretch border-b border-b-gray-200">
                    <div className="self-stretch text-gray-950 font-semibold">Transportation and Location</div>
                    <div className="self-stretch text-gray-500 text-sm">Information about your commute and proximity to the workplace.</div>
                </div>
                <form className="flex p-5 items-start content-start gap-5 self-stretch flex-wrap">
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="distance" value="Transportation Used to Work"/><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex w-[688px] px-0 py-3 items-center gap-8">
                            <div className="flex items-center gap-2">
                                <Checkbox/>
                                <div className="text-sm text-gray-950">Walk</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox/>
                                <div className="text-sm text-gray-950">Bicycle</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox/>
                                <div className="text-sm text-gray-950">Motorcycle</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox/>
                                <div className="text-sm text-gray-950">Car</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox/>
                                <div className="text-sm text-gray-950">Public Transport</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="distance" value="Approximate Distance from Your Residence to Our Company"/><div className="text-sm text-error-600">*</div>
                        </div>
                        <TextInput
                            id="distance"
                            type="number"
                            name="distance"
                            className="flex items-center gap-3 self-stretch"
                            placeholder="0.0 km"
                        />
                    </div>
                    <div className="flex min-w-[500px] flex-col items-start gap-2 flex-[1_0_0]">
                        <div className="flex gap-1">
                            <InputLabel htmlFor="time" value="Approximate Time Needed from Your Residence to Our Company"/><div className="text-sm text-error-600">*</div>
                        </div>
                        <div className="flex justify-center items-center gap-5 self-stretch">
                            <TextInput
                                id="time"
                                type="number"
                                name="time"
                                className="w-full"
                                placeholder="0 hour(s)"
                            />
                            <TextInput
                                id="time"
                                type="number"
                                name="time"
                                className="w-full"
                                placeholder="0 minutes(s)"
                            />
                        </div>
                    </div>
                </form>
               </div>
        </div>
    )
}