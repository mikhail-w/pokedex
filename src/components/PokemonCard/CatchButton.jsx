// components/CatchButton.js
import { motion } from 'framer-motion';
import { TbPokeballOff } from 'react-icons/tb';
import '../../assets/styles/PokemonCard.css';
import { Box, Image, Tooltip } from '@chakra-ui/react';
import { useToastNotification } from '../../hooks/useToastNotification ';
import catch01 from '../../assets/images/pokeballs/catch1_100.png';
import catch02 from '../../assets/images/pokeballs/catch2_100.png';

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
      <Box
        w={'1.6rem'}
        h={'1.6rem'}
        className={`${isPokemonInTeam ? 'release' : 'catch'}`}
      >
        {disabled ? (
          <TbPokeballOff size={30} className="disabled-icon" />
        ) : (
          <motion.div
            whileHover={{ scale: 1.2, rotate: 180 }}
            whileTap={{ scale: 1.2, rotate: 180, borderRadius: '100%' }}
            onClick={handleClick}
          >
            <Image src={isPokemonInTeam ? catch02 : catch01} alt="Catch Ball" />
          </motion.div>
        )}
      </Box>
    </Tooltip>
  );
}

export default CatchButton;
