import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC"
};

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

            // Busca descrição em português primeiro, depois em inglês
            const ptEntry = speciesResponse.data.flavor_text_entries
              .find(entry => entry.language.name === "pt");

            const enEntry = speciesResponse.data.flavor_text_entries
              .find(entry => entry.language.name === "en");

            const description = ptEntry?.flavor_text || enEntry?.flavor_text || "Descrição não disponível";

            // Adicionando categoria (gênero)
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
  }, [favorites]); // Added favorites to dependency array to re-fetch/update isFavorite

  if (loading) return (
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

  return (
    <div style={{
      backgroundColor: '#2E8B57',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {pokemonData.map((pokemon) => (
          <div
            key={pokemon.id} // Changed key to pokemon.id for better uniqueness
            style={{
              backgroundColor: '#98FB98',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                style={{
                  width: '80px',
                  height: '80px',
                  marginRight: '15px',
                  objectFit: 'contain'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h2 style={{
                    color: '#2F4F4F',
                    margin: 0,
                    textTransform: 'capitalize'
                  }}>
                    #{pokemon.id.toString().padStart(3, '0')} - {pokemon.name}
                  </h2>
                  <button
                    onClick={() => toggleFavorite(pokemon)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.5rem'
                    }}
                  >
                    {pokemon.isFavorite ? '❤️' : '🤍'}
                  </button>
                </div>
                <p style={{
                  marginTop: '5px',
                  fontStyle: 'italic',
                  fontSize: '0.9rem'
                }}>
                  {pokemon.category}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h3 style={{
                marginBottom: '8px',
                fontSize: '1.1rem'
              }}>
                Descrição:
              </h3>
              <p style={{
                margin: 0,
                lineHeight: '1.5'
              }}>
                "{pokemon.description}"
              </p>
            </div>

            <div>
              <h3 style={{
                marginBottom: '8px',
                fontSize: '1.1rem'
              }}>
                Tipos:
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                {pokemon.types.map((type, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      backgroundColor: typeColors[type] || '#777',
                      color: 'white',
                      fontSize: '0.9rem'
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
