import { useState } from 'react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import { EyeOff, EyeOn } from '@/Components/Icon/Outline';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputIconWrapper from '@/Components/InputIconWrapper';

export default function Login({ canResetPassword }) {
    const [showPassword, setShowPassword ] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        employee_id: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="w-full bg-onboarding min-h-screen bg-cover bg-center bg-no-repeat">
        <GuestLayout>
                <Head title="Log in" />
                <form className='flex w-[360px] px-5 py-8 flex-col items-center gap-8 rounded-sm border bg-white shadow-[0_4px_20px_0px_rgba(12,17,29,0.08)]' onSubmit={submit}>
                    <img src="/asset/currenttech_logo.png" className='w-[72px] h-12' alt="CurrentTech Logo" />
                    <div className='flex flex-col items-center gap-2 self-stretch'>
                        <div className='text-gray-950 text-center text-lg font-bold'>Back-Office Login</div>
                        <div className='text-gray-700 text-center text-sm'>Welcome back! Please enter your login details.</div>
                    </div>
                    <div className='flex flex-col items-center gap-5 self-stretch'>
                        <div className='flex flex-col items-start gap-2 self-stretch'>
                            <InputLabel htmlFor="employee_id" value="CTID" />
                            <TextInput
                                id="employee_id"
                                type="employee_id"
                                name="employee_id"
                                value={data.employee_id}
                                className="block w-full"
                                placeholder="eg. CT00000"
                                autoComplete="employee_id"
                                isFocused={true}
                                onChange={(e) => setData('employee_id', e.target.value)}
                            />
                            <InputError message={errors.employee_id} className="mt-2" />
                        </div>
                        <div className='flex flex-col gap-2 self-stretch'>
                            <InputLabel htmlFor="password" value="Password" />
                            <InputIconWrapper>
                                <TextInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className="px-4 py-3 w-full"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff /> : <EyeOn /> }
                                </div>
                            </InputIconWrapper>
                            <InputError message={errors.password} className="mt-2" />
                        </div>
                    </div>
                    <div className='flex justify-between items-center self-stretch'>
                        <label className="flex items-center gap-2">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <div className="text-gray-700 text-sm">
                                Remember me
                            </div>
                        </label>
                        <div className="text-right">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-gray-950 text-sm font-semibold"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className='flex items-start self-stretch'>
                        <Button 
                            className= "flex w-80 px-4 py-3 justify-center items-center gap-2 self-stretch"
                            variant='primary'
                            size="md"
                            disabled={processing}
                            >
                            Log In
                        </Button>
                    </div>
                </form>
        </GuestLayout>
        </div>
    );
}
