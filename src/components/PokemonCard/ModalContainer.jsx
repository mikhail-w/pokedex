import React, { useEffect, useState } from 'react';
import { colors } from '../../utils';
import {
  Box,
  Flex,
  Text,
  ModalHeader,
  Image,
  ModalContent,
} from '@chakra-ui/react';
import {
  IoArrowForwardCircleOutline,
  IoArrowDownCircleOutline,
} from 'react-icons/io5';
import FlavorText from './FlavorText';
import PokemonTabs from './PokemonTabs';
import { modalIcons } from '../../icons';
// import '../../assets/styles/pokeDetail.css';
import '../../assets/styles/PokeDetail.css';
import EvolutionChain from './EvolutionChain';
import { FaArrowLeftLong } from 'react-icons/fa6';
import CatchReleaseButton from './CatchReleaseButton';
import ball from '../../assets/images/pokeballs/pokeball.png';

function ModalContainer({
  card = {},
  name = '',
  id = '',
  src,
  type = [],
  onClose,
  onExpand,
  isExpanded,
  evoNames = [],
  pokeInfo = {},
  flavorTextArray,
  backgroundColor = ['#fff', '#f8f9fa'],
  isMobileLandscape,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  // Update `isMobile` state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);

    // Prevent background scrolling when modal is open
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'auto';
    };
  }, [isExpanded]);

  return (
    <ModalContent
      w="90%"
      className={
        isExpanded
          ? isMobile
            ? 'modal-content extended-column'
            : 'modal-content extended-row'
          : 'modal-content'
      }
      background={`linear-gradient(in lch, ${backgroundColor[0]}, ${backgroundColor[1]})`}
      alignItems="center"
      borderRadius="50px"
      overflow={isMobileLandscape ? 'scroll' : 'hidden'}
      maxHeight={isMobile ? '80vh' : 'fit-content'}
      flexDirection={isMobile ? 'column' : 'row'}
    >
      {/* NORMAL SECTION */}
      <Box w="100%" maxWidth="450px" marginTop="10px">
        {/* BACK ARROW AND CATCH RELEASE ICON */}
        <Flex
          w="90%"
          margin="20px auto"
          justifyContent="space-between"
          alignItems="center"
        >
          <FaArrowLeftLong
            className="modal-return"
            onClick={onClose}
            size="1.8rem"
          />
          <CatchReleaseButton id={id} name={name} />
        </Flex>
        {/* MODAL HEADER SECTION */}
        <ModalHeader textTransform="capitalize" w="100%" textAlign="center">
          {/* NAME AND ID SECTION */}
          <Flex
            position="relative"
            justifyContent="space-between"
            marginBottom="10px"
          >
            <Text
              className="modal-title"
              fontSize={
                String(name).length > 13
                  ? isMobile
                    ? '.7rem'
                    : '1rem'
                  : isMobile
                  ? '1.5rem'
                  : '2rem'
              }
            >
              {name || 'Unknown Pokémon'}
            </Text>
            <Box
              position="absolute"
              left={
                String(id).length > 3
                  ? isMobile
                    ? '250px'
                    : '340px'
                  : isMobile
                  ? '220px'
                  : '300px'
              }
              top={
                String(id).length > 3
                  ? isMobile
                    ? '20px'
                    : '30px'
                  : isMobile
                  ? '10px'
                  : '20px'
              }
              className="background-watermark"
            >
              <Text
                fontSize={
                  String(id).length > 3
                    ? isMobile
                      ? '1.7rem'
                      : '2.5rem'
                    : isMobile
                    ? '3rem'
                    : '4.5rem'
                }
              >
                #{String(id || '000').padStart(3, '0')}
              </Text>
            </Box>
          </Flex>
          {/* POKEMON TYPE SECTION */}
          <Flex justifyContent="left" flexWrap="wrap">
            {type.length > 0
              ? type.map((t, index) => (
                  <Flex
                    cursor="pointer"
                    key={index}
                    className="pokeDetail-type-tab"
                    bg={colors[t] || 'gray.300'}
                    marginLeft={index === 0 ? '0px' : '10px'}
                    alignItems="center"
                    padding="8px 12px"
                    borderRadius="12px"
                    boxShadow="0 4px 6px rgba(0, 0, 0, 0.2)"
                    transition="transform 0.2s, box-shadow 0.2s"
                    _hover={{
                      transform: 'scale(1.05)',
                      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <Image w="24px" h="24px" src={modalIcons[t] || ball} />
                    <Text
                      paddingLeft="8px"
                      fontWeight="bold"
                      fontSize="14px"
                      color="white"
                      textShadow="0px 1px 2px rgba(0, 0, 0, 0.8)"
                    >
                      {t}
                    </Text>
                  </Flex>
                ))
              : null}
          </Flex>
        </ModalHeader>
        {/* POKEMON IMAGE AND MODAL EXPAND BUTTON SECTION */}
        <Flex
          w="100%"
          justifyContent="center"
          marginBottom="20px"
          position="relative"
        >
          <Image
            src={src || ball}
            maxW={{ base: '200px', md: '300px' }}
            alt={name || 'Pokémon'}
          />
          {isMobile ? (
            <IoArrowDownCircleOutline
              onClick={onExpand}
              size="3em"
              className={
                isExpanded
                  ? 'isExtended extend-modal'
                  : 'extend-modal notExtended'
              }
            />
          ) : (
            <IoArrowForwardCircleOutline
              onClick={onExpand}
              size="3em"
              className={
                isExpanded
                  ? 'isExtended extend-modal'
                  : 'extend-modal notExtended'
              }
            />
          )}
        </Flex>
        {/* TAB INFO SECTION */}
        <PokemonTabs card={card} pokeInfo={pokeInfo} />
      </Box>
      {/* EXPANDED SECTION */}
      <Box
        width={'100%'}
        height={'100%'}
        className={isMobile ? 'mobile-extended' : ''}
      >
        {isExpanded && (
          <Flex
            className="extended-section"
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
          >
            <FlavorText flavorTextArray={flavorTextArray} onInfo={false} />
            <EvolutionChain evoNames={evoNames} />
          </Flex>
        )}
      </Box>
    </ModalContent>
  );
}

export default ModalContainer;
