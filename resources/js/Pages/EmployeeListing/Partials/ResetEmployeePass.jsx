import Button from "@/Components/Button";
import { EyeOff, EyeOn, SuccessIcon } from "@/Components/Icon/Outline";
import InputIconWrapper from "@/Components/InputIconWrapper";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { Radio } from "antd";
import React, { useState } from "react";

export default function ResetEmployeePass ({
    fetchEmployee,
    employmentDetails,
    isResetPwOpen,
    setIsResetPwOpen,
    closeResetPwDialog,
    closePwResetedDialog,
    pwResetedDialog,
    setPwResetedDialog,
    newRespPw,
    setNewRespPw,
}) {

    const [inputPw, setInputPw] = useState('');
    const [pwVal, setPwVal] = useState('generate_by_system');
    const [showPassword, setShowPassword ] = useState(false);
    
    const [tooltipText, setTooltipText] = useState(null);

    const requirements = {
        length: inputPw.length >= 8,
        uppercase: /[A-Z]/.test(inputPw),
        lowercase: /[a-z]/.test(inputPw),
        number: /\d/.test(inputPw),
        symbol: /[^A-Za-z0-9]/.test(inputPw),
    };

    const style = {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    }

    const confirmResetPw = async () => {
        try {
            
            const response = await axios.post('/reset-employee-pw', {
                employmentDetails: employmentDetails,
                reset_type: pwVal,
                password: inputPw,
            });
            
            if (response.status === 200) {

                setIsResetPwOpen(false);
                setPwResetedDialog(true);
                setNewRespPw(response.data.password);

            }

        } catch (error) {
            console.error('error', error);
        }
    }

    const handleCopy = (val) => {
        const textToCopy = val;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setTooltipText('Copied!');

            setTimeout(() => {
                setTooltipText(null);
            }, 3000);

        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }

    return (
        <>
            <Modal
                show={isResetPwOpen}
                maxWidth='md'
                title='Reset Login Password'
                onClose={closeResetPwDialog}
                footer={
                    <div className="w-full flex justify-end gap-4">
                        <Button size="sm" variant="outlined" onClick={closeResetPwDialog} >Cancel</Button>
                        <Button size="sm" onClick={confirmResetPw} >Confirm</Button>
                    </div>
                }
            >
                {
                    employmentDetails && (
                        <form >
                            <div className="py-3 px-6 flex flex-col gap-8">
                                <div className="text-gray-700 text-sm">
                                    Please note that resetting the login password will take effect immediately by clicking “Confirm”. The current user session will be logged out, and the employee will be prompted to log in again using the new password.
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Radio.Group 
                                        value={pwVal}
                                        style={style}
                                        onChange={(e) => setPwVal(e.target.value)}
                                        options={[
                                            { value: 'generate_by_system', label: 'Generated password by system'},
                                            { value: 'manual_password', label: 'Set password manually'},
                                        ]}
                                    />
                                    {
                                        pwVal === 'manual_password' && (
                                            <div className="flex flex-col gap-2">
                                                <InputIconWrapper>
                                                    <TextInput 
                                                        id="password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="password"
                                                        value={inputPw}
                                                        className="w-full"
                                                        placeholder="Enter new password"
                                                        autoComplete="current-password"
                                                        onChange={(e) => setInputPw(e.target.value)}
                                                    />
                                                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? <EyeOn /> : <EyeOff /> }
                                                    </div>
                                                    
                                                </InputIconWrapper>
                                                <div className="text-gray-500 text-xs ">
                                                    Must be at least 8 characters containing uppercase letters, lowercase letters, numbers, and symbols.
                                                </div>
                                                {
                                                    inputPw && (
                                                        <div className="text-gray-500 text-xs space-y-1">
                                                            <div className={requirements.length ? 'text-green-600' : 'text-red-500'}>
                                                                {requirements.length ? '✔' : '✖'} At least 8 characters
                                                            </div>
                                                            <div className={requirements.uppercase ? 'text-green-600' : 'text-red-500'}>
                                                                {requirements.uppercase ? '✔' : '✖'} At least 1 uppercase letter
                                                            </div>
                                                            <div className={requirements.lowercase ? 'text-green-600' : 'text-red-500'}>
                                                                {requirements.lowercase ? '✔' : '✖'} At least 1 lowercase letter
                                                            </div>
                                                            <div className={requirements.number ? 'text-green-600' : 'text-red-500'}>
                                                                {requirements.number ? '✔' : '✖'} At least 1 number
                                                            </div>
                                                            <div className={requirements.symbol ? 'text-green-600' : 'text-red-500'}>
                                                                {requirements.symbol ? '✔' : '✖'} At least 1 symbol
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </form>
                    )
                }
            </Modal>

            {/* password resetted dialog */}
            <Modal
                show={pwResetedDialog}
                maxWidth='md'
                title={
                    <div className="flex items-center gap-3">
                        <span>Password Set Successfully</span>
                        <span><SuccessIcon /></span>
                    </div>
                }
                onClose={closePwResetedDialog}
                showFooter='hidden'
            >
                <div className="pt-3 pb-6 px-6 flex flex-col gap-8">
                    <div className="text-gray-700 text-sm">
                        You can copy the newly set password and share it directly with the employee or use the option to send an email notification to inform them about the password reset.
                    </div>
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-2 w-full">
                            <InputLabel value='Login Password' />
                            <InputIconWrapper>
                                <TextInput 
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={newRespPw}
                                    className="w-full"
                                    placeholder="Enter new password"
                                    autoComplete="current-password"
                                    onChange={(e) => setInputPw(e.target.value)}
                                    disabled
                                />
                                <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOn /> : <EyeOff /> }
                                </div>
                                
                            </InputIconWrapper>
                        </div>
                        <div className="flex items-end">
                            <Button size="md" onClick={() => handleCopy(newRespPw)}>
                                {
                                    tooltipText ? tooltipText : 'Copy'
                                }
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-[1px] bg-gray-200 w-full"></div>
                        <div className="text-gray-500 text-xs min-w-[230px]">or send email notification to the employee.</div>
                        <div className="h-[1px] bg-gray-200 w-full"></div>
                    </div>
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-2 w-full">
                            <div >
                                <TextInput 
                                    id="email"
                                    type='email'
                                    name="email"
                                    value={employmentDetails?.email}
                                    className="w-full"
                                    placeholder="Enter new password"
                                    autoComplete="current-password"
                                    onChange={(e) => setInputPw(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="text-gray-500 text-xs">Please ensure the email address is valid.</div>
                        </div>
                        <div className="flex">
                            <Button size="md">Send</Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}