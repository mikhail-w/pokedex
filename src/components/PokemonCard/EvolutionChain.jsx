import '../../assets/styles/pokeDetail.css';
import { Flex, Image, Text, Box, Center } from '@chakra-ui/react';

function EvolutionChain({ evoNames }) {
  return (
    <>
      {/* Evolution chain title */}
      <Center className="evoTitle">Evolution Chain</Center>

      {/* Evolution chain images and names */}
      <Flex justifyContent="space-evenly">
        {evoNames.map(([pokemon_name, id], index) => (
          <Flex
            key={index}
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Flex className="evoImg" flexDirection="column" alignItems="center">
              <Image
                width="120px"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
                alt={`${pokemon_name} sprite`}
              />
              <Text className="pname">{pokemon_name}</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </>
  );
}

export default EvolutionChain;
