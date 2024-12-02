import { Center, Flex } from '@chakra-ui/react';
import BackButton from '../components/BackButton';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import noCatch from '../assets/images/pokeballs/ball-no-catch.png';
import { Image, Text } from '@chakra-ui/react';
import '../assets/styles/MyTeamPage.css';
import PokemonCard from '../components/PokemonCard/PokemonCard';
import { getType } from '../utils';
import Loading from '../components/Loading';
import { getPokemonById } from '../services/pokemonService';

function MyTeamPage() {
  const { myTeam, setMyTeam } = useOutletContext();

  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animatingCard, setAnimatingCard] = useState(null);
  const timerId = useRef(null);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const promises = myTeam.map(id => getPokemonById(id));
        const responses = await Promise.all(promises);
        setPokemonData(responses);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };

    function checkMobileLandscape() {
      const isLandscape =
        window.innerWidth > window.innerHeight && window.innerWidth <= 918;
      setIsMobileLandscape(isLandscape);
    }

    // Initial check
    checkMobileLandscape();

    if (myTeam.length > 0) {
      fetchPokemonData();
    } else {
      setPokemonData([]);
    }
    // Listen for resize events
    window.addEventListener('resize', checkMobileLandscape);

    return () => {
      window.removeEventListener('resize', checkMobileLandscape);
      clearTimeout(timerId.current);
    };
  }, [myTeam]);

  // Handle releasing a Pokémon
  const releasePokemon = id => {
    setAnimatingCard(id); // Trigger animation for the specific card
    setTimeout(() => {
      setMyTeam(prevTeam => prevTeam.filter(pokemonId => pokemonId !== id));
      setPokemonData(prevData => prevData.filter(pokemon => pokemon.id !== id));
      setAnimatingCard(null); // Reset animation tracking
    }, 500); // Adjust timeout to match animation duration
  };

  return (
    <>
      <Center marginTop={isMobileLandscape ? '5px' : '20px'}>
        <Text
          marginBottom={{ base: '10px', lg: '50px' }}
          textDecoration="underline"
          textTransform={'capitalize'}
          textUnderlineOffset="8px"
          letterSpacing="5px"
          fontFamily="Pokemon Solid"
          fontSize={{ base: '1rem', md: '1rem', lg: '2rem' }}
        >
          My Pokémon Team
        </Text>
      </Center>
      <Center
        padding={'50px'}
        flexWrap={'wrap'}
        gap={'30px'}
        overflow={'auto'}
        margin={'10px'}
        maxHeight={'73vh'}
      >
        {loading ? (
          <Loading />
        ) : pokemonData.length > 0 ? (
          pokemonData.map((pokemon, idx) => (
            <PokemonCard
              key={idx}
              index={idx}
              card={pokemon}
              src={pokemon.sprites.other['official-artwork'].front_default}
              src2={pokemon.sprites.other.showdown?.front_default}
              name={pokemon.name}
              type={getType(pokemon.types)}
              id={pokemon.id}
              animating={animatingCard === pokemon.id}
              onRelease={() => releasePokemon(pokemon.id)}
            />
          ))
        ) : (
          <div className="not-caught-message container">
            <Image maxW={'400px'} src={noCatch} />
            <h3>No Pokémon Caught Yet</h3>
          </div>
        )}
        <Flex marginRight={isMobileLandscape ? '620px' : ''}>
          <BackButton />
        </Flex>
      </Center>
    </>
  );
}

export default MyTeamPage;
