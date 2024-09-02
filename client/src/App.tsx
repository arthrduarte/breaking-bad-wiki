import CharacterDetails from './components/CharacterDetails';
import CharacterCard from './components/CharacterCard';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';

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
  const [series, setSeries] = useState<string>("Breaking Bad")

  const fetchData = async () => {
    try {
      if (series) {
        if (series == "All") {
          const response = await axios.get('http://localhost:9000/characters');
          setData(response.data);
        }
        if (series == "Better Call Saul" || series == "Breaking Bad") {
          const response = await axios.get(`http://localhost:9000/characters/${series}`);
          setData(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [series])

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-100 p-5">
            <h1 className="font-bold text-4xl md:text-5xl text-gray-800 mb-10 text-center">Breaking Bad Wiki</h1>
            <div className='flex justify-center mb-10 space-x-5'>
              <p onClick={() => setSeries("All")} className="cursor-pointer text-lg text-blue-500 hover:text-blue-700">All</p>
              <p onClick={() => setSeries("Breaking Bad")} className="cursor-pointer text-lg text-blue-500 hover:text-blue-700">Breaking Bad</p>
              <p onClick={() => setSeries("Better Call Saul")} className="cursor-pointer text-lg text-blue-500 hover:text-blue-700">Better Call Saul</p>
            </div>
            <div className='flex flex-wrap justify-center items-center'>
              {data.length > 0 ? (
                data.map((character, index) => (
                  <CharacterCard
                    key={index}
                    index={index}
                    name={character.name}
                    image_url={character.image_url}
                    portrayed={character.portrayed}
                    detailsUrl={`/characters/${character.series}/${character.name}`}
                  />
                ))
              ) : (
                  <p className="text-gray-700 text-lg">No data</p>
              )}
            </div>
          </div>
        } />
        <Route path="/characters/:series/:name" element={<CharacterDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
