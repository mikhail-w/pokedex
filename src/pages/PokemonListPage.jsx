import { useState, useEffect, useRef } from 'react';
import { Center, Button, Text } from '@chakra-ui/react';
import PokemonCard from '../components/PokemonCard/PokemonCard';
import { getType } from '../utils';

function PokemonListPage() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=20'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const timerId = useRef(null);

  const getAllPokemons = async () => {
    if (isLoading) return; // Prevent multiple calls at once
    setIsLoading(true);
    try {
      const res = await fetch(loadMore);
      const data = await res.json();

      setLoadMore(data.next);

      const pokemonDataPromises = data.results.map(async pokemon => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        return await res.json();
      });

      const pokemonData = await Promise.all(pokemonDataPromises);

      setAllPokemons(prevList =>
        [...prevList, ...pokemonData].sort((a, b) => a.id - b.id)
      );
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    function checkMobileLandscape() {
      const isLandscape =
        window.innerWidth > window.innerHeight && window.innerWidth <= 918;
      setIsMobileLandscape(isLandscape);
    }

    // Initial check
    checkMobileLandscape();
    getAllPokemons();

    // Listen for resize events
    window.addEventListener('resize', checkMobileLandscape);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkMobileLandscape);
      clearTimeout(timerId.current);
    };
  }, []);

  return (
    <>
      <Center>
        <Text
          marginBottom={{ base: '10px', lg: '20px' }}
          textDecoration="underline"
          textTransform={'capitalize'}
          textUnderlineOffset="8px"
          letterSpacing="5px"
          fontFamily="Pokemon Solid"
          fontSize={{ base: '1rem', lg: '2rem' }}
          as="h3"
        >
          Pokemon List
        </Text>
      </Center>
      <Center
        padding={'50px'}
        flexWrap={'wrap'}
        gap={'30px'}
        overflow={'scroll'}
        margin={'10px'}
        maxHeight={'70vh'}
      >
        {allPokemons.map(p => (
          <PokemonCard
            key={p.id}
            card={p}
            src={p.sprites.other[`official-artwork`].front_default}
            src2={p.sprites.other.showdown?.front_default || ''}
            name={p.name}
            pokemon={p}
            type={getType(p.types)}
            id={p.id}
            isMobileLandscape={isMobileLandscape}
          />
        ))}
      </Center>
      <Center>
        <Button
          marginTop={'5px'}
          colorScheme="red"
          onClick={getAllPokemons}
          isLoading={isLoading}
        >
          Load more
        </Button>
      </Center>
    </>
  );
}

export default PokemonListPage;
