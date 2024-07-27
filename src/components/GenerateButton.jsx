import { Button, useColorModeValue, Center } from '@chakra-ui/react';

function GenerateButton({ handleClick }) {
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
