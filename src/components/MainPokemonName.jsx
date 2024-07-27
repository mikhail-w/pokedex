import { useOutletContext } from 'react-router-dom';
import { Center } from '@chakra-ui/react';

function MainPokemonName({ isTeam }) {
  const { pokemon } = useOutletContext();
  return (
    <Center
      // marginTop={'50px'}
      marginBottom={'20px'}
      textDecoration="underline"
      textTransform={'capitalize'}
      textUnderlineOffset="8px"
      letterSpacing="5px"
      fontFamily="Pokemon Solid"
      fontSize={'2rem'}
      as="h3"
    >
      {isTeam === 'true' ? pokemon.name + "'s Team" : pokemon.name}
    </Center>
  );
}

export default MainPokemonName;
