import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import AllCharacters from './components/CharacterCard';
import CharacterCard from './components/CharacterCard';

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

function App() {
  const [data, setData] = useState<Character[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9000/characters');
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
      <h1 className="font-bold text-[3rem] text-center">Breaking Bad Wiki</h1>
      <div>
        {data.length > 0 ? (
          data.map((character, index) => (
            <CharacterCard index={index} name={character.name} image_url={character.image_url} portrayed={character.portrayed} />
          ))
        ) : (
          <p>No data</p>
        )}
      </div>    </>
  );
}

export default App;
