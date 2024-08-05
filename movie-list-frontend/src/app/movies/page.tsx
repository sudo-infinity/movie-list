/* eslint-disable @next/next/no-img-element */
"use client"
import Footer from '@/components/Footer/Footer';
import Loader from '@/components/Loader/Loader';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdAddBox, MdLogout } from 'react-icons/md';
import withAuth from '@/components/withAuth/withAuth';

type Movie = {
    id: number;
    title: string;
    publishingYear: string;
    poster: string;
};
const MyMovies = () => {
    const [loading, setLoading] = useState(true);

    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 10; // Adjust based on your preference


    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            const token = localStorage.getItem("access_token");
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/movie?limit=${limit}&page=${currentPage}`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error fetching movies data');
                }

                const data = await response.json();

                const reponse2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/movie/count`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!reponse2.ok) {
                    throw new Error('Error fetching movies count');
                }
                const count2 = await reponse2.json();
                setMovies(data);
                const pages = Math.ceil(count2 / limit);
                setTotalPages(pages > 0 ? pages : 1); // Ensure totalPages is at least 1


            } catch (error) {
                console.error('Error fetching movies data:', error);
                setMovies([]);
                setTotalPages(1); // Safe fallback
                toast.error('Error fetching movies data');
            }
            setLoading(false);
        };
        fetchMovies();
    }, [currentPage, limit]);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) {
        return (
            <>
                <Loader />
                <Footer relativePosition={false} />
            </>

        )
    }
    if (movies.length == 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-950 p-4">
                <div className="text-4xl font-bold mb-6">
                    <div>Your movie list is empty</div>
                </div>
                <Link href="/movies/add">
                    <button
                        type="submit"
                        className=" px-3 py-2 bg-emerald-400 text-white rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-900"
                    >
                        Add a new movie
                    </button>
                </Link>
                <Footer relativePosition={false} />
            </div>
        );
    }


    const totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <>
            <div className="flex flex-col min-h-screen bg-cyan-950 p-16">
                <div className="flex justify-between items-center mb-16">
                    <div className="flex items-center text-4xl font-bold text-white">
                        <h1 className="mr-2">My movies</h1>
                        <Link href="/movies/add">
                            <IoMdAddCircleOutline className="text-white text-2xl cursor-pointer" />
                        </Link>
                    </div>
                    <Link href="/" onClick={() => {
                        localStorage.removeItem('access_token');
                    }}>
                        <div className="text-white flex items-center">
                            Logout
                            <div className="pl-2">
                                <MdLogout className="text-xl" />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
                    {movies.map((movie) => (
                        <Link href={`/movies/edit/${movie.id}`} key={movie.id} className="bg-cyan-900 rounded-lg overflow-hidden" >
                            <div>
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    width={100}
                                    height={195}
                                    className="w-full h-auto"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-white">{movie.title}</h2>
                                    <p className="text-gray-400">{movie.publishingYear}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center items-center mt-8 space-x-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`px-4 py-2 text-white rounded `}
                    >
                        Prev
                    </button>
                    {totalPagesArray.map(n => (
                        <button
                            key={n}
                            onClick={() => handlePageChange(n)}
                            className={`px-4 py-2 rounded text-white ${currentPage === n ? 'bg-green-500' : 'bg-gray-700 hover:bg-gray-600'}`}
                        >
                            {n}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`px-4 py-2 text-white rounded `
                        }
                    >
                        Next
                    </button>
                </div>
            </div >
            <Footer relativePosition={true} />
        </>
    );
};

export default withAuth(MyMovies)
