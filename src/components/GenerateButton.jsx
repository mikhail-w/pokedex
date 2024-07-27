import { useOutletContext } from 'react-router-dom';
import { getChoice } from '../utils';
import { Button, useColorModeValue, Center } from '@chakra-ui/react';

function GenerateButton({ getRandomPokemon }) {
  const { randomChoice, setRandomChoice } = useOutletContext();
  function handleClick() {
    console.log('Inside Button Component');
    console.log('Current Random Choice', randomChoice);
    setRandomChoice(getChoice(1025));
    console.log('Current Random Choice after', randomChoice);
    getRandomPokemon();
  }
  return (
    <Center marginTop={'60vh'}>
      <Button
        pos={'fixed'}
        bottom={'80px'}
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
