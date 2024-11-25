import { useState } from 'react';
import InfoIcon from './InfoIcon ';
import { motion } from 'framer-motion';
import CatchButton from './CatchButton';
import PokemonTypeSection from './PokemonTypeSection';
import { catchPokemon, releasePokemon } from '../../utils';
import { Flex, Image, Text, Box, Center } from '@chakra-ui/react';
import { useToastNotification } from '../../hooks/useToastNotification ';

function CardFront({
  src,
  name,
  id,
  type,
  onFlip,
  handleMouseEnter,
  handleMouseLeave,
  onOpenModal,
  isCaught,
  disabled,
  isPokemonInTeam,
  handleCatchPokemon,
  handleReleasePokemon,
  backgroundColor,
}) {
  const MotionImage = motion(Image);
  const { showToast } = useToastNotification();
  const [hovered, setHovered] = useState(false);
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
    <>
      {/* FRONT CARD CONTAINER */}
      <Flex
        onMouseEnter={() => {
          handleMouseEnter;
          setHovered(true);
        }}
        onMouseLeave={() => {
          handleMouseLeave;
          setHovered(false);
        }}
        flexDirection="column"
        justifyContent="center"
        className={hovered ? ` pokemonCard ${type[0]}` : 'pokemonCard'}
        position="relative"
        overflow="hidden"
      >
        {/* CARD CONTENT */}
        <Flex
          className="card__content"
          flexDirection="column"
          justifyContent="center"
          background={`linear-gradient(in lch, ${backgroundColor[0]}, ${backgroundColor[1]})`}
        >
          {/* HEADER SECTION */}
          <Flex justifyContent="space-between" alignItems="center" pt="0.5rem">
            {/* Catch/Release Button */}
            <Box>
              <CatchButton
                isPokemonInTeam={isPokemonInTeam}
                disabled={disabled}
                onCatch={handleCatch}
                onRelease={handleRelease}
              />
            </Box>
            {/* Pokémon ID */}
            <Box>
              <Text
                textAlign="center"
                className="poke__number"
                color="gray.700"
              >
                #{String(id).padStart(3, '0')}
              </Text>
            </Box>
            {/* Info Icon */}
            <InfoIcon onOpenModal={onOpenModal} />
          </Flex>

          {/* POKEMON IMAGE */}
          <Center p="15px">
            <MotionImage
              onClick={onFlip}
              src={src || '/images/default.png'}
              whileHover={{ scale: 1.4 }}
              transition={{ duration: 0.3 }}
            />
          </Center>

          {/* POKEMON NAME */}
          <Center whiteSpace="nowrap" width="182px" height="26px">
            <Text
              className="pokemonName"
              fontSize={name.length > 15 ? '10px' : '15px'}
              wordBreak="break-word"
              lineHeight="26px"
            >
              {name}
            </Text>
          </Center>

          {/* Pokémon Type */}
          <PokemonTypeSection type={type} />
        </Flex>
      </Flex>
    </>
  );
}

export default CardFront;
