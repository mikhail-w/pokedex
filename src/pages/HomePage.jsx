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
  function handleClick() {
    return navigate(`/random/`);
  }

  function handleViewList() {
    return navigate(`/list/`);
  }
  return (
    <>
      <HomePageImages />
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
