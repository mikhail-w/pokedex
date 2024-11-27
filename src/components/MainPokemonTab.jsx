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
  return <Image maxW="90%" maxH="90%" src={src || ball} alt="Pokemon image" />;
}

function MainPokemonTab() {
  const { team, myTeam, disabled, setDisabled, isLoading, pokemon } =
    useOutletContext();

  // Dynamically set TabPanels height based on screen size
  const tabPanelsHeight = useBreakpointValue({
    base: '550px', // Small screens
    md: '600px', // Medium screens
    lg: '700px', // Large screens
  });

  if (isLoading) return <Loading />;

  const pokemonArt = pokemon.sprites.other[`official-artwork`]?.front_default;
  const pokemonShowdown = pokemon.sprites.other.showdown?.front_default;

  return (
    <Tabs align="center" variant="enclosed" size="lg">
      {/* <TabPanels height={tabPanelsHeight}> */}
      <TabPanels>
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
            <PokemonImage src={pokemonShowdown} />
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
            pt="60px"
            justifyContent="center"
            maxW="100vw"
            height="420px"
            gap="25px"
            overflow="auto"
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
          maxWidth={500}
          // outline={'2px solid'}
          pos={'fixed'}
          bottom={'200px'}
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
