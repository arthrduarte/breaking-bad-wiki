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
        <div>
            <Link to="/">
                <p>Go Back</p>
            </Link>
            {data != null ? (
                <div>
                    <p>{data.name}</p>
                    <p>{data.portrayed}</p>
                    <img src={data.image_url} alt={name} />
                    <p>{data.full_name}</p>
                    <p>{data.birth_date}</p>
                    <p>{data.occupation}</p>
                    <p>{data.episodes_count}</p>
                    <p>{data.series}</p>
                    <p>{data.appearances}</p>
                </div>
            ) : (
                <p>No data</p>
            )}
        </div>
    )
}