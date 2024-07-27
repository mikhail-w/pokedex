import { Center } from '@chakra-ui/react';
import BackButton from '../components/BackButton';
function MyTeamPage() {
  console.log('-------- On Team Page');
  return (
    <>
      <Center marginTop={'30px'} fontSize={'2rem'}>
        My Team Page
      </Center>
      <BackButton />
    </>
  );
}

export default MyTeamPage;
