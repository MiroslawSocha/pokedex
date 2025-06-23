import { useParams, Link } from "react-router-dom";
import { pokemons } from "../../pokemon.json";
import "./Pokemon.css";

function Pokemon() {
  const { id } = useParams();
  const pokemon = pokemons.find((p) => p.pok_id === id);

  if (!pokemon) {
    return (
      <div className="pokemon-not-found">
        <h2>Pokemon not found</h2>
        <Link to="/">← Back to Pokedex</Link>
      </div>
    );
  }

  return (
    <div className="pokemon-details">
      <Link to="/" className="back-link">
        <p>← Back to Pokedex</p>
      </Link>
      <h1 className="pokemon-name">
        #{pokemon.pok_id} {pokemon.pok_name}
      </h1>
      <img
        className="pokemon-image"
        src={pokemon.image}
        alt={pokemon.pok_name}
      />
      <div className="pokemon-info">
        <p>
          <strong>Region:</strong> {pokemon.region}
        </p>
        <p>
          <strong>Types:</strong>
          <span className={`type-badge ${pokemon.type1}`}>{pokemon.type1}</span>
          {pokemon.type2 && (
            <span className={`type-badge ${pokemon.type2}`}>
              {pokemon.type2}
            </span>
          )}
        </p>
        <p>
          <strong>Abilities:</strong>
        </p>
        <div className="abilities-list">
          {pokemon.abilities1 && <p>1. {pokemon.abilities1}</p>}
          {pokemon.abilities2 && <p>2. {pokemon.abilities2}</p>}
          {pokemon.abilities3 && <p>3. {pokemon.abilities3}</p>}
        </div>
        <p>
          <a
            href={`https://www.pokemon.com/us/pokedex/${pokemon.pok_name.toLowerCase()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="external-link"
          >
            Official Pokémon Page
          </a>
        </p>
      </div>
    </div>
  );
}

export default Pokemon;
