import { getRandomID } from '../utils';
import { useEffect, useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import MainPokemonTab from '../components/MainPokemonTab';
import GenerateButton from '../components/GenerateButton';
import {
  getPokemonDataById,
  getPokemonByType,
} from '../services/pokemonService';

function RandPokemonPage() {
  const [valid, setValid] = useState(false);
  const timerId = useRef(null);
  const { setTeam, setPokemon, randomID, setrandomID, setIsLoading } =
    useOutletContext();

  const getRandomPokemon = async () => {
    try {
      setIsLoading(true);
      setrandomID(getRandomID(1025));

      // Fetch the main Pokémon using pokemonService.js
      const mainPokemon = await getPokemonDataById(randomID);
      setPokemon(mainPokemon);
      window.localStorage.setItem('MAIN_POKEMON', JSON.stringify(mainPokemon));

      // Fetch Pokémon team by type using pokemonService.js
      const teamTypeURL = mainPokemon.types[0].type.url;
      const teamDataResponse = await getPokemonByType(teamTypeURL);

      const teamIndexes = [];
      while (teamIndexes.length < 5) {
        const randomIndex = getRandomID(teamDataResponse.pokemon.length);
        if (!teamIndexes.includes(randomIndex)) {
          teamIndexes.push(randomIndex);
        }
      }

      const teamData = await Promise.all(
        teamIndexes.map(
          async i =>
            await getPokemonDataById(teamDataResponse.pokemon[i].pokemon.name)
        )
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
    // Fetch new Pokémon data on component mount
    getRandomPokemon();
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
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
