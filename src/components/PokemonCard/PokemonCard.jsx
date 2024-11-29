import CardBack from './CardBack';
import CardFront from './CardFront';
import { motion } from 'framer-motion';
import {
  getPokemonSpecies,
  getEvolutionChain,
} from '../../services/pokemonService';
import ReactCardFlip from 'react-card-flip';
import '../../assets/styles/PokemonCard.css';
import ModalContainer from './ModalContainer';
import { useState, useCallback } from 'react';
import { bgs, getBackgroundColors } from '../../utils';
import { Box, Modal, ModalOverlay, useDisclosure } from '@chakra-ui/react';

function PokemonCard({ card, src, src2, name, type, id }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentCardInfo = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

  // Determine background color based on Pokémon type
  const backgroundColor = getBackgroundColors(type);

  // Flip card handlers
  const handleFlip = useCallback(() => setIsFlipped(prev => !prev), []);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleExpand = useCallback(() => setIsExpanded(prev => !prev), []);
  const [flavorTextArray, setFlavorText] = useState([]);
  const [evoNames, setEvoNames] = useState([]);
  const [pokeInfo, setPokeInfo] = useState([]);

  // console.log('POKE INFO:', pokeInfo);
  // console.log('CARD: ', card);

  const handleClick = async () => {
    try {
      const speciesData = await getPokemonSpecies(currentCardInfo);
      setPokeInfo(speciesData);
      setFlavorText(speciesData.flavor_text_entries);

      const evolutionData = await getEvolutionChain(
        speciesData.evolution_chain.url
      );

      let evoChain = [];
      let evoData = evolutionData.chain;
      const numberPattern = /\d+/g;

      do {
        const evoDetails = evoData.evolution_details[0] || {};

        evoChain.push({
          species_name: evoData.species.name,
          id: evoData.species.url.slice(-4).match(numberPattern)[0],
          min_level: evoDetails.min_level || 1,
          trigger_name: evoDetails.trigger?.name || null,
          item: evoDetails.item || null,
        });

        evoData = evoData.evolves_to[0];
      } while (evoData);

      const evoNamesArray = evoChain.map(({ species_name, id }) => [
        species_name,
        id,
      ]);
      setEvoNames(evoNamesArray);
    } catch (error) {
      console.error('Error in handleClick:', error);
    }
  };
  return (
    <motion.div
      initial={{ y: -250 }}
      animate={{ y: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ ease: 'linear', duration: 0.5 }}
      layout
    >
      <Box className="card-container">
        {/* Modal for detailed Pokémon information */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          motionPreset="slideInBottom"
          scrollBehavior="inside"
          size="md"
        >
          <ModalOverlay
            bgColor={`${bgs[`${type[0]}`]}`}
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />

          <ModalContainer
            card={card}
            name={name}
            id={id}
            src={src}
            type={type}
            onClose={onClose}
            onExpand={handleExpand}
            isExpanded={isExpanded}
            pokeInfo={pokeInfo}
            flavorTextArray={flavorTextArray}
            evoNames={evoNames}
            backgroundColor={backgroundColor}
          />
        </Modal>

        {/* Card Front and Back */}
        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
          {/* Card Front */}
          <CardFront
            src={src}
            name={name}
            id={id}
            type={type}
            onFlip={handleFlip}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleClick={handleClick}
            onOpenModal={onOpen}
            backgroundColor={backgroundColor}
          ></CardFront>

          {/* Card Back */}
          <CardBack
            src2={src2}
            type={type}
            onFlip={handleFlip}
            onHover={handleMouseEnter}
            offHover={handleMouseLeave}
            isHovered={isHovered}
            backgroundColor={backgroundColor}
          ></CardBack>
        </ReactCardFlip>
      </Box>
    </motion.div>
  );
}

export default PokemonCard;
