import React, { useEffect, useState, memo } from 'react';
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
import { FaArrowLeftLong } from 'react-icons/fa6';
import FlavorText from './FlavorText';
import PokemonTabs from './PokemonTabs';
import EvolutionChain from './EvolutionChain';
import CatchReleaseButton from './CatchReleaseButton';
import { colors } from '../../utils';
import { modalIcons } from '../../icons';
import ball from '../../assets/images/pokeballs/pokeball.png';
import '../../assets/styles/PokeDetail.css';

const MOBILE_BREAKPOINT = 900;
const DEFAULT_BACKGROUND = ['#fff', '#f8f9fa'];

const TypeBadge = memo(({ type, index }) => (
  <Flex
    cursor="pointer"
    className="pokeDetail-type-tab"
    bg={colors[type] || 'gray.300'}
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
    <Image w="24px" h="24px" src={modalIcons[type] || ball} />
    <Text
      paddingLeft="8px"
      fontWeight="bold"
      fontSize="14px"
      color="white"
      textShadow="0px 1px 2px rgba(0, 0, 0, 0.8)"
    >
      {type}
    </Text>
  </Flex>
));

const ExpandButton = memo(({ isMobile, isExpanded, onClick }) => {
  const Icon = isMobile
    ? IoArrowDownCircleOutline
    : IoArrowForwardCircleOutline;
  return (
    <Icon
      onClick={onClick}
      size="3em"
      className={
        isExpanded ? 'isExtended extend-modal' : 'extend-modal notExtended'
      }
    />
  );
});

const ModalContainer = ({
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
  backgroundColor = DEFAULT_BACKGROUND,
  isMobileLandscape,
}) => {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= MOBILE_BREAKPOINT
  );
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener('resize', handleResize);

    document.body.style.overflow = isExpanded ? 'hidden' : 'auto';

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'auto';
    };
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        setIsContentVisible(true);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setIsContentVisible(false);
    }
  }, [isExpanded]);

  const handleExpandClick = () => {
    if (isExpanded) {
      setIsContentVisible(false);
      setTimeout(() => {
        onExpand();
      }, 300);
    } else {
      onExpand();
    }
  };

  const getFontSize = (text, isMobileView) => {
    const length = String(text).length;
    return length > 13
      ? isMobileView
        ? '.7rem'
        : '1rem'
      : isMobileView
      ? '1.5rem'
      : '2rem';
  };

  const getIdPosition = (idString, isMobileView) => ({
    left:
      idString.length > 3
        ? isMobileView
          ? '250px'
          : '340px'
        : isMobileView
        ? '220px'
        : '300px',
    top:
      idString.length > 3
        ? isMobileView
          ? '20px'
          : '30px'
        : isMobileView
        ? '10px'
        : '20px',
  });

  const getIdFontSize = (idString, isMobileView) => {
    return idString.length > 3
      ? isMobileView
        ? '1.7rem'
        : '2.5rem'
      : isMobileView
      ? '3rem'
      : '4.5rem';
  };

  return (
    <ModalContent
      w="90%"
      className={
        isExpanded
          ? `modal-content ${isMobile ? 'extended-column' : 'extended-row'}`
          : 'modal-content'
      }
      background={`linear-gradient(in lch, ${backgroundColor[0]}, ${backgroundColor[1]})`}
      alignItems="center"
      borderRadius="50px"
      overflow={isMobileLandscape ? 'scroll' : 'hidden'}
      maxHeight={isMobile ? '80vh' : 'fit-content'}
      flexDirection={isMobile ? 'column' : 'row'}
    >
      <Box w="100%" maxWidth="450px" marginTop="10px">
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

        <ModalHeader textTransform="capitalize" w="100%" textAlign="center">
          <Flex
            position="relative"
            justifyContent="space-between"
            marginBottom="10px"
          >
            <Text
              className="modal-title"
              fontSize={getFontSize(name, isMobile)}
            >
              {name || 'Unknown Pokémon'}
            </Text>
            <Box
              position="absolute"
              {...getIdPosition(String(id), isMobile)}
              className="background-watermark"
            >
              <Text fontSize={getIdFontSize(String(id), isMobile)}>
                #{String(id || '000').padStart(3, '0')}
              </Text>
            </Box>
          </Flex>

          <Flex justifyContent="left" flexWrap="wrap">
            {type.map((t, index) => (
              <TypeBadge key={`${t}-${index}`} type={t} index={index} />
            ))}
          </Flex>
        </ModalHeader>

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
          <ExpandButton
            isMobile={isMobile}
            isExpanded={isExpanded}
            onClick={handleExpandClick}
          />
        </Flex>

        <PokemonTabs card={card} pokeInfo={pokeInfo} />
      </Box>

      <Box
        width="100%"
        height="100%"
        className={isMobile ? 'mobile-extended' : ''}
      >
        <Flex className="extended-section">
          <div
            className={`extended-content ${isContentVisible ? 'visible' : ''}`}
          >
            <FlavorText flavorTextArray={flavorTextArray} onInfo={false} />
            <EvolutionChain evoNames={evoNames} />
          </div>
        </Flex>
      </Box>
    </ModalContent>
  );
};

export default memo(ModalContainer);
