import { Image, Center } from '@chakra-ui/react';
import fallbackImage from '../../assets/images/pokeballs/pokeball.png';
import {
  isInTeam,
  catchPokemon,
  releasePokemon,
  bgs,
  colors,
} from '../../utils';

function CardBack({
  src2,
  type,
  handleFlip,
  onFlip,
  handleMouseEnter,
  handleMouseLeave,
  isHovered,
}) {
  // CARD BACKGROUND COLOR
  let finalColor;
  if (type.length === 2) {
    finalColor = [colors[`${type[0]}`], colors[`${type[1]}`]];
  } else {
    finalColor = [colors[`${type[0]}`], colors[`${type[0]}`]];
  }

  // Default gradient colors if not provided
  const defaultGradient = ['#e0e0e0', '#ffffff'];
  // const finalColor = type ? [`${type[0]}`, `${type[0]}`] : defaultGradient;
  console.log('Type:', type);
  console.log('Final Color:', finalColor);
  // console.log('Background:', background);
  return (
    <Center
      className={isHovered ? `card pokemonCard ${type[0]}` : 'card'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      background={`linear-gradient(in lch, ${finalColor[0]}, ${finalColor[1]})`}
      justifyContent="center"
      alignItems="center"
      role="button" // Accessibility: Adds button role
      aria-label="Flip 'back to front'" // Accessibility: Describes the action
      cursor="pointer"
      border={'2px solid'}
    >
      <Image
        className="back-image"
        onClick={onFlip}
        maxH="200px"
        src={src2 || fallbackImage}
        alt="Pokemon card back"
      />
    </Center>
  );
}

export default CardBack;
