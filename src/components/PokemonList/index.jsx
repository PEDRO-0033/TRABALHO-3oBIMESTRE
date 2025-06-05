import React from "react";
import { Link } from "react-router-dom";

export default function PokemonList({ pokemons }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '20px'
    }}>
      {pokemons.map((pokemon) => (
        <Link
          key={pokemon.id}
          to={`/pokemon/${pokemon.id}`}
          style={{
            textDecoration: 'none',
            backgroundColor: '#98FB98',
            borderRadius: '10px',
            padding: '10px 20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            width: '150px',
            textAlign: 'center',
            color: '#2F4F4F'
          }}
        >
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'contain',
              marginBottom: '10px'
            }}
          />
          <h3 style={{ margin: 0, textTransform: 'capitalize' }}>
            {pokemon.name}
          </h3>
        </Link>
      ))}
    </div>
  );
}
