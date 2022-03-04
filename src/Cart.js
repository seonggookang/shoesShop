import React, { useEffect, useState, memo } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function Cart(props) {
  // let [open, setOpen] = useState(true);

  // state를 꺼내쓰는 방법 : useSelector()
  // state는 redux에 있던 모든 state
  let state = useSelector((state) => state.reducer);

  let dispatch = useDispatch();

  return (
    <div>
      <Table>
        <tr>
          <td>#</td>
          <td>수량</td>
          <td>변경</td>
        </tr>

        {state.map((a, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              {/* <td>{a.id}</td> */}
              <td>{a.name}</td>
              <td>{a.quan}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch({ type: "수량증가", payload: a.id });
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
              </td>
            </tr>
          );
        })}
      </Table>
      {/* {open === true ? <Alarm setOpen={setOpen} /> : null} */}

      {props.isAlert === true ? (
        <div className="my-alert2">
          <p>지금 구매시 신규할인 20%</p>
          <button
            onClick={() => {
              // props.setOpen(false);
              props.dispatch({ type: "닫기" });
            }}
          >
            닫기
          </button>
        </div>
      ) : null}
      <Parent 이름="존박" 나이="20" />
    </div>
  );
}

function Parent(props) {
  return (
    <div>
      <Child1 이름={props.이름} />
      <Child2 나이={props.나이} />
      {/* memo를 써서 바뀌지 않는 state는 재렌더링 안하게 
      Parent를 구성하는 state나 props가 변경되면 그것과 관련된 모든 컴포넌트를 다 재렌더링  
      가만히 얌전히있는 컴포넌트의 재렌더링을 막고싶으면 memo() 함수를 이용 */}
    </div>
  );
}

function Child1() {
  useEffect(() => {
    console.log("렌더링됨1");
  });
  return <div>1111</div>;
}

let Child2 = memo(function () {
  useEffect(() => {
    console.log("렌더링됨2");
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
// function state를props화(state) {
//   console.log(state.reducer2);
//   return {
//     state: state.reducer, // state를 state라는 props로 바꿔달라.
//     isAlert: state.reducer2,
//   };
// }

// export default connect(state를props화)(Cart);

export default Cart;
