import { Center, Flex, Image, Text } from '@chakra-ui/react';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import BackButton from '../components/BackButton';
import noCatch from '../assets/images/pokeballs/ball-no-catch.png';
import '../assets/styles/MyTeamPage.css';
import PokemonCard from '../components/PokemonCard/PokemonCard';
import { getType } from '../utils';
import Loading from '../components/Loading';
import { getPokemonById } from '../services/pokemonService';
import { AnimatePresence } from 'framer-motion';

function MyTeamPage() {
  const { myTeam, setMyTeam } = useOutletContext();

  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animatingCard, setAnimatingCard] = useState(null);
  const timerId = useRef(null);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    function checkMobileLandscape() {
      const isLandscape =
        window.innerWidth > window.innerHeight && window.innerWidth <= 918;
      setIsMobileLandscape(isLandscape);
    }

    checkMobileLandscape();
    window.addEventListener('resize', checkMobileLandscape);

    return () => {
      window.removeEventListener('resize', checkMobileLandscape);
      clearTimeout(timerId.current);
    };
  }, []);

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (myTeam.length === 0) {
        setPokemonData([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const responses = await Promise.all(
          myTeam.map(id => getPokemonById(id))
        );
        setPokemonData(responses);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [myTeam]);

  const releasePokemon = id => {
    setAnimatingCard(id);
    setTimeout(() => {
      setMyTeam(prevTeam => prevTeam.filter(pokemonId => pokemonId !== id));
      setPokemonData(prevData => prevData.filter(pokemon => pokemon.id !== id));
      setAnimatingCard(null);
    }, 500);
  };

  return (
    <>
      <Center marginTop={isMobileLandscape ? '5px' : '20px'}>
        <Text
          marginBottom={{ base: '10px', lg: '50px' }}
          textDecoration="underline"
          textTransform="capitalize"
          textUnderlineOffset="8px"
          letterSpacing="5px"
          fontFamily="Pokemon Solid"
          fontSize={{ base: '1rem', md: '1rem', lg: '2rem' }}
        >
          My Pokémon Team
        </Text>
      </Center>
      <Center
        padding="50px"
        flexWrap="wrap"
        gap="30px"
        overflow="auto"
        margin="10px"
        maxHeight="73vh"
      >
        {loading ? (
          <Loading />
        ) : pokemonData.length > 0 ? (
          <AnimatePresence>
            {pokemonData.map(pokemon => (
              <PokemonCard
                key={pokemon.id}
                card={pokemon}
                src={pokemon.sprites.other['official-artwork'].front_default}
                src2={pokemon.sprites.other.showdown?.front_default}
                name={pokemon.name}
                type={getType(pokemon.types)}
                id={pokemon.id}
                animating={animatingCard === pokemon.id}
                onRelease={() => releasePokemon(pokemon.id)}
              />
            ))}
          </AnimatePresence>
        ) : (
          <div className="not-caught-message container">
            <Image maxW="400px" src={noCatch} />
            <h3>No Pokémon Caught Yet</h3>
          </div>
        )}
      </Center>
      <Center marginTop="20px">
        <BackButton />
      </Center>
    </>
  );
}

export default MyTeamPage;
