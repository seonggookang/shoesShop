import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import "./TodoList.css";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(
      localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : []
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleComplete = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="center">
      <h1>What's the Plan for Today?</h1>
      <div className="todos">
        <TodoForm
          todos={todos}
          setTodos={setTodos}
          toggleComplete={toggleComplete}
        />
        <Todo todos={todos} toggleComplete={toggleComplete} />
      </div>
    </div>
  );
}
