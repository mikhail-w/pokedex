import React from 'react';
import axios from 'axios';
import {
  Center,
  Flex,
  Image,
  Box,
  Button,
  Tag,
  Avatar,
  TagLabel,
} from '@chakra-ui/react';
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

function GetRandomPage() {
  const getRandomPokemon = async () => {
    let response;
    const choice = getChoice(1000);
    try {
      setIsLoading(true);
      response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${choice}`);
      setPokemon(response.data);
      console.log('Pokemon DATA:', response.data);

      // ========== SECOND AXIOS CALL ===========
      // ================ GET TEAM ==============
      let teamURL = response.data.types[0].type.url;
      const teamResponse = await axios.get(teamURL);
      let urls = [];
      const teamMasterList = teamResponse.data.pokemon;
      let teamMasterListSize = teamMasterList.length;
      console.log('teamMasterListSize:', teamMasterListSize);

      console.log('Pokemon Team:', teamResponse.data.pokemon);
      // Make sure selected Pokemon aren't repeated
      const indexes = [];
      while (indexes.length < 5) {
        console.log('Card ID', pokemon.id);
        let r = getChoice(teamMasterListSize);
        if (indexes.indexOf(r) === -1 && r.id != pokemon.id) indexes.push(r);
      }
      console.log('Indexes', indexes);

      for (let i = 0; i < 5; i++) {
        let teamMember = teamMasterList[indexes[i]];
        let url = `https://pokeapi.co/api/v2/pokemon/${teamMember.pokemon.name}`;
        urls.push(url.toString());
      }

      await Promise.all(
        urls.map(async url => {
          return (await axios.get(url)).data;
        })
      ).then(values => {
        console.log('Values', values);
        setTeam(values);
      });

      //Creating a timeout
      timerId.current = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      setValid(true);
    } catch (err) {
      setValid(false);
      console.error('Error response:');
      console.error(err.response.data); // ***
      console.error(err.response.status); // ***
      console.error(err.response.headers); // ***
    }
  };
  return <></>;
}

export default GetRandomPage;
