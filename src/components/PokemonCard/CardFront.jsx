import {
  Flex,
  Image,
  Text,
  Tooltip,
  Box,
  Center,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TbPokeballOff } from 'react-icons/tb';
import { isInTeam, catchPokemon, releasePokemon, colors } from '../../utils';
import info from '../../assets/images/type_icons/i.svg';
import { typeIcons } from '../../icons';
import catch01 from '../../assets/images/pokeballs/catch1_100.png';
import catch02 from '../../assets/images/pokeballs/catch2_100.png';

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
  handleCatchPokemon,
  handleReleasePokemon,
  backgroundColor,
}) {
  const [hovered, setHovered] = useState(false);
  const toast = useToast();
  return (
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
      // border={'6px solid'}
    >
      <Flex
        className="card__content"
        flexDirection="column"
        justifyContent="center"
        background={`linear-gradient(in lch, ${backgroundColor[0]}, ${backgroundColor[1]})`}
      >
        <Flex
          className="card__header"
          justifyContent="space-between"
          alignItems="center"
        >
          <Tooltip
            label={`${disabled ? 'disabled' : isCaught ? 'release' : 'catch'}`}
            placement="top"
            fontSize="lg"
            hasArrow
            arrowSize={15}
            color={'white'}
            bg={`${disabled ? 'gray' : isCaught ? '#e53e3e' : '#3d7dca'}`}
          >
            <Box
              className={`catch-ball ${isCaught ? 'release' : 'catch'}`}
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
                >
                  <Image
                    w={'100%'}
                    src={isCaught ? catch02 : catch01}
                    onClick={() => {
                      isCaught
                        ? (toast({
                            title: 'Pokemon Released',
                            description: `You just removed ${name} from your team.`,
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                            position: 'bottom-right',
                          }),
                          handleReleasePokemon())
                        : (toast({
                            title: 'Pokemon Caught',
                            description: `You just added ${name} to your team.`,
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                            position: 'bottom-right',
                          }),
                          handleCatchPokemon());
                    }}
                  />
                </motion.div>
              )}
            </Box>
          </Tooltip>

          <Box>
            <Text
              marginLeft="auto"
              marginRight="auto"
              className="poke__number"
              color="gray.700"
            >
              #{String(id).padStart(3, '0')}
            </Text>
          </Box>

          {/* Info Icon */}
          <Box>
            <motion.div
              className="catch-ball"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{
                scale: 1.2,
                rotate: 180,
                borderRadius: '100%',
              }}
            >
              <Tooltip
                label="Info"
                placement="top"
                fontSize="lg"
                hasArrow
                arrowSize={20}
                color="black"
                bg="#ebeef5"
              >
                <Image
                  className="info__icon"
                  src={info}
                  onClick={onOpenModal}
                />
              </Tooltip>
            </motion.div>
          </Box>
        </Flex>

        <Center className="card__image-container">
          <Image
            className="card-image"
            onClick={onFlip}
            src={src || '/images/default.png'}
          />
        </Center>

        <Center
          whiteSpace="nowrap"
          className="pokemonName"
          width="182px"
          height="26px"
        >
          <Text
            fontSize="clamp(10px, 1rem, 13px)"
            wordBreak="break-word"
            lineHeight="26px"
          >
            {name}
          </Text>
        </Center>

        {/* Pokémon Type */}
        <Center className="tip" padding="10px" marginBottom="10px" gap="10px">
          <Tooltip
            label={type[0]}
            placement="bottom"
            textTransform="uppercase"
            fontSize="sm"
            color="black"
            hasArrow
            arrowSize={15}
            bg={colors[type[0]]}
          >
            <Image
              className="type-icon"
              width="40px"
              height="40px"
              src={typeIcons[type[0]]}
            />
          </Tooltip>
          {type[1] && (
            <Tooltip
              label={type[1]}
              textTransform="uppercase"
              placement="bottom"
              fontSize="sm"
              color="black"
              hasArrow
              arrowSize={15}
              bg={colors[type[1]]}
            >
              <Image
                className="type-icon"
                width="40px"
                height="40px"
                src={typeIcons[type[1]]}
              />
            </Tooltip>
          )}
        </Center>
      </Flex>
    </Flex>
  );
}

export default CardFront;
