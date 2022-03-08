import React, { useContext } from "react";
import { ThemeContext } from "./Usecontext";

export default function Footer() {
  const { isDark, setIsDark } = useContext(ThemeContext);

  console.log(isDark);

  const handleColor = () => {
    setIsDark(!isDark);
  };
  return (
    <footer
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "10%",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        borderBottom: "1px solid black",
        backgroundColor: "lightgray",
        fontSize: "30px",
        fontWeight: "700",
        color: "black",
      }}
    >
      <button style={{ marginRight: "20px" }} onClick={handleColor}>
        {isDark ? <div>Dark mode</div> : <div>White mode</div>}
      </button>
    </footer>
  );
}
