import { Flex, Image, Center } from '@chakra-ui/react';

function CardBack({
  src2,
  type,
  handleFlip,
  onFlip,
  handleMouseEnter,
  handleMouseLeave,
  hovered,
  fallbackImage, // Pass a fallback image, like the ball
}) {
  let finalColor = [];
  return (
    <Center
      className={hovered ? `card pokemonCard ${type[0]}` : 'card'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      background={`linear-gradient(${finalColor[0]}, ${finalColor[1]})`}
      justifyContent="center"
      alignItems="center"
    >
      <Image
        className="back-image"
        onClick={() => {
          handleMouseEnter();
          onFlip();
        }}
        maxH="200px"
        src={src2 == null ? fallbackImage : src2}
      />
    </Center>
  );
}

export default CardBack;
