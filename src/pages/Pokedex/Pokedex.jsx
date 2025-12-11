import { useEffect, useState } from "react";
import "./Pokedex.css";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { supabase } from "../../../supabaseClient";

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
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

  useEffect(() => {
    const fetchPokemons = async () => {
      const { data, error } = await supabase.from("pokemons").select("*");

      if (error) {
        console.error("Błąd pobierania:", error);
      } else {
        setPokemons(data);
      }
    };

    fetchPokemons();
    console.log(pokemons);
  }, []);

  const changeRegion = (e) => {
    setRegion(e.target.value);
  };

  const typeCombination = (type1, type2, searchWord) => {
    const t1 = (type1 || "").toLowerCase();
    const t2 = (type2 || "").toLowerCase();
    const combination1 = `${t1} ${t2}`;
    const combination2 = `${t2} ${t1}`;
    return (
      combination1.includes(searchWord) || combination2.includes(searchWord)
    );
  };
  useEffect(() => {
    document.title = "Pokedex";
  }, []);
  useEffect(() => {
    setFilteredPokemons(
      pokemons
        .filter((pokemon) => {
          const regionMatch =
            (pokemon.region || "").toLowerCase() === region.toLowerCase();
          const nameMatch = (pokemon.pok_name || "")
            .toLowerCase()
            .includes(search);
          const idMatch = String(pokemon.pok_id || "").includes(search);
          const type1 = (pokemon.type1 || "").toLowerCase();
          const type2 = (pokemon.type2 || "").toLowerCase();
          const typeMatch =
            type1.includes(search) ||
            type2.includes(search) ||
            typeCombination(type1, type2, search);

          return regionMatch && (nameMatch || idMatch || typeMatch);
        })
        .sort((a, b) => {
          const idA = parseInt(a.pok_id, 10) || 0;
          const idB = parseInt(b.pok_id, 10) || 0;
          return idA - idB;
        })
    );
  }, [region, search, pokemons]);

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
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <span className="input-group-text" id="info-icon">
            <Info size={18} />
            <div
              className="position-absolute bg-white border rounded p-3 shadow-sm search-tooltip"
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
          </span>
        </div>
      </div>

      <h2 className="region-name text-center">{region || "Pokedex"}</h2>
      <div className="container-lg px-3">
        <div className="row justify-content-center">
          {filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon) => (
              <div
                className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 d-flex justify-content-center mb-4"
                key={pokemon.pok_id}
              >
                <div className="pokemon shadow-sm rounded-4 text-center p-3 h-100">
                  <Link
                    to={`/pokemon/${pokemon.pok_id}`}
                    className="text-decoration-none text-reset d-flex flex-column h-100 justify-content-between"
                  >
                    <h4 className="id">#{pokemon.pok_id}</h4>
                    <img
                      src={pokemon.image}
                      alt={pokemon.pok_name}
                      className="img-fluid mb-2"
                    />
                    <h4
                      className="d-flex align-items-center justify-content-center text-capitalize p-0"
                      style={{ minHeight: "3rem", overflow: "hidden" }}
                    >
                      {pokemon.pok_name}
                    </h4>
                    <div className="type-pokemon d-flex justify-content-center gap-2">
                      <p className={`badge ${pokemon.type1}`}>
                        {pokemon.type1}
                      </p>
                      {pokemon.type2 && (
                        <p className={`badge ${pokemon.type2}`}>
                          {pokemon.type2}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <h3 className="text-center mt-4">
                No Pokémon found in this region with that search.
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
