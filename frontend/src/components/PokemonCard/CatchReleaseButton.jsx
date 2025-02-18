import { isInTeam } from '../../utils';
import { motion } from 'framer-motion';
import { useState, useMemo, useCallback } from 'react';
import { TbPokeballOff } from 'react-icons/tb';
import { useOutletContext } from 'react-router-dom';
import { Box, Image, Tooltip, useToast } from '@chakra-ui/react';
import backendApiClient from '../../services/backendApiClient';

import catch01 from '../../assets/images/pokeballs/catch1_100.png';
import catch02 from '../../assets/images/pokeballs/catch2_100.png';

function CatchReleaseButton({ id, name }) {
  const { myTeam, setMyTeam } = useOutletContext();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Get authentication token from localStorage
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  // Check if the Pokémon is already in the team
  const isPokemonInTeam = useMemo(() => isInTeam(myTeam, id), [myTeam, id]);

  // Disable button if non-logged in user has reached team limit
  const disabled = useMemo(
    () => !isLoggedIn && myTeam.length >= 6 && !isPokemonInTeam,
    [myTeam, isPokemonInTeam, isLoggedIn]
  );

  const showToast = useCallback(
    (message, status) => {
      toast({
        title: message,
        status: status,
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    },
    [toast]
  );

  // Handle catching/releasing Pokémon
  const handleClick = async () => {
    if (isLoading) return;

    // Check team size limit for non-logged in users
    if (!isLoggedIn && myTeam.length >= 6 && !isPokemonInTeam) {
      showToast('Team limit reached! Log in to add more Pokémon', 'warning');
      return;
    }

    const action = isPokemonInTeam ? 'release' : 'catch';
    setIsLoading(true);

    try {
      if (isLoggedIn) {
        // Verify token exists for logged-in users
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
          showToast('Please log in to manage your team', 'error');
          return;
        }

        // Optimistically update the UI
        const newTeam =
          action === 'catch'
            ? [...myTeam, id]
            : myTeam.filter(pokemonId => pokemonId !== id);
        setMyTeam(newTeam);

        // Make API call to update team on backend
        const data = await backendApiClient.updateUserTeam(
          accessToken,
          id,
          action
        );

        // Verify backend response and update if necessary
        if (data && data.current_team) {
          setMyTeam(data.current_team);
          showToast(
            `Pokémon ${name} ${
              action === 'catch' ? 'caught' : 'released'
            } successfully!`,
            action === 'catch' ? 'success' : 'error'
          );
        }
      } else {
        // Handle team updates for non-authenticated users
        if (action === 'catch' && myTeam.length < 6) {
          setMyTeam(prev => [...prev, id]);
        } else if (action === 'release') {
          setMyTeam(prev => prev.filter(pokemonId => pokemonId !== id));
        }
        showToast(
          `Pokémon ${name} ${
            action === 'catch' ? 'caught' : 'released'
          } successfully!`,
          action === 'catch' ? 'success' : 'error'
        );
      }
    } catch (error) {
      console.error('Team update error:', error);
      // Revert optimistic update on error
      if (isLoggedIn) {
        try {
          const data = await backendApiClient.getUserTeam(token);
          if (data?.current_team) {
            setMyTeam(data.current_team);
          }
        } catch (fetchError) {
          console.error('Failed to fetch current team:', fetchError);
        }
      }

      // Handle authentication errors
      if (error.response?.status === 401) {
        showToast('Your session has expired. Please log in again.', 'error');
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
      } else {
        showToast(`Failed to ${action} Pokémon. Please try again.`, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip
      label={
        disabled
          ? 'Team is full! Log in to add more Pokémon'
          : isPokemonInTeam
          ? 'Release'
          : 'Catch'
      }
      fontSize="lg"
      hasArrow
    >
      <Box
        w="1.6rem"
        h="1.6rem"
        className={`${
          disabled ? 'disabled' : isPokemonInTeam ? 'release' : 'catch'
        } ${isLoading ? 'loading' : ''}`}
        onClick={isLoading ? undefined : handleClick}
        cursor={disabled || isLoading ? 'not-allowed' : 'pointer'}
        opacity={isLoading ? 0.7 : 1}
      >
        {disabled ? (
          <TbPokeballOff size={30} className="disabled-icon" />
        ) : (
          <motion.div
            whileHover={{ scale: 1.2, rotate: 180 }}
            animate={isLoading ? { rotate: 360 } : {}}
            transition={isLoading ? { repeat: Infinity, duration: 1 } : {}}
          >
            <Image src={isPokemonInTeam ? catch02 : catch01} alt="Poké Ball" />
          </motion.div>
        )}
      </Box>
    </Tooltip>
  );
}

export default CatchReleaseButton;
