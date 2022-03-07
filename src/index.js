import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // 리덕스 1번: import 한다
import { combineReducers, createStore } from "redux";

// redux에서 데이터 수정 함수를 만들고 그걸 이용해서 수정.
// 그래서 redux 쓰는 이유 -> 모든 컴포넌트가 props없이 state 직접 사용 가능하게 해주고, state 에러 추적에 용이하기 때문.

// 다른 종류의 state 저장하고 싶으면 reducer 하나 더 만들어라.
// reducer안에는 state초기값, 수정하는법 작성
// 그 여러개 만들어진 reducer들은 combineReducers({})안에 넣음.

// reducer2와 같이 Cart.js에서'만' 사용하는 것은 해당 파일에서 useState로 state를 만드는것이 효율적이다.(지금은 학습중이니 했지만)

function reducer2(state = true, 액션) {
  if (액션.type === "닫기") {
    state = false;
    return state;
  } else {
    return state;
  }
}

let 초기값 = [
  {
    id: 0,
    name: "White and Black",
    quan: 1,
  },
  { id: 1, name: "Red Knit", quan: 1 },
  { id: 2, name: "Grey Yordan ", quan: 1 },
];

function reducer(state = 초기값, 액션) {
  // 액션은 dispatch할때 안에 들어있는 객체.
  // state.find((a, i) => a.id == Number(id));
  // find: 값을 찾고 싶나?
  // findIndex : 몇번째 데이터인지를 찾고싶나? findIndex
  if (액션.type === "항목추가") {
    console.log("액션", 액션);
    let found = state.findIndex((a) => {
      return a.name === 액션.payload.name;
    });
    console.log("found: ", found); // 2, 3, 4
    if (found >= 0) {
      let copy = [...state];
      copy[found].quan++;
      return copy;
    } else {
      let copy = [...state];
      copy.push(액션.payload);
      return copy;
    }
  } else if (액션.type === "삭제") {
    let copy = [...state].filter((product) => {
      console.log("product", product);
      console.log("액션.payload: ", 액션.payload);
      return product.id !== 액션.payload;
    });
    // copy = false;
    console.log("삭제 누른뒤 copy : ", copy);
    return copy;
  } else if (액션.type === "수량증가") {
    console.log();
    // 수량증가 버튼과 동시에 shoes의 값도 영향받게.
    let copy = [...state]; // 독립적인 복사본
    copy[액션.payload].quan++;
    return copy;
  } else if (액션.type === "수량감소") {
    let copy = [...state];
    if (copy[액션.payload].quan > 0) {
      copy[액션.payload].quan--;
      console.log("액션", 액션);
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
/* 리덕스 3번: createStore() 안에 state 저장 */

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* 리덕스 2번,4번: 감싸준다.감싸진 애들은 props 없이도 state공유가능, <Provider>에 props 전송*/}
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
