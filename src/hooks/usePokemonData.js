import { useState } from 'react';
import {
  getPokemonSpecies,
  getEvolutionChain,
} from '../services/pokemonService';

const usePokemonData = () => {
  const [pokeInfo, setPokeInfo] = useState(null);
  const [flavorTextArray, setFlavorText] = useState([]);
  const [evoNames, setEvoNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPokemonData = async pokemonId => {
    if (!pokemonId) {
      setError('Pokemon ID is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch Pokémon species data using pokemonService.js
      const speciesData = await getPokemonSpecies(pokemonId);

      // Update basic Pokémon information and flavor text
      setPokeInfo(speciesData);
      setFlavorText(speciesData.flavor_text_entries);

      // Fetch evolution chain data using pokemonService.js
      const evolutionChainData = await getEvolutionChain(
        speciesData.evolution_chain.url
      );

      const evoChain = [];
      let evoData = evolutionChainData.chain;

      const numberPattern = /\d+/g;

      do {
        const evoDetails = evoData['evolution_details'][0];

        evoChain.push({
          species_name: evoData.species.name,
          id: evoData.species.url.slice(-4).match(numberPattern)[0],
          min_level: evoDetails?.min_level || 1,
          trigger_name: evoDetails?.trigger?.name || null,
          item: evoDetails?.item || null,
        });

        evoData = evoData['evolves_to'][0];
      } while (evoData && evoData.evolves_to);

      // Extract evolution names and IDs
      const evoNamesArray = evoChain.map(({ species_name, id }) => [
        species_name,
        id,
      ]);
      setEvoNames(evoNamesArray);
    } catch (err) {
      console.error('Error fetching Pokémon data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Return state and the function to fetch data
  return {
    pokeInfo,
    flavorTextArray,
    evoNames,
    loading,
    error,
    getPokemonData,
  };
};

export default usePokemonData;
