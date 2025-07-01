import { useEffect, useState } from "react";
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

  const filteredPokemons = pokemons.filter((pokemon) => {
    return (
      pokemon.region.toLowerCase() === region.toLowerCase() &&
      (pokemon.pok_name.toLowerCase().includes(search) ||
        pokemon.pok_id.includes(search) ||
        pokemon.type1.includes(search) ||
        pokemon.type2.includes(search) ||
        typeCombination(pokemon.type1, pokemon.type2, search))
    );
  });

  useEffect(() => {
    const info = document.getElementById("info-icon");
    const tooltip = document.getElementById("tooltip-box");

    const show = () => (tooltip.style.display = "block");
    const hide = () => (tooltip.style.display = "none");

    info?.addEventListener("mouseenter", show);
    info?.addEventListener("mouseleave", hide);
    tooltip?.addEventListener("mouseenter", show);
    tooltip?.addEventListener("mouseleave", hide);

    return () => {
      info?.removeEventListener("mouseenter", show);
      info?.removeEventListener("mouseleave", hide);
      tooltip?.removeEventListener("mouseenter", show);
      tooltip?.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <div className="app">
      <div className="navbar bg-dark position-relative top-0 w-100 py-3 justify-content-center flex-wrap z-5">
        <div className="d-flex flex-wrap justify-content-center gap-2 w-100">
          {regions.map((regionMap) => (
            <button
              key={regionMap}
              className={`btn btn-sm region ${
                region === regionMap ? "active" : "btn-outline-secondary"
              }`}
              value={regionMap}
              onClick={changeRegion}
            >
              {regionMap}
            </button>
          ))}
        </div>
      </div>

      <div className="position-relative mb-4 pt-5 w-100 w-sm-75 w-md-50 px-3">
        <div className="input-group w-50 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, number or type"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <span className="input-group-text" id="info-icon">
            <Info size={18} />
          </span>
        </div>
        <div
          className="position-absolute bg-white border rounded p-3 shadow-sm"
          style={{
            top: "100%",
            right: 0,
            zIndex: 10,
            width: "max-content",
            display: "none",
          }}
          id="tooltip-box"
        >
          <h6 className="fw-bold">Search options</h6>
          <div className="mb-0 ps-3 small text-start">
            <p>1. Pokemon name</p>
            <p>2. Pokedex number</p>
            <p>3. Type</p>
            <p>
              4. Type combination (type1 type2) <br />{" "}
              <strong>only space between</strong>
            </p>
          </div>
        </div>
      </div>

      <h2 className="region-name text-center">{region || "Pokedex"}</h2>
      <div className="container px-3">
        <div className=" row">
          {filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon) => (
              <div
                className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center"
                key={pokemon.pok_id}
              >
                <div className="pokemon">
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
              </div>
            ))
          ) : (
            <h3 className="text-center mt-4">
              No Pokémon found in this region with that search.
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
