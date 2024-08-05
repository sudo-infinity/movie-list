"use client";
import React, { useState } from 'react';
import { MdOutlineFileDownload } from 'react-icons/md';
import Footer from '@/components/Footer/Footer';
import toast from 'react-hot-toast';
import Link from 'next/link';

const CreateMovie = () => {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('publishingYear', year); // Convert to integer
        formData.append('file', file);

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/movie`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Ensure token is included for auth
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to create movie');
            }

            console.log('Movie created successfully');
            toast.success('Movie created successfully');
            setFile(null);
            setTitle('');
            setYear('');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error creating movie');
        }
    };

    return (
        <>
            <div className="flex flex-col min-h-screen bg-cyan-950 p-8 md:p-16">
                <div className="mb-8 md:mb-16">
                    <h1 className="text-4xl font-bold text-white md:pl-16">Create a new movie</h1>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-8 w-full">
                    <div className="flex flex-col items-center md:w-1/2 mb-4 md:mb-0">
                        <label className="border-dashed rounded-2xl border-2 border-white w-64 md:w-2/3 h-64 md:h-96 flex flex-col items-center justify-center bg-cyan-900 cursor-pointer">
                            <MdOutlineFileDownload className="text-2xl text-white" />
                            <div className="mt-2 text-white w-full px-4 text-center overflow-hidden whitespace-nowrap text-ellipsis">
                                {file ? file.name : 'Drop an image here'}
                            </div>
                            <input
                                type="file"
                                style={{ display: 'none' }} // Hide the input element
                                onChange={handleFileChange}
                                onClick={(event) => event.stopPropagation()} // Prevents the label click handler from being triggered on input click
                            />
                        </label>
                    </div>
                    <div className="flex flex-col md:w-1/2">
                        <form className="w-full lg:w-2/3" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-3 py-2 border bg-cyan-900 border-cyan-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Publishing year"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="w-full md:w-2/3 px-3 py-2 border bg-cyan-900 border-cyan-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                />
                            </div>
                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                                <Link href="/movies">
                                    <button
                                        type="button"
                                        className="w-full md:w-auto bg-transparent border border-white text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-cyan-950 focus:outline-none focus:shadow-outline"
                                    >
                                        Cancel
                                    </button>
                                </Link>
                                <button
                                    type="submit"
                                    className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer relativePosition={false} />
        </>
    );
};

export default CreateMovie
