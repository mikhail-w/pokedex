import CardBack from './CardBack';
import CardFront from './CardFront';
import { motion } from 'framer-motion';
import ReactCardFlip from 'react-card-flip';
import '../../assets/styles/PokemonCard.css';
import ModalContainer from './ModalContainer';
import { useState, useCallback } from 'react';
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

  return (
    <motion.div
      initial={{ y: -250 }}
      animate={{ y: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ ease: 'linear', duration: 0.5 }}
      layout
    >
      <Box className="card-container">
        {/* Modal for detailed Pokémon information */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          motionPreset="slideInBottom"
          scrollBehavior="inside"
          size="md"
        >
          <ModalOverlay
            bgColor={`${bgs[`${type[0]}`]}`}
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />

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
          />
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
