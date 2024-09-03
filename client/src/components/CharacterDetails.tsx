import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../App.css"
import path from 'path';
import { Link } from 'react-router-dom';

const apiURL = process.env.REACT_APP_API_URL

interface Character {
    name: string;
    portrayed: string;
    image_url: string;
    full_name: string;
    birth_date: string;
    occupation: string[];
    episodes_count: string;
    series: string;
    appearances: string[];
}

export default function Character() {
    const [data, setData] = useState<Character>();
    const { series, name } = useParams<{ series: string; name: string }>();

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiURL}/characters/${series}/${name}`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {data != null ? (
                <div className="min-h-screen bg-gray-100 p-5">
                    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-5 border-b">
                            <Link to="/" className="text-blue-500 hover:underline">
                                <p>&lt; Go Back</p>
                            </Link>
                            <h1 className="text-3xl font-bold mt-2">{data.name}</h1>
                        </div>
                        <div className="lg:flex lg:justify-center p-5">
                            <div className="flex flex-col items-center py-3 lg:w-1/3">
                                <img className="w-full h-auto rounded-lg shadow-md object-cover" src={data.image_url} alt={data.name} />
                                <p className="mt-3 text-gray-700">Portrayed by: <span className="font-semibold">{data.portrayed}</span></p>
                            </div>
                            <div className="flex flex-col justify-center items-center w-full lg:w-2/3 lg:pl-10">
                                <h2 className="text-2xl font-bold mb-5">Character Information</h2>
                                <div className="flex w-full px-5 py-3 border-b">
                                    <p className="w-1/2 uppercase text-sm font-bold text-gray-600 flex items-center">Full name</p>
                                    <p className="w-1/2 text-gray-800">{data.full_name}</p>
                                </div>
                                <div className="flex w-full px-5 py-3 border-b">
                                    <p className="w-1/2 uppercase text-sm font-bold text-gray-600 flex items-center">Birth date</p>
                                    <p className="w-1/2 text-gray-800">{data.birth_date}</p>
                                </div>
                                <div className="flex w-full px-5 py-3">
                                    <p className="w-1/2 uppercase text-sm font-bold text-gray-600">Occupation</p>
                                    <ul className="w-1/2 text-gray-800 list-disc list-inside">
                                        {data.occupation.map((job, index) => (
                                            <li key={index} className="py-1">{job}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
        </>
    );
}