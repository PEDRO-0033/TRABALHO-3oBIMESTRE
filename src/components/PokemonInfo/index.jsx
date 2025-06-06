import React from "react";

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

export default function PokemonInfo({ pokemonData, toggleFavorite }) {
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
            key={pokemon.id}
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
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
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
