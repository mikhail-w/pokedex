import '../assets/styles/PokeFlipPage.css';
import { useState, useEffect } from 'react';
import ng from '../assets/images/flip/ng.png';
import Logo from '../components/flipCard/Logo';
import SingleCard from '../components/flipCard/SingleCard';
import { Box, Image, Flex, useColorMode } from '@chakra-ui/react';
import background from '../assets/images/flip/background4.png';
import background2 from '../assets/images/flip/background14.png';

function PokeFlipPage() {
  const { colorMode } = useColorMode();
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

    for (let i = 0; i < 8; i++) {
      const id = Math.floor(Math.random() * totalPokemon) + 1;
      const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
      res.push({ src: url });
    }
    return res;
  };

  // Dynamic background based on color mode
  const backgroundImage =
    colorMode === 'light' ? `url(${background})` : `url(${background2})`;

  return (
    <Flex
      className="background"
      sx={{
        backgroundImage,
        display: 'flex',
        flexDirection: 'column',
        height: '93vh',
        overflow: 'auto',
        justifyContent: 'start',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Flex flexDirection={'column'} alignItems={'center'}>
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
