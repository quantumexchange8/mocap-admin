import Button from "@/Components/Button";
import { ReloadIcon } from "@/Components/Icon/Outline";
import InputLabel from "@/Components/InputLabel";
import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function Declaration({data, setData, sigCanvas, handleSignatureChange}) {
    return(
        <div className="flex w-full px-0 flex-col items-center gap-5">
            <div className="flex w-[728px] flex-col items-center border border-gray-200 rounded-sm">
                <div className="flex px-5 py-4 flex-col items-start self-stretch border-b border-b-gray-200">
                    <div className="self-stretch text-gray-950 font-semibold">Declaration</div>
                    <div className="self-stretch text-gray-500 text-sm">Please review your information before submitting.</div>
                </div>
                <div className="flex flex-col gap-8 p-5 ">
                    <div className="self-stretch text-gray-700 text-sm">
                    <p>I affirm that all Personal Data provided by me, along with the certificates and supporting documents
                    mentioned in this form, are accurate, current, and complete. I acknowledge that any intentional
                    misrepresentation or omission may impact my eligibility for employment, internship, or scholarship offers,
                    potentially resulting in the withdrawal of such offers or immediate termination if discovered.</p>
                    <br></br>
                    <p>I authorise and consent to you contacting my current and previous employers and character referees for
                    reference requests, confirming that I have obtained their consent to disclose their contact details to you.</p>
                    <br></br>
                    <p>I further authorise and consent to any third party involved in conducting character, credit, medical, or
                    compliance checks—such as present and previous employers, character referees, or medical professionals—
                    to disclose information pertaining to me, including opinions about me, for the purpose of processing my
                    application for employment, internship, or scholarship with your organisation.</p>
                    <br></br>
                    <p>I explicitly authorise and consent to the processing of my Personal Data for the purpose of evaluating my
                    application for employment, internship, or scholarship, as well as for the necessary administrative functions
                    associated with these opportunities.</p>
                    </div>
    
                    <div className="flex flex-col gap-2">
                        <InputLabel htmlFor="signature" value={<div className="flex gap-1">
                            <span>Applicant's Signature</span>
                            <span className="text-error-600">*</span>
                        </div>} />

                        <div className="relative">
                            <SignatureCanvas
                                ref={sigCanvas}
                                penColor="black"
                                onEnd={handleSignatureChange}
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
                      
        </div>

    )
}