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
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
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
  return (
    <ModalContent
      w={'90%'}
      className={isExpanded ? 'modal-content extended' : 'modal-content'}
      background={` linear-gradient(in lch,${backgroundColor[0]}, ${backgroundColor[1]})`}
      alignItems={'center'}
      // justifyContent={'center'}
      justifyContent={'left'}
      borderRadius={'50px'}
      // outline={'2px solid blue'}
      overflow={'hidden'}
      maxHeight={'740px'}
      flexDirection={'row'}
    >
      {/* NORMAL SECTION */}
      <Box>
        {/* BACK ARROW AND POKEBALL LOGO */}
        <Flex
          w="90%"
          margin="60px 30px 30px 30px"
          justifyContent="space-between"
        >
          <FaArrowLeftLong
            className="modal-return"
            onClick={onClose}
            size="1.8rem"
          />
          <CgPokemon size="1.8rem" />
        </Flex>
        {/* MODAL HEADER SECTION */}
        <ModalHeader textTransform="capitalize" w="100%">
          {/* NAME AND ID SECTION*/}
          <Flex justifyContent="space-between" marginBottom="20px">
            <Text className="modal-title">{name}</Text>
            <Text>#{String(id).padStart(3, '0')}</Text>
          </Flex>
          {/* POKEMON TYPE SECTION*/}
          <Flex>
            {type.map((t, index) => (
              <Flex
                key={index}
                className="pokeDetail-type-tab"
                bg={colors[t]}
                marginLeft={index === 0 ? '0px' : '10px'}
              >
                <Image w="20px" h="20px" src={modalIcons[t]} />
                <Text paddingLeft="5px">{t}</Text>
              </Flex>
            ))}
          </Flex>
        </ModalHeader>
        {/* POKEMON IMAGE AND MODAL EXPAND BUTTON SECTION */}
        <Flex
          w="450px"
          h="250px"
          justifyContent="center"
          marginBottom="20px"
          position="relative"
        >
          <Image src={src == null ? ball : src} />
          <IoArrowForwardCircleOutline
            onClick={onExpand}
            size="4.5em"
            className={
              isExpanded
                ? 'isExtended extend-modal'
                : 'extend-modal notExtended'
            }
          />
        </Flex>

        {/* TAB INFO SECTION */}
        <Box>
          <PokemonTabs card={card} />
        </Box>
      </Box>
      {/* EXPANDED SECTION */}
      <Box>
        {/* FLAVOR TEXT AND EVO CHAIN SECTION */}
        {isExpanded && (
          <Flex
            className="extended-section"
            height="700px"
            flexDirection="column"
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
