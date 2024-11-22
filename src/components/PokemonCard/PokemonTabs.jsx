import { Tab, Tabs, TabList, TabPanel, TabPanels, Box } from '@chakra-ui/react';

function PokemonTabs({ card }) {
  return (
    <Tabs variant="soft-rounded" colorScheme="green">
      <TabList>
        <Tab>About</Tab>
        <Tab>Base Stats</Tab>
        <Tab>Moves</Tab>
        <Tab>Sprites</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box>
            <p>Base Experience: {card.base_experience}</p>
            <p>Height: {card.height}m</p>
            <p>Weight: {card.weight}lbs</p>
          </Box>
        </TabPanel>
        <TabPanel>
          {card.stats.map(stat => (
            <Box key={stat.stat.name}>
              <p>
                {stat.stat.name}: {stat.base_stat}
              </p>
            </Box>
          ))}
        </TabPanel>
        <TabPanel>
          {card.moves.slice(0, 4).map((move, index) => (
            <p key={index}>{move.move.name}</p>
          ))}
        </TabPanel>
        <TabPanel>
          <Box>
            <img src={card.sprites.front_default} alt="Front Default" />
            <img src={card.sprites.back_default} alt="Back Default" />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default PokemonTabs;
