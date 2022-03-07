import axios from "axios";
import React, { useEffect, useState } from "react";

function Scroll2() {
  let offset = 0;
  const [poketmons, setPoketmon] = useState([]);

  const loadMorePokemon = async () => {
    const fetched = await axios(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
    );
    const newPokemon = [];
    fetched.data.results.map((p) => newPokemon.push(p.name));
    setPoketmon((oldPokemon) => [...oldPokemon, ...newPokemon]);
    offset += 10;
  };

  const handleScroll = (e) => {
    if (
      e.target.documentElement.scrollTop + window.innerHeight + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      loadMorePokemon();
    }
  };

  useEffect(() => {
    loadMorePokemon();
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {poketmons.map((p, i) => {
        return (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid black",
              width: "200px",
              height: "200px",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            {i + 1}.&nbsp;{p}
          </div>
        );
      })}
    </div>
  );
}

export default Scroll2;
