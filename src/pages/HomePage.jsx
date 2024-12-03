import { useState, useEffect } from 'react';
import '../assets/styles/HomePage.css';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import HomePageImages from '../components/HomePageImages';
import { Button, Flex, Box, useBreakpointValue } from '@chakra-ui/react';

function HomePage() {
  const { setRandomChoice, setIsLoading, passed, setPassed } =
    useOutletContext();
  const navigate = useNavigate();

  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    function checkMobileLandscape() {
      const isLandscape =
        window.innerWidth > window.innerHeight && window.innerWidth <= 918;
      setIsMobileLandscape(isLandscape);
    }

    // Initial check
    checkMobileLandscape();

    // Listen for resize events
    window.addEventListener('resize', checkMobileLandscape);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkMobileLandscape);
    };
  }, []);

  // Navigate to random or list pages
  function handleClick() {
    return navigate(`/random/`);
  }

  function handleViewList() {
    return navigate(`/list/`);
  }

  function handlePokeFlip() {
    return navigate(`/flip/`);
  }

  // Adjust layout and size dynamically based on screen size
  const buttonSize = useBreakpointValue({ base: 'md', md: 'md' });

  return (
    <Flex
      direction="column"
      justify="space-between"
      align="center"
      height="90vh"
      px={4}
    >
      {/* Top Content */}
      <Box flex="1" width="100%">
        <HomePageImages isMobileLandscape={isMobileLandscape} />
      </Box>

      {/* Conditional rendering based on mobile landscape */}
      {isMobileLandscape && (
        <Box mb={4} color="blue.500">
          Mobile Landscape Mode Detected!
        </Box>
      )}

      {/* Buttons at the Bottom */}
      <Flex
        direction={isMobileLandscape ? 'row' : 'column'}
        mb={isMobileLandscape ? '20' : '10'}
        align="center"
        justify="center"
        gap={5}
        // pb={4}
        // outline={'2px solid'}
      >
        <Button
          onClick={handleClick}
          // mb="12px"
          colorScheme="blue"
          size={buttonSize}
          width="130px"
        >
          Get Pokemon
        </Button>
        <Button
          onClick={handleViewList}
          colorScheme="red"
          size={buttonSize}
          width="168px"
        >
          View Pokemon List
        </Button>
        <Button
          onClick={handlePokeFlip}
          colorScheme="yellow"
          size={buttonSize}
          width="168px"
        >
          PokeFlip Game
        </Button>
      </Flex>
    </Flex>
  );
}

export default HomePage;
