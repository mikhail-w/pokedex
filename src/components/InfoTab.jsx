import { useOutletContext } from 'react-router-dom';
import { TableContainer, Table, Thead, Tbody, Tr, Td } from '@chakra-ui/react';
import { getType, getAbilities } from '../utils';
import '../assets/styles/InfoTab.css';

function InfoTab() {
  const { pokemon } = useOutletContext();
  // console.log('Inside Info Tab');
  // console.log(pokemon);
  return (
    <TableContainer>
      <Table size="md">
        <Thead></Thead>
        <Tbody>
          <Tr>
            <Td className="title">Name:</Td>
            <Td className="pokemon-name">{pokemon.name}</Td>
          </Tr>
          <Tr>
            <Td className="title">Type:</Td>
            <Td className="pokemon-type">{getType(pokemon.types)[0]}</Td>
            {getType(pokemon.types).length == 2 ? (
              <Td className="pokemon-type">{getType(pokemon.types)[1]}</Td>
            ) : (
              ''
            )}
          </Tr>
          <Tr>
            <Td className="title">Id: </Td>
            <Td>{pokemon.id}</Td>
          </Tr>
          <Tr>
            <Td className="title">Height:</Td>
            <Td>{pokemon.height} inches</Td>
          </Tr>
          <Tr>
            <Td className="title">Weight:</Td>
            <Td>{pokemon.weight} lbs</Td>
          </Tr>
          <Tr>
            <Td className="title">Abilities: </Td>
            {getAbilities(pokemon.abilities).map((ability, idx) => {
              return <Td key={idx}>{ability}</Td>;
            })}
          </Tr>
          <Tr>
            <Td className="title">Moves:</Td>
            <Td>{pokemon.moves[0].move.name}</Td>
            <Td>{pokemon.moves[1].move.name}</Td>
            <Td>{pokemon.moves[2].move.name}</Td>
            <Td>{pokemon.moves[3].move.name}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default InfoTab;
