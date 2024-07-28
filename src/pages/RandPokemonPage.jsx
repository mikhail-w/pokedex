import axios from 'axios';
import MainPokemonTab from '../components/MainPokemonTab';
import GenerateButton from '../components/GenerateButton';
import Loading from '../components/Loading';
import { useOutletContext, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import {
  getChoice,
  isInTeam,
  colors,
  bgs,
  modalIcons,
  releasePokemon,
  catchPokemon,
  getType,
} from '../utils';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Center,
} from '@chakra-ui/react';

function RandPokemonPage() {
  const [valid, setValid] = useState(false);
  const timerId = useRef(null);
  // const { randomChoice } = useParams();
  const {
    setTeam,
    team,
    pokemon,
    setPokemon,
    randomChoice,
    setIsLoading,
    passed,
    setPassed,
  } = useOutletContext();
  let response;
  // console.log('-------- On Random Pokeon Page');

  const getRandomPokemon = async () => {
    try {
      // setIsLoading(true);
      // ========== FIRST AXIOS CALL ===========
      response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomChoice}`
      );
      setPokemon(response.data);
      console.log('Pokemon DATA:', response.data);

      // // ========== SECOND AXIOS CALL ===========
      // // ================ GET TEAM ==============
      let teamURL = response.data.types[0].type.url;
      const teamResponse = await axios.get(teamURL);
      let urls = [];
      const teamMasterList = teamResponse.data.pokemon;

      for (let i = 0; i < 5; i++) {
        let teamMember = teamMasterList[i];
        let url = `https://pokeapi.co/api/v2/pokemon/${teamMember.pokemon.name}`;
        urls.push(url.toString());
      }

      await Promise.all(
        urls.map(async url => {
          return (await axios.get(url)).data;
        })
      ).then(values => {
        setTeam(values);
      });

      //Creating a timeout
      timerId.current = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      setValid(true);
      console.log('TEAM:', team);
    } catch (err) {
      setValid(false);
      console.error('Error response:');
      console.error(err.response.data); // ***
      console.error(err.response.status); // ***
      console.error(err.response.headers); // ***
    }
  };

  // useEffect(() => {
  //   getRandomPokemon();
  // }, []);

  return (
    <>
      {valid ? <MainPokemonTab /> : ''}
      <GenerateButton getRandomPokemon={getRandomPokemon} />
    </>
  );
}

export default RandPokemonPage;

{
  /* {valid ? <MainPokemonTab /> : ''}
      <GenerateButton getRandomPokemon={getRandomPokemon} /> */
}
