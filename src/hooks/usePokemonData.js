// hooks/usePokemonData.js
import { useState } from 'react';
import {
  getPokemonSpecies,
  getEvolutionChain,
} from '../services/pokemonService';

export function usePokemonData() {
  const [pokeInfo, setPokeInfo] = useState([]);
  const [flavorTextArray, setFlavorText] = useState([]);
  const [evoNames, setEvoNames] = useState([]);

  const fetchPokemonData = async id => {
    try {
      const speciesData = await getPokemonSpecies(id);
      setPokeInfo(speciesData);
      setFlavorText(speciesData.flavor_text_entries);

      const evolutionData = await getEvolutionChain(
        speciesData.evolution_chain.url
      );

      let evoChain = [];
      let evoData = evolutionData.chain;
      const numberPattern = /\d+/g;

      do {
        const evoDetails = evoData.evolution_details[0] || {};

        evoChain.push({
          species_name: evoData.species.name,
          id: evoData.species.url.slice(-4).match(numberPattern)[0],
          min_level: evoDetails.min_level || 1,
          trigger_name: evoDetails.trigger?.name || null,
          item: evoDetails.item || null,
        });

        evoData = evoData.evolves_to[0];
      } while (evoData);

      const evoNamesArray = evoChain.map(({ species_name, id }) => [
        species_name,
        id,
      ]);
      setEvoNames(evoNamesArray);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  };

  return {
    pokeInfo,
    flavorTextArray,
    evoNames,
    fetchPokemonData,
  };
}
