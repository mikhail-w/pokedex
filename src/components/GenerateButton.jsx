import { useOutletContext } from 'react-router-dom';
import { getRandomID } from '../utils';
import { Button, useColorModeValue, Center } from '@chakra-ui/react';

function GenerateButton({ getRandomPokemon }) {
  const { randomID, setrandomID, setIsLoading } = useOutletContext();
  function handleClick() {
    setrandomID(getRandomID(1025));
    setIsLoading(true);
    getRandomPokemon();
  }
  return (
    <Center>
      <Button
        pos={'fixed'}
        bottom={'30px'}
        onClick={handleClick}
        marginTop={'60px'}
        colorScheme="red"
        size="lg"
        backgroundColor={useColorModeValue('#3d7dca', '#e53e3e')}
      >
        Generate Random Pokemon
      </Button>
    </Center>
  );
}

export default GenerateButton;
