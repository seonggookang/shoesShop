import React, { useEffect, useState } from "react";
import "./App.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import ShoseInfo from "./Shoes";
import { Link, Route, Routes, Switch } from "react-router-dom";
import Detail from "./Detail";
import axios from "axios";

function App() {
  let [shoes, setShoes] = useState(ShoseInfo);
  let [loading, setLoading] = useState(false);
  let [left, setLeft] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/detail">
                Home
              </Nav.Link>

              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <div className="background">
            <h1>20% Season Off</h1>
            <div>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </div>
            <button className="learn_button">Learn more</button>
          </div>

          <div className="container">
            <div className="row">
              {shoes.map((shoe, i) => (
                <Card key={i} shoes={shoes[i]} i={i} />
              ))}
            </div>

            <button
              className="more"
              onClick={() => {
                setLoading(true);

                axios.post("serverURL", { id: "ksg", pw: 1234 });

                axios
                  .get("https://codingapple1.github.io/shop/data2.json")

                  .then((result) => {
                    setLoading(false);

                    let newArray = [...shoes];
                    newArray.push(...result.data);
                    setShoes(newArray);
                  })
                  .catch(() => {
                    setLoading(false);

                    console.log("실패했어요");
                  });
              }}
            >
              더보기
            </button>
          </div>
          <Loading />
          <button
            onClick={() => {
              let list = shoes.sort((a, b) => a.price - b.price);
              setShoes([...list]);
            }}
          >
            가격순 정렬하기!!
          </button>
        </Route>

        <Route exact path="/detail/:id">
          <Detail shoes={shoes} left={left} />
        </Route>
      </Switch>
    </div>
  );
}

function Loading(props) {
  return props.loading == true ? <div>로딩중입니다로딩중입니다</div> : null;
}

function Card(props) {
  return (
    <div className="product">
      <img
        alt="greyshoes"
        src={`https://codingapple1.github.io/shop/shoes${
          props.shoes.id + 1
        }.jpg`}
        width="100%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.explain}</p>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
