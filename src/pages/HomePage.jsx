import '../assets/styles/HomePage.css';
import HomePageImages from '../components/HomePageImages';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { Button, Center } from '@chakra-ui/react';
import { getChoice } from '../utils';

function HomePage() {
  const { setRandomChoice, setIsLoading, passed, setPassed } =
    useOutletContext();
  const navigate = useNavigate();
  // console.log('-------- On Home Page, Current Random Choice:', randomChoice);
  function handleClick() {
    // console.log('Home Page Get Pokemon Button Clicked', randomChoice);

    // setIsLoading(true);
    // setRandomChoice(getChoice(1025));
    return navigate(`/random/`);
  }

  function handleViewList() {
    return navigate(`/list/`);
  }
  return (
    <>
      <HomePageImages />
      {/* <GenerateButton handleClick={handleClick} /> */}
      <Center>
        <Button
          pos={'fixed'}
          bottom={'100px'}
          onClick={handleClick}
          marginTop={'60px'}
          colorScheme="blue"
          size="lg"
        >
          Get Pokemon
        </Button>
        <Button
          pos={'fixed'}
          bottom={'40px'}
          onClick={handleViewList}
          size="lg"
          colorScheme="red"
        >
          View Pokemon List
        </Button>
      </Center>
    </>
  );
}

export default HomePage;
