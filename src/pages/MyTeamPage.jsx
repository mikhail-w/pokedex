import { Center } from '@chakra-ui/react';
import BackButton from '../components/BackButton';
import { useOutletContext, useNavigate } from 'react-router-dom';
import noCatch from '../assets/images/pokeballs/ball-no-catch.png';
import { Image, Button, Text } from '@chakra-ui/react';
import '../assets/styles/MyTeamPage.css';
import PokemonCard from '../components/PokemonCard/PokemonCard';
import { getType } from '../utils';

function MyTeamPage() {
  const {
    team,
    myTeam,
    setMyTeam,
    disabled,
    setDisabled,
    isCaught,
    setIsCaught,
    isLoading,
    pokemon,
  } = useOutletContext();

  const history = useNavigate();

  // console.log('My TEAM Page: ', myTeam);
  return (
    <>
      <Center marginTop={'20px'}>
        <Text
          marginBottom={'30px'}
          textDecoration="underline"
          textTransform={'capitalize'}
          textUnderlineOffset="8px"
          letterSpacing="5px"
          fontFamily="Pokemon Solid"
          fontSize={'2rem'}
          as="h3"
        >
          My Pokemon Team
        </Text>
      </Center>
      <Center
        padding={'50px'}
        flexWrap={'wrap'}
        gap={'30px'}
        overflow={'scroll'}
        // outline={'1px solid green'}
        margin={'10px '}
        maxHeight={'60vh'}
      >
        {myTeam.length ? (
          myTeam.map((member, idx) =>
            console.log('Member Card:', member)

            // <PokemonCard
            //   key={idx}
            //   index={idx}
            //   card={member.card}
            //   src={member.card.sprites.other[`official-artwork`].front_default}
            //   src2={member.card.sprites.other.showdown.front_default}
            //   name={member.card.name}
            //   pokemon={pokemon}
            //   type={getType(member.card.types)}
            //   id={member.card.id}
            //   isLoading={isLoading}
            //   team={team}
            //   disabled={disabled}
            //   setDisabled={setDisabled}
            //   myTeam={myTeam}
            //   setIsCaught={setIsCaught}
            // />
          )
        ) : (
          <div className="not-caught-message container">
            <Image maxW={'400px'} src={noCatch} />
            <h3>No Pokemon Caught Yet</h3>
          </div>
        )}
      </Center>
      <Center>
        <BackButton />
      </Center>
    </>
  );
}

export default MyTeamPage;
