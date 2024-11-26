import '../assets/styles/HomePage.css';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import HomePageImages from '../components/HomePageImages';
import { Button, Flex, Box, useBreakpointValue } from '@chakra-ui/react';

function HomePage() {
  const { setRandomChoice, setIsLoading, passed, setPassed } =
    useOutletContext();
  const navigate = useNavigate();

  // Navigate to random or list pages
  function handleClick() {
    return navigate(`/random/`);
  }

  function handleViewList() {
    return navigate(`/list/`);
  }

  // Adjust layout and size dynamically based on screen size
  const buttonSize = useBreakpointValue({ base: 'md', md: 'md' });

  return (
    <Flex
      direction="column"
      justify="space-between" // Ensures proper spacing
      align="center"
      height="90vh" // Takes the full viewport height
      px={4} // Padding for smaller screens
    >
      {/* Top Content */}
      <Box flex="1" width="100%">
        <HomePageImages />
      </Box>

      {/* Buttons at the Bottom */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        pb={4} // Padding at the bottom for spacing
      >
        <Button
          onClick={handleClick}
          mb="12px" // Space between buttons
          colorScheme="blue"
          size={buttonSize}
          width="130px" // Fixed width
        >
          Get Pokemon
        </Button>
        <Button
          onClick={handleViewList}
          colorScheme="red"
          size={buttonSize}
          width="168px" // Fixed width
        >
          View Pokemon List
        </Button>
      </Flex>
    </Flex>
  );
}

export default HomePage;
