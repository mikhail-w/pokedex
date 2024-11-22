import { Flex, Image, Text } from '@chakra-ui/react';

function EvolutionChain({ card }) {
  return (
    <Flex justifyContent="space-evenly">
      {card.evolutions.map((evolution, index) => (
        <Flex key={index} flexDirection="column" alignItems="center">
          <Image
            width="120px"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${evolution.id}.png`}
          />
          <Text>{evolution.name}</Text>
        </Flex>
      ))}
    </Flex>
  );
}

export default EvolutionChain;
