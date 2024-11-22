import { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent as ChakraModalContent,
  useDisclosure,
} from '@chakra-ui/react';
import { useOutletContext } from 'react-router-dom';
import CardFront from './CardFront';
import CardBack from './CardBack';
import ModalContent from './ModalContent';
import { motion } from 'framer-motion';
// import '../styles.css';
import '../../assets/styles/PokemonCard.css';
import '../../assets/styles/pokeDetail.css';
import '../../assets/styles/pokemonCardStyles.css';

function PokemonCard({ card, src, src2, name, type, id }) {
  const { team, myTeam, setMyTeam, disabled, setDisabled } = useOutletContext();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFlip = () => setIsFlipped(!isFlipped);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    // Additional logic
  }, [myTeam]);

  return (
    <Box
      // border={'2px solid'}
      className="top-container"
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ChakraModalContent>
          <ModalContent
            card={card}
            name={name}
            id={id}
            type={type}
            onClose={onClose}
          />
        </ChakraModalContent>
      </Modal>
      {isFlipped ? (
        <CardBack
          src2={src2}
          type={type}
          handleFlip={handleFlip}
          onHover={handleMouseEnter}
          offHover={handleMouseLeave}
        />
      ) : (
        <CardFront
          src={src}
          name={name}
          id={id}
          type={type}
          onFlip={handleFlip}
          onHover={handleMouseEnter}
          offHover={handleMouseLeave}
          onOpenModal={onOpen}
        />
      )}
    </Box>
  );
}

export default PokemonCard;
