import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Search.scss";

export default function Search() {
  const [input, setInput] = useState("");
  const [worlds, setWorlds] = useState([]);
  const [output, setOutput] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    let getData = async () => {
      let countries = await axios("https://disease.sh/v3/covid-19/countries");
      setWorlds(countries.data);
    };
    getData();
  }, []);
  // search 버튼 누르면 해당 국기 나오게.
  // 국가 하나만 남았을 때 국기 그림 나오게 하고 search버튼 누르면 해당 국가에 대한 설명 나오는 글로 router

  // 클릭 하고 난 뒤, 렌더링을 한 번 더. useEffect안에다가 함수를 넣을까?
  // 클릭했을때 handleInput 함수 기능을 한 번더.

  const handleInput = (e) => {
    setFlag(false);
    setInput(e.target.value);
  };

  const handleClick = (world) => {
    setInput(world);
  };

  useEffect(() => {
    setOutput([]);
    worlds.filter((world) => {
      if (world.country.toLowerCase().includes(input.toLowerCase())) {
        setOutput((output) => [...output, world]);
      }
    });
  }, [input]);
  console.log(input);
  return (
    <div style={{ marginRight: "30px" }}>
      <label htmlFor="search">
        <input
          id="search"
          value={input}
          onChange={handleInput}
          placeholder="search..."
        />
      </label>
      <button>Search</button>

      <div className="world">
        {flag
          ? worlds.map((world, i) => (
              <div key={i} onClick={() => handleClick(world.country)}>
                {world.country}
                {console.log("world.country: ", world.country)}
                {console.log(
                  "world.countryInfo.iso2?.toLowerCase(): ",
                  world.countryInfo.iso2?.toLowerCase()
                )}
                {console.log("표현된 국가 갯수 : ", output.length)}
                {/*표현된 갯수가 1개이면 이미지 보이게하라 */}
              </div>
            ))
          : output.map((world, i) => <div key={i}>{world.country}</div>)}

        {console.log("output : ", output[0]?.countryInfo.iso2.toLowerCase())}
        {/* 이래서 console을 찍으라는거. output이 객체에 쌓여있으니 계속 에러뜨지 */}

        {output.length === 1 && (
          <img
            src={`https://disease.sh/assets/img/flags/${output[0]?.countryInfo.iso2.toLowerCase()}.png`}
            alt="{word.country}"
          />
        )}
      </div>
    </div>
  );
}
