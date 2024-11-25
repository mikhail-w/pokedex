import { useOutletContext } from 'react-router-dom';
import { getRandomID } from '../utils';
import { Button, useColorModeValue, Center } from '@chakra-ui/react';

function GenerateButton({ getRandomPokemon }) {
  const { randomID, setRandomChoice, setIsLoading } = useOutletContext();
  function handleClick() {
    setRandomChoice(getRandomID(1025));
    setIsLoading(true);
    getRandomPokemon();
  }
  return (
    <Center marginTop={'60vh'}>
      <Button
        pos={'fixed'}
        bottom={'70px'}
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
