import React, { useEffect, useState, memo } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";

function Cart() {
  // state를 꺼내쓰는 방법 : useSelector()
  // state는 redux에 있던 모든 state
  let state = useSelector((state) => state.reducer); // return 의 약자
  let isAlert = useSelector((state) => state.reducer2);
  let dispatch = useDispatch(); // 아래 dispatch쓸때 이제 props.안써도됨

  return (
    <div>
      <Table>
        <tbody>
          <tr>
            <td>#</td>
            <td>상품명</td>
            <td>수량</td>
            <td>변경</td>
          </tr>
        </tbody>
        {state.map((a, i) => {
          console.log("state :", state); //id:5
          console.log("state의 값 : ", a);
          return (
            <tbody key={i}>
              <tr>
                <td>{i + 1}</td>
                <td>{a.name}</td>
                <td>{a.quan}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch({ type: "수량증가", payload: a.id });
                      // payload를 통해 "이걸 전달해주세요"
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: "수량감소", payload: a.id });
                    }}
                  >
                    -
                  </button>

                  <button
                    onClick={() => {
                      // payload는 맘데로 작명.
                      dispatch({ type: "삭제", payload: a.id });
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      {/* {open === true ? <Alarm setOpen={setOpen} /> : null} */}

      {isAlert ? (
        <div className="my-alert2">
          <p>지금 구매시 신규할인 20%</p>
          <button
            onClick={() => {
              // props.setOpen(false);
              dispatch({ type: "닫기" });
            }}
          >
            닫기
          </button>
        </div>
      ) : null}
      {/* <Parent 이름="존박" 나이="20" /> */}
    </div>
  );
}

function Parent(props) {
  return (
    <div>
      <Child1 이름={props.이름} />/
      <Child2 나이={props.나이} />
      {/* memo를 써서 바뀌지 않는 컴포넌트는 재렌더링 안하게
      Parent를 구성하는 state나 props가 변경되면 그것과 관련된 모든 컴포넌트를 다 재렌더링
      가만히 있는 컴포넌트의 재렌더링을 막고싶으면 memo() 함수를 이용 */}
    </div>
  );
}

function Child1() {
  useEffect(() => {
    console.log("렌더링됨1"); // 계속 렌더링됨
  });
  return <div>1111</div>;
}

// memo의 단점: 기존 props와 바뀐props 비교연산 후 컴포넌트 업데이트 여부 결정
// 컴포넌트가 많아질때 유용. props가 너무 많으면 또 느려질 수 있으니 차후 확인.
let Child2 = memo(function () {
  useEffect(() => {
    console.log("렌더링됨2"); // memo를 사용함으로써 관련된게 바뀌면 렌더링
  });
  return <div>2222</div>;
});

// Alarm이라는 컴포넌트를 따로 빼서 만들었더니 닫기 버튼에 대한 동작을 안함.
// 변수를 넘겨줘야 될텐데 어떻게 처리해주지?

// * 굳이 다른 컴포넌트에서 쓰이지도 않는것을 redux에 넣는건 오바다. 그냥 useState, props 사용해라

// function Alarm(props) {
//   return (
//     <div className="my-alert2">
//       <p>지금 구매시 신규할인 20%</p>
//       <button
//         onClick={() => {
//           // props.setOpen(false);
//           props.dispatch({ type: "닫기" });
//         }}
//       >
//         닫기
//       </button>
//     </div>
//   );
// }

// 옛날꺼임. useSelector가 쉽고 간결한 현대꺼
// store 데이터들을(state) props화 해주는 함수(사용할 곳에서 props써줘야함)
// function state를props화(state) {
//   console.log(state);
//   return {
//     state: state.reducer, // state를 state라는 props로 바꿔달라.
//     isAlert: state.reducer2,
//   };
// }

// export default connect(state를props화)(Cart);

export default Cart;
