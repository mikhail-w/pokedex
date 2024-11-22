import { Box, Flex, Text, Image } from '@chakra-ui/react';
import EvolutionChain from './EvolutionChain';
import PokemonTabs from './PokemonTabs';

function ModalContent({ card, name, id, type, onClose }) {
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text>{name}</Text>
        <Text>#{String(id).padStart(3, '0')}</Text>
      </Flex>
      <PokemonTabs card={card} />
      <EvolutionChain card={card} />
    </Box>
  );
}

export default ModalContent;
