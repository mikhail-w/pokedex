import { Tooltip, Image } from '@chakra-ui/react';

function TooltipIcon({ icon, label, onClick }) {
  return (
    <Tooltip label={label} hasArrow>
      <Image src={icon} onClick={onClick} />
    </Tooltip>
  );
}

export default TooltipIcon;
