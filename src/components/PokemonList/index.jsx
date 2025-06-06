// src/components/PokemonList/index.jsx
import { useNavigate } from "react-router-dom";

export default function PokemonList({ 
  pokemon, 
  loading, 
  colors, 
  typeColors,
  onRandomize,
  onDetailsClick,
  onSearch,
  searchTerm,
  setSearchTerm,
  LIMITED_POKEMON
}) {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: colors.background,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px"
    }}>
      {/* Barra de Pesquisa */}
      <form
        onSubmit={onSearch}
        style={{
          width: "90%",
          maxWidth: "900px",
          marginBottom: "20px"
        }}
      >
        <div style={{
          display: "flex",
          borderRadius: "25px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <input
            type="text"
            placeholder={`Pesquisar entre: ${LIMITED_POKEMON.join(", ")}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: "12px 20px",
              border: "none",
              backgroundColor: colors.light,
              color: colors.text,
              fontSize: "1rem"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 25px",
              border: "none",
              backgroundColor: colors.accent,
              color: colors.light,
              cursor: "pointer",
              transition: "background-color 0.3s",
              fontWeight: "bold"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#5F9EA0"}
            onMouseOut={(e) => e.target.style.backgroundColor = colors.accent}
            disabled={loading}
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </form>

      {/* Card do Pokémon */}
      <div
        style={{
          width: "90%",
          maxWidth: "900px",
          backgroundColor: colors.light,
          padding: "30px",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          border: `2px solid ${colors.accent}`,
          cursor: "pointer"
        }}
        onClick={onRandomize}
      >
        {pokemon && (
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
                  #{pokemon.id.toString().padStart(3, '0')} - {pokemon.name}
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
                          backgroundColor: typeColors[type.type.name],
                          color: "white",
                          fontWeight: "bold"
                        }}
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>
                
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
            
            <div style={{
              marginTop: "30px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "15px",
              color: colors.text
            }}>
              {pokemon.stats.map((stat, index) => (
                <div key={index} style={{ textAlign: "center" }}>
                  <div style={{
                    fontSize: "0.9rem",
                    marginBottom: "5px",
                    fontWeight: "bold"
                  }}>
                    {stat.stat.name.toUpperCase().replace("-", " ")}
                  </div>
                  <div style={{
                    height: "10px",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "5px",
                    overflow: "hidden"
                  }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${(stat.base_stat / 255) * 100}%`,
                        backgroundColor: colors.accent,
                        borderRadius: "5px"
                      }}
                    />
                  </div>
                  <div style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginTop: "5px"
                  }}>
                    {stat.base_stat}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: "40px",
        padding: "20px",
        textAlign: "center",
        color: colors.text,
        fontSize: "0.9rem"
      }}>
        <p>Dados providos pela PokeAPI | Projeto Pokémon</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none",
            border: "none",
            color: colors.accent,
            cursor: "pointer",
            textDecoration: "underline",
            marginTop: "10px"
          }}
        >
          Voltar ao topo
        </button>
      </footer>

      {/* Loading Overlay */}
      {loading && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            padding: "30px",
            backgroundColor: colors.light,
            borderRadius: "10px",
            textAlign: "center"
          }}>
            <div className="animate-spin-slow" style={{
              width: "50px",
              height: "50px",
              border: `5px solid ${colors.accent}`,
              borderTopColor: "transparent",
              borderRadius: "50%",
              margin: "0 auto 15px"
            }} />
            <p style={{ color: colors.text, fontWeight: "bold" }}>Carregando Pokémon...</p>
          </div>
        </div>
      )}
    </div>
  );
}