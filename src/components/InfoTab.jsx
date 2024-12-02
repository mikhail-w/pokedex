import { useOutletContext } from 'react-router-dom';
import {
  Box,
  Flex,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
} from '@chakra-ui/react';
import { getType, getAbilities } from '../utils';
import '../assets/styles/InfoTab.css';

function InfoTab() {
  const { pokemon } = useOutletContext();

  if (!pokemon) {
    return <p>Loading...</p>; // Fallback for missing data
  }

  const { name, id, height, weight, moves, types, abilities } = pokemon;
  const [primaryType, secondaryType] = getType(types);
  const abilityList = getAbilities(abilities);
  const movesToDisplay = moves.slice(0, 4); // Safely handle moves array

  // Height in meters
  const heightInMeters = height / 10;

  // Convert meters to total inches (1 meter = 39.3701 inches)
  const totalInches = heightInMeters * 39.3701;

  // Convert total inches to feet and remaining inches
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);

  return (
    <Flex
      direction="column"
      w="100%"
      h="100%"
      // p={[2, 4]}
      px={[10]}
      minH={'300px'}
      maxW="500px"
      mx="auto"
      mt={'40px'}
    >
      <TableContainer flex="1" overflowY="auto">
        {' '}
        {/* Make the TableContainer fill available height */}
        <Table size="sm" mt="4" fontSize={['xs', 'sm']}>
          <Tbody>
            <Tr>
              <Td
                className="title"
                fontSize={['xs', 'sm']}
                wordBreak="break-word"
              >
                Name:
              </Td>
              <Td
                className="info-value"
                textAlign="right"
                fontSize={['xs', 'sm']}
              >
                {name}
              </Td>
            </Tr>
            <Tr>
              <Td className="title" fontSize={['xs', 'sm']}>
                Type:
              </Td>
              <Td
                className="info-value"
                textAlign="right"
                fontSize={['xs', 'sm']}
              >
                {primaryType}
                {secondaryType && ` / ${secondaryType}`}
              </Td>
            </Tr>
            <Tr>
              <Td className="title" fontSize={['xs', 'sm']}>
                ID:
              </Td>
              <Td
                className="info-value"
                textAlign="right"
                fontSize={['xs', 'sm']}
              >
                {id}
              </Td>
            </Tr>
            <Tr>
              <Td className="title" fontSize={['xs', 'sm']}>
                Height:
              </Td>
              <Td
                className="info-value"
                textAlign="right"
                fontSize={['xs', 'sm']}
              >
                {`${heightInMeters.toFixed(2)} m (${feet}'${inches}")`}
              </Td>
            </Tr>
            <Tr>
              <Td className="title" fontSize={['xs', 'sm']}>
                Weight:
              </Td>
              <Td
                className="info-value"
                textAlign="right"
                fontSize={['xs', 'sm']}
              >
                {weight} lbs
              </Td>
            </Tr>
            <Tr>
              <Td className="title" fontSize={['xs', 'sm']}>
                Abilities:
              </Td>
              <Td
                className="info-value"
                textAlign="right"
                fontSize={['xs', 'sm']}
              >
                {abilityList.length > 0 ? abilityList.join(', ') : 'None'}
              </Td>
            </Tr>
            <Tr>
              <Td className="title" fontSize={['xs', 'sm']}>
                Moves:
              </Td>
              <Td
                className="info-value"
                textAlign="right"
                fontSize={['xs', 'sm']}
              >
                {movesToDisplay.map(move => move.move.name).join(', ')}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default InfoTab;
