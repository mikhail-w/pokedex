import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Divider,
  Box,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import '../../assets/styles/pokeDetail.css';

function PokemonTabs({ card, pokeInfo, flavorText, evoNames }) {
  return (
    <Tabs
      className="pokeDetail-info-container"
      isFitted
      variant="soft-rounded"
      colorScheme="green"
      size="sm"
      w="100%"
    >
      <TabList>
        <Tab>About</Tab>
        <Tab>Base Stats</Tab>
        <Tab>Moves</Tab>
        <Tab>Sprites</Tab>
      </TabList>
      <Divider />
      <TabPanels>
        {/* ABOUT TAB */}
        <TabPanel>
          {card ? (
            <>
              <Box className="subtitle-container">
                <p className="subtitle">Base Experience:</p>
                <p className="description">{card.base_experience || 'N/A'}</p>
              </Box>
              <Box className="subtitle-container">
                <p className="subtitle">Height:</p>
                <p className="description">
                  {card.height ? `${card.height}m` : 'N/A'}
                </p>
              </Box>
              <Box className="subtitle-container">
                <p className="subtitle">Weight:</p>
                <p className="description">
                  {card.weight ? `${card.weight}lbs` : 'N/A'}
                </p>
              </Box>
            </>
          ) : (
            <Text>No data available for this Pokémon.</Text>
          )}
          {pokeInfo && (
            <>
              <Box className="subtitle-container">
                <p className="subtitle">Growth Rate:</p>
                <p className="description">
                  {pokeInfo.growth_rate?.name || 'N/A'}
                </p>
              </Box>
              <Box className="subtitle-container">
                <p className="subtitle">Capture Rate:</p>
                <p className="description">{pokeInfo.capture_rate || 'N/A'}</p>
              </Box>
              <Box className="subtitle-container">
                <p className="subtitle">Generation:</p>
                <p className="description">
                  {pokeInfo.generation?.name || 'N/A'}
                </p>
              </Box>
            </>
          )}
        </TabPanel>

        {/* BASE STATS TAB */}
        <TabPanel>
          {card?.stats?.length > 0 ? (
            card.stats.map(stat => (
              <Box key={stat.stat.name} className="subtitle-container">
                <p className="subtitle">{stat.stat.name}:</p>
                <p className="description">{stat.base_stat || 'N/A'}</p>
              </Box>
            ))
          ) : (
            <Text>No base stats available.</Text>
          )}
        </TabPanel>

        {/* MOVES TAB */}
        <TabPanel>
          {card?.moves?.length > 0 ? (
            card.moves.slice(0, 4).map((move, index) => (
              <Box key={index} className="subtitle-container">
                <p className="description">{move.move.name || 'N/A'}</p>
              </Box>
            ))
          ) : (
            <Text>No moves available.</Text>
          )}
        </TabPanel>

        {/* SPRITES TAB */}
        <TabPanel>
          {card?.sprites ? (
            <Flex justifyContent="center" gap="20px">
              <Image
                src={card.sprites.front_default || 'default_front.png'}
                alt="Front Default"
                width="100px"
              />
              <Image
                src={card.sprites.back_default || 'default_back.png'}
                alt="Back Default"
                width="100px"
              />
            </Flex>
          ) : (
            <Text>No sprites available.</Text>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default PokemonTabs;
