import { useState, useEffect } from 'react';
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
import '../../assets/styles/pokeDetail.css';
import '../../assets/styles/pokemonCardStyles.css';

function PokemonCard({ card, src, src2, name, type, id }) {
  const { team, myTeam, setMyTeam, disabled, setDisabled } = useOutletContext();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { pokeInfo, flavorText, evoNames, loading } = usePokemonInfo(card.id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleFlip = () => setIsFlipped(!isFlipped);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleExpand = () => setIsExpanded(prev => !prev);

  useEffect(() => {
    if (myTeam.length === 6) {
      if (isInTeam(myTeam, card)) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      setDisabled(false);
    }
  }, [myTeam]);

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
      <Box className="top-container">
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
            // background={`linear-gradient(${finalColor[0]}, ${finalColor[1]})`}
            alignItems="center"
            justifyContent="left"
            borderRadius="50px"
            overflow="hidden"
            maxHeight="740px"
            flexDirection="row"
          >
            {loading ? (
              <Box>Loading...</Box>
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
                // finalColor={finalColor}
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
            onHover={handleMouseEnter}
            offHover={handleMouseLeave}
            onOpenModal={onOpen}
          >
            {/* Catch/Release Button */}
            <Tooltip
              label={isInTeam(myTeam, card) ? 'Release' : 'Catch'}
              placement="top"
              fontSize="lg"
              hasArrow
              bg={isInTeam(myTeam, card) ? '#e53e3e' : '#3d7dca'}
            >
              <Box
                className={`catch-ball ${
                  isInTeam(myTeam, card) ? 'release' : 'catch'
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
                      isInTeam(myTeam, card)
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
                        isInTeam(myTeam, card)
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
          />
        </ReactCardFlip>
      </Box>
    </motion.div>
  );
}

export default PokemonCard;
