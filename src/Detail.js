// 컴포넌트 파일 만들땐 항상 리액트 import

import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import "./Detail.scss";
import { 재고context } from "./App";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

function Detail(props) {
  let history = useHistory();
  let { id } = useParams();

  let 재고 = useContext(재고context);

  let [alert, setAlert] = useState(true);

  let [active, setActive] = useState(false);

  let 찾은상품 = props.shoes.find((x) => x.id == Number(id));
  console.log("찾은상품 :", 찾은상품);
  // return은 객체 하나가 나온다. {...}
  // map, sort, find, filter 배열함수들 공부

  useEffect(() => {
    // 근데 Detail컴포넌트 로드 됐을떄만 ajax를 요청하고 싶다? useEffect의 2번째 인자로 [] 넣어주면 끝

    // 타이머를 변수에 저장해서 자주 쓰임
    // 나중에 없애고 싶을수도 있기 때문에
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000);

    // 컴포넌트가 사라질때 코드를 실행시켜달라는 훅
    // ex) 다른페이지로 이동할때
    // return만 적어주면 됨.

    return () => {
      clearTimeout(timer);
    };

    // Detail 컴포넌트가 사라질때 실행됨.(unmount 될때)
    // 만약 여러개를 실행하고 싶다면?
    // 1. 함수를 여러개 만들던가,
    // 2. useEffect를 여러개 적든가
  }, []);

  useEffect(() => {
    let arr = localStorage.getItem("watched");
    if (arr == null) {
      arr = [];
    } else {
      arr = JSON.parse(arr); // 따옴표가 쳐져있는 json 형식을 되돌려 놓기위해
    }

    console.log("arr : ", arr);
    arr.push(id); // useParams()
    arr = new Set(arr); // 중복된 것을 제거해주는 js문법
    arr = [...arr]; // 위에 만들어 놓은 set자료형을 조작하기 쉬운 array로 만듬
    localStorage.setItem("watched", JSON.stringify(arr));
  }, []);

  // *참고) 만약 2초가 지나기도 전에 페이지에서 나가버린다면?
  // 2초지난 다음에 알림창 꺼지라는 명령어도 있는데 나중에 문제 발생할수있음
  // return문을 이용하면 해당 컴포넌트가 사라질때, 2초후 꺼지라는 기능을 제거해줄 수있음.

  const rotate = keyframes`
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(10deg);
    }
  `;

  const Rotate = styled.div`
    display: inline-block;
    animation: ${rotate} 3s linear infinite;
    padding: 2rem 1rem;
    font-size: 1.2rem;
  `;

  const Button = styled.div`
    display: flex;
    justify-content: center;
  `;

  const Recent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
  `;

  const Products = styled.div`
    text-align: center;
    position: absolute;
    right: 30px;
    top: 60px;
    background-color: lightgrey;
    padding: 30px;
    font-size: 10px;
    @media screen and (max-width: 980px) {
      position: absolute;
      right: 30px;
      top: 100px;
    }
  `;
  const Option = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const Tab = styled.button`
    padding: 10px 30px;
    cursor: pointer;
    opacity: 0.6;
    background: white;
    border: 0;
    border-bottom: 2px solid transparent;
    transition: ease border-bottom 250ms;
    ${({ active }) =>
      active &&
      `
      border-bottom: 2px solid black;
      opacity: 1;
    `}
  `;

  const types = ["Option1", "Option2", "Option3"];

  function TabGroup() {
    const [active, setActive] = useState(types[0]);
    return (
      <>
        <Option>
          <div>
            {types.map((type) => (
              <Tab
                key={type}
                active={active === type}
                onClick={() => setActive(type)}
              >
                {type}
              </Tab>
            ))}
          </div>
          <p />
          <p> What you chose : {active} </p>
        </Option>
      </>
    );
  }

  return (
    <>
      <div className="detail_info">
        {/* <Recent>
          <Rotate> 🤣🤣🤣🤣 </Rotate>
          <Products>
            <div>최근 본 상품</div>
            <div>{JSON.parse(localStorage.getItem("watched"))}</div>
            <div>{찾은상품.title}</div>
          </Products>
        </Recent> */}
        <img
          alt="black"
          src={`https://codingapple1.github.io/shop/shoes${Number(id) + 1}.jpg`}
          width="400px"
        />

        <div className="detail_explain">
          <div>{찾은상품.title}</div>
          <div>{찾은상품.content}</div>
          <div>{찾은상품.price} 원</div>
          <Left left={props.left} 찾은상품={찾은상품} />

          <button
            onClick={() => {
              let 찾은상품 = props.shoes.find((x) => x.id == Number(id));

              props.dispatch({
                type: "항목추가",
                payload: {
                  id: 찾은상품.id,
                  name: 찾은상품.title,
                  quan: 1,
                },
              });
              history.push("/cart");
              // page로 강제이동 및 강제 새로고침 방지
            }}
          >
            주문하기
          </button>

          <button
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>
      <Button>
        <TabGroup />
      </Button>
      <CSSTransition in={active} classNames="wow" timeout={500}>
        <div className="button_content"></div>
      </CSSTransition>

      {alert ? (
        <div className="my-alert2 my-alert2-red">
          <p>재고가 얼마 남지 않았습니다</p>
        </div>
      ) : null}
    </>
  );
}

function Left(props) {
  // return <p>재고 : {props.left[props.찾은상품.id]}</p>;
  return <p>재고 : {props.찾은상품.left} 개</p>;
}

function state를props화(state) {
  // 옛날 문법이니 이거 대신 useSelector 사용하라.
  return {
    state: state.reducer, // state를 state라는 props로 바꿔달라.
    isAlert: state.reducer2,
  };
}

export default connect(state를props화)(Detail);
