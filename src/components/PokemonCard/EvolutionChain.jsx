import FlavorText from './FlavorText';
import '../../assets/styles/pokeDetail.css';
import { Flex, Image, Text, Box, Center } from '@chakra-ui/react';

function EvolutionChain({ evoNames, textArray }) {
  // Validate evoNames structure
  const isValidEvoNames =
    Array.isArray(evoNames) &&
    evoNames.every(
      item =>
        item &&
        typeof item.species_name === 'string' &&
        typeof item.id === 'string'
    );

  if (!isValidEvoNames) {
    console.error('Invalid or empty evoNames:', evoNames);
    return (
      <Flex
        className="extended-section"
        height="700px"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Evolution chain data is unavailable or malformed.</Text>
      </Flex>
    );
  }

  return (
    <Flex className="extended-section" height="700px" flexDirection="column">
      {/* Flavor text section */}
      <Box className="flavorBoxContainer">
        {/* <FlavorText textArray={textArray} /> */}
      </Box>

      {/* Evolution chain title */}
      <Center className="evoTitle">Evolution Chain</Center>

      {/* Evolution chain images and names */}
      <Flex justifyContent="space-evenly">
        {evoNames.map(({ species_name, id }, index) => (
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
                alt={`${species_name} sprite`}
              />
              <Text className="pname">{species_name}</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

export default EvolutionChain;
