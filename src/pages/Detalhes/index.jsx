import axios from "axios";
import { useEffect, useState } from "react";
import PokemonInfo from "../../components/PokemonInfo";

const POKEMON_LIST = [
  { name: 'mimikyu', id: 778 },
  { name: 'shinx', id: 403 },
  { name: 'sylveon', id: 700 },
  { name: 'ampharos', id: 181 },
  { name: 'pumpkaboo', id: 710 },
  { name: 'corviknight', id: 823 },
  { name: 'bisharp', id: 625 },
  { name: 'ursaluna', id: 901 },
  { name: 'pancham', id: 674 },
  { name: 'volcarona', id: 637 },
  { name: 'growlithe', id: 58 },
  { name: 'togedemaru', id: 777 }
];

export default function Detalhes() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoritePokemon');
    return saved ? JSON.parse(saved) : [];
  });

  // Toggle favorito
  const toggleFavorite = (pokemon) => {
    const newFavorites = favorites.some(fav => fav.id === pokemon.id)
      ? favorites.filter(fav => fav.id !== pokemon.id)
      : [...favorites, pokemon];

    setFavorites(newFavorites);
    localStorage.setItem('favoritePokemon', JSON.stringify(newFavorites));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all(
          POKEMON_LIST.map(async (pokemon) => {
            const [speciesResponse, pokemonResponse] = await Promise.all([
              axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`),
              axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
            ]);

            const ptEntry = speciesResponse.data.flavor_text_entries
              .find(entry => entry.language.name === "pt");
            const enEntry = speciesResponse.data.flavor_text_entries
              .find(entry => entry.language.name === "en");

            const description = ptEntry?.flavor_text || enEntry?.flavor_text || "Descrição não disponível";

            const category = speciesResponse.data.genera.find(g => g.language.name === "pt")?.genus ||
              speciesResponse.data.genera.find(g => g.language.name === "en")?.genus ||
              "Categoria desconhecida";

            return {
              ...pokemon,
              description: description.replace(/[\n\f]/g, ' '),
              sprite: pokemonResponse.data.sprites.other['official-artwork'].front_default,
              types: pokemonResponse.data.types.map(t => t.type.name),
              category: category,
              isFavorite: favorites.some(fav => fav.id === pokemon.id)
            };
          })
        );
        setPokemonData(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [favorites]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#2E8B57'
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: '#98FB98',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid #142727',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            margin: '0 auto 15px',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: '#2F4F4F', fontWeight: 'bold' }}>Carregando Pokédex...</p>
        </div>
      </div>
    );
  }

  return (
    <PokemonInfo
      pokemonData={pokemonData}
      toggleFavorite={toggleFavorite}
    />
  );
}
