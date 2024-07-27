import { useNavigate } from 'react-router-dom';
import { Button, Center } from '@chakra-ui/react';

function BackButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log('<<<<BACK BUTTON PRESSED>>>>');
    navigate(-1);
  };

  return (
    <Center>
      <Button
        pos={'fixed'}
        bottom={'80px'}
        onClick={handleClick}
        marginTop={'60px'}
        colorScheme="red"
        size="lg"
      >
        Go Back
      </Button>
    </Center>
  );
}

export default BackButton;
