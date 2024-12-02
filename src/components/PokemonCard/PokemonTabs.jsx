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
  console.log('CARD:', card);
  if (!pokeInfo) {
    return (
      <Text fontSize={{ base: 'sm', md: 'md' }} textAlign="center">
        Loading Pokémon data...
      </Text>
    );
  }
  // Height in meters
  const heightInMeters = card.height / 10;

  // Convert meters to total inches (1 meter = 39.3701 inches)
  const totalInches = heightInMeters * 39.3701;

  // Convert total inches to feet and remaining inches
  const feet = Math.floor(totalInches / 12); // 1 foot = 12 inches
  const inches = Math.round(totalInches % 12); // Remaining inches after dividing by 12
  return (
    <Tabs
      className="pokeDetail-info-container"
      isFitted
      variant="soft-rounded"
      colorScheme="green"
      size="sm"
      w={{ base: '100%', md: '450px' }}
      borderRadius={'50px'}
      height="100px"
    >
      <TabList
        position="sticky"
        top="0"
        zIndex="1"
        bg="white"
        paddingBottom={'5px'}
      >
        <Tab fontSize={{ base: 'xs', md: 'md' }}>About</Tab>
        <Tab fontSize={{ base: 'xs', md: 'md' }}>Stats</Tab>
        <Tab fontSize={{ base: 'xs', md: 'md' }}>Moves</Tab>
        <Tab fontSize={{ base: 'xs', md: 'md' }}>Sprites</Tab>
      </TabList>
      <Divider />
      <Box
        maxHeight={{ base: 'auto', md: '400px' }}
        overflowY={{ base: 'visible', md: 'auto' }}
      >
        <TabPanels height={'150px'} overflow={'scroll'} paddingBottom={'20px'}>
          {/* ABOUT TAB */}
          <TabPanel>
            {card ? (
              <>
                <Box
                  display={'flex'}
                  padding={('8px', '0')}
                  justifyContent={'left'}
                  marginBottom={'10px'}
                >
                  <Text
                    className="subtitle"
                    fontSize={{ base: 'xs', md: 'md' }} // Adjust font size for mobile
                    fontWeight="bold"
                  >
                    Base Experience:
                  </Text>
                  <Text
                    className="description"
                    fontSize={{ base: 'xs', md: 'md' }} // Adjust font size for mobile
                  >
                    {card.base_experience || 'N/A'}
                  </Text>
                </Box>
                <Box
                  display={'flex'}
                  padding={('8px', '0')}
                  marginBottom={'10px'}
                >
                  <Text
                    className="subtitle"
                    fontSize={{ base: 'xs', md: 'md' }}
                    fontWeight="bold"
                  >
                    Height:
                  </Text>
                  <Text
                    className="description"
                    fontSize={{ base: 'xs', md: 'md' }}
                  >
                    {card.height
                      ? `${heightInMeters.toFixed(2)} m (${feet}'${inches}")`
                      : 'N/A'}
                  </Text>
                </Box>
                <Box
                  display={'flex'}
                  padding={('8px', '0')}
                  marginBottom={'10px'}
                >
                  <Text
                    className="subtitle"
                    fontSize={{ base: 'xs', md: 'md' }}
                    fontWeight="bold"
                  >
                    Weight:
                  </Text>
                  <Text
                    className="description"
                    fontSize={{ base: 'xs', md: 'md' }}
                  >
                    {card.weight
                      ? `${((card.weight / 10) * 2.2046).toFixed(2)} lbs`
                      : 'N/A'}
                  </Text>
                </Box>
                <Box
                  display={'flex'}
                  padding={('8px', '0')}
                  marginBottom={'10px'}
                >
                  <Text
                    className="subtitle"
                    fontSize={{ base: 'xs', md: 'md' }}
                    fontWeight="bold"
                  >
                    Growth Rate:
                  </Text>
                  <Text
                    className="description"
                    fontSize={{ base: 'xs', md: 'md' }}
                  >
                    {pokeInfo.growth_rate?.name || 'N/A'}
                  </Text>
                </Box>
                <Box
                  display={'flex'}
                  padding={('8px', '0')}
                  marginBottom={'10px'}
                >
                  <Text
                    className="subtitle"
                    fontSize={{ base: 'xs', md: 'md' }}
                    fontWeight="bold"
                  >
                    Capture Rate:
                  </Text>
                  <Text
                    className="description"
                    fontSize={{ base: 'xs', md: 'md' }}
                  >
                    {pokeInfo.capture_rate || 'N/A'}
                  </Text>
                </Box>
                <Box
                  display={'flex'}
                  padding={('8px', '0')}
                  marginBottom={'10px'}
                >
                  <Text
                    className="subtitle"
                    fontSize={{ base: 'xs', md: 'md' }}
                    fontWeight="bold"
                  >
                    Generation:
                  </Text>
                  <Text
                    className="description"
                    fontSize={{ base: 'xs', md: 'md' }}
                  >
                    {pokeInfo.generation?.name || 'N/A'}
                  </Text>
                </Box>
              </>
            ) : (
              <Text fontSize={{ base: 'xs', md: 'md' }}>
                No data available for this Pokémon.
              </Text>
            )}
          </TabPanel>

          {/* BASE STATS TAB */}
          <TabPanel
            display={'block'}
            width={'100%'}
            maxHeight={'170px'}
            overflow={'scroll'}
          >
            <Flex direction="column" wrap="wrap" gap={4}>
              {card.stats.map(stat => (
                <Flex
                  key={card.name + stat.stat.name}
                  width={'100%'}
                  justifyContent={'left'}
                  alignItems={{ base: 'left', md: 'center' }}
                  flexDirection={{ base: 'column', md: 'row' }}
                  marginRight={{ base: '0', md: '10px' }}
                >
                  <Flex marginRight={{ base: '0', md: '10px' }}>
                    <h3 className="stat-name">{stat.stat.name}</h3>
                  </Flex>

                  <Flex width={'100%'}>
                    <Text className="stat-value" marginRight={'10px'}>
                      {stat.base_stat}
                    </Text>
                    <Box
                      marginTop="10px"
                      className="stat-bar-container"
                      width={{ base: '100%', md: '90%' }}
                    >
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
                    </Box>
                  </Flex>
                </Flex>
              ))}
            </Flex>
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
                      fontSize={{ base: 'xs', md: 'md' }}
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
              <Flex
                alignItems="center"
                gap="20px"
                wrap="nowrap"
                overflowX="auto"
                overflowY="hidden"
                padding="10px"
                width="100%"
                height="auto"
                maxHeight="100px"
              >
                {Object.entries(card.sprites)
                  .filter(
                    ([_, url]) =>
                      typeof url === 'string' && url.endsWith('.png')
                  )
                  .map(([key, url]) => (
                    <Image
                      key={key}
                      src={url}
                      alt=""
                      width="100px"
                      height="90px" // Set fixed height for images
                      objectFit="contain" // Prevent image overflow or distortion
                    />
                  ))}
              </Flex>
            ) : null}
          </TabPanel>
        </TabPanels>
      </Box>
    </Tabs>
  );
}

export default PokemonTabs;
