import { Box, Tooltip, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import info from '../../assets/images/type_icons/i.svg';

const MotionBox = motion(Box);

function InfoIcon({ onOpenModal }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="33px"
      width="33px"
    >
      <MotionBox
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{
          scale: 1.2,
          rotate: 180,
          borderRadius: '100%',
        }}
      >
        <Tooltip
          label="Info"
          placement="top"
          fontSize="lg"
          hasArrow
          arrowSize={20}
          color="black"
          bg="#ebeef5"
        >
          <Image
            src={info}
            onClick={onOpenModal}
            boxSize="26px" // Adjust the size of the image
          />
        </Tooltip>
      </MotionBox>
    </Box>
  );
}

export default InfoIcon;
