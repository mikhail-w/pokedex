import bulbasaur from '../assets/images/pokemon/bulbasaur.png';
import pickachu from '../assets/images/pokemon/pikachu.png';
import charizard from '../assets/images/pokemon/charizard.png';
import pokedex from '../assets/images/pokemon/pokedex.png';
import pokeball3 from '../assets/images/pokeballs/pokeball3.png';
import ballOutline2 from '../assets/images/pokeballs/balloutline2.png';
import ballOutline3 from '../assets/images/pokeballs/balloutline3.svg';
import rm from '../assets/images/rm.png';
import { Center, useColorModeValue } from '@chakra-ui/react';

function HomePageImages() {
  return (
    <>
      <div className="ballOutline2">
        <img src={ballOutline2} alt="pokeball outline" />
      </div>
      <div className="ballOutline3">
        <img src={ballOutline3} alt="pokeball" />
      </div>
      <div className="logo">
        <img src={pokedex} alt="pokedex logo" />
      </div>
      <div className="bulbasaur">
        <img src={bulbasaur} alt="bulbasaur" />
      </div>
      <div className="pickachu">
        <img src={pickachu} alt="pickachu" />
      </div>
      <div className="charizard">
        <img src={charizard} alt="charizard" />
      </div>
      <div className="pokeball3">
        <img src={pokeball3} alt="pokeballs" />
      </div>
      <Center>
        <div className="rm-container">
          <div className="rm-image-container">
            <img src={rm} alt="rm" />
          </div>
          <div className="wrapper">
            <p className="static-txt">Look Morty...</p>
            <p className={useColorModeValue('typewriter', 'typewriter-dark')}>
              Pokemon Everywhere....
            </p>
          </div>
        </div>
      </Center>
    </>
  );
}

export default HomePageImages;
