import { Image, Center } from '@chakra-ui/react';
import { useState } from 'react';
import fallbackImage from '../../assets/images/pokeballs/pokeball.png';

function CardBack({
  src2,
  type,
  handleFlip,
  onFlip,
  handleMouseEnter,
  handleMouseLeave,
  isHovered,
  backgroundColor,
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Center
      className={hovered ? ` pokemonCard ${type[0]}` : 'pokemonCard'}
      onMouseEnter={() => {
        handleMouseEnter;
        setHovered(true);
      }}
      onMouseLeave={() => {
        handleMouseLeave;
        setHovered(false);
      }}
      background={`linear-gradient(in lch, ${backgroundColor[0]}, ${backgroundColor[1]})`}
      justifyContent="center"
      alignItems="center"
      role="button"
      aria-label="Flip 'back to front'"
      cursor="pointer"
      // border={'2px solid'}
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
