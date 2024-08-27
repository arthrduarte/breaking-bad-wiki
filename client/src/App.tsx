import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

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

  // O componente Character vai ter uma API call tipo /character/{id}
  // O app itself vai ter uma API call para AllCharacters
  
  return (
    <div className="App">
      <h1 className="font-bold text-[3rem] text-center">Hello, World!</h1>
      {data.length > 0 ? (
        data.map((character, index) => (
          <div key={index} className="character">
            <h2>{character.name}</h2>
            <p>Portrayed by: {character.portrayed}</p>
            <img src={character.image_url} alt={character.name} />
            <p>Full Name: {character.full_name}</p>
            <p>Birth Date: {character.birth_date}</p>
            <p>Occupation: {character.occupation.join(', ')}</p>
            <p>Episodes Count: {character.episodes_count}</p>
            <p>Series: {character.series}</p>
            <p>Appearances: {character.appearances.join(', ')}</p>
          </div>
        ))
      ) : (
        <p>No data</p>
      )}
    </div>

  );
}

export default App;
