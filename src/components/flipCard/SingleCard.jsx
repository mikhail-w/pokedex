import '../../assets/styles/SingleCard.css';
import back from '../../assets/images/flip/ball.png';
import { Box, Image } from '@chakra-ui/react';

function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    // console.log('Card Clicked!');

    // prevents user from clicking multiple cards too quickly
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <Box className="card">
      <Box className={flipped ? 'flipped' : ''}>
        <Image className="front" src={card.src} alt="card-front" />
        <Image
          className="back"
          src={back}
          onClick={handleClick}
          alt="card-back"
        />
      </Box>
    </Box>
  );
}

export default SingleCard;
