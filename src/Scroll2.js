import axios from "axios";
import React, { useEffect, useState } from "react";

function Scroll2() {
  const [poketmons, setPoketmon] = useState([]);

  useEffect(() => {
    const result = async () => {
      const fetched = await axios("https://pokeapi.co/api/v2/pokemon?limit=10");
      setPoketmon(fetched.data.results);
    };

    result();
  }, []);

  return (
    <div>
      {poketmons?.map((poketmon, idx) => {
        return <div key={idx}>{poketmon.name}</div>; //  Objects are not valid as a React child (key값 이용해서 쓸거써라)
      })}
    </div>
  );
}

export default Scroll2;
