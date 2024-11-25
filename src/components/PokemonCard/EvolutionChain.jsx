import '../../assets/styles/pokeDetail.css';
import { Flex, Image, Text, Box, Center } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

function EvolutionChain({ evoNames }) {
  // console.log('EVO CHAIN :', evoNames);

  return (
    <>
      {/* Flavor text section */}
      <Box className="flavorBoxContainer">
        {/* <FlavorText textArray={textArray} /> */}
      </Box>

      {/* Evolution chain title */}
      <Center className="evoTitle">Evolution Chain</Center>

      {/* Evolution chain images and names */}
      <Flex justifyContent="space-evenly" alignItems="center">
        {evoNames.map(([species_name, id], index) => (
          <Flex key={index} alignItems="center">
            {/* Evolution Image and Name */}
            <Flex
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Flex
                className="evoImg"
                flexDirection="column"
                alignItems="center"
              >
                <Image
                  width="120px"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
                  alt={`${species_name} sprite`}
                />
                <Text className="pname">{species_name}</Text>
              </Flex>
            </Flex>

            {/* Arrow Icon for Transition */}
            {index < evoNames.length - 1 && (
              <ArrowForwardIcon
                boxSize={8}
                ml={5}
                color="gray.700"
                aria-label="evolution transition"
              />
            )}
          </Flex>
        ))}
      </Flex>
    </>
  );
}

export default EvolutionChain;
