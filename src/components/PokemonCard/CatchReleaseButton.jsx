import { isInTeam, catchPokemon, releasePokemon } from '../../utils';
import { motion } from 'framer-motion';
import { useMemo, useEffect } from 'react';
import { TbPokeballOff } from 'react-icons/tb';
import { useOutletContext } from 'react-router-dom';
import { Box, Image, Tooltip } from '@chakra-ui/react';
import catch01 from '../../assets/images/pokeballs/catch1_100.png';
import catch02 from '../../assets/images/pokeballs/catch2_100.png';
import { useToastNotification } from '../../hooks/useToastNotification';

function CatchReleaseButton({ id }) {
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
      showToast('Pokemon Released', 'error');
      const updatedTeam = releasePokemon(myTeam, id);
      setMyTeam(updatedTeam);
    } else {
      if (myTeam.length < 6) {
        showToast('Pokemon Caught', 'success');
        const updatedTeam = catchPokemon(myTeam, id);
        setMyTeam(updatedTeam);
      } else {
        showToast('Team is full!', 'warning');
      }
    }
  };

  const imageSrc = useMemo(() => {
    if (disabled) return null; // No image in the disabled state
    return isPokemonInTeam ? catch02 : catch01;
  }, [disabled, isPokemonInTeam]);

  const tooltipLabel = useMemo(() => {
    if (disabled) return '';
    return isPokemonInTeam ? 'Release' : 'Catch';
  }, [disabled, isPokemonInTeam]);

  return (
    <Tooltip
      isDisabled={disabled}
      aria-label={`Tooltip: ${tooltipLabel}`}
      label={tooltipLabel}
      placement="top"
      fontSize="lg"
      hasArrow
      bg={isPokemonInTeam ? '#e53e3e' : '#3d7dca'}
    >
      <Box
        w="1.6rem"
        h="1.6rem"
        className={`${
          disabled ? 'disabled' : isPokemonInTeam ? 'release' : 'catch'
        }`}
        onClick={handleClick}
      >
        {disabled ? (
          <TbPokeballOff size={30} className="disabled-icon" />
        ) : (
          <motion.div
            whileHover={!disabled ? { scale: 1.2, rotate: 180 } : {}}
            whileTap={
              !disabled ? { scale: 1.2, rotate: 180, borderRadius: '100%' } : {}
            }
          >
            <Image src={imageSrc} alt="Catch Ball" />
          </motion.div>
        )}
      </Box>
    </Tooltip>
  );
}

export default CatchReleaseButton;
