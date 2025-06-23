import { useState } from "react";
import "./Pokedex.css";
import { pokemons } from "../../pokemon.json";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";

function Pokedex() {
  const [region, setRegion] = useState("kanto");
  const [search, setSearch] = useState("");
  const regions = [
    "kanto",
    "johto",
    "hoenn",
    "sinnoh",
    "unova",
    "kalos",
    "alola",
    "galar",
    "paldea",
  ];

  const changeRegion = (e) => {
    setRegion(e.target.value);
  };

  const typeCombination = (type1, type2, searchWord) => {
    const combination1 = `${type1} ${type2}`.toLowerCase();
    const combination2 = `${type2} ${type1}`.toLowerCase();
    return (
      combination1.includes(searchWord) || combination2.includes(searchWord)
    );
  };

  return (
    <div className="app">
      <div className="pagination navbar navbar-expand-lg bg-dark position-sticky top-0 w-100 py-3 d-flex justify-content-center z-5">
        <div className="d-flex flex-row justify-content-center">
          {regions.map((regionMap) => (
            <button
              key={regionMap}
              className={`page-link region ${
                region === regionMap ? "active" : ""
              }`}
              value={regionMap}
              onClick={changeRegion}
            >
              {regionMap}
            </button>
          ))}
        </div>
      </div>

      <div className="search-container">
        <input
          className="input"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search pokemon name, pokedex number or type"
          type="text"
        />
        <div className="info-icon">
          <Info size={18} />
          <div className="search-options-tooltip">
            <h3>Search options</h3>
            <h5>1. Pokemon name</h5>
            <h5>2. Pokedex number</h5>
            <h5>3. Type</h5>
            <h5>
              4. Type combination (type1 type2)
              <br />
              (only with a space between)
            </h5>
          </div>
        </div>
      </div>

      <h2 className="region-name">{region || "Pokedex"}</h2>
      <div className="pokemons">
        {pokemons
          .filter((pokemon) => {
            return (
              pokemon.region.toLowerCase() === region.toLowerCase() &&
              (pokemon.pok_name.toLowerCase().includes(search) ||
                pokemon.pok_id.includes(search) ||
                pokemon.type1.includes(search) ||
                pokemon.type2.includes(search) ||
                typeCombination(pokemon.type1, pokemon.type2, search))
            );
          })
          .map((pokemon) => (
            <div className="pokemon" key={pokemon.pok_id}>
              <Link to={`/pokemon/${pokemon.pok_id}`}>
                <h4 className="id">#{pokemon.pok_id}</h4>
                <img src={pokemon.image} alt={pokemon.pok_name} />
                <h2>{pokemon.pok_name}</h2>
                <div className="type-pokemon">
                  <p className={pokemon.type1}>{pokemon.type1}</p>
                  {pokemon.type2 && (
                    <p className={pokemon.type2}>{pokemon.type2}</p>
                  )}
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Pokedex;
