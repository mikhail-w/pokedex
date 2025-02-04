import { useOutletContext } from 'react-router-dom';
import {
  Box,
  Flex,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Heading,
  Text,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { getType, getAbilities } from '../utils';
import '../assets/styles/InfoTab.css';

function InfoTab() {
  const { pokemon } = useOutletContext();

  // Define color values that adjust based on light or dark mode
  const bgColor = useColorModeValue('white', 'gray.700');
  const headingColor = useColorModeValue('gray.700', 'gray.200');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const dividerColor = useColorModeValue('gray.300', 'gray.600');

  if (!pokemon) {
    return (
      <Text textAlign="center" fontSize="lg">
        Loading...
      </Text>
    );
  }

  const { name, id, height, weight, moves, types, abilities } = pokemon;
  const [primaryType, secondaryType] = getType(types);
  const abilityList = getAbilities(abilities);
  const movesToDisplay = moves.slice(0, 4);

  // Convert height to meters and also format feet/inches
  const heightInMeters = height / 10;
  const totalInches = heightInMeters * 39.3701;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);

  return (
    <Flex direction="column" w="100%" maxW="500px" mx="auto" mt="40px">
      <Box
        bg={bgColor}
        boxShadow="md"
        borderRadius="lg"
        p={6}
        overflow="hidden"
      >
        <Heading size="md" textAlign="center" mb={4} color={headingColor}>
          Pokémon Info
        </Heading>
        <Divider mb={4} borderColor={dividerColor} />

        <TableContainer>
          <Table size="sm" variant="simple">
            <Tbody>
              {[
                { label: 'Name', value: name },
                {
                  label: 'Type',
                  value: secondaryType
                    ? `${primaryType} / ${secondaryType}`
                    : primaryType,
                },
                { label: 'ID', value: id },
                {
                  label: 'Height',
                  value: `${heightInMeters.toFixed(2)} m (${feet}'${inches}")`,
                },
                { label: 'Weight', value: `${weight} lbs` },
                {
                  label: 'Abilities',
                  value:
                    abilityList.length > 0 ? abilityList.join(', ') : 'None',
                },
                {
                  label: 'Moves',
                  value: movesToDisplay.map(move => move.move.name).join(', '),
                },
              ].map(({ label, value }) => (
                <Tr key={label}>
                  <Td fontWeight="bold" fontSize="sm" color={textColor}>
                    {label}:
                  </Td>
                  <Td textAlign="right" fontSize="sm" color={textColor}>
                    {value}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}

export default InfoTab;
