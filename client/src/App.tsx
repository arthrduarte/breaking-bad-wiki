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
          <>
            <h1 className="font-bold text-[3rem] text-center">Breaking Bad Wiki</h1>
            <div className='flex space-x-5'>
              <p onClick={() => {
                console.log("Clicked")
                setSeries("All")
                fetchData()
              }}>All</p>
              <p onClick={() => {
                console.log("Clicked")
                setSeries("Breaking Bad")
                fetchData()
              }}>Breaking Bad</p>
              <p onClick={() => {
                console.log("Clicked")
                setSeries("Better Call Saul")
                fetchData()
              }}>Better Call Saul</p>
            </div>
            <div className='flex flex-col justify-center items-center lg:flex-row lg:flex-wrap'>
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
