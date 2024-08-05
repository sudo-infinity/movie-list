"use client";
import Footer from '@/components/Footer/Footer';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('access_token');
        if (token) {
            // If token exists, redirect to the home page or dashboard
            router.push('/movies');
        }
    }, [router]);

    const validateForm = () => {
        if (!email || !email.includes('@')) {
            toast.error('Invalid email format');
            return false;
        }
        if (password.length >= 5) {
            toast.error('Password must be at least 5 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            });
            if (!response.ok) {
                console.log("response", response)
                toast.error(response.statusText)
                throw new Error('Login failed');
            }

            const data = await response.json();
            const { access_token } = data;

            // Save access token in local storage
            localStorage.setItem('access_token', access_token);
            toast.success('Login successful');
            // Redirect to the home page or dashboard
            router.push('/movies');
        } catch (error) {
            toast.error('Invalid email or password');
            console.error('Error:', error);
            toast.error("" + error);

        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-950 p-4">
            <div className="text-6xl font-bold mb-6">Sign in</div>
            <div className="w-full max-w-md bg-cyan-950 p-6 rounded-lg">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border bg-cyan-900 border-cyan-950 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:bg-cyan-900"
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
                            className="w-full px-3 py-2 border bg-cyan-900 border-cyan-950 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:bg-cyan-900"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <input type="checkbox" id="remember-me" className="mr-2 bg-cyan-500 accent-cyan-700 " />
                        <label htmlFor="remember-me" className="text-white">Remember me</label>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-3 py-2 bg-emerald-400 text-white rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-900"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <Footer relativePosition={false} />
        </div>
    );
};

export default Login;
