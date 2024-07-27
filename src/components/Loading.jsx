import { Center, Image, Text, VStack } from '@chakra-ui/react';
import pikachu from '../assets/images/gifs/pikachu.gif';

function Loading() {
  return (
    <VStack>
      <Center height={'650px'} flexDirection={'column'}>
        <Image paddingLeft={'30px'} width={'50%'} src={pikachu} />
        <Text>Loading....</Text>
      </Center>
    </VStack>
  );
}

export default Loading;
