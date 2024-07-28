import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import axios from 'axios';
//Import Components
import PokemonCard from '../components/PokemonCard';
import { Center, Button } from '@chakra-ui/react';

//Import Utils
import { useLocation } from 'react-router-dom';
import { useOutletContext, useParams } from 'react-router-dom';
//Import Styles
import { getType } from '../utils';
import { Text } from '@chakra-ui/react';

function PokemonListPage() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=20'
  );
  const { team, myTeam, setMyTeam, disabled, setDisabled, isLoading } =
    useOutletContext();

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(results) {
      results.forEach(async pokemon => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons(currentList => [...currentList, data]);
        // await allPokemons.sort((a, b) => a.id - b.id);
      });
    }
    createPokemonObject(data.results);
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
        // outline={'1px solid green'}
        margin={'10px '}
        maxHeight={'70vh'}
      >
        {allPokemons.map((p, idx) => (
          // console.log(p)
          // <Text key={idx}>{p.name}</Text>
          <PokemonCard
            key={p.name}
            card={p}
            src={p.sprites.other[`official-artwork`].front_default}
            src2={p.sprites.other.showdown.front_default}
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
          onClick={() => getAllPokemons()}
        >
          Load more
        </Button>
      </Center>
    </>
  );
}

export default PokemonListPage;
