import { useState, useEffect, useMemo, useCallback } from 'react';
import { usePokemonInfo } from '../../hooks/usePokemonInfo';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent as ChakraModalContent,
  useDisclosure,
  Tooltip,
  Image,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useOutletContext } from 'react-router-dom';
import CardFront from './CardFront';
import CardBack from './CardBack';
import ModalContent from './ModalContent';
import {
  isInTeam,
  catchPokemon,
  releasePokemon,
  bgs,
  colors,
} from '../../utils';
import { motion } from 'framer-motion';
import ReactCardFlip from 'react-card-flip';
import { TbPokeballOff } from 'react-icons/tb';
import '../../assets/styles/PokemonCard.css';
// import '../../assets/styles/pokeDetail.css';

function PokemonCard({ card, src, src2, name, type, id }) {
  const { team, myTeam, setMyTeam, disabled, setDisabled } = useOutletContext();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { pokeInfo, flavorText, evoNames, loading } = usePokemonInfo(card.id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleFlip = useCallback(() => setIsFlipped(prev => !prev), []);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleExpand = useCallback(() => setIsExpanded(prev => !prev), []);

  const isPokemonInTeam = useMemo(() => isInTeam(myTeam, card), [myTeam, card]);

  // CARD BACKGROUND COLOR
  let backgroundColor;
  if (type.length === 2) {
    backgroundColor = [colors[`${type[0]}`], colors[`${type[1]}`]];
  } else {
    backgroundColor = [colors[`${type[0]}`], colors[`${type[0]}`]];
  }

  useEffect(() => {
    if (myTeam.length === 6) {
      setDisabled(!isPokemonInTeam);
    } else {
      setDisabled(false);
    }
  }, [myTeam, isPokemonInTeam, setDisabled]);
  return (
    <motion.div
      initial={{ y: -250 }}
      animate={{ y: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{
        ease: 'linear',
        duration: 0.5,
      }}
      layout
    >
      <Box className={`card-container `}>
        {/* MODAL */}
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

        {/* CARD FRONT AND BACK */}
        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
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
            <Tooltip
              aria-label={`Tooltip: ${
                isPokemonInTeam ? 'Release' : 'Catch'
              } Pokémon`}
              label={isPokemonInTeam ? 'Release' : 'Catch'}
              placement="top"
              fontSize="lg"
              hasArrow
              bg={isPokemonInTeam ? '#e53e3e' : '#3d7dca'}
            >
              <Box
                className={`catch-ball ${
                  isPokemonInTeam ? 'release' : 'catch'
                }`}
                style={{ width: '1.7em' }}
              >
                {disabled ? (
                  <TbPokeballOff size={30} className="disabled-icon" />
                ) : (
                  <motion.div
                    className="catch-ball"
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    whileTap={{
                      scale: 1.2,
                      rotate: 180,
                      borderRadius: '100%',
                    }}
                    onClick={() => {
                      isPokemonInTeam
                        ? (toast({
                            title: 'Pokemon Released',
                            status: 'error',
                            duration: 3000,
                          }),
                          releasePokemon(myTeam, setMyTeam, card))
                        : (toast({
                            title: 'Pokemon Caught',
                            status: 'success',
                            duration: 3000,
                          }),
                          catchPokemon(myTeam, setMyTeam, card));
                    }}
                  >
                    <Image
                      w="100%"
                      src={
                        isPokemonInTeam
                          ? '/images/release.png'
                          : '/images/catch.png'
                      }
                    />
                  </motion.div>
                )}
              </Box>
            </Tooltip>
          </CardFront>

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
