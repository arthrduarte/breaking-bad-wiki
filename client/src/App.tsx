import CharacterDetails from './components/CharacterDetails';
import CharacterCard from './components/CharacterCard';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL

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
        if (series === "All") {
          const response = await axios.get(`${apiURL}/characters`);
          setData(response.data);
        }
        if (series === "Better Call Saul" || series === "Breaking Bad") {
          const response = await axios.get(`${apiURL}/characters/${series}`);
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
                  <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>              )}
            </div>
          </div>
        } />
        <Route path="/characters/:series/:name" element={<CharacterDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
