import React, { useEffect, useState } from 'react';
import '../App.css';

interface CharacterCardProps {
    index: number;
    name: string;
    image_url: string;
    portrayed: string;
}

export default function CharacterCard({ index, name, image_url, portrayed }: CharacterCardProps) {
    return (
        <div key={index}>
            <h2>{name}</h2>
            <img src={image_url} alt={name} />
            <p>Portrayed by: {portrayed}</p>
        </div>
    )
}