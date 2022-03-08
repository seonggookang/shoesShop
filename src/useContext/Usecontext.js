import React, { useState, createContext, useContext } from "react";
import Nav from "./Nav";
import Main from "./Main";
import Footer from "./Footer";

// context api 필수 세팅0 : import useContext
// context api 필수 세팅1 : ThemeContext와같은 박스 만들기
// context api 필수 세팅2 : 컴포넌트 감싸주기 with value
// context api 필수 세팅3 : 사용 원하는 컴포에서 박스 불러오기

export const ThemeContext = createContext(null); // 초기값
export const Username = createContext(null); // 초기값

function Usecontext() {
  const [isDark, setIsDark] = useState(false);

  return (
    <Username.Provider value={"사용자"}>
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
        <Page />
      </ThemeContext.Provider>
    </Username.Provider>
  );
}

function Page() {
  const data = useContext(ThemeContext);
  console.log(data);
  return (
    <div
      style={{
        display: "block",
        position: "absolute",
        height: "100vh",
        width: "80vw",
      }}
    >
      <Nav />
      <Main />
      <Footer />
    </div>
  );
}

export default Usecontext;

// Context는 꼭 필요할때만!
// Context를 사용하면 컴포넌트를 재사용하기 어려워질 수 있다.
