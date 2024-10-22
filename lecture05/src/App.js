import React, { useEffect, useState } from 'react';
import Character from './Character';
import Pagination from './Pagination';
import './styles.css';

const API_URL = 'https://rickandmortyapi.com/api/character';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [info, setInfo] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const fetchCharacters = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}?page=${page}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setCharacters(data.results);
      setInfo(data.info);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadingMessage = <div id='loading'>Loading...</div>;
  const errorMessage = error && <div className='error'>{error}</div>;
  const charactersList = (
    <div className='characters'>
      {characters.map((character) => (
        <Character key={character.id} character={character} />
      ))}
    </div>
  );

  return (
    <div className='container'>
      <h1>Rick & Morty Characters</h1>
      {loading ? loadingMessage : errorMessage || charactersList}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} info={info} />
    </div>
  );
};

export default App;
