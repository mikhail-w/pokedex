import { useCallback, useEffect, useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getPokemonById, getPokemonByType } from '../services/pokemonService';
import { getRandomID } from '../utils';
import MainPokemonTab from '../components/MainPokemonTab';
import GenerateButton from '../components/GenerateButton';
import { Box, Flex } from '@chakra-ui/react';

function RandPokemonPage() {
  const [valid, setValid] = useState(false);
  const [randomID, setRandomID] = useState(null);
  const timerId = useRef(null);
  const { setTeam, setPokemon, setIsLoading } = useOutletContext();
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  const getRandomPokemon = useCallback(async () => {
    setIsLoading(true);
    try {
      const randomID = getRandomID(1025); // Generate random ID
      setRandomID(randomID); // Update random ID state

      const mainPokemon = await getPokemonById(randomID); // Fetch main Pokémon
      setPokemon(mainPokemon);
      window.localStorage.setItem('MAIN_POKEMON', JSON.stringify(mainPokemon));

      const teamTypeURL = mainPokemon.types[0]?.type.url; // Get Pokémon type URL
      if (!teamTypeURL) throw new Error('Main Pokémon type URL not found.');

      const teamDataResponse = await getPokemonByType(teamTypeURL);

      const teamIndexes = new Set(); // Use Set for unique random indexes
      while (teamIndexes.size < 5) {
        teamIndexes.add(getRandomID(teamDataResponse.pokemon.length));
      }

      const teamData = await Promise.all(
        [...teamIndexes].map(
          async index =>
            await getPokemonById(teamDataResponse.pokemon[index].pokemon.name)
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
      console.error('Failed to fetch Pokémon data:', error.message || error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setPokemon, setTeam]);

  useEffect(() => {
    function checkMobileLandscape() {
      const isLandscape =
        window.innerWidth > window.innerHeight && window.innerWidth <= 918;
      setIsMobileLandscape(isLandscape);
    }

    // Initial check
    checkMobileLandscape();
    getRandomPokemon();

    // Listen for resize events
    window.addEventListener('resize', checkMobileLandscape);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkMobileLandscape);
      clearTimeout(timerId.current);
    };
  }, [getRandomPokemon]);

  return (
    <>
      <Box>
        {valid && randomID && (
          <MainPokemonTab id={randomID} isMobileLandscape={isMobileLandscape} />
        )}
      </Box>

      <GenerateButton
        getRandomPokemon={getRandomPokemon}
        isMobileLandscape={isMobileLandscape}
      />
    </>
  );
}

export default RandPokemonPage;
