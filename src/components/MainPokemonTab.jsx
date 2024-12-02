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
  useColorModeValue,
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

function MainPokemonTab({ id, isMobileLandscape }) {
  let isTeam = 'false';
  const { team, myTeam, disabled, setDisabled, isLoading, pokemon } =
    useOutletContext();

  const { flavorTextArray, evoNames, fetchPokemonData } = usePokemonData();

  const fetchData = useCallback(() => {
    if (id) fetchPokemonData(id);
  }, [id, fetchPokemonData]);

  const backgroundColor = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading || !pokemon)
    return <Loading isMobileLandscape={isMobileLandscape} />;

  const pokemonArt = pokemon.sprites.other['official-artwork']?.front_default;
  const pokemonShowdown = pokemon.sprites.other.showdown?.front_default;

  return (
    <Tabs
      width={isMobileLandscape ? '700px' : 'auto'}
      align="center"
      variant="enclosed"
      size={['sm', 'md', 'lg']}
      orientation={isMobileLandscape ? 'vertical' : 'horizontal'}
    >
      <TabPanels mt={isMobileLandscape ? '-1' : [('0px', '0px', '20px')]}>
        <TabPanel>
          <MainPokemonName isMobileLandscape={isMobileLandscape} />
          <TabContent
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={
              isMobileLandscape ? 'calc(100vh - 70px)' : 'calc(100vh - 350px)'
            }
          >
            <PokemonImage src={pokemon.sprites.other.home?.front_default} />
          </TabContent>
        </TabPanel>

        <TabPanel>
          <MainPokemonName isMobileLandscape={isMobileLandscape} />
          <TabContent
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={
              isMobileLandscape ? 'calc(100vh - 70px)' : 'calc(100vh - 250px)'
            }
          >
            <PokemonImage src={pokemonArt} />
          </TabContent>
        </TabPanel>

        <TabPanel>
          <MainPokemonName isMobileLandscape={isMobileLandscape} />
          <TabContent
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={
              isMobileLandscape ? 'calc(100vh - 70px)' : 'calc(100vh - 250px)'
            }
          >
            <Image
              src={pokemonShowdown || ball}
              boxSize="200px"
              objectFit="contain"
            />
          </TabContent>
        </TabPanel>
        <TabPanel
          height={{ base: '580px', md: '700px' }}
          overflow="scroll"
          padding={'0'}
        >
          <Box
            position="sticky"
            top="-15px"
            pt={'10px'}
            pb={'10px'}
            marginTop={'10px'}
            marginBottom={'5px'}
            backgroundColor={backgroundColor}
            width={'100%'}
          >
            <MainPokemonName isMobileLandscape={isMobileLandscape} />
          </Box>

          {/* Tab content with scrolling */}
          <TabContent>
            <Center
              flexDirection="column"
              paddingBottom={
                isMobileLandscape ? '50px' : { base: '200px', lg: '300px' }
              }
              // maxWidth={'500px'}
            >
              <InfoTab />
              {flavorTextArray && (
                <FlavorText
                  isMobileLandscape={isMobileLandscape}
                  flavorTextArray={flavorTextArray}
                  onInfo
                />
              )}
              {evoNames && <EvolutionChain evoNames={evoNames} />}
            </Center>
          </TabContent>
        </TabPanel>

        <TabPanel>
          <Box marginTop={'-30px'}>
            <MainPokemonName
              isMobileLandscape={isMobileLandscape}
              pokemonName={pokemon.name}
              isTeam="true"
            />
          </Box>
          <Flex
            flexWrap="wrap"
            pt={['20px', '40px', '60px']}
            pb={['20px', '40px', '60px']}
            justifyContent="center"
            maxW="100%"
            height="auto"
            maxHeight={['calc(100vh - 260px)', '430px']}
            gap={['35px', '20px', '35px']}
            overflowY="auto"
            marginTop={'10px'}
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
          backgroundColor={backgroundColor}
          // outline={'2px solid'}
          top={isMobileLandscape ? '60px' : ''}
          ml={isMobileLandscape ? '50px' : ''}
        >
          <Tab>
            <CgPokemon
              color="#ef5350"
              size={isMobileLandscape ? '.7em' : '2em'}
            />
          </Tab>
          <Tab>
            <CgPokemon
              color="#ffcc00"
              size={isMobileLandscape ? '.7em' : '2em'}
            />
          </Tab>
          <Tab>
            <MdGif color="#396bba" size={isMobileLandscape ? '.7em' : '2em'} />
          </Tab>
          <Tab>
            <FaInfo color="#188038" size={isMobileLandscape ? '.7em' : '2em'} />
          </Tab>
          <Tab>
            <Image
              src={groupImg}
              alt="Group image"
              boxSize={isMobileLandscape ? '.7em' : '2em'}
              objectFit="contain"
            />
          </Tab>
        </TabList>
      </Center>
    </Tabs>
  );
}

export default MainPokemonTab;
