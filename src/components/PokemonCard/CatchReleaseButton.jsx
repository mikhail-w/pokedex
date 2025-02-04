import { isInTeam, catchPokemon, releasePokemon } from '../../utils';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { TbPokeballOff } from 'react-icons/tb';
import { useOutletContext } from 'react-router-dom';
import { Box, Image, Tooltip } from '@chakra-ui/react';
import catch01 from '../../assets/images/pokeballs/catch1_100.png';
import catch02 from '../../assets/images/pokeballs/catch2_100.png';
import { useToastNotification } from '../../hooks/useToastNotification';

function CatchReleaseButton({ id, name }) {
  const { myTeam, setMyTeam } = useOutletContext();
  const isPokemonInTeam = useMemo(() => isInTeam(myTeam, id), [myTeam, id]);
  const { showToast } = useToastNotification();

  const disabled = useMemo(
    () => myTeam.length === 6 && !isPokemonInTeam,
    [myTeam, isPokemonInTeam]
  );

  const handleClick = () => {
    if (disabled) return;

    if (isPokemonInTeam) {
      showToast(`Pokémon ${name} Released`, 'error');
      setMyTeam(releasePokemon(myTeam, id));
    } else {
      showToast(`Pokémon ${name} Caught`, 'success');
      setMyTeam(catchPokemon(myTeam, id));
    }
  };

  return (
    <Tooltip
      label={disabled ? 'Team is full!' : isPokemonInTeam ? 'Release' : 'Catch'}
      fontSize="lg"
      hasArrow
    >
      <Box
        w="1.6rem"
        h="1.6rem"
        className={`${
          disabled ? 'disabled' : isPokemonInTeam ? 'release' : 'catch'
        }`}
        onClick={!disabled ? handleClick : undefined}
      >
        {disabled ? (
          <TbPokeballOff size={30} className="disabled-icon" />
        ) : (
          <motion.div whileHover={{ scale: 1.2, rotate: 180 }}>
            <Image src={isPokemonInTeam ? catch02 : catch01} alt="Poké Ball" />
          </motion.div>
        )}
      </Box>
    </Tooltip>
  );
}

export default CatchReleaseButton;
