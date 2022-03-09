import React, { useContext } from "react";
import { ThemeContext } from "./Usecontext";

export default function Footer() {
  const { isDark, setIsDark } = useContext(ThemeContext);

  const handleColor = () => {
    setIsDark(!isDark);
  };
  return (
    <footer
      style={{
        position: "absoulute",
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
      <button
        style={{ marginRight: "20px", position: "relative", height: "50%" }}
        onClick={handleColor}
      >
        {isDark ? (
          <div style={{ fontSize: "10px" }}>Dark mode</div>
        ) : (
          <div style={{ fontSize: "10px" }}>White mode</div>
        )}
      </button>
    </footer>
  );
}
