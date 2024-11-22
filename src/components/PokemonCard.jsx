'use client';
import {
  Flex,
  Image,
  useColorModeValue,
  Text,
  Box,
  Center,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
  TabList,
  Divider,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import catch01 from '../assets/images/pokeballs/catch1_100.png';
import catch02 from '../assets/images/pokeballs/catch2_100.png';
import { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { CgPokemon } from 'react-icons/cg';
import ball from '../assets/images/pokeballs/pokeball.png';
import ballOutline from '../assets/images/pokeballs/balloutline3.svg';
import info from '../assets/images/type_icons/i.svg';
import { TbPokeballOff } from 'react-icons/tb';
import '../assets/styles/PokemonCard.css';
import '../assets/styles/pokeDetail.css';
import '../assets/styles/pokemonCardStyles.css';
import { typeIcons, modalIcons } from '../icons';
import { isInTeam, catchPokemon, releasePokemon, bgs, colors } from '../utils';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import { useOutletContext } from 'react-router-dom';
import FlavorText from './FlavorText';

function PokemonCard({ card, src, src2, name, type, id }) {
  const { team, myTeam, setMyTeam, disabled, setDisabled } = useOutletContext();
  const idColor = useColorModeValue('black', '#ac4f51');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isFlipped, setIsFlipped] = useState(false);

  const [hovered, setHovered] = useState(false);

  const [isCaught, setIsCaught] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const [evoNames, setEvoNames] = useState([]);

  const toast = useToast();

  const currentCardInfo = `https://pokeapi.co/api/v2/pokemon-species/${card.id}`;

  const [pokeInfo, setPokeInfo] = useState([]);

  const [flavorText, setFlavorText] = useState([]);
  const [textArray, setTextArray] = useState([]);

  // console.log('pokeInfo:', pokeInfo);
  // console.log('Flavor Text: ', pokeInfo.flavor_text_entries);

  const handleExpand = () => {
    // console.log('Expand Handled', isExpanded);
    if (flavorText.length > 0) {
      let newFlavorTexts = flavorText.filter(function (el) {
        return el.language.name == 'en';
      });
      let result = newFlavorTexts.map(a => a.flavor_text);
      let uniq = [...new Set(result)];
      // console.log('Original Length:', result.length);
      // console.log('New Length:', uniq.length);

      setTextArray(uniq);
      // console.log('English Flavor Text:', result);
      // flavorText.map(t => {
      //   console.log(t);
      // });
      // console.log('Flavor Text: ', flavorText[0].flavor_text);
    }
    setIsExpanded(!isExpanded);
  };

  // const [isExpanded, setIsExpanded] = useState(false);

  let [pokeInfoLoading, setPokeInfoLoading] = useState(true);

  // HANDLE CATCH RELEASE

  // console.log(card);

  const handleReleasePokemon = () => {
    // console.log('In handle release');

    let res = releasePokemon(myTeam, card);
    setMyTeam(res);
    // console.log(`---POKEMON ID: ${card.id} REMOVED from myTeam\n`);
    // setIsCaught(false);
  };

  const handleCatchPokemon = () => {
    // console.log('In handle catch');
    setMyTeam(catchPokemon(myTeam, card));
    // console.log(`+++POKEMON ID: ${card.id} ADDED to myTeam\n`);

    // setIsCaught(true);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  function handleClick() {
    setPokeInfoLoading(true);
    axios.get(currentCardInfo).then(res => {
      setPokeInfo(res.data);
      setFlavorText(res.data.flavor_text_entries);
      setPokeInfoLoading(false);
      var evoData = axios.get(res.data.evolution_chain).then(evores => {
        evores.data;
      });
      // console.log('EVOData:', evoData.data);
      // setEvoData(res.data.chain);

      const evoResponse = res.data.evolution_chain;

      console.log('EVO Data:', evoResponse);
      const ev = axios.get(evoResponse.url).then(evr => {
        evr.data;
        console.log('Response:', evr.data.chain.species);

        let evoChain = [];
        let evoData = evr.data.chain;
        let numberPattern = /\d+/g;

        do {
          let evoDetails = evoData['evolution_details'][0];

          evoChain.push({
            species_name: evoData.species.name,
            id: evoData.species.url.slice(-4).match(numberPattern)[0],
            min_level: !evoDetails ? 1 : evoDetails.min_level,
            trigger_name: !evoDetails ? null : evoDetails.trigger.name,
            item: !evoDetails ? null : evoDetails.item,
          });

          evoData = evoData['evolves_to'][0];
          // } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
        } while (
          !!evoData &&
          Object.prototype.hasOwnProperty.call(evoData, 'evolves_to')
        );
        console.log('EVO CHAIN:', evoChain);

        const evNames = [];
        evoChain.forEach(ele => evNames.push([ele.species_name, ele.id]));
        console.log(evNames);
        setEvoNames(evNames);
      });
    });

    onOpen();
    // console.log(card);
    // console.log('Old Info:', pokeInfo);
  }

  function handleMouseEnter() {
    setHovered(true);
  }

  function handleMouseLeave() {
    setHovered(false);
  }

  // CARD BACKGROUND COLOR
  let finalColor;
  if (type.length === 2) {
    finalColor = [colors[`${type[0]}`], colors[`${type[1]}`]];
  } else {
    finalColor = [colors[`${type[0]}`], colors[`${type[0]}`]];
  }

  useEffect(() => {
    // console.log('\n\n------------------------\nUse effect triggered');
    if (myTeam.length == 6) {
      // console.log('Team Length = ', myTeam.length);
      if (isInTeam(myTeam, card)) {
        // console.log('+++ CASE 1 ID:', id, ' in myTeam');
        setIsCaught(true);
        setDisabled(false);
      } else {
        // console.log('--- CASE 2 ID:', id, ' NOT in myTeam');
        setIsCaught(false);
        setDisabled(true);
      }
    } else {
      if (isInTeam(myTeam, card)) {
        // console.log('^^^ CASE 3 ID:', id, ' in myTeam');
        setIsCaught(true);
      } else {
        // console.log('--- CASE 4 ID:', id, ' NOT in myTeam');
        setIsCaught(false);
      }
    }
    return () => {
      // console.log('!-! CleanUp');
      team.map(mem => {
        if (isInTeam(myTeam, mem)) {
          // console.log('******* CLEANUP CASE 1 ID:', mem.id, ' in myTeam');
          if (mem.id == id) {
            // console.log("$$$$$$$$$$$$ ID'S EQUAL $$$$$$$$$$$");
            setIsCaught(true);
            setDisabled(false);
          }
        }
      });
    };
  }, [myTeam]);

  return (
    <>
      {/* MODAL POPUP */}
      {pokeInfoLoading ? (
        ''
      ) : (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          motionPreset="slideInBottom"
          scrollBehavior="inside"
          size="md"
          // animation="true"
        >
          <ModalOverlay
            bgColor={`${bgs[`${type[0]}`]}`}
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />
          <ModalContent
            w={'90%'}
            className={isExpanded ? 'modal-content extended' : 'modal-content'}
            background={` linear-gradient(in lch,${finalColor[0]}, ${finalColor[1]})`}
            alignItems={'center'}
            // justifyContent={'center'}
            justifyContent={'left'}
            borderRadius={'50px'}
            // outline={'2px solid blue'}
            overflow={'hidden'}
            maxHeight={'740px'}
            flexDirection={'row'}
          >
            <Box>
              {/* RETURN ARROW BUTTON AND POKEBALL ICON */}
              <Flex
                // outline={'2px solid red'}
                w={'90%'}
                margin={'60px 30px 30px 30px'}
                justifyContent={'space-between'}
                // alignItems={'center'}
              >
                <FaArrowLeftLong
                  className="modal-return"
                  onClick={onClose}
                  size="1.8rem"
                />
                <CgPokemon size="1.8rem" />
              </Flex>
              {/* POKEMON NAME ID AND TYPE */}
              <ModalHeader
                // outline={'2px solid red'}
                textTransform={'capitalize'}
                // fontSize={'1.8rem'}
                w={'100%'}
              >
                <Flex justifyContent={'space-between'} marginBottom={'20px'}>
                  <Text className="modal-title">{name}</Text>
                  <Text>#{String(id).padStart(3, '0')}</Text>
                </Flex>
                <Flex>
                  {type.length === 2 ? (
                    <>
                      <Flex
                        className="pokeDetail-type-tab"
                        bg={colors[type[0]]}
                        marginLeft={'0px'}
                      >
                        <Image
                          w={'20px'}
                          h={'20px'}
                          src={modalIcons[type[0]]}
                        />
                        <Text paddingLeft={'5px'}>{type[0]}</Text>
                      </Flex>
                      <Flex
                        className="pokeDetail-type-tab"
                        bg={colors[type[1]]}
                      >
                        <Image
                          w={'20px'}
                          h={'20px'}
                          src={modalIcons[type[1]]}
                        />
                        <Text paddingLeft={'5px'}>{type[1]}</Text>
                      </Flex>
                    </>
                  ) : (
                    <Flex
                      className="pokeDetail-type-tab"
                      bg={colors[type[0]]}
                      marginLeft={'0px'}
                    >
                      <Image w={'20px'} h={'20px'} src={modalIcons[type[0]]} />
                      <Text paddingLeft={'5px'}>{type[0]}</Text>
                    </Flex>
                  )}
                </Flex>
              </ModalHeader>
              {/* IMAGE AND ARROW */}
              <Flex
                w={'450px'}
                h={'250px'}
                justifyContent={'center'}
                marginBottom={'20px'}
                // outline={'2px solid red'}
                position={'relative'}
              >
                <Image src={src == null ? ball : src} />

                <IoArrowForwardCircleOutline
                  onClick={handleExpand}
                  size={'4.5em'}
                  className={
                    isExpanded
                      ? 'isExtended extend-modal'
                      : 'extend-modal notExtended'
                  }
                />
              </Flex>
              <Tabs
                className="pokeDetail-info-container"
                isFitted
                variant="soft-rounded"
                colorScheme="green"
                size="sm"
                w={'100%'}
                // outline={'2px solid red'}
              >
                <TabList>
                  <Tab>About</Tab>
                  <Tab>Base Stats</Tab>
                  <Tab>Moves</Tab>
                  <Tab>Sprites</Tab>
                </TabList>
                <Divider />
                <Flex>
                  <Image />
                </Flex>
                <TabPanels>
                  {/* ABOUT TAB */}
                  <TabPanel
                    className="about-container content-stats"
                    overflow={'scroll'}
                  >
                    <Box className="subtitle-container">
                      <p className="subtitle">Base Experience:</p>
                      <p className="description">{card.base_experience}</p>
                    </Box>
                    <Box className="subtitle-container">
                      <p className="subtitle">Height:</p>
                      <p className="description">{card.height}m</p>
                    </Box>
                    <Box className="subtitle-container">
                      <p className="subtitle">Weight:</p>
                      <p className="description">{card.weight}lbs</p>
                    </Box>
                    <Box className="subtitle-container">
                      <p className="subtitle">Growth Rate:</p>
                      <p className="description">{pokeInfo.growth_rate.name}</p>
                    </Box>
                    <Box className="subtitle-container">
                      <p className="subtitle">Capture Rate:</p>
                      <p className="description">{pokeInfo.capture_rate}</p>
                    </Box>
                    <Box className="subtitle-container">
                      <p className="subtitle">Generation:</p>
                      <p className="description">{pokeInfo.generation.name}</p>
                    </Box>
                  </TabPanel>
                  {/* BASE STATS TAB */}
                  <TabPanel className="content-stats">
                    {card.stats.map(stat => (
                      <div
                        key={card.name + stat.stat.name}
                        className="stat-container"
                      >
                        <div className="stat-titles-container">
                          <h3 className="stat-name">{stat.stat.name}</h3>
                          <h3 className="stat-value">{stat.base_stat}</h3>
                        </div>
                        <div className="stat-bar-container">
                          <div className="stat-bar-bg"></div>
                          <div
                            className="stat-bar-parent"
                            style={{
                              width: stat.base_stat + '%',
                              maxWidth: '100%',
                            }}
                          >
                            <div
                              className={`stat-bar-fill ${card.types[0].type.name}`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabPanel>
                  {/* MOVES TAB */}
                  <TabPanel className="content-moves" overflow={'scroll'}>
                    <div>{card.moves[0].move.name}</div>
                    <div>{card.moves[1].move.name}</div>
                    <div>{card.moves[2].move.name}</div>
                    <div>{card.moves[3].move.name}</div>
                  </TabPanel>
                  {/* SPRITES TAB */}
                  <TabPanel className="content-stats">
                    <Flex
                      alignItems={'center'}
                      // outline={'1px solid red'}
                      // marginTop={'20px'}
                    >
                      <Image
                        h={'100%'}
                        w={'90px'}
                        src={
                          card.sprites.back_default == null
                            ? ball
                            : card.sprites.back_default
                        }
                      />
                      <Image
                        h={'100%'}
                        w={'90px'}
                        src={
                          card.sprites.back_shiny == null
                            ? ball
                            : card.sprites.back_shiny
                        }
                      />
                      <Image
                        h={'100%'}
                        w={'90px'}
                        src={
                          card.sprites.front_default == null
                            ? ball
                            : card.sprites.front_default
                        }
                      />
                      <Image
                        h={'100%'}
                        w={'90px'}
                        src={
                          card.sprites.front_shiny == null
                            ? ball
                            : card.sprites.front_shiny
                        }
                      />
                    </Flex>
                  </TabPanel>
                </TabPanels>
              </Tabs>
              {/* </ModalBody> */}
            </Box>
            <Flex
              className="extended-section"
              height={'700px'}
              flexDir={'column'}
              // outline={'1px solid red'}
            >
              <Box className="flavorBoxContainer">
                <FlavorText textArray={textArray} />
              </Box>
              <Center className="evoTitle">Evolution Chain</Center>
              <Flex justifyContent={'space-evenly'}>
                {evoNames.map((p, idx) => (
                  <>
                    <Flex
                      justifyContent={'center'}
                      alignContent={'center'}
                      alignItems={'center'}
                      flexDirection={'column'}
                    >
                      <Flex
                        className="evoImg"
                        flexDirection={'column'}
                        alignItems={'center'}
                      >
                        <Image
                          // outline={'1px solid green'}

                          width={'120px'}
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${p[1]}.png`}
                        />
                        <Text className="pname" key={idx}>
                          {p[0]}
                        </Text>
                      </Flex>
                    </Flex>
                  </>
                ))}
              </Flex>
            </Flex>
          </ModalContent>
        </Modal>
      )}
      {/* <AnimatePresence AnimatePresence mode="wait"> */}
      {true && (
        <motion.div
          initial={{ y: -250 }}
          animate={{ y: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{
            ease: 'linear',
            duration: 0.5,
          }}
          layout
        >
          <Box className="top-container">
            <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
              {/* CARD FRONT */}
              <Flex
                className={hovered ? `card pokemonCard ${type[0]}` : 'card'}
                onMouseEnter={() => {
                  // toggleHover();
                  handleMouseEnter();
                }}
                onMouseLeave={() => {
                  // toggleHover();
                  handleMouseLeave();
                }}
                flexDirection={'column'}
                justifyContent={'center'}
              >
                <Flex
                  className="card__content"
                  flexDirection={'column'}
                  justifyContent={'Center'}
                  background={` linear-gradient(in lch,${finalColor[0]}, ${finalColor[1]})`}
                >
                  <Flex
                    className="card__header"
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Tooltip
                      label={`${
                        disabled ? 'disabled' : isCaught ? 'release' : 'catch'
                      }`}
                      placement="top"
                      fontSize="lg"
                      hasArrow
                      arrowSize={15}
                      color={'white'}
                      bg={`${
                        disabled ? 'gray' : isCaught ? '#e53e3e' : '#3d7dca'
                      }`}
                    >
                      <Box
                        className={`catch-ball ${
                          isCaught ? 'release' : 'catch'
                        }`}
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
                                isInTeam(myTeam, card)
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
                        marginLeft={'auto'}
                        marginRight={'auto'}
                        className="poke__number"
                        color={idColor}
                      >
                        #{String(id).padStart(3, '0')}
                      </Text>
                    </Box>
                    {/* INFO-ICON */}

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
                          label={`Info`}
                          placement="top"
                          fontSize="lg"
                          hasArrow
                          arrowSize={20}
                          color={'black'}
                          bg={`#ebeef5`}
                        >
                          <Image
                            // marginLeft={'auto'}
                            className="info__icon"
                            src={info}
                            onClick={handleClick}
                          />
                        </Tooltip>
                      </motion.div>
                    </Box>
                  </Flex>
                  <Center className="card__image-container">
                    <Image
                      onClick={() => {
                        handleMouseEnter();
                        handleFlip();
                      }}
                      className="card-image"
                      src={src == null ? ball : src}
                    />
                  </Center>

                  <Center
                    whiteSpace="nowrap"
                    className="pokemonName"
                    // border="1px solid"
                    width="182px" // Fixed width
                    height="26px" // Fixed height
                  >
                    <Text
                      fontSize="clamp(13px, 1.5rem, 16px)"
                      wordBreak="break-word"
                      lineHeight="26px"
                      whiteSpace="nowrap"
                    >
                      {name}
                    </Text>
                  </Center>
                  {/* POKEMON TYPE */}
                  <Center padding={'10px'} marginBottom={'10px'} gap={'10px'}>
                    <Tooltip
                      label={type[0]}
                      placement="bottom"
                      fontSize="lg"
                      color={'black'}
                      hasArrow
                      arrowSize={15}
                      bg={colors[type[0]]}
                    >
                      <Image
                        className="type-icon"
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
                        color={'black'}
                        hasArrow
                        arrowSize={15}
                        bg={colors[type[1]]}
                      >
                        <Image
                          className="type-icon"
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
              </Flex>
              {/* CARD BACK */}
              <Center
                // className="card card-back"
                // className={`card card-back pokemonCard ${type[0]}`}
                className={hovered ? `card pokemonCard ${type[0]}` : 'card'}
                onMouseEnter={() => {
                  // toggleHover();
                  handleMouseEnter();
                }}
                onMouseLeave={() => {
                  // toggleHover();
                  handleMouseLeave();
                }}
                background={`linear-gradient(${finalColor[0]}, ${finalColor[1]})`}
              >
                <Image
                  className="back-image"
                  onClick={() => {
                    handleMouseEnter();
                    handleFlip();
                  }}
                  maxH={'200px'}
                  // width={'50%'}
                  src={src2 == null ? ball : src2}
                />
              </Center>
              {/* </Box> */}
            </ReactCardFlip>
          </Box>
        </motion.div>
      )}
      {/* </AnimatePresence> */}
    </>
  );
}

export default PokemonCard;
