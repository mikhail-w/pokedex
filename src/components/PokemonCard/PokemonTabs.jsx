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

function PokemonTabs({ card, pokeInfo }) {
  return (
    <Tabs
      className="pokeDetail-info-container"
      isFitted
      variant="soft-rounded"
      colorScheme="green"
      size="sm"
      w="100%"
      maxH={200}
      overflow={'scroll'}
    >
      <TabList position="sticky" top="0" zIndex="1" bg="white">
        <Tab>About</Tab>
        <Tab>Base Stats</Tab>
        <Tab>Moves</Tab>
        <Tab>Sprites</Tab>
      </TabList>
      <Divider />
      <Box
        maxHeight="400px" // Adjust this height as needed
        overflowY="auto"
      >
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
                <Box className="subtitle-container">
                  <p className="subtitle">Growth Rate:</p>
                  <p className="description">
                    {pokeInfo.growth_rate?.name || 'N/A'}
                  </p>
                </Box>
                <Box className="subtitle-container">
                  <p className="subtitle">Capture Rate:</p>
                  <p className="description">
                    {pokeInfo.capture_rate || 'N/A'}
                  </p>
                </Box>
                <Box className="subtitle-container">
                  <p className="subtitle">Generation:</p>
                  <p className="description">
                    {pokeInfo.generation?.name || 'N/A'}
                  </p>
                </Box>
              </>
            ) : (
              <Text>No data available for this Pokémon.</Text>
            )}
          </TabPanel>

          {/* BASE STATS TAB */}
          <TabPanel className="content-stats">
            {card.stats.map(stat => (
              <div key={card.name + stat.stat.name} className="stat-container">
                <div className="stat-titles-container">
                  <h3 className="stat-name">{stat.stat.name}</h3>
                  <h3 className="stat-value">{stat.base_stat}</h3>
                </div>
                <div className="stat-bar-container">
                  <div className="stat-bar-bg"></div>
                  <div
                    className="stat-bar-parent"
                    style={{
                      width: stat.base_stat + '%',
                      maxWidth: '100%',
                    }}
                  >
                    <div
                      className={`stat-bar-fill ${card.types[0].type.name}`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </TabPanel>

          {/* MOVES TAB */}
          <TabPanel>
            {card?.moves?.length > 0 ? (
              <Box display="flex" flexWrap="wrap" gap={4}>
                {card.moves.slice(0, 4).map((move, index) => (
                  <Box
                    key={index}
                    padding={2}
                    borderWidth="1px"
                    borderRadius="md"
                    boxShadow="sm"
                    bg="gray.100"
                    _hover={{ bg: 'gray.200' }}
                  >
                    <Text
                      className="description"
                      fontSize="md"
                      fontWeight="300"
                    >
                      {move.move.name || 'N/A'}
                    </Text>
                  </Box>
                ))}
              </Box>
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
      </Box>
    </Tabs>
  );
}

export default PokemonTabs;
