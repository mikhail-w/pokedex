import { isInTeam, catchPokemon, releasePokemon } from '../../utils';
import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import '../../assets/styles/PokemonCard.css';
import { TbPokeballOff } from 'react-icons/tb';
import { useOutletContext } from 'react-router-dom';
import { Box, Image, Tooltip } from '@chakra-ui/react';
import catch01 from '../../assets/images/pokeballs/catch1_100.png';
import catch02 from '../../assets/images/pokeballs/catch2_100.png';
import { useToastNotification } from '../../hooks/useToastNotification ';

function CatchButton({ id }) {
  const { myTeam, disabled, setDisabled } = useOutletContext();
  // Memoize to check if the Pokémon is in the team
  const isPokemonInTeam = useMemo(() => isInTeam(myTeam, id), [myTeam, id]);
  const { showToast } = useToastNotification();

  const handleClick = () => {
    if (isPokemonInTeam) {
      showToast('Pokemon Released', 'error');
      releasePokemon(myTeam, id);
    } else {
      showToast('Pokemon Caught', 'success');
      catchPokemon(myTeam, id);
    }
  };
  // Disable catch button if the team is full
  useEffect(() => {
    setDisabled(myTeam.length === 6 && !isPokemonInTeam);
  }, [myTeam, isPokemonInTeam, setDisabled]);

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
