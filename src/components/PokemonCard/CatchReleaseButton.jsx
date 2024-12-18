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
      showToast(
        `Pokemon ${name.charAt(0).toUpperCase() + name.slice(1)} Released`,
        'error'
      );
      const updatedTeam = releasePokemon(myTeam, id);
      setMyTeam(updatedTeam);
    } else {
      if (myTeam.length < 6) {
        showToast(
          `Pokemon ${name.charAt(0).toUpperCase() + name.slice(1)} Caught`,
          'success'
        );
        const updatedTeam = catchPokemon(myTeam, id);
        setMyTeam(updatedTeam);
      } else {
        showToast('Team is full!', 'warning');
      }
    }
  };

  const imageSrc = useMemo(() => {
    return isPokemonInTeam ? catch02 : catch01;
  }, [isPokemonInTeam]);

  const tooltipLabel = useMemo(() => {
    if (disabled) return 'Team is full!';
    return isPokemonInTeam ? 'Release Pokemon' : 'Catch Pokemon';
  }, [disabled, isPokemonInTeam]);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <Tooltip
      label={tooltipLabel}
      placement="top"
      fontSize="lg"
      hasArrow
      bg={disabled ? '#718096' : isPokemonInTeam ? '#e53e3e' : '#3d7dca'}
      isOpen={isTooltipOpen}
    >
      <Box
        w="1.6rem"
        h="1.6rem"
        className={`${
          disabled ? 'disabled' : isPokemonInTeam ? 'release' : 'catch'
        }`}
        onClick={disabled ? undefined : handleClick}
        onMouseEnter={() => setIsTooltipOpen(true)} // Show on hover
        onMouseLeave={() => setIsTooltipOpen(false)} // Hide on hover out
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
