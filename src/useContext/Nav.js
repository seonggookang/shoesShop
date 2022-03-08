import React, { useContext } from "react";
import { Username } from "./Usecontext";
//객체로 받아오는거 주의!

export default function Nav() {
  const user = useContext(Username); // context api 필수 세팅
  console.log(user);

  return (
    <nav
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10%",
        borderTop: "1px solid black",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        backgroundColor: "lightgray",
        fontSize: "30px",
        fontWeight: "700",
        color: "black",
      }}
    >
      Welcome {user}!
    </nav>
  );
}
