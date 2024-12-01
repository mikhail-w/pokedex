import { Center, Image, Text } from '@chakra-ui/react';
import pikachu from '../assets/images/gifs/pikachu.gif';

function Loading({ isMobileLandscape }) {
  return (
    <Center
      height={isMobileLandscape ? '300px' : { base: '300px', md: '650px' }}
      paddingRight={isMobileLandscape ? '100px' : ''}
      flexDirection={'column'}
      mt={isMobileLandscape ? '' : { base: '100px', md: '' }}
    >
      <Image
        paddingLeft={'30px'}
        width={isMobileLandscape ? '30%' : { base: '200px', md: '30%' }}
        src={pikachu}
      />
      <Text>Loading....</Text>
    </Center>
  );
}

export default Loading;
