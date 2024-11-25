import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePokemonInfo(cardId) {
  const [pokeInfo, setPokeInfo] = useState(null);
  const [flavorText, setFlavorText] = useState([]);
  const [evoNames, setEvoNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    // if (cardId > 1000) {
    //   // Exit early if no cardId is provided
    //   setLoading(false);
    //   setError('Card ID is required.');
    //   return;
    // }

    const fetchPokemonInfo = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch Pokémon species data
        const speciesRes = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${cardId}`
        );
        setPokeInfo(speciesRes.data);

        // Extract and deduplicate English flavor texts
        const englishFlavorText = speciesRes.data.flavor_text_entries
          .filter(entry => entry.language.name === 'en')
          .map(entry => entry.flavor_text.replace(/\s+/g, ' ').trim());
        setFlavorText([...new Set(englishFlavorText)]);

        // Fetch evolution chain data
        const evoChainRes = await axios.get(
          speciesRes.data.evolution_chain.url
        );
        const evoChain = [];
        let evoData = evoChainRes.data.chain;
        const numberPattern = /\d+/g; // Regex for extracting ID from the URL

        // Traverse the evolution chain
        while (evoData) {
          evoChain.push({
            species_name: evoData.species.name,
            id: evoData.species.url.match(numberPattern)?.[0],
          });
          evoData = evoData.evolves_to[0]; // Move to the next evolution stage
        }

        setEvoNames(evoChain);
      } catch (err) {
        console.error('Error fetching Pokémon data:', err);
        setError(
          err?.response?.data?.message || err.message || 'An error occurred.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonInfo();
  }, [cardId]);

  return { pokeInfo, flavorText, evoNames, loading, error };
}
