import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Favoritos() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('favoritePokemon');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const removeFavorite = (id) => {
    const newFavorites = favorites.filter(pokemon => pokemon.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem('favoritePokemon', JSON.stringify(newFavorites));
  };

  return (
    <div style={{ 
      backgroundColor: '#2E8B57',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <Link to="/" style={{ /* seus estilos */ }}>
        ← Voltar para Home
      </Link>

      <h1 style={{ color: '#142727', textAlign: 'center', marginBottom: '30px' }}>
        Meus Pokémon Favoritos
      </h1>

      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#142727' }}>Nenhum Pokémon favoritado ainda!</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {favorites.map((pokemon) => (
            <div 
              key={pokemon.id}
              style={{
                backgroundColor: '#98FB98',
                borderRadius: '10px',
                padding: '20px',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} 
                alt={pokemon.name}
                style={{ width: '100px', height: '100px' }}
              />
              <p style={{ textTransform: 'capitalize', margin: '10px 0' }}>{pokemon.name}</p>
              <button
                onClick={() => removeFavorite(pokemon.id)}
                style={{
                  background: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
