import bulbasaur from '../assets/images/pokemon/bulbasaur.png';
import pickachu from '../assets/images/pokemon/pikachu.png';
import charizard from '../assets/images/pokemon/charizard.png';
import pokedex from '../assets/images/pokemon/pokedex.png';
import pokeball2 from '../assets/images/pokeball2.png';
import outline2 from '../assets/images/balloutline2.png';

function HomePageImages() {
  return (
    <>
      <div className="ballOutline">
        <img src={outline2} />
      </div>
      <div className="logo">
        <img src={pokedex}></img>
      </div>
      <div className="bulbasaur">
        <img src={bulbasaur} />
      </div>
      <div className="pickachu">
        <img src={pickachu} />
      </div>
      <div className="charizard">
        <img src={charizard} />
      </div>
      <div className="pokeball2">
        <img src={pokeball2} />
      </div>
    </>
  );
}

export default HomePageImages;
