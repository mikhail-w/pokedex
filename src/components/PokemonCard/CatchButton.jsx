// components/CatchButton.js
import { motion } from 'framer-motion';
import { Box, Image, Tooltip } from '@chakra-ui/react';
import { TbPokeballOff } from 'react-icons/tb';
import { useToastNotification } from '../../hooks/useToastNotification ';

function CatchButton({ isPokemonInTeam, disabled, onCatch, onRelease }) {
  const { showToast } = useToastNotification();

  const handleClick = () => {
    if (isPokemonInTeam) {
      showToast('Pokemon Released', 'error');
      onRelease();
    } else {
      showToast('Pokemon Caught', 'success');
      onCatch();
    }
  };

  return (
    <Tooltip
      aria-label={`Tooltip: ${isPokemonInTeam ? 'Release' : 'Catch'} Pokémon`}
      label={isPokemonInTeam ? 'Release' : 'Catch'}
      placement="top"
      fontSize="lg"
      hasArrow
      bg={isPokemonInTeam ? '#e53e3e' : '#3d7dca'}
    >
      <Box className={`catch-ball ${isPokemonInTeam ? 'release' : 'catch'}`}>
        {disabled ? (
          <TbPokeballOff size={30} className="disabled-icon" />
        ) : (
          <motion.div
            className="catch-ball"
            whileHover={{ scale: 1.2, rotate: 180 }}
            whileTap={{ scale: 1.2, rotate: 180, borderRadius: '100%' }}
            onClick={handleClick}
          >
            <Image
              w="100%"
              src={
                isPokemonInTeam ? '/images/release.png' : '/images/catch.png'
              }
            />
          </motion.div>
        )}
      </Box>
    </Tooltip>
  );
}

export default CatchButton;
