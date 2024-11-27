import React, { useState, useEffect } from 'react';
import { Center, Button, Text } from '@chakra-ui/react';
import PokemonCard from '../components/PokemonCard/PokemonCard';
import { getType } from '../utils';

function PokemonListPage() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=20'
  );
  const [isLoading, setIsLoading] = useState(false);

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
    getAllPokemons();
  }, []);

  return (
    <>
      <Center>
        <Text
          marginBottom={'20px'}
          textDecoration="underline"
          textTransform={'capitalize'}
          textUnderlineOffset="8px"
          letterSpacing="5px"
          fontFamily="Pokemon Solid"
          fontSize={'2rem'}
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
          />
        ))}
      </Center>
      <Center>
        <Button
          margin={'50px'}
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
