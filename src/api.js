// src/api.js
const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemons = async (offset = 0, limit = 20) => {
  const response = await fetch(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  if (!response.ok) throw new Error('Error fetching Pokémon data');
  const data = await response.json();
  return data;
};

export const fetchPokemonDetails = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error fetching Pokémon details');
  const data = await response.json();
  return data;
};
