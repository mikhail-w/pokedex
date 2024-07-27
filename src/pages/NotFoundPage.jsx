import snorlax from '../assets/images/gifs/snorlax.gif';
import { useNavigate } from 'react-router-dom';

import { Button, Center, Image, Text } from '@chakra-ui/react';

function NotFoundPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/`);
  };
  return (
    <>
      <Center marginTop={'300px'} flexDirection={'column'}>
        <Image width={'200px'} src={snorlax} alt="" />
        <Text textAlign={'center'} justifyContent={'center'} fontSize={'2rem'}>
          404 Pokemon Not Found
        </Text>
      </Center>
      <Center>
        <Button onClick={handleClick} marginTop={'50px'}>
          Go Back
        </Button>
      </Center>
    </>
  );
}

export default NotFoundPage;
