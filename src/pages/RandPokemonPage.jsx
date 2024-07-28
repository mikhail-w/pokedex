import axios from 'axios';
import MainPokemonTab from '../components/MainPokemonTab';
import GenerateButton from '../components/GenerateButton';
import { useOutletContext, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getChoice } from '../utils';

function RandPokemonPage() {
  const [valid, setValid] = useState(false);
  const timerId = useRef(null);
  // const { randomChoice } = useParams();
  const { setTeam, team, pokemon, setPokemon, randomChoice, setIsLoading } =
    useOutletContext();

  // console.log('-------- On Random Pokeon Page');

  const getRandomPokemon = async () => {
    try {
      // let response;
      // setIsLoading(true);
      // ========== FIRST AXIOS CALL ===========
      let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomChoice}`
      );
      setPokemon(response.data);
      // console.log('Pokemon DATA:', response.data);

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

  useEffect(() => {
    const pokemon_data = window.localStorage.getItem('MAIN_POKEMON');
    const team_data = window.localStorage.getItem('MAIN_POKEMON_TEAM');
    // console.log(
    //   '>>>>>>>>>>>>>>>>>>>>>>> LOADING FROM STORAGE >>>>>>>>>>>>>>>>>>>>>>'
    // );
    // console.log('Pokemon:', JSON.parse(pokemon_data));
    // console.log('Pokemon Team:', JSON.parse(team_data));
    setPokemon(JSON.parse(pokemon_data));
    setTeam(JSON.parse(team_data));
  }, []);

  useEffect(() => {
    // console.log(
    //   '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ UPDATE COMPONENTS ^^^^^^^^^^^^^^^^^^^^^'
    // );

    getRandomPokemon();
    return () => {
      window.localStorage.setItem('MAIN_POKEMON', JSON.stringify(pokemon));
      window.localStorage.setItem('MAIN_POKEMON_TEAM', JSON.stringify(team));
    };
  }, [randomChoice]);

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
