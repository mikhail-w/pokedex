import axios from 'axios';
import MainPokemonTab from '../components/MainPokemonTab';
import GenerateButton from '../components/GenerateButton';
import { getChoice } from '../utils';
import Loading from './Loading';
import MainPokemonName from './MainPokemonName';
import InfoTab from './InfoTab';
import ball from '../assets/images/pokeballs/pokeball.png';
import { CgPokemon } from 'react-icons/cg';
import { MdGif } from 'react-icons/md';
import { FaInfo } from 'react-icons/fa';
import groupImg from '../assets/images/pokeballs/group.png';
import { useEffect, useState, useRef } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { colors } from '../utils';
import { typeIcons, modalIcons } from '../icons';
import '../assets/styles/PokemonCard.css';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Image,
  Box,
  Flex,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';

function PokemonCard({ card, src, src2, name, handleChoice, index, type, id }) {
  const {
    team,
    setTeam,
    myTeam,
    setMyTeam,
    disabled,
    setDisabled,
    isLoading,
    setIsLoading,
    pokemon,
    setPokemon,
  } = useOutletContext();

  const idColor = useColorModeValue('black', '#ac4f51');

  const [activeCard, setActiveCard] = useState(false);

  let finalColor;

  if (type.length === 2) {
    finalColor = [colors[`${type[0]}`], colors[`${type[1]}`]];
  } else {
    finalColor = [colors[`${type[0]}`], colors[`${type[0]}`]];
  }

  const handleFlip = () => {
    // console.log('Flip handled');
    setActiveCard(!activeCard);
  };

  return (
    <>
      <Box margin={'10px'} onClick={handleFlip} className="card">
        <Box className={`card__inner ${activeCard ? 'is-flipped' : ''}`}>
          <Center
            background={`linear-gradient(${finalColor[0]}, ${finalColor[1]})`}
            className="card__face card__face--front"
          >
            <Image
              className={`image `}
              // maxH={'200px'}
              // width={'50%'}
              src={src2 == null ? ball : src2}
            />
          </Center>
          {/* CARD BACK */}
          <Flex
            className="card__face card__face--back"
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            alignContent={'center'}
            background={`linear-gradient(${finalColor[0]}, ${finalColor[1]})`}
          >
            {/* <Image
              className="info__icon"
              src={info}
              onClick={() => handleChoice(card, index)}
            /> */}
            <Flex
              className="card__content"
              flexDirection={'column'}
              justifyContent={'Center'}
              // outline={'1px solid red'}
            >
              <Text
                className="poke__number"
                color={idColor}
                // outline={'1px solid red'}
              >
                {' '}
                #{String(id).padStart(3, '0')}
              </Text>
              <Center className="card__header">
                <Image
                  // outline={'1px solid red'}
                  className="card-image"
                  src={src == null ? ball : src}
                />
              </Center>
              <Text className="name" color={'black'}>
                {name}
              </Text>
            </Flex>
            {/* POKEMON TYPE */}
            <Center padding={'10px'} marginBottom={'10px'} gap={'10px'}>
              <Tooltip
                label={type[0]}
                placement="bottom"
                fontSize="lg"
                hasArrow
                arrowSize={15}
                bg={colors[type[0]]}
              >
                <Image
                  width={'40px'}
                  height={'40px'}
                  src={typeIcons[type[0]]}
                />
              </Tooltip>
              {type[1] ? (
                <Tooltip
                  label={type[1]}
                  placement="bottom"
                  fontSize="lg"
                  hasArrow
                  arrowSize={15}
                  bg={colors[type[1]]}
                >
                  <Image
                    width={'40px'}
                    height={'40px'}
                    src={typeIcons[type[1]]}
                  />
                </Tooltip>
              ) : (
                ''
              )}
            </Center>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default PokemonCard;
