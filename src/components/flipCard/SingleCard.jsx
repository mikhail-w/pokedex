import '../../assets/styles/SingleCard.css';
import back from '../../assets/images/flip/ball.png';

function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    // console.log('Card Clicked!');

    // prevents user from clicking multiple cards too quickly
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className="front" src={card.src} alt="card-front" />
        <img
          className="back"
          src={back}
          onClick={handleClick}
          alt="card-back"
        />
      </div>
    </div>
  );
}

export default SingleCard;
