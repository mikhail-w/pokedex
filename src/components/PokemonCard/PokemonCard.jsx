import CardBack from './CardBack';
import CardFront from './CardFront';
import { motion } from 'framer-motion';
import ReactCardFlip from 'react-card-flip';
import '../../assets/styles/PokemonCard.css';
import ModalContainer from './ModalContainer';
import { useState, useCallback, useEffect, useRef } from 'react';
import { bgs, getBackgroundColors } from '../../utils';
import { usePokemonData } from '../../hooks/usePokemonData';
import ball from '../../assets/images/pokeballs/pokeball.png';
import { Box, Modal, ModalOverlay, useDisclosure } from '@chakra-ui/react';

function PokemonCard({ card, src, src2, name, type, id }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const backgroundColor = getBackgroundColors(type);

  const { pokeInfo, flavorTextArray, evoNames, fetchPokemonData } =
    usePokemonData();

  // Flip card handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleFlip = useCallback(() => setIsFlipped(prev => !prev), []);
  const handleExpand = useCallback(() => setIsExpanded(prev => !prev), []);
  // console.log('Flavor Card:', flavorTextArray);
  const timerId = useRef(null);
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
      clearTimeout(timerId.current);
    };
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <Box className="card-container">
        {/* Modal for detailed Pokémon information */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          motionPreset="none"
          scrollBehavior="inside"
          size="md"
        >
          <ModalOverlay
            bgColor={`${bgs[`${type[0]}`]}`}
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <ModalContainer
              card={card}
              name={name}
              id={id}
              src={src || ball}
              type={type}
              onClose={onClose}
              onExpand={handleExpand}
              isExpanded={isExpanded}
              pokeInfo={pokeInfo}
              flavorTextArray={flavorTextArray}
              evoNames={evoNames}
              backgroundColor={backgroundColor}
              isMobileLandscape={isMobileLandscape}
            />
          </motion.div>
        </Modal>
        {/* Card Front and Back */}

        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
          <CardFront
            src={src || ball}
            name={name}
            id={id}
            type={type}
            onFlip={handleFlip}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleClick={() => fetchPokemonData(id)}
            onOpenModal={onOpen}
            backgroundColor={backgroundColor}
          />

          <CardBack
            src2={src2}
            type={type}
            onFlip={handleFlip}
            onHover={handleMouseEnter}
            offHover={handleMouseLeave}
            isHovered={isHovered}
            backgroundColor={backgroundColor}
          />
        </ReactCardFlip>
      </Box>
    </motion.div>
  );
}

export default PokemonCard;
