import React from "react";
import Link from "react-router-dom";


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

export default function PokemonInfo({ pokemon, colors, onDetailsClick }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            style={{
              height: "250px",
              filter: "drop-shadow(0 0 8px rgba(0,0,0,0.2))"
            }}
          />
        </div>
        <div style={{ flex: 1, textAlign: "left", color: colors.text }}>
          <h3
            style={{
              fontSize: "2.5rem",
              textTransform: "capitalize",
              margin: "0 0 20px 0",
              color: colors.accent,
              cursor: "pointer"
            }}
            onClick={(e) => {
              e.stopPropagation();
              onDetailsClick();
            }}
          >
            #{pokemon.id.toString().padStart(3, "0")} - {pokemon.name}
          </h3>

          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ marginBottom: "5px" }}>Tipo(s):</h4>
            <div style={{ display: "flex", gap: "10px" }}>
              {pokemon.types.map((type, index) => (
                <span
                  key={index}
                  style={{
                    padding: "5px 15px",
                    borderRadius: "20px",
                    backgroundColor: getTypeColor(type.type.name),
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

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


          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ marginBottom: "5px" }}>Habilidades:</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {pokemon.abilities.map((ability, index) => (
                <span
                  key={index}
                  style={{
                    padding: "5px 15px",
                    borderRadius: "20px",
                    backgroundColor: colors.accent,
                    color: colors.light
                  }}
                >
                  {ability.ability.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
          color: colors.text
        }}
      >
        {pokemon.stats.map((stat, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "0.9rem",
                marginBottom: "5px",
                fontWeight: "bold"
              }}
            >
              {stat.stat.name.toUpperCase().replace("-", " ")}
            </div>
            <div
              style={{
                height: "10px",
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: "5px",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(stat.base_stat / 255) * 100}%`,
                  backgroundColor: colors.accent,
                  borderRadius: "5px"
                }}
              />
            </div>
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "5px"
              }}
            >
              {stat.base_stat}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
