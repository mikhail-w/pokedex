import '../assets/styles/PokeFlipPage.css';
import { useState, useEffect } from 'react';
import ng from '../assets/images/flip/ng.png';
import winImg from '../assets/images/flip/win.png';
import Logo from '../components/flipCard/Logo';
import SingleCard from '../components/flipCard/SingleCard';
import {
  Box,
  Image,
  Flex,
  useColorMode,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';
import background from '../assets/images/flip/background4.png';
import background2 from '../assets/images/flip/background14.png';

const modeConfig = {
  easy: { pairs: 6, columns: 4 },
  medium: { pairs: 8, columns: 4 },
  hard: { pairs: 12, columns: 6 }, // Desktop: 6 columns, Mobile will be overridden.
};

function PokeFlipPage() {
  const { colorMode } = useColorMode();

  // Set default mode to "medium"
  const [mode, setMode] = useState('medium');
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0); // Counts moves (or turns)
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Shuffle cards and start a new game based on the current mode.
  // Also reset the move counter and modal.
  const shuffleCards = () => {
    const pokemonImages = getRandomPokemon(modeConfig[mode].pairs);

    const shuffledCards = [...pokemonImages, ...pokemonImages]
      .sort(() => Math.random() - 0.5)
      .map((card, idx) => ({ ...card, id: idx, matched: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setIsModalOpen(false);
  };

  // Handle card selection with a guard against double-clicking the same card.
  const handleChoice = card => {
    if (disabled || (choiceOne && card.id === choiceOne.id)) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare selected cards.
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

  // Reset choices after a turn and increment the move counter.
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  // Generate random Pokémon images based on the number of pairs needed.
  const getRandomPokemon = numPairs => {
    const res = [];
    const totalPokemon = 1015;

    for (let i = 0; i < numPairs; i++) {
      const id = Math.floor(Math.random() * totalPokemon) + 1;
      const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
      res.push({ src: url });
    }
    return res;
  };

  // Dynamic background based on color mode.
  const backgroundImage =
    colorMode === 'light' ? `url(${background})` : `url(${background2})`;

  // Reshuffle cards automatically when the mode changes.
  useEffect(() => {
    shuffleCards();
  }, [mode]);

  // Check if all cards have been matched and open the modal if so.
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setIsModalOpen(true);
    }
  }, [cards]);

  const gridTemplateColumns =
    mode === 'hard'
      ? { base: 'repeat(4, 1fr)', md: 'repeat(6, 1fr)' }
      : `repeat(${modeConfig[mode].columns}, 1fr)`;

  return (
    <>
      <Flex
        className="background"
        sx={{
          backgroundImage,
          display: 'flex',
          flexDirection: 'column',
          height: '93vh',
          overflow: 'auto', // Allows scrolling when content is too tall
          justifyContent: 'start',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Flex flexDirection="column" alignItems="center">
          <Logo />

          {/* Mode selection buttons */}
          <Flex gap="20px" mt="20px">
            <Button
              outline={
                mode === 'easy' ? '4px solid #ffcc01' : '4px solid #3760aa'
              }
              backgroundColor={mode === 'easy' ? '#3760aa' : '#eeeeee'}
              color={mode === 'easy' ? '#ffcc01' : '#3760aa'}
              onClick={() => setMode('easy')}
              _hover={{
                backgroundColor: mode === 'easy' ? '#cc3f3f' : '#cc3f3f',
                color: 'white',
              }}
            >
              Easy
            </Button>
            <Button
              outline={
                mode === 'medium' ? '4px solid #ffcc01' : '4px solid #3760aa'
              }
              backgroundColor={mode === 'medium' ? '#3760aa' : '#eeeeee'}
              color={mode === 'medium' ? '#ffcc01' : '#3760aa'}
              onClick={() => setMode('medium')}
              _hover={{
                backgroundColor: mode === 'medium' ? '#cc3f3f' : '#cc3f3f',
                color: 'white',
              }}
            >
              Medium
            </Button>
            <Button
              outline={
                mode === 'hard' ? '4px solid #ffcc01' : '4px solid #3760aa'
              }
              backgroundColor={mode === 'hard' ? '#3760aa' : '#eeeeee'}
              color={mode === 'hard' ? '#ffcc01' : '#3760aa'}
              onClick={() => setMode('hard')}
              _hover={{
                backgroundColor: mode === 'hard' ? '#cc3f3f' : '#cc3f3f',
                color: 'white',
              }}
            >
              Hard
            </Button>
          </Flex>

          <Box
            marginTop="10px"
            className="newgame"
            height="50px"
            onClick={shuffleCards}
          >
            <Image
              display="fixed"
              top="100px"
              height="100%"
              src={ng}
              alt="New Game"
            />
          </Box>
        </Flex>

        {/* Card grid container */}
        <Box
          className="card-grid"
          maxWidth="90%"
          margin="0 auto"
          display="grid"
          marginTop="30px"
          gridTemplateColumns={gridTemplateColumns}
          gap="10px"
          overflowY="auto"
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

      {/* Pokémon-themed Modal for game completion */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isCentered
        size="lg"
      >
        <ModalOverlay />
        <ModalContent
          bg="#f39b2d"
          borderRadius="xl"
          border="4px solid #000"
          boxShadow="2xl"
        >
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" align="center" justify="center">
              <Image src={winImg} alt="You Win!" mb={4} />
              <Text
                textAlign="center"
                fontFamily="'Pokemon Solid', sans-serif"
                fontSize="xl"
                fontWeight="bold"
                letterSpacing={2}
              >
                You completed the game in {turns} moves!
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              onClick={() => {
                setIsModalOpen(false);
                shuffleCards();
              }}
              colorScheme="blue"
              letterSpacing={4}
              fontFamily="'Pokemon Solid', sans-serif"
            >
              New Game
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PokeFlipPage;
