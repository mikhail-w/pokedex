import { useEffect, useState, useRef } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';
import PokemonCard from '../components/PokemonCard/PokemonCard';
import { Center, Image, Text } from '@chakra-ui/react';
import { getType } from '../utils';
import Loading from '../components/Loading';
import { Link, useNavigate } from 'react-router-dom';
import openBall from '../assets/images/pokeballs/open-ball.png';
import '../assets/styles/PokemonPage.css';

function PokemonPage() {
  const timerId = useRef(null);
  const {
    team,
    myTeam,
    setMyTeam,
    disabled,
    setDisabled,
    isLoading,
    setIsLoading,
    pokemon,
    setPokemon,
    setIsCaught,
  } = useOutletContext();
  const [valid, setValid] = useState(false);
  const { name } = useParams();
  let response;

  const getPokemon = async () => {
    try {
      setIsLoading(true);
      response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      setPokemon(response.data);
      timerId.current = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setValid(true);
    } catch (err) {
      timerId.current = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setValid(false);
      console.error('Error response:');
      console.error(err.response.data); // ***
      console.error(err.response.status); // ***
      console.error(err.response.headers); // ***
    } finally {
      // console.log(response);
    }
  };

  useEffect(() => {
    // console.log('***USE EFFECT TRIGGERED***');
    getPokemon();
  }, [name]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : valid ? (
        <Center marginTop={'150px'} flexDirection={'column'}>
          <PokemonCard
            card={pokemon}
            src={pokemon.sprites.other[`official-artwork`].front_default}
            src2={pokemon.sprites.other.showdown.front_default}
            name={pokemon.name}
            pokemon={pokemon}
            type={getType(pokemon.types)}
            id={pokemon.id}
            isLoading={isLoading}
            team={team}
            disabled={disabled}
            setDisabled={setDisabled}
            myTeam={myTeam}
            setIsCaught={setIsCaught}
          />
          <Center>
            <BackButton />
          </Center>
        </Center>
      ) : (
        <Center flexDirection={'column'} className="not-found" id="root">
          <Image src={openBall} />
          <Text>
            No such pokemon with name or id <span>'{name}'</span> exists!
          </Text>
        </Center>
      )}
    </>
  );
}

export default PokemonPage;
