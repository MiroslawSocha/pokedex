import { useParams, Link } from "react-router-dom";
import { pokemons } from "../../pokemon.json";
import "./Pokemon.css";

function Pokemon() {
  const { id } = useParams();
  const pokemon = pokemons.find((p) => p.pok_id === id);

  if (!pokemon) {
    return (
      <div className="pokemon-not-found container text-center mt-5">
        <h2>Pokemon not found</h2>
        <Link to="/" className="btn btn-primary mt-3">
          ← Back to Pokedex
        </Link>
      </div>
    );
  }

  return (
    <div className="container pokemon-details py-4">
      <Link to="/" className="back-link mb-3">
        ← Back to Pokedex
      </Link>

      <div className="row align-items-center justify-content-center">
        <div className="col-12 col-md-5 text-center">
          <img
            className="pokemon-image img-fluid"
            src={pokemon.image}
            alt={pokemon.pok_name}
          />
        </div>

        <div className="col-12 col-md-7">
          <h1 className="pokemon-name mb-3">
            #{pokemon.pok_id} {pokemon.pok_name}
          </h1>

          <p>
            <strong>Region:</strong> {pokemon.region}
          </p>

          <p>
            <strong>Types:</strong>{" "}
            <span className={`type-badge ${pokemon.type1}`}>
              {pokemon.type1}
            </span>
            {pokemon.type2 && (
              <span className={`type-badge ${pokemon.type2} ms-2`}>
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

          <a
            href={`https://www.pokemon.com/us/pokedex/${pokemon.pok_name.toLowerCase()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary mt-3"
          >
            Official Pokémon Page
          </a>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
