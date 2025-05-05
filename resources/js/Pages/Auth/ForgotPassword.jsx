import InputError from '@/Components/InputError';
import Button from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';

export default function ForgotPassword({ }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <form className='flex w-[360px] px-5 py-8 flex-col items-center gap-8' onSubmit={submit}>
                <div className='flex flex-col items-center gap-2 self-stretch'>
                    <div className='text-gray-950 text-center text-lg font-bold'>
                        Forgot Password?
                    </div>
                    <div className='text-gray-700 text-center text-sm'>
                        No worries, we’ll send you reset instructions.
                    </div>
                </div>
                <div className='flex flex-col items-start gap-2 self-stretch'>
                    <div className='text-gray-700 text-sm'>
                        Email
                    </div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Enter your registered email"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className='flex flex-col items-center gap-3 self-stretch'>
                    <Button 
                        className= "flex px-4 py-3 justify-center items-center gap-2 self-stretch"
                        variant='primary'
                        size="md"
                        disabled={processing}
                        >
                        Send Instructions
                    </Button>
                    <Link href={route('login')} className="block w-full">
                        <Button 
                            className= "flex px-4 py-3 justify-center items-center gap-2 self-stretch w-full"
                            variant='text'
                            size="md"
                            disabled={processing}
                        >
                            Back to Log In
                        </Button>
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
