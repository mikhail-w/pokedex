import { useOutletContext } from 'react-router-dom';
import { Box, TableContainer, Table, Tbody, Tr, Td } from '@chakra-ui/react';
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

  return (
    <Box
      w="100%"
      p={[2, 4]} // Smaller padding for mobile
      maxW="500px"
      mx="auto"
      overflowX="auto" // Enable scrolling for overflow
    >
      <TableContainer>
        <Table size="sm" mt="20" fontSize={['xs', 'sm']}>
          {' '}
          {/* Adjust font size */}
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
                {height} inches
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
    </Box>
  );
}

export default InfoTab;
