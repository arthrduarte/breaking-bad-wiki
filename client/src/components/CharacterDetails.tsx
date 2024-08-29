import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../App.css"
import path from 'path';
import { Link } from 'react-router-dom';

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
            const response = await axios.get(`http://localhost:9000/characters/${series}/${name}`);
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
                <div>
                    <div className="flex flex-col items-center">
                        <Link to="/">
                            <p>&lt; Go Back</p>
                        </Link>
                        <h1 className='text-[2rem]'>{data.name}</h1>
                    </div>
                    <div className='lg:flex lg:justify-center'>
                        <div className='flex flex-col items-center py-3 lg:w-1/3'>
                            <img className='h-full' src={data.image_url} alt={name} />
                            <p>Portrayed by: {data.portrayed}</p>
                        </div>
                        <div className='flex flex-col justify-center items-center w-full'>
                            <h2 className='text-[2rem]'>Character Information</h2>
                            <div className='flex w-full px-5 py-3'>
                                <p className='w-1/2 uppercase text-[.8rem] font-bold flex items-center'>Full name</p>
                                <p className='w-1/2'>{data.full_name}</p>
                            </div>
                            <div className='flex w-full px-5 py-3'>
                                <p className='w-1/2 uppercase text-[.8rem] font-bold flex items-center'>Birth date</p>
                                <p className='w-1/2'>{data.birth_date}</p>
                            </div>
                            <div className='flex w-full px-5 py-3'>
                                <p className='w-1/2 uppercase text-[.8rem] font-bold'>Occupation</p>
                                <ul className='w-1/2'>
                                    {data.occupation.map((job, index) => (
                                        <>
                                            <li key={index}>{job}</li>
                                            <hr className='lg:hidden' />
                                        </>
                                    ))}
                                </ul>
                            </div>
                            <div className='flex w-full px-5 py-3'>
                                <p className='w-1/2 uppercase text-[.8rem] font-bold flex items-center'>Appearances</p>
                                <p className='w-1/2'>{data.episodes_count}</p>
                            </div>
                            <div className='flex w-full px-5 py-3'>
                                <p className='w-1/2 uppercase text-[.8rem] font-bold flex items-center'>Seasons:</p>
                                <p className='w-1/2'>{data.appearances.map((season, index) => (
                                    `${season}, `
                                ))}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No data</p>
            )}
        </>
    )
}