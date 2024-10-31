import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const fetchCharacters = async (page) => {
  const response = await axios.get(`${API_URL}?page=${page + 1}`);
  return response.data;
};

export const fetchCharacterById = async (characterId) => {
  const response = await axios.get(`${API_URL}/${characterId}`);
  return response.data;
};
