import { useOutletContext } from 'react-router-dom';
import { Button, useColorModeValue, Center } from '@chakra-ui/react';

function GenerateButton({ getRandomPokemon }) {
  const { setIsLoading } = useOutletContext();
  function handleClick() {
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
