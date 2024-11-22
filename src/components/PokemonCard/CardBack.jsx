import { Flex, Image } from '@chakra-ui/react';

function CardBack({ src2, type, handleFlip, onHover, offHover }) {
  return (
    <Flex
      className={`card-back ${type[0]}`}
      onMouseEnter={onHover}
      onMouseLeave={offHover}
      justifyContent="center"
      alignItems="center"
    >
      <Image src={src2} onClick={handleFlip} />
    </Flex>
  );
}

export default CardBack;
