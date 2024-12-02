import { useState, useEffect } from 'react';
import '../assets/styles/PokeFligPage.css';
import SingleCard from '../components/flipCard/SingleCard';

import ng from '../assets/images/flip/ng.png';
import background from '../assets/images/flip/background.jpg';
import turnImg from '../assets/images/flip/turns.png';
import Logo from '../components/flipCard/Logo';

function PokeFlipPage() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle cards
  const shuffleCards = async () => {
    const pokemonImages = getRandomPokemon();

    // Duplicate the cards
    const shuffledCards = [...pokemonImages, ...pokemonImages]
      .sort(() => Math.random() - 0.5)
      .map((card, idx) => {
        let ans = { ...addId(card, idx) };
        return ans;
      });

    // Update Game Screen
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);

    // console.log('SHUFFLED CARDS: ', shuffledCards);
  };

  // Add Id and matched key/value pairs to card object
  const addId = (card, idx) => {
    return { ...card, id: idx, matched: false };
  };

  // Handle a choice
  const handleChoice = card => {
    // console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      //prevents user from clicking multiple cards too quickly
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        console.log(`They match!`);
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        // console.log(`They DO NOT match: c1: ${choiceOne.src} c2: ${choiceTwo}`);
        // resetTurn();
        // console.log(`They DO NOT match`);
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  console.log(cards);

  const resetTurn = () => {
    console.log('=== RESET ===');
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  function getRandomId(max) {
    return Math.floor(Math.random() * max);
  }

  const getRandomPokemon = () => {
    const res = [];

    for (let i = 0; i < 6; i++) {
      let id = getRandomId(1015);
      let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
      // let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
      res.push({ src: url });
    }
    return res;
  };

  // console.log(cards, turns);
  // console.log('Choice One: ', choiceOne);
  // console.log('Choice Two: ', choiceTwo);

  // Start the game automatically
  // useEffect(() => {
  //   shuffleCards();
  // }, []);

  return (
    <>
      <div
        className="background"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* <h1>Poke-Memory</h1> */}
        <Logo></Logo>
        {/* <button onClick={shuffleCards}>New Game</button> */}
        <button onClick={shuffleCards}>
          <img src={ng} alt="button" />
        </button>
        {/* <NewGameBtn onClick={shuffleCards}></NewGameBtn> */}
        <div className="card-grid">
          {cards.map(card => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <div>
          {/* <img className="turns" src={turnImg} alt="button" /> {turns} */}
        </div>
      </div>
    </>
  );
}

export default PokeFlipPage;
