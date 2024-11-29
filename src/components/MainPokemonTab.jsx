import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Image,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import InfoTab from './InfoTab';
import Loading from './Loading';
import { getType } from '../utils';
import { MdGif } from 'react-icons/md';
import { FaInfo } from 'react-icons/fa';
import { Suspense } from 'react';
import { CgPokemon } from 'react-icons/cg';
import MainPokemonName from './MainPokemonName';
import { useOutletContext } from 'react-router-dom';
import LazyPokemonCard from './PokemonCard/PokemonCard';
import ball from '../assets/images/pokeballs/pokeball.png';
import groupImg from '../assets/images/pokeballs/group.png';

function TabContent({ children, height = '550px' }) {
  return (
    <Center objectFit="contain" height={height} flexDirection="column">
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
      pb={'30px'}
    />
  );
}

function MainPokemonTab() {
  const { team, myTeam, disabled, setDisabled, isLoading, pokemon } =
    useOutletContext();

  if (isLoading) return <Loading />;

  const pokemonArt = pokemon.sprites.other[`official-artwork`]?.front_default;
  const pokemonShowdown = pokemon.sprites.other.showdown?.front_default;

  return (
    <Tabs align="center" variant="enclosed" size={['sm', 'md', 'lg']}>
      <TabPanels
        mt={['0px', '0px', '20px']} // Adjust margin-top for mobile screens
      >
        <TabPanel>
          <MainPokemonName />
          <TabContent>
            <PokemonImage src={pokemon.sprites.other.home?.front_default} />
          </TabContent>
        </TabPanel>

        <TabPanel>
          <MainPokemonName />
          <TabContent>
            <PokemonImage src={pokemonArt} />
          </TabContent>
        </TabPanel>

        <TabPanel>
          <MainPokemonName />
          <TabContent>
            <Image
              src={pokemonShowdown || ball}
              boxSize="200px"
              objectFit="contain"
            />
          </TabContent>
        </TabPanel>

        <TabPanel>
          <MainPokemonName />
          <TabContent height="auto">
            <InfoTab />
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
            maxHeight={['calc(100vh - 320px)', '430px']}
            gap={['35px', '20px', '35px']}
            overflowY="auto"
          >
            {team.map((card, idx) => (
              <Suspense key={idx} fallback={<Loading />}>
                <LazyPokemonCard
                  index={idx}
                  card={card}
                  src={card.sprites.other[`official-artwork`]?.front_default}
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
          bottom={'120px'}
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
