import { Center } from '@chakra-ui/react';
import BackButton from '../components/BackButton';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  const [animatingCard, setAnimatingCard] = useState(null); // Track the animating Pokémon card

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

    if (myTeam.length > 0) {
      fetchPokemonData();
    } else {
      setPokemonData([]);
    }
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
      <Center marginTop={'20px'}>
        <Text
          marginBottom={'30px'}
          textDecoration="underline"
          textTransform={'capitalize'}
          textUnderlineOffset="8px"
          letterSpacing="5px"
          fontFamily="Pokemon Solid"
          fontSize={'2rem'}
          as="h3"
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
        maxHeight={'60vh'}
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
              src2={pokemon.sprites.other.showdown?.front_default} // Include `src2` for flipping functionality
              name={pokemon.name}
              type={getType(pokemon.types)}
              id={pokemon.id}
              animating={animatingCard === pokemon.id} // Pass animation state
              onRelease={() => releasePokemon(pokemon.id)} // Pass release handler
            />
          ))
        ) : (
          <div className="not-caught-message container">
            <Image maxW={'400px'} src={noCatch} />
            <h3>No Pokémon Caught Yet</h3>
          </div>
        )}
      </Center>
      <Center>
        <BackButton />
      </Center>
    </>
  );
}

export default MyTeamPage;
