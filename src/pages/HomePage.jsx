import '../assets/styles/HomePage.css';
import HomePageImages from '../components/HomePageImages';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { Button, Center } from '@chakra-ui/react';

function HomePage() {
  const { randomChoice } = useOutletContext();
  const navigate = useNavigate();
  console.log('-------- On Home Page, Current Random Choice:', randomChoice);
  function handleClick() {
    console.log('Home Page Get Pokemon Button Clicked', randomChoice);
    // setRandomChoice(getChoice(1025));
    return navigate(`/random/`);
  }
  return (
    <>
      <HomePageImages />
      {/* <GenerateButton handleClick={handleClick} /> */}
      <Center>
        <Button
          pos={'fixed'}
          bottom={'80px'}
          onClick={handleClick}
          marginTop={'60px'}
          colorScheme="teal"
          size="lg"
        >
          Get Pokemon
        </Button>
      </Center>
    </>
  );
}

export default HomePage;
