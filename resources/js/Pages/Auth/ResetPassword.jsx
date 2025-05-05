import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Button from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { EyeOff, EyeOn } from '@/Components/Icon/Outline';
import InputIconWrapper from '@/Components/InputIconWrapper';
import { useState } from 'react';

export default function ResetPassword({ token, email }) {
    const [showPassword, setShowPassword ] = useState(false);
    const [showNewPassword, setShowNewPassword ] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
            onSuccess: () => {
                router.visit(route('success.reset'));
            }
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />
            <form className='flex w-[360px] px-5 py-8 flex-col items-center gap-8' onSubmit={submit}>
                <div className='flex flex-col items-center gap-2 self-stretch'>
                    <div className='text-gray-950 text-center text-lg font-bold'>
                    Reset New Password
                    </div>
                    <div className='text-gray-700 text-center text-sm'>
                    Make sure your password fulfill the criteria.
                    </div>
                </div>
                <div className='flex flex-col gap-2 self-stretch'>
                    <InputLabel htmlFor="password" value="New Password" />
                        <InputIconWrapper>
                            <TextInput
                                id="password"
                                type={showNewPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                placeholder="••••••••"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={() => setShowNewPassword(!showNewPassword)}>
                                {showNewPassword ? <EyeOff /> : <EyeOn /> }
                            </div>
                        </InputIconWrapper>
                    <InputError message={errors.password} className="mt-2" />
                    <div className='self-stretch text-gray-500 text-xs'>Must be at least 8 characters containing uppercase letters, lowercase letters, numbers, and symbols.</div>
                </div>
                <div className='flex flex-col gap-2 self-stretch'>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password"/>
                        <InputIconWrapper>
                            <TextInput
                                id="password_confirmation"
                                type={showPassword ? 'text' : 'password'}
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="px-4 py-3 w-full"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                            <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff /> : <EyeOn /> }
                            </div>
                        </InputIconWrapper>
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    <div className='self-stretch text-gray-500 text-xs'>Both passwords must match.</div>
                </div>
                <div className='flex flex-col items-center gap-3 self-stretch'>
                    <Button 
                        className= "flex px-4 py-3 justify-center items-center gap-2 self-stretch"
                        variant='primary'
                        size="md"
                        disabled={processing}
                        >
                        Reset Password
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
