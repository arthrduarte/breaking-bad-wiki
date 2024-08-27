import '../App.css';
import { Link } from 'react-router-dom';

interface CharacterCardProps {
    index: number;
    name: string;
    image_url: string;
    portrayed: string;
    detailsUrl: string;
}

export default function CharacterCard({ index, name, image_url, portrayed, detailsUrl }: CharacterCardProps) {
    return (
        <Link to={detailsUrl}>
            <div className='flex flex-col justify-center items-center shadow-xl'>
                <h2>{name}</h2>
                <img src={image_url} alt={name} />
                <p>Portrayed by: {portrayed}</p>
            </div>
        </Link>
    )
}