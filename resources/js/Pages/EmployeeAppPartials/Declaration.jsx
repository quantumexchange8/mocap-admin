import Button from "@/Components/Button";
import { ReloadIcon } from "@/Components/Icon/Outline";
import InputLabel from "@/Components/InputLabel";
import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function DeclarationInfo({ data, setData, sigCanvas }) {


    return (
        <>
            {/* Declaration Info */}
            <div className="flex flex-col border border-gray-200 bg-white rounded-sm">
                <div className="flex flex-col py-4 px-5 border-b border-gray-200">
                    <div className="text-gray-950 text-base font-semibold">Declaration</div>
                    <div className="text-gray-500 text-sm">Please review your information before submitting.</div>
                </div>
                <div className="flex flex-col gap-8 p-5 ">
                    <div className="flex flex-col gap-10 text-gray-700 text-sm">
                        <span>
                            I hereby affirm the accuracy, truthfulness, and completeness of all information provided in this form,
                            including my medical history. I understand that any intentional misstatement or omission, whether related
                            to medical history or other details, may have serious consequences, potentially affecting offers of permanent
                            or internship employment. Such actions may result in the withdrawal of an employment offer or immediate
                            termination, as deemed appropriate by the company.
                        </span>

                        <span>
                            Furthermore, I acknowledge that the company shall not be held liable for any consequences arising from my
                            failure to declare relevant details. I authorise the company to verify all information provided herein,
                            including conducting background checks and medical assessments if required, for the purpose of evaluating
                            my suitability for permanent or internship employment. I am fully aware of the importance of providing
                            precise information and commit to adhering to the company’s policies and procedures throughout my
                            tenure.
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="signature" value={<div className="flex gap-1">
                            <span>Employee’s Signature</span>
                            <span className="text-error-600">*</span>
                        </div>} />

                        <div className="relative">
                            <SignatureCanvas
                                ref={sigCanvas}
                                penColor="black"
                                canvasProps={{ className: 'border border-gray-300 rounded w-full h-80' }}
                            />

                            <div className="absolute top-2 right-2 z-10">
                                <Button
                                    type="button"
                                    variant="outlined"
                                    size="sm"
                                    className="flex items-center justify-center"
                                    onClick={() => sigCanvas.current.clear()}
                                    iconOnly
                                >
                                    <ReloadIcon />
                                </Button>
                            </div>
                        </div>

                        <div className="text-gray-950 text-xs">
                            Date: {new Date().toLocaleDateString('en-GB')}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}