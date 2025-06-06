import axios from "axios";
import { useEffect, useState } from "react";
import PokemonList from "../../components/PokemonList";

// Função para cores dos tipos
function getTypeColor(type) {
  const colors = {
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
  return colors[type] || "#777";
}

export default function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Cores personalizadas
  const colors = {
    background: "#2E8B57",
    text: "#2F4F4F",    
    accent: "#2F4F4F",    
    light: "#98FB98"      
  };

  // Lista dos Pokémon específicos
  const LIMITED_POKEMON = [
    'mimikyu', 'shinx', 'sylveon', 'ampharos', 'pumpkaboo',
    'corviknight', 'bisharp', 'ursaluna', 'pancham', 'volcarona',
    'growlithe', 'togedemaru'
  ];

  // Busca Pokémon por nome/ID ou aleatório
  const fetchPokemon = async (search = "") => {
    setLoading(true);
    try {
      const pokemonId = search 
        ? LIMITED_POKEMON.includes(search.toLowerCase())
          ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)).data.id
          : (() => { throw new Error() })()
        : LIMITED_POKEMON[Math.floor(Math.random() * LIMITED_POKEMON.length)];
      
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      setPokemon(response.data);
    } catch {
      alert(`Pokémon não encontrado! Escolha entre: ${LIMITED_POKEMON.join(", ")}`);
    } finally {
      setLoading(false);
    }
  };

  // Busca inicial
  useEffect(() => { fetchPokemon(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) fetchPokemon(searchTerm.trim());
  };

  const handleDetailsClick = () => {
    navigate('/detalhes');
  };

  return (
    <PokemonList
      pokemon={pokemon}
      loading={loading}
      colors={colors}
      typeColors={getTypeColor}
      onRandomize={() => !loading && fetchPokemon()}
      onDetailsClick={handleDetailsClick}
      onSearch={handleSearch}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      LIMITED_POKEMON={LIMITED_POKEMON}
    />
  );
}