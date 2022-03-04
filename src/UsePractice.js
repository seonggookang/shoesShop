import React, { useState, useRef, useEffect } from "react";

export default function UsePractice() {
  const [count, setCount] = useState(1);
  const renderCount = useRef(1);
  // 변화는 감지하지만, 그 변화가 렌더링을 발생시키면 안될 때 유용
  useEffect(() => {
    renderCount.current += 1;
    console.log("렌더링 수 : ", renderCount.current);
  });

  return (
    <div>
      <p>Count : {count}</p>
      <button onClick={() => setCount(count + 1)}>count 올려</button>
    </div>
  );
}
