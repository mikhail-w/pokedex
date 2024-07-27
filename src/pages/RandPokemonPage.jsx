import axios from 'axios';
import MainPokemonTab from '../components/MainPokemonTab';
import GenerateButton from '../components/GenerateButton';
import Loading from '../components/Loading';
import { useOutletContext, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  const { setTeam, pokemon, setPokemon, randomChoice } = useOutletContext();
  console.log('-------- On Random Pokeon Page');

  const getRandomPokemon = async () => {
    let response;
    console.log('Pokemon Object', pokemon);
    // const choice = getChoice(1025);

    try {
      // setIsLoading(true);
      // ========== FIRST AXIOS CALL ===========
      response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomChoice}`
      );
      setPokemon(response.data);
      // console.log('Pokemon DATA:', response.data);

      // // ========== SECOND AXIOS CALL ===========
      // // ================ GET TEAM ==============
      // let teamURL = response.data.types[0].type.url;
      // const teamResponse = await axios.get(teamURL);
      // let urls = [];
      // const teamMasterList = teamResponse.data.pokemon;
      // let teamMasterListSize = teamMasterList.length;
      // // console.log('teamMasterListSize:', teamMasterListSize);

      // // console.log('Pokemon Team:', teamResponse.data.pokemon);
      // // Make sure selected Pokemon aren't repeated
      // const indexes = [];
      // while (indexes.length < 5) {
      //   console.log('Card ID', pokemon.id);
      //   let r = getChoice(teamMasterListSize);
      //   if (indexes.indexOf(r) === -1 && r.id != pokemon.id) indexes.push(r);
      // }
      // // console.log('Indexes', indexes);

      // for (let i = 0; i < 5; i++) {
      //   let teamMember = teamMasterList[indexes[i]];
      //   let url = `https://pokeapi.co/api/v2/pokemon/${teamMember.pokemon.name}`;
      //   urls.push(url.toString());
      // }

      // await Promise.all(
      //   urls.map(async url => {
      //     return (await axios.get(url)).data;
      //   })
      // ).then(values => {
      //   // console.log('Team Member Values', values);
      //   setTeam(values);
      // });
      setValid(true);
    } catch (err) {
      setValid(false);
      console.error('Error response:');
      console.error(err.response.data); // ***
      console.error(err.response.status); // ***
      console.error(err.response.headers); // ***
    }
  };

  useEffect(() => {
    getRandomPokemon();
  }, [randomChoice]);

  return (
    <>
      {valid ? <MainPokemonTab /> : ''}
      <GenerateButton getRandomPokemon={getRandomPokemon} />
    </>
  );
}

export default RandPokemonPage;
