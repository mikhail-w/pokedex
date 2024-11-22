import { useToast } from '@chakra-ui/react';

function CatchReleaseButton({ isCaught, onCatch, onRelease }) {
  const toast = useToast();

  const handleClick = () => {
    if (isCaught) {
      onRelease();
      toast({ title: 'Released!', status: 'error' });
    } else {
      onCatch();
      toast({ title: 'Caught!', status: 'success' });
    }
  };

  return (
    <button onClick={handleClick}>{isCaught ? 'Release' : 'Catch'}</button>
  );
}

export default CatchReleaseButton;
