import { Flex, Image, Center } from '@chakra-ui/react';

function CardBack({
  src2,
  type,
  handleFlip,
  onFlip,
  handleMouseEnter,
  handleMouseLeave,
  hovered,
  fallbackImage,
}) {
  // Default gradient colors if not provided
  const defaultGradient = ['#e0e0e0', '#ffffff'];
  const finalColor = type?.length
    ? [`var(--${type[0]}-start)`, `var(--${type[0]}-end)`] // Ensure type colors are used dynamically
    : defaultGradient;

  return (
    <Center
      className={hovered ? `card pokemonCard ${type[0]}` : 'card'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      background={`linear-gradient(${finalColor[0]}, ${finalColor[1]})`}
      justifyContent="center"
      alignItems="center"
      role="button" // Accessibility: Adds button role
      aria-label="Flip back to front" // Accessibility: Describes the action
      cursor="pointer" // Adds a pointer cursor for better UX
    >
      <Image
        className="back-image"
        onClick={onFlip}
        maxH="200px"
        src={src2 || fallbackImage} // Simplified null check for fallback
        alt="Pokemon card back" // Accessibility: Provides alt text for the image
      />
    </Center>
  );
}

export default CardBack;
