import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import CharacterCard from './components/CharacterCard';
import CharacterDetails from './components/CharacterDetails';

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
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <h1 className="font-bold text-[3rem] text-center">Breaking Bad Wiki</h1>
            <div className='flex flex-col justify-center items-center lg:grid lg:grid-cols-4 lg:gap-5'>
              {data.length > 0 ? (
                data.map((character, index) => (
                  <CharacterCard key={index} index={index} name={character.name} image_url={character.image_url} portrayed={character.portrayed} detailsUrl={`/characters/${index}/${encodeURIComponent(character.name.toLowerCase().replace(/\s+/g, '-'))}`} />
                ))
              ) : (
                <p>No data</p>
              )}
            </div>
          </>
        } />
        <Route path="/characters/:index/:name" element={<CharacterDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
