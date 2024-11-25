import { Box, Flex, Text, ModalHeader, Image, Button } from '@chakra-ui/react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import { CgPokemon } from 'react-icons/cg';
import EvolutionChain from './EvolutionChain';
import ball from '../../assets/images/pokeballs/pokeball.png';
import PokemonTabs from './PokemonTabs';
import { typeIcons, modalIcons } from '../../icons';
import '../../assets/styles/pokeDetail.css';
import { colors } from '../../utils';

function ModalContent({
  card,
  name,
  id,
  src,
  type,
  onClose,
  onExpand,
  isExpanded,
  evoNames,
  flavorText,
}) {
  return (
    <Box>
      <Flex w="90%" margin="60px 30px 30px 30px" justifyContent="space-between">
        <FaArrowLeftLong
          className="modal-return"
          onClick={onClose}
          size="1.8rem"
        />
        <CgPokemon size="1.8rem" />
      </Flex>

      <ModalHeader textTransform="capitalize" w="100%">
        <Flex justifyContent="space-between" marginBottom="20px">
          <Text className="modal-title">{name}</Text>
          <Text>#{String(id).padStart(3, '0')}</Text>
        </Flex>
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
            isExpanded ? 'isExtended extend-modal' : 'extend-modal notExtended'
          }
        />
      </Flex>

      <Box>
        <PokemonTabs card={card} />
      </Box>

      {isExpanded && (
        <EvolutionChain evoNames={evoNames} flavorText={flavorText} />
      )}
    </Box>
  );
}

export default ModalContent;
