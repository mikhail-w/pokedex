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
import FlavorText from './FlavorText';
import PokemonTabs from './PokemonTabs';
import { modalIcons } from '../../icons';
import { CgPokemon } from 'react-icons/cg';
import '../../assets/styles/pokeDetail.css';
import EvolutionChain from './EvolutionChain';
import { FaArrowLeftLong } from 'react-icons/fa6';
import {
  IoArrowForwardCircleOutline,
  IoArrowDownCircleOutline,
} from 'react-icons/io5';
import ball from '../../assets/images/pokeballs/pokeball.png';

function ModalContainer({
  card,
  name,
  id,
  src,
  type,
  onClose,
  onExpand,
  isExpanded,
  evoNames,
  pokeInfo,
  flavorTextArray,
  backgroundColor,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ModalContent
      w={'90%'}
      className={
        isExpanded
          ? isMobile
            ? 'modal-content extended-column'
            : 'modal-content extended-row'
          : 'modal-content'
      }
      background={`linear-gradient(in lch, ${backgroundColor[0]}, ${backgroundColor[1]})`}
      alignItems={'center'}
      borderRadius={'50px'}
      overflow={'hidden'}
      maxHeight={isMobile ? '90vh' : 'fit-content'}
      flexDirection={isMobile ? 'column' : 'row'}
    >
      {/* NORMAL SECTION */}
      <Box w="100%" maxWidth={'450px'} marginTop={'10px'}>
        {/* BACK ARROW AND POKEBALL LOGO */}
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
          <CgPokemon size="1.8rem" />
        </Flex>
        {/* MODAL HEADER SECTION */}
        <ModalHeader textTransform="capitalize" w="100%" textAlign="center">
          {/* NAME AND ID SECTION */}
          <Flex justifyContent="space-between" marginBottom="10px">
            <Text
              className="modal-title"
              fontSize={isMobile ? '1.5rem' : '2rem'}
            >
              {name}
            </Text>
            <Text fontSize={isMobile ? '1rem' : '1.5rem'}>
              #{String(id).padStart(3, '0')}
            </Text>
          </Flex>
          {/* POKEMON TYPE SECTION */}
          <Flex justifyContent="left" flexWrap="wrap">
            {type.map((t, index) => (
              <Flex
                key={index}
                className="pokeDetail-type-tab"
                bg={colors[t]}
                marginLeft={index === 0 ? '0px' : '10px'}
                alignItems="center"
                padding="5px"
                borderRadius="8px"
              >
                <Image w="20px" h="20px" src={modalIcons[t]} />
                <Text paddingLeft="5px">{t}</Text>
              </Flex>
            ))}
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
            src={src == null ? ball : src}
            maxW={{ base: '200px', md: '300px' }}
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
      <Box>
        {isExpanded && (
          <Flex
            className="extended-section"
            height={'700px'}
            overflowY="auto"
            flexDirection="column"
            w="100%"
          >
            <FlavorText flavorTextArray={flavorTextArray} />
            <EvolutionChain evoNames={evoNames} />
          </Flex>
        )}
      </Box>
    </ModalContent>
  );
}

export default ModalContainer;
