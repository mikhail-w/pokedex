import axios from 'axios';
import MainPokemonTab from '../components/MainPokemonTab';
import GenerateButton from '../components/GenerateButton';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getRandomID } from '../utils';

function RandPokemonPage() {
  const [valid, setValid] = useState(false);
  const timerId = useRef(null);
  const { setTeam, team, pokemon, setPokemon, randomID, setIsLoading } =
    useOutletContext();

  const loadLocalStorageData = key => {
    try {
      const data = window.localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error(`Failed to parse localStorage data for ${key}`, err);
      return null;
    }
  };

  const getRandomPokemon = async () => {
    try {
      setIsLoading(true);

      // Fetch the main Pokémon
      const pokemonResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomID}`
      );

      const mainPokemon = pokemonResponse.data;
      setPokemon(mainPokemon);
      window.localStorage.setItem('MAIN_POKEMON', JSON.stringify(mainPokemon));

      // Fetch Pokémon team
      const teamTypeURL = mainPokemon.types[0].type.url;
      const teamResponse = await axios.get(teamTypeURL);

      const teamIndexes = [];
      while (teamIndexes.length < 5) {
        const randomIndex = getRandomID(teamResponse.data.pokemon.length);
        if (!teamIndexes.includes(randomIndex)) {
          teamIndexes.push(randomIndex);
        }
      }

      const teamURLs = teamIndexes.map(
        i =>
          `https://pokeapi.co/api/v2/pokemon/${teamResponse.data.pokemon[i].pokemon.name}`
      );

      const teamData = await Promise.all(
        teamURLs.map(async url => (await axios.get(url)).data)
      );

      setTeam(teamData);
      window.localStorage.setItem(
        'MAIN_POKEMON_TEAM',
        JSON.stringify(teamData)
      );
      setValid(true);
    } catch (error) {
      setValid(false);
      console.error('Failed to fetch Pokémon data:', error);
    } finally {
      timerId.current = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Ensure loading spinner is cleared
    }
  };

  useEffect(() => {
    // Load Pokémon and team data from localStorage
    const pokemonData = loadLocalStorageData('MAIN_POKEMON');
    const teamData = loadLocalStorageData('MAIN_POKEMON_TEAM');

    if (pokemonData) setPokemon(pokemonData);
    if (teamData) setTeam(teamData);

    // Fetch new Pokémon data on component mount
    getRandomPokemon();

    return () => {
      // Save data to localStorage and clear timeout on unmount
      window.localStorage.setItem('MAIN_POKEMON', JSON.stringify(pokemon));
      window.localStorage.setItem('MAIN_POKEMON_TEAM', JSON.stringify(team));
      clearTimeout(timerId.current);
    };
  }, []); // Empty dependency to ensure this runs only once

  return (
    <>
      {valid && <MainPokemonTab />}
      <GenerateButton getRandomPokemon={getRandomPokemon} />
    </>
  );
}

export default RandPokemonPage;
