import React, { useEffect, useRef, useState } from "react";
import "./TodoForm.css";

export default function TodoForm({ todos, setTodos, toggleComplete }) {
  const [input, setInput] = useState("");
  const [todoEditing, setTodoEditing] = useState("");
  const [editingText, setEditingText] = useState("");
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    filterHandler();
  }, [todos, status]); // 고작 한번쓰는건 useEffect안에다 넣으라는 가벼운 경고.

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      setTodos([
        ...todos,
        {
          id: new Date().getTime(),
          text: input,
          completed: false,
        },
      ]);
      setInput("");
      inputRef.current.focus();
    }
  };

  // 삭제 함수(내가 클릭한 것 제외하고 리턴!)
  const deleteTodo = (id) => {
    setTodos([...todos].filter((todo) => todo.id !== id));
  };

  // 수정 함수
  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        if (editingText.length === 0) {
          alert("Write something");
        } else {
          todo.text = editingText;
        }
      }
      return todo;
    });

    setTodos(updatedTodos);
    setTodoEditing("");
    setEditingText("");
  }

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "notCompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  return (
    <div className="inputs">
      <div className="content">
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a todo"
            value={input} // input창에 글을 씀에 따라 바로바로 value값으로 적용.
            name="text"
            className="todo-input"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-button">Add todo</button>
        </form>

        {filteredTodos.map((todo) => {
          return (
            <div key={todo.id} className="lists">
              <div className="text">
                {todoEditing === todo.id ? (
                  <input
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                    value={editingText}
                  />
                ) : (
                  <div className={todo.completed ? "complete" : null}>
                    &nbsp;&nbsp;{todo.text}&nbsp;&nbsp;
                  </div>
                )}
              </div>

              <div className="buttons">
                {/* 삭제 버튼 */}
                {todoEditing === todo.id ? null : (
                  <i
                    className="fas fa-trash-alt delete-icon"
                    onClick={() => deleteTodo(todo.id)}
                  />
                )}

                {/* 수정 버튼 or 확인 체크 버튼 */}
                {todoEditing === todo.id ? (
                  <div
                    id="confirm"
                    onClick={() => editTodo(todo.id)}
                    style={{
                      padding: "0px",
                      marginLeft: "32px",
                      fontSize: "18px",
                    }}
                  >
                    ✅
                  </div>
                ) : (
                  <i
                    className="fas fa-pencil-alt edit-icon"
                    onClick={() => setTodoEditing(todo.id)} // 수정하고자하는 state의 dom조작을 위해 존재
                  />
                )}

                {/* 체크박스 클릭했을 때는 체크박스 모양이 안보여야함 */}
                {todoEditing === todo.id ? null : (
                  <input
                    type="checkbox"
                    onChange={() => toggleComplete(todo.id)}
                    checked={todo.completed}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <select onChange={statusHandler}>
        <option vlaue="All">All</option>
        <option vlaue="completed">completed</option>
        <option vlaue="notCompleted">notCompleted</option>
      </select>
    </div>
  );
}
