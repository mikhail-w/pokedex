import '../../assets/styles/pokeDetail.css';
import { Flex, Image, Text, Box, Center } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

function EvolutionChain({ evoNames }) {
  return (
    <>
      {/* Flavor text section */}
      <Box className="flavorBoxContainer">
        {/* <FlavorText textArray={textArray} /> */}
      </Box>

      {/* Evolution chain title */}
      <Center className="evoTitle">Evolution Chain</Center>

      {/* Evolution chain images and names */}
      <Flex justifyContent="center" alignItems="center" gap="10px">
        {evoNames.map(([species_name, id], index) => (
          <Flex key={index} alignItems="center">
            {/* Evolution Image and Name */}
            <Flex flexDirection="column" alignItems="center">
              <Image
                width="120px"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
                alt={`${species_name} sprite`}
              />
              <Text className="pname">{species_name}</Text>
            </Flex>

            {/* Arrow Icon for Transition */}
            {index < evoNames.length - 1 && (
              <Center mx={3}>
                <ArrowForwardIcon
                  boxSize={8}
                  color="gray.700"
                  aria-label="evolution transition"
                />
              </Center>
            )}
          </Flex>
        ))}
      </Flex>
    </>
  );
}

export default EvolutionChain;
