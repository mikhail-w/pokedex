import '../assets/styles/HomePage.css';
import HomePageImages from '../components/HomePageImages';
import GenerateButton from '../components/GenerateButton';

import { Center } from '@chakra-ui/react';

function HomePage() {
  return (
    <>
      <HomePageImages />
      <GenerateButton />
    </>
  );
}

export default HomePage;
