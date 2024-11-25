import {
  bgs,
  isInTeam,
  catchPokemon,
  releasePokemon,
  getBackgroundColors,
} from '../../utils';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent as ChakraModalContent,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import CardBack from './CardBack';
import CardFront from './CardFront';
import { motion } from 'framer-motion';
import CatchButton from './CatchButton';
import ModalContent from './ModalContent';
import ReactCardFlip from 'react-card-flip';
import '../../assets/styles/PokemonCard.css';
import { useOutletContext } from 'react-router-dom';
import { usePokemonInfo } from '../../hooks/usePokemonInfo';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useToastNotification } from '../../hooks/useToastNotification ';

function PokemonCard({ card, src, src2, name, type, id }) {
  const { showToast } = useToastNotification();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { myTeam, setMyTeam, disabled, setDisabled } = useOutletContext();
  const { pokeInfo, flavorText, evoNames, loading } = usePokemonInfo(card.id);

  // Memoize to check if the Pokémon is in the team
  const isPokemonInTeam = useMemo(() => isInTeam(myTeam, card), [myTeam, card]);

  // Determine background color based on Pokémon type
  const backgroundColor = getBackgroundColors(type);

  // Flip card handlers
  const handleFlip = useCallback(() => setIsFlipped(prev => !prev), []);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleExpand = useCallback(() => setIsExpanded(prev => !prev), []);

  // Disable catch button if the team is full
  useEffect(() => {
    setDisabled(myTeam.length === 6 && !isPokemonInTeam);
  }, [myTeam, isPokemonInTeam, setDisabled]);

  // Catch and Release handlers
  const handleCatch = () => {
    showToast('Pokemon Caught', 'success');
    catchPokemon(myTeam, setMyTeam, card);
  };

  const handleRelease = () => {
    showToast('Pokemon Released', 'error');
    releasePokemon(myTeam, setMyTeam, card);
  };

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
          <ChakraModalContent
            w="90%"
            className={isExpanded ? 'modal-content extended' : 'modal-content'}
            background={`linear-gradient(in lch, ${backgroundColor[0]}, ${backgroundColor[1]})`}
            alignItems="center"
            justifyContent="left"
            borderRadius="50px"
            overflow="hidden"
            maxHeight="740px"
            flexDirection="row"
          >
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Spinner size="xl" color="blue.500" />
              </Box>
            ) : (
              <ModalContent
                card={card}
                name={name}
                id={id}
                src={src}
                type={type}
                onClose={onClose}
                onExpand={handleExpand}
                isExpanded={isExpanded}
                pokeInfo={pokeInfo}
                flavorText={flavorText}
                evoNames={evoNames}
              />
            )}
          </ChakraModalContent>
        </Modal>

        {/* Card Front and Back */}
        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
          {/* Card Front */}
          <CardFront
            src={src}
            name={name}
            id={id}
            type={type}
            onFlip={handleFlip}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            onOpenModal={onOpen}
            backgroundColor={backgroundColor}
          >
            {/* Catch/Release Button */}
            <CatchButton
              isPokemonInTeam={isPokemonInTeam}
              disabled={disabled}
              onCatch={handleCatch}
              onRelease={handleRelease}
            />
          </CardFront>

          {/* Card Back */}
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
