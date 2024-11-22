import { Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import TooltipIcon from '../shared/TooltipIcon';

function CardFront({
  src,
  name,
  id,
  type,
  onFlip,
  onHover,
  offHover,
  onOpenModal,
}) {
  return (
    <Flex
      onMouseEnter={onHover}
      onMouseLeave={offHover}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      className={`card pokemonCard ${type[0]}`}
    >
      <TooltipIcon icon="info" label="More Info" onClick={onOpenModal} />
      <Image src={src} onClick={onFlip} />
      <Text>{name}</Text>
      <Text>#{String(id).padStart(3, '0')}</Text>
    </Flex>
  );
}

export default CardFront;
