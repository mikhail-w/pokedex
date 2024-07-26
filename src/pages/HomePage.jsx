import '../assets/styles/HomePage.css';
import HomePageImages from '../components/HomePageImages';
import GenerateButton from '../components/GenerateButton';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  function handleClick() {
    return navigate(`/random/`);
  }
  return (
    <>
      <HomePageImages />
      <GenerateButton handleClick={handleClick} />
    </>
  );
}

export default HomePage;
