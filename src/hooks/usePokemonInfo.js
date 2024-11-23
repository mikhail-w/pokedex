import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePokemonInfo(cardId) {
  const [pokeInfo, setPokeInfo] = useState(null);
  const [flavorText, setFlavorText] = useState([]);
  const [evoNames, setEvoNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cardId) return;

    const fetchPokemonInfo = async () => {
      setLoading(true);
      try {
        const speciesRes = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${cardId}`
        );
        setPokeInfo(speciesRes.data);

        const englishFlavorText = speciesRes.data.flavor_text_entries
          .filter(entry => entry.language.name === 'en')
          .map(entry => entry.flavor_text);
        setFlavorText([...new Set(englishFlavorText)]);

        const evoChainRes = await axios.get(
          speciesRes.data.evolution_chain.url
        );
        const evoChain = [];
        let evoData = evoChainRes.data.chain;
        const numberPattern = /\d+/g;

        do {
          evoChain.push({
            species_name: evoData.species.name,
            id: evoData.species.url.match(numberPattern)[0],
          });
          evoData = evoData.evolves_to[0];
        } while (evoData && evoData.evolves_to);

        setEvoNames(evoChain);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonInfo();
  }, [cardId]);

  return { pokeInfo, flavorText, evoNames, loading };
}
