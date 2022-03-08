import React, { useState, useContext, lazy, Suspense } from "react";
import "./App.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import ShoseInfo from "./Shoes";
import { Link, Route, Switch } from "react-router-dom";

// import Detail from "./Detail";

import axios from "axios";
// axios로 인해 ajax가 쉬워진다.
// axios로 새로고침없이 서버에 요청할 수가있다.
// import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Cart from "./Cart.js";
import UsePractice from "./UsePractice";
import CancelToken from "./CancelToken";
import Scroll from "./Scroll";
let Detail = lazy(() => import("./Detail"));
// lazy,suspense를 이용하면 Detail, Cart등의 컴포넌특라 필요할 때 import를 해준다.

export let 재고context = React.createContext();
// createContext역할 : 같은 변수값을 공유할 범위생성
// 같은 값을 공유할 HTML을 범위로 감싸기
// 공유하고 싶은 state를 value={}로 Provider 옆에 기재
// 간단한 데이터 전송은 props를 쓰자

function App() {
  let [shoes, setShoes] = useState(ShoseInfo);
  let [loading, setLoading] = useState(false);
  let [left, setLeft] = useState([10, 11, 12]);
  let history = useHistory();

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
              {/* a링크 안에 a링크를 넣을수없다는 에러메시지가 나온다. 위처럼 바꿔주면 된다. 그보다 일단 이 부트스트랩 정말 못생겼다 */}
              <Nav.Link as={Link} to="/detail/0">
                Detail
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
      {/* Switch 중복 출연 막아주는 역할*/}

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
            <재고context.Provider value={left}>
              <div className="row">
                {shoes.map((shoe, i) => (
                  <Card key={i} shoes={shoes[i]} i={i} />
                ))}
              </div>
            </재고context.Provider>

            <button
              className="more"
              onClick={() => {
                // 인터넷이 느리다면, 더보기 버튼 눌렀을때 "로딩중입니다~"를 띄우고 싶을떄,
                // UI 키고 끄는건 state로 true/false로 state값 지정해주고 시작.
                setLoading(true);

                // 서버에 데이터 보내고 싶을떄 POST 요청하는 법
                // axios.post("serverURL", { id: "ksg", pw: 1234 });

                // Detail page에 들어가자마자 (Detail 컴포넌트로드시) ajax로 데이터를 가져오고싶을때,

                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  // 데이터 요청할 URL 넣으면됨(이제 새로고침 없이 데이터 가져옴. 이게 바로 ajax 쓰는 이유)
                  .then((result) => {
                    // ajax요청 성공시 실행코드
                    setLoading(false);

                    let newArray = [...shoes];

                    newArray.push(...result.data);
                    setShoes(newArray);
                  })
                  .catch(() => {
                    // ajax요청 실패시 실행코드
                    setLoading(false);
                    // 로딩중이라는 UI 삭제처리

                    console.log("실패했어요");
                  });
              }}
            >
              더보기
            </button>

            {/* 만약 더보기 버튼을 2번째 눌렀을때 다른 URL로 부터 값을 받아오고 싶다면?
            변경될 숫자 (data2에서 3이나 4로)로 바꿔주기 위해 해당 숫자부분을 state로 두고 더보기 버튼 클릭할때마다 set변경으로 숫자 변경.
            */}
          </div>
          <Loading loading={loading} />
          <button
            onClick={() => {
              let list = shoes.sort((a, b) => a.price - b.price);
              setShoes([...list]);
              // state의 값을 다시 재정비해줘야함. 그 역할 setShoes
              // 유레카 이걸 안해서 바로바로 버튼을 눌러도 적용이 안됐었음
              // 리액트에서 state 변경사항을 확인할 때 기존 state == 신규 state 등호로 비교합니다 근데 state가 array, object 자료일 경우 깊은복사 안하고 대충복사해서 내부 값만 변경해봤자 == 로 비교하면 기존 state == 신규 state 똑같다고 나옵니다 그래서 state 안바뀌었다고 생각합니다
            }}
          >
            가격순 정렬하기!!
          </button>
          <div
            onClick={() => {
              history.push("/useref");
            }}
          >
            <button>Do you wanna study useRef?</button>
          </div>
          <div
            onClick={() => {
              history.push("/cancelToken");
            }}
          >
            <button>cancelToken!!</button>
          </div>
          <div
            onClick={() => {
              history.push("/scroll");
            }}
          >
            <button>Infinite Scroll!!</button>
          </div>
        </Route>

        <Route exact path="/detail/:id">
          <재고context.Provider value={left}>
            <Suspense fallback={<div>로딩중입니다</div>}>
              <Detail shoes={shoes} left={left} />
            </Suspense>
          </재고context.Provider>
        </Route>

        <Route exact path="/cart">
          <Cart />
        </Route>

        <Route exact path="/useref">
          <UsePractice />
        </Route>

        <Route exact path="/cancelToken">
          <CancelToken />
        </Route>
        <Route exact path="/scroll">
          <Scroll />
        </Route>
      </Switch>
    </div>
  );
}

function Loading(props) {
  return props.loading ? <div>Loading...</div> : null;
}

function Card(props) {
  console.log("props :", props);
  let 재고 = useContext(재고context);
  console.log("재고 : ", 재고);
  // 뜻 : Card 컴포넌트는 괄호 안의 것(재고context)로 감싸져있다.
  // 이제 Card에서도 재고라는 state를 사용가능!

  let history = useHistory();

  // 여기서 해당 재고량을 가져오는 함수를 만들어서 id값이랑 재고의 순번이랑 맞춰서 가져오기
  console.log(props.shoes.left);
  return (
    <div
      className="product"
      onClick={() => {
        history.push(`/detail/` + Number(props.shoes.id));
      }}
    >
      <img
        alt="greyshoes"
        src={`https://codingapple1.github.io/shop/shoes${
          props.shoes.id + 1
        }.jpg`}
        width="100%"
      />
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content}
        <br />
        가격 : {props.shoes.price}원
      </p>
      {/* 재고 : {재고[props.i]} */}
      재고 : {props.shoes.left}
    </div>
  );
}

export default App;
