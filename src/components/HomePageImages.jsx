import bulbasaur from '../assets/images/pokemon/bulbasaur.png';
import pickachu from '../assets/images/pokemon/pikachu.png';
import charizard from '../assets/images/pokemon/charizard.png';
import pokedex from '../assets/images/pokemon/pokedex.png';
import pokeball2 from '../assets/images/pokeballs/pokeball2.png';
import pokeball3 from '../assets/images/pokeballs/pokeball3.svg';
import outline2 from '../assets/images/pokeballs/balloutline2.png';

function HomePageImages() {
  return (
    <>
      <div className="ballOutline">
        <img src={outline2} alt="pokeball outline" />
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
      <div className="pokeball2">
        <img src={pokeball2} alt="pokeballs" />
      </div>
      <div className="pokeball3">
        <img src={pokeball3} alt="pokeball" />
      </div>
    </>
  );
}

export default HomePageImages;
