import snorlax from '../assets/images/gifs/snorlax.gif';
import { useNavigate } from 'react-router-dom';

import { Button, Center, Flex, Image, Text } from '@chakra-ui/react';

function NotFoundPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/`);
  };
  return (
    <>
      <Flex>
        <Center marginTop={'300px'}>
          <Image width={'200px'} src={snorlax} alt="" />
          <Text
            paddingLeft={'50px'}
            textAlign={'center'}
            justifyContent={'center'}
            fontSize={'2rem'}
          >
            404 Pokemon Not Found
          </Text>
        </Center>
      </Flex>
      <Center>
        <Button onClick={handleClick} marginTop={'50px'}>
          Go Back
        </Button>
      </Center>
    </>
  );
}

export default NotFoundPage;
