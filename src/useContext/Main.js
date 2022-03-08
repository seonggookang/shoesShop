import React, { useContext } from "react";
import { ThemeContext } from "./Usecontext";

function Main() {
  const { isDark } = useContext(ThemeContext);
  console.log(isDark);
  console.log(ThemeContext);

  return (
    <main
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60%",
        border: "1px solid black",
        fontSize: "30px",
        fontWeight: "700",
        backgroundColor: isDark ? "black" : "white",
        color: isDark ? "white" : "black",
      }}
    >
      좋은 하루되세요
    </main>
  );
}

export default Main;
