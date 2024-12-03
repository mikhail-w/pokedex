import { useState, useEffect } from 'react';
import '../assets/styles/PokeFlipPage.css';
import SingleCard from '../components/flipCard/SingleCard';

import ng from '../assets/images/flip/ng.png';
import background from '../assets/images/flip/background2.png';
import Logo from '../components/flipCard/Logo';
import { Box, Center, Image, Flex } from '@chakra-ui/react';

function PokeFlipPage() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle cards and start a new game
  const shuffleCards = () => {
    const pokemonImages = getRandomPokemon();

    const shuffledCards = [...pokemonImages, ...pokemonImages]
      .sort(() => Math.random() - 0.5)
      .map((card, idx) => ({ ...card, id: idx, matched: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle card selection
  const handleChoice = card => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices after a turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  // Generate random Pokémon images
  const getRandomPokemon = () => {
    const res = [];
    const totalPokemon = 1015;

    for (let i = 0; i < 6; i++) {
      const id = Math.floor(Math.random() * totalPokemon) + 1;
      const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
      res.push({ src: url });
    }
    return res;
  };

  return (
    <Flex
      className="background"
      style={{
        backgroundImage: `url(${background})`,
      }}
      display="flex"
      flexDirection="column"
      height="93vh"
      overflow="auto"
      justifyContent={'start'}
    >
      <Flex
        flexDirection={'column'}
        alignItems={'center'}
        // outline={'2px solid'}
      >
        <Logo />

        <Box
          marginTop={'10px'}
          className="newgame"
          height={'50px'}
          onClick={shuffleCards}
        >
          <Image
            display={'fixed'}
            top={'100px'}
            height={'100%'}
            src={ng}
            alt="New Game"
          />
        </Box>
      </Flex>
      <Box
        className="card-grid"
        maxWidth="90%"
        margin="0 auto"
        display="grid"
        marginTop={'30px'}
        gridTemplateColumns={{
          base: 'repeat(4, 1fr)', // 2 columns on small screens
          md: 'repeat(4, 1fr)', // 3 columns on medium screens
          lg: 'repeat(4, 1fr)', // 4 columns on large screens
        }}
        gap="10px"
        // outline={'2px solid green'}
      >
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </Box>
    </Flex>
  );
}

export default PokeFlipPage;
