import React, { useCallback, useEffect, Suspense } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Image,
  Flex,
  Box,
} from '@chakra-ui/react';
import { CgPokemon } from 'react-icons/cg';
import { MdGif } from 'react-icons/md';
import { FaInfo } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import MainPokemonName from './MainPokemonName';
import LazyPokemonCard from './PokemonCard/PokemonCard';
import FlavorText from './PokemonCard/FlavorText';
import EvolutionChain from './PokemonCard/EvolutionChain';
import Loading from './Loading';
import { usePokemonData } from '../hooks/usePokemonData';
import ball from '../assets/images/pokeballs/pokeball.png';
import groupImg from '../assets/images/pokeballs/group.png';
import { getType } from '../utils';
import InfoTab from '../components/InfoTab';

function TabContent({ children, height = 'auto' }) {
  return (
    <Center
      height={height}
      flexDirection="column"
      overflowY={height === 'auto' ? 'scroll' : 'hidden'}
      px="10px"
    >
      {children}
    </Center>
  );
}

function PokemonImage({ src }) {
  return (
    <Image
      maxW="90%"
      maxH="90%"
      src={src || ball}
      alt="Pokemon image"
      pb="30px"
    />
  );
}

function MainPokemonTab({ id }) {
  let isTeam = 'false';
  const { team, myTeam, disabled, setDisabled, isLoading, pokemon } =
    useOutletContext();

  const { flavorTextArray, evoNames, fetchPokemonData } = usePokemonData();

  const fetchData = useCallback(() => {
    if (id) fetchPokemonData(id);
  }, [id, fetchPokemonData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading || !pokemon) return <Loading />;

  const pokemonArt = pokemon.sprites.other['official-artwork']?.front_default;
  const pokemonShowdown = pokemon.sprites.other.showdown?.front_default;

  return (
    <Tabs align="center" variant="enclosed" size={['sm', 'md', 'lg']}>
      <TabPanels mt={['0px', '0px', '20px']}>
        <TabPanel>
          <MainPokemonName />
          <TabContent
            display="flex" // Enable flexbox
            justifyContent="center" // Center horizontally
            alignItems="center" // Center vertically
            height="calc(100vh - 250px)" // Adjust height to fill the viewport, minus the header and footer space
          >
            <PokemonImage src={pokemon.sprites.other.home?.front_default} />
          </TabContent>
        </TabPanel>

        <TabPanel>
          <MainPokemonName />
          <TabContent
            display="flex" // Enable flexbox
            justifyContent="center" // Center horizontally
            alignItems="center" // Center vertically
            height="calc(100vh - 200px)" // Adjust height to fill the viewport, minus the header and footer space
          >
            <PokemonImage src={pokemonArt} />
          </TabContent>
        </TabPanel>

        <TabPanel>
          <MainPokemonName />
          <TabContent
            display="flex" // Enable flexbox
            justifyContent="center" // Center horizontally
            alignItems="center" // Center vertically
            height="calc(100vh - 200px)" // Adjust height to fill the viewport, minus the header and footer space
          >
            <Image
              src={pokemonShowdown || ball}
              boxSize="200px"
              objectFit="contain"
            />
          </TabContent>
        </TabPanel>
        <TabPanel
          height={{ base: '580px', md: '630px' }}
          overflow="scroll"
          outline={'2px solid red'}
          padding={'0'}
        >
          <Box position="sticky" top="16px" zIndex="10" marginBottom={'5px'}>
            <MainPokemonName />
          </Box>

          {/* Tab content with scrolling */}
          <TabContent flexDirection="column" height="900px" overflowY="auto">
            <Flex
              flexDirection="column"
              paddingBottom="100px"
              overflowX="hidden"
            >
              <InfoTab />
              {flavorTextArray && (
                <FlavorText flavorTextArray={flavorTextArray} onInfo />
              )}
              {evoNames && <EvolutionChain evoNames={evoNames} />}
            </Flex>
          </TabContent>
        </TabPanel>

        <TabPanel>
          <MainPokemonName pokemonName={pokemon.name} isTeam="true" />
          <Flex
            flexWrap="wrap"
            pt={['20px', '40px', '60px']}
            pb={['20px', '40px', '60px']}
            justifyContent="center"
            maxW="100%"
            height="auto"
            maxHeight={['calc(100vh - 315px)', '430px']}
            gap={['35px', '20px', '35px']}
            overflowY="auto"
          >
            {team.map((card, idx) => (
              <Suspense key={idx} fallback={<Loading />}>
                <LazyPokemonCard
                  index={idx}
                  card={card}
                  src={card.sprites.other['official-artwork']?.front_default}
                  src2={card.sprites.other.showdown?.front_default}
                  name={card.name}
                  pokemon={pokemon}
                  type={getType(card.types)}
                  id={card.id}
                  isLoading={isLoading}
                  team={team}
                  disabled={disabled}
                  setDisabled={setDisabled}
                  myTeam={myTeam}
                />
              </Suspense>
            ))}
          </Flex>
        </TabPanel>
      </TabPanels>

      <Center>
        <TabList
          justifyContent="space-evenly"
          maxWidth="100%"
          pos="fixed"
          bottom={['100px', '120px']}
          px={['10px', '20px']}
          whiteSpace="nowrap"
        >
          <Tab>
            <CgPokemon color="#ef5350" size="2em" />
          </Tab>
          <Tab>
            <CgPokemon color="#ffcc00" size="2em" />
          </Tab>
          <Tab>
            <MdGif color="#396bba" size="2em" />
          </Tab>
          <Tab>
            <FaInfo color="#188038" size="2em" />
          </Tab>
          <Tab>
            <Image
              src={groupImg}
              alt="Group image"
              boxSize="2em"
              objectFit="contain"
            />
          </Tab>
        </TabList>
      </Center>
    </Tabs>
  );
}

export default MainPokemonTab;
