import Loading from './Loading';
import MainPokemonName from './MainPokemonName';
import InfoTab from './InfoTab';
import React, { Suspense } from 'react';
import ball from '../assets/images/pokeballs/pokeball.png';
import { CgPokemon } from 'react-icons/cg';
import { MdGif } from 'react-icons/md';
import { FaInfo } from 'react-icons/fa';
import groupImg from '../assets/images/pokeballs/group.png';
import { useOutletContext } from 'react-router-dom';
import { getType } from '../utils';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Image,
  Flex,
} from '@chakra-ui/react';

const LazyPokemonCard = React.lazy(() => import('./PokemonCard'));

function MainPokemonTab() {
  const { team, myTeam, setMyTeam, disabled, setDisabled, isLoading, pokemon } =
    useOutletContext();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Tabs align="center" variant="enclosed" size="lg" maxHeight={'100px'}>
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
                  src={pokemon.sprites.other[`official-artwork`].front_default}
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
              <MainPokemonName pokemonName={pokemon.name} isTeam={'true'} />
              <Flex
                flexWrap="wrap"
                paddingTop={'60px'}
                justifyContent="center"
                maxW={'100vw'}
                height={'550px'}
                gap="25px"
                overflow={'scroll'}
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  team.map((card, idx) => (
                    <Suspense key={idx} fallback={<Loading />}>
                      <LazyPokemonCard
                        index={idx}
                        card={card}
                        src={
                          card.sprites.other[`official-artwork`].front_default
                        }
                        src2={card.sprites.other.showdown.front_default}
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
                  ))
                )}
              </Flex>
            </TabPanel>
          </TabPanels>
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
