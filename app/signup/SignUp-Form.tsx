"use client"
import React, { useState } from 'react';
import { signUp } from '@/action/signUp';
import { useRouter } from 'next/navigation';
import Submit from './Submit';

const SignUpForm: React.FC = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (formData: FormData) => {
        //TODO: Crypt password before sending
        const response = await signUp(formData);
        if (response?.error) {
            setError(response.message);
            setSuccess(false);
        } else {
            setError(null);
            setSuccess(true);
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        }
    };

    return (
        <div className="flex justify-center items-center mt-20 ">
            <form action={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Konto anlegen</h2>
                <div className="mb-4">
                    <label htmlFor="firstname" className="block text-gray-700">Vorname</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastname" className="block text-gray-700">Nachname</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                {/* Submit-Button */}
                <Submit />
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {success && (
                    <p className="text-green-500 mt-4">Registrierung erfolgreich!</p>
                )}
                <p className="text-center mt-4 text-gray-700">
                    Bereits registriert?{' '}
                    <a href="/login" className="text-blue-500">Anmelden</a>
                </p>
            </form>
        </div>
    );
};

export default SignUpForm;