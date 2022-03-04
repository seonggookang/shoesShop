import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

// redux에서 데이터 수정하는 방법을 정의한 함수를 만들고 그걸 이용해서 수정해야함(개복잡한데..?)
// 그래서 redux 쓰는 이유 -> 모든 컴포넌트가 props없이 state 직접 사용 가능하게 해주고, state 에러 추적에 용이하기 때문.

//종류별로 초기값과 reducer를 만드는게 보기 좋음/안헷갈림

// state가 여러개 필요하면 reducer를 더 만들면 됨.
// reducer안에는 state초기값, 수정하는법 작성
// 그 여러개 만들어진 reducer들은 combineReducers({})안에 넣음.

let alert초기값 = true;

function reducer2(state = alert초기값, 액션) {
  if (액션.type === "닫기") {
    state = false;
    return state;
  } else {
    return state;
  }
}

let 초기값 = [
  { id: 0, name: "멋진신발1", quan: 2 },
  { id: 1, name: "멋진신발2", quan: 1 },
];

function reducer(state = 초기값, 액션) {
  // 액션은 dispatch할때 안에 들어있는 객체.

  // state.find((a, i) => a.id == Number(id));

  if (액션.type === "항목추가") {
    // state안에 id : 액션.데이터 인게 있냐?
    // find: 값을 찾고 싶나?
    // findIndex : 몇번째 데이터인지를 찾고싶나? findIndex

    // console.log(액션.데이터.id);
    let found = state.findIndex((a) => {
      return a.name === 액션.payload.name;
    });

    console.log(found);

    if (found >= 0) {
      let copy = [...state];
      copy[found].quan++;
      return copy;
    } else {
      let copy = [...state];
      copy.push(액션.payload);
      return copy;
    }
    // let copy = [...state];
    // copy.push(액션.payload);
    // return copy;
  } else if (액션.type === "수량증가") {
    // id가 같은 상품이 state에 있으면 push 하지말고
    // id가 같은 상품의 quan 1증가

    let copy = [...state];
    copy[액션.payload].quan++;
    return copy;
  } else if (액션.type === "수량감소") {
    let copy = [...state];
    if (copy[액션.payload].quan > 0) {
      copy[액션.payload].quan--;
      return copy;
    } else {
      return copy;
    }
  } else {
    // 이 else 에 대한 구문을 안적어주니까 안됐음.
    return state;
  }
}

let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
