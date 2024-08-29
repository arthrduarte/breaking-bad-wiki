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
        <Link to={detailsUrl} className='flex justify-center mx-3 my-3 shadow-2xl'>
            <div className='relative w-[200px] h-[260px] '>
                <div className='relative w-full h-full'>
                    <img src={image_url} alt={name} className='w-full h-full object-cover rounded-t-xl' />
                    <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50'></div>
                </div>
                <div className="absolute bottom-0 left-0 p-4 text-white">{name}</div>
            </div>
        </Link>
    )
}