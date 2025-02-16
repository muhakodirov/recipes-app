"use client"
import signIn from '@/action/signIn';
import React, { useState } from 'react';
import SubmitLogin from './Submit-Login';
import { useUserContext } from '@/context/User';
import { useRouter } from 'next/navigation';
import setSession from '@/lib/session';

const LoginForm: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setCurrUser, currUser } = useUserContext();

    const handleSubmit = async (formData: FormData) => {
        const response = await signIn(formData);
        if (response?.ok) {
            setError('');
            setCurrUser(response.user);
            setSession(response?.user);
            router.push('/profile');
        } else {
            response?.message && setError(response?.message);
        }
    };

    return (
        <div className="flex justify-center items-center mt-20 ">
            <form action={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Melden Sie sich an 😊</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <SubmitLogin />
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                <p className="text-center mt-4 text-gray-700">
                    Nicht registriert?{' '}
                    <a href="/signup" className="text-blue-500">Registrieren</a>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;