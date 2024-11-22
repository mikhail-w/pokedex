import { useOutletContext } from 'react-router-dom';
import { TableContainer, Table, Thead, Tbody, Tr, Td } from '@chakra-ui/react';
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
    <TableContainer>
      <Table size="md">
        <Thead>{/* Optional: Add headers if needed */}</Thead>
        <Tbody>
          <Tr>
            <Td className="title">Name:</Td>
            <Td className="info-value">{name}</Td>
          </Tr>
          <Tr>
            <Td className="title">Type:</Td>
            <Td className="info-value">{primaryType}</Td>
            {secondaryType && <Td className="info-value">{secondaryType}</Td>}
          </Tr>
          <Tr>
            <Td className="title">ID:</Td>
            <Td className="info-value">{id}</Td>
          </Tr>
          <Tr>
            <Td className="title">Height:</Td>
            <Td className="info-value">{height} inches</Td>
          </Tr>
          <Tr>
            <Td className="title">Weight:</Td>
            <Td className="info-value">{weight} lbs</Td>
          </Tr>
          <Tr>
            <Td className="title">Abilities:</Td>
            {abilityList.length > 0 ? (
              abilityList.map((ability, idx) => (
                <Td key={idx} className="info-value">
                  {ability}
                </Td>
              ))
            ) : (
              <Td className="info-value">None</Td>
            )}
          </Tr>
          <Tr>
            <Td className="title">Moves:</Td>
            {movesToDisplay.map((move, idx) => (
              <Td key={idx} className="info-value">
                {move.move.name}
              </Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default InfoTab;
