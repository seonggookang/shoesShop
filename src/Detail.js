// 컴포넌트 파일 만들땐 항상 리액트 import
import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import "./Detail.scss";
import { 재고context } from "./App";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

function Detail(props) {
  let history = useHistory();
  let { id } = useParams(); // 이 {id}는 왜 중괄호로 감싸져있나??
  // destructuring 문법입니다 object, array 자료에서 안에 들은 자료를 변수로 쉽게 뽑아쓰고 싶을 때 씁니다

  let 재고 = useContext(재고context);

  let [alert, setAlert] = useState(true);
  let [input, setInput] = useState("");

  let [pushedTab, setPushedTab] = useState(0);
  let [active, setActive] = useState(false);

  let 찾은상품 = props.shoes.find((x) => x.id == Number(id));

  // return은 객체 하나가 나온다. {...}
  // map, sort, find, filter 배열함수들 공부

  // import 없이 그냥 여기서 useEffect 쳐주면 자동 import완성됨
  // useEffect는 실행이 많이됨
  // 1. 컴포넌트가 mount 되자마자,
  // 2. 컴포넌트가 update 됐을때,
  // 3. 그리고 특정 코드를 실행할 수도 있음
  useEffect(() => {
    // Detail 컴포넌트 등장, 업데이트시 실행할 코드
    // 근데 Detail컴포넌트 로드 됐을떄만 ajax를 요청하고 싶다? useEffect의 2번째 인자로 [] 넣어주면 끝

    // 타이머를 변수에 저장해서 자주 쓰임
    // 나중에 없애고 싶을수도 있기떄문에
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
    //useEffect : 마운트, 렌더링될 떄 실행
    let arr = localStorage.getItem("watched");

    if (arr == null) {
      // 페이지로 첫진입했을 땐, locatstorage에 아무것도 없는상태
      arr = [];
    } else {
      arr = JSON.parse(arr); // 따옴표가 쳐져있는 json 형식을 되돌려놓기위해
    }

    arr.push(id); // useParams()
    arr = new Set(arr); // 중복된 것을 제거해주는 js문법
    arr = [...arr]; // 위에 만들어 놓은 set자료형을 조작하기 쉬운 array로 만듬
    localStorage.setItem("watched", JSON.stringify(arr));
  }, []);
  // 2번째 인자로 update됐을떄의 실행을 막을 수 있음.
  // []만 있으면 처음 mount됐을때만 실행
  // 만약 [alert] 로 돼있으면 alert의 변경만 감지해서 랜더링 실행
  // [alert,input] <- 이것처럼 2개 이상 넣을수도 있음. 그럼 저 2개만 감지해서 랜더링을 실행하겠다는 얘기

  // *참고) 만약 2초가 지나기도 전에 페이지에서 나가버린다면?
  // 2초지난 다음에 알림창 꺼지라는 명령어도 있는데 나중에 문제 발생할수있음
  // return문을 이용하면 해당 컴포넌트가 사라질때, 2초후 꺼지라는 기능을 제거해줄 수있음.

  let Love = styled.div`
    padding: 20px;
  `;

  let Like = styled.h4`
    font-size: 30px;
    color: ${(props) => props.색상};
  `;

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

  const types = ["Option1", "Option2", "Option3"];

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

        {/* <Love>
          <Like 색상="blue">안녕?</Like>
          <Like 색상="red">안녕?</Like>
          <Like className="green">안녕?</Like>
        </Love> */}

        <div className="detail_explain">
          <div>{찾은상품.title}</div>
          <div>{찾은상품.explain}</div>
          <div>{찾은상품.price}</div>
          <Left left={props.left} 찾은상품={찾은상품} />
          {/* <div>{props.shoes[id].title}</div>
        <div>{props.shoes[id].explain}</div>
        <div>{props.shoes[id].price}</div> */}
          <button
            onClick={() => {
              // 이런 props 지옥을 위해 마련된 해결책
              // Context API 또는 redux
              let newleft = [...props.left];
              // 함수 안에다가 변수를 만들어준다. 거기서 쓸꺼니까
              // 해당 인덱스의 값으로 대체를 해서, 전체 배열을 다시 setLeft를 한다.
              let 찾은상품 = props.shoes.find((x) => x.id == Number(id));

              props.dispatch({
                type: "항목추가",
                payload: {
                  id: 찾은상품.id,
                  name: 찾은상품.title,
                  quan: 1,
                },
              });
              history.push("/cart"); //page이동을 강제로 시켜주고, 강제 새로고침 안되게 함
            }}
          >
            주문하기
          </button>

          <button
            onClick={() => {
              history.goBack();
              // history.push('/'); 이 경로로 이동해달라
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>
      <Button>
        <TabGroup />
        {/* <div style={{ width: "100vw" }}></div> */}

        {/* <button
          className={active === true ? "bottom_line_no" : "bottom_line_yes"}
          style={{ padding: "20px 50px" }}
          onClick={() => {
            setPushedTab(0);
            setActive(true);
          }}
        >
          Option1
        </button>

        <button
          className={active === true ? "bottom_line_yes" : "bottom_line_no"}
          style={{ padding: "20px 50px" }}
          onClick={() => {
            setPushedTab(1);
            setActive(false);
          }}
        >
          Option2
        </button> */}

        {/* <button
          className={active == true ? "border_content" : "null"}
          style={{ padding: "20px 50px" }}
          onClick={() => {
            setPushedTab(2);
            setActive(true);
          }}
        >
          Option3
        </button> */}

        {/* <div style={{ width: "100vw" }}></div> */}
      </Button>
      <CSSTransition in={active} classNames="wow" timeout={500}>
        <div className="button_content">
          {/* <TabContent pushedTab={pushedTab} setActive={setActive} /> */}
        </div>
      </CSSTransition>
      {/* {input}
      <input
        onChange={(e) => {
          setInput(e.target.value); // state값이 바뀔때마다 재랜더링됨. 그때마다 다시 실행되는 useEffect를 방지하려면? 계속 랜덜이되면 자원 낭비임.
        }}
      /> */}
      {alert === true ? (
        <div className="my-alert2 my-alert2-red">
          <p>재고가 얼마 남지 않았습니다</p>
        </div>
      ) : null}
    </>
  );
}

// function TabContent(props) {
//   useEffect(() => {
//     props.setActive(true);
//   });

//   if (props.pushedTab === 0) {
//     return <div>1</div>;
//   } else if (props.pushedTab === 1) {
//     return <div>2</div>;
//   }
// }

// 재고 컴포넌트
function Left(props) {
  return <p>재고 : {props.left[props.찾은상품.id]}</p>;
}

// left 요소 하나의 값에서 -1 씩하는 함수를 하나 만들어서 재고 값에 삽입
// 무조건 setLeft를 이용해서 left의 값을 변경시켜야함

//변수명 or 함수명 export 할 수 있음

function state를props화(state) {
  return {
    state: state.reducer, // state를 state라는 props로 바꿔달라.
    isAlert: state.reducer2,
  };
}

export default connect(state를props화)(Detail);

// export default Detail;
