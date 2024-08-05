"use client";
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Register = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        console.log({ email, password });


        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            });
            console.log("response", response)
            if (!response.ok) {
                const err = await response.json()
                toast.error(err.message); // Displays a success message
                throw new Error('Signup failed');

            }
            toast.success('Singup successful');
            // Redirect to the home page or dashboard
            router.push('/login');
        } catch (error) {
            toast.error('Error signing up',);
            console.error('Error:', error);
        }

    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-950 p-4">
            <div className="text-6xl font-bold mb-6">Sign up</div>
            <div className="w-full max-w-md bg-cyan-950 p-6 rounded-lg ">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border bg-cyan-900 border-cyan-950 rounded focus:outline-none focus:ring-2 focus:bg-cyan-900"
                        />
                    </div>
                    <div>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border bg-cyan-900 border-cyan-950 rounded focus:outline-none focus:ring-2 focus:bg-cyan-900"
                        />
                    </div>
                    <div>
                        <input
                            id="confirmpassword"
                            type="password"
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border bg-cyan-900 border-cyan-950 rounded focus:outline-none focus:ring-2 focus:bg-cyan-900"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-3 py-2 rounded-lg shadow-md bg-emerald-400 text-white  hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-900"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className='flex text-gray-500 m-4 items-center justify-center'> -OR-</div>
                <Link href="/login"
                    className="flex items-center justify-center w-full px-3 py-2 rounded-lg shadow-md bg-emerald-400 text-white  hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-900"
                >
                    Login with an existing Account
                </Link>
            </div>
            <Footer relativePosition={false} />
        </div>
    );
};

export default Register;
