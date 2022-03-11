import React from "react";

export default function Todo({ todos, toggleComplete }) {
  return todos?.map((todo, idx) => {
    <div key={idx}>
      <div key={todo.id} onClick={() => toggleComplete(todo.id)}></div>
    </div>;
  });
}
