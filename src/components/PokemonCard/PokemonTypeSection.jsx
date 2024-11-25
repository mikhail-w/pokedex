import { typeIcons } from '../../icons';
import { colors } from '../../utils';
import { Center, Tooltip, Image } from '@chakra-ui/react';

const PokemonTypeSection = ({ type }) => {
  return (
    <Center className="tip" padding="10px" marginBottom="10px" gap="10px">
      <Tooltip
        label={type[0]}
        placement="bottom"
        textTransform="uppercase"
        fontSize="sm"
        color="black"
        hasArrow
        arrowSize={15}
        bg={colors[type[0]]}
      >
        <Image
          className="type-icon"
          width="40px"
          height="40px"
          src={typeIcons[type[0]]}
        />
      </Tooltip>
      {type[1] && (
        <Tooltip
          label={type[1]}
          textTransform="uppercase"
          placement="bottom"
          fontSize="sm"
          color="black"
          hasArrow
          arrowSize={15}
          bg={colors[type[1]]}
        >
          <Image
            className="type-icon"
            width="40px"
            height="40px"
            src={typeIcons[type[1]]}
          />
        </Tooltip>
      )}
    </Center>
  );
};

export default PokemonTypeSection;
