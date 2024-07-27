import Loading from './Loading';
import MainPokemonName from './MainPokemonName';
import InfoTab from './InfoTab';
import ball from '../assets/images/pokeballs/pokeball.png';
import { CgPokemon } from 'react-icons/cg';
import { MdGif } from 'react-icons/md';
import { FaInfo } from 'react-icons/fa';
import groupImg from '../assets/images/pokeballs/group.png';
import { useEffect, useState, useRef } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Image,
} from '@chakra-ui/react';

function MainPokemonTab() {
  const {
    team,
    setTeam,
    myTeam,
    setMyTeam,
    disabled,
    setDisabled,
    isLoading,
    setIsLoading,
    pokemon,
    setPokemon,
  } = useOutletContext();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Tabs
          align="center"
          variant="enclosed"
          size="lg"
          maxHeight={'100px'}
          // outline={'2px solid white'}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <TabPanels height={'650px'}>
              <TabPanel>
                {/* Main Image */}
                <MainPokemonName />

                <Center
                  objectFit="contain"
                  height={'550px'}
                  flexDirection={'column'}
                >
                  <Image
                    maxW={'90%'}
                    maxH={'90%'}
                    src={pokemon.sprites.other.home.front_default}
                  />
                </Center>
              </TabPanel>
              <TabPanel>
                {/* Art Image */}
                <MainPokemonName />
                <Center objectFit="contain" height={'550px'}>
                  <Image
                    maxW={'90%'}
                    maxH={'90%'}
                    src={
                      pokemon.sprites.other[`official-artwork`].front_default
                    }
                  />
                </Center>
              </TabPanel>
              <TabPanel>
                {/* GIF Image */}
                <MainPokemonName />
                <Center objectFit="contain" height={'550px'} flexDir={'column'}>
                  <Image
                    minWidth={'150px'}
                    src={
                      pokemon.sprites.other.showdown.front_default == null
                        ? ball
                        : pokemon.sprites.other.showdown.front_default
                    }
                  />
                </Center>
              </TabPanel>
              <TabPanel>
                {/* INFO TAB */}
                <Center objectFit="contain" minHeight={'550px'}>
                  <InfoTab />
                </Center>
              </TabPanel>
              <TabPanel>
                <h1>Team Tab</h1>
                {/* {team.map((card, idx) => {
                  console.log('Card:', idx, card);
                  return (
                    <PokemonCard
                      key={idx}
                      index={idx}
                      card={card}
                      src={card.sprites.other[`official-artwork`].front_default}
                      src2={card.sprites.other.showdown.front_default}
                      name={card.name}
                      pokemon={card}
                      type={getType(card.types)}
                      id={card.id}
                      isLoading={isLoading}
                      team={team}
                      setTeam={setTeam}
                      disabled={disabled}
                      setDisabldisableded={setDisabled}
                    />
                  );
                }
              )} */}
              </TabPanel>
            </TabPanels>
          )}
          <TabList>
            <Tab>
              <CgPokemon color="#ef5350" size={'2.5em'} />
            </Tab>
            <Tab>
              <CgPokemon color="#ffcc00" size={'2.5em'} />
            </Tab>
            <Tab>
              <MdGif color="#396bba" size={'2.5em'} />
            </Tab>
            <Tab>
              <FaInfo border="1px solid black" color="#188038" size={'2.5em'} />
            </Tab>
            <Tab>
              <Image src={groupImg} />
            </Tab>
          </TabList>
        </Tabs>
      )}
    </>
  );
}

export default MainPokemonTab;
