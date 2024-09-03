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
                <p>Loading...</p>
            )}
        </>
    );
}