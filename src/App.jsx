import React, { useState, useEffect } from "react";

function App() {
  const todos = [
    {
      id: 1,
      text: "react 공부하기",
      completed: true,
    },
    {
      id: 2,
      text: "spring 공부하기",
      completed: false,
    },
    {
      id: "3",
      text: "운동하기",
      completed: false,
    },
  ];

  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const store = localStorage.getItem("todo");
    if (store) {
      setTodoList(JSON.parse(store));
    }
    console.log("useEffect1");
  }, []);

  useEffect(() => {
    console.log("todoList변화");
    localStorage.setItem("todo", JSON.stringify(todoList));
  }, [todoList]);

  function deleteTodo(id) {
    setTodoList(
      todoList.filter((item) => {
        return item.id !== id;
      })
    );
  }

  function addTodo() {
    // input에 있는 값을 추가하는 로직
    if (input.trim() === "") {
      alert("할 일을 입력하세요");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    console.log(newTodo);
    setTodoList([newTodo, ...todoList]);
    setInput("");
  }

  function toggleTodo(id) {
    setTodoList(
      todoList.map((item) => {
        return item.id === id ? { ...item, completed: !item.completed } : item;
      })
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border shadow ">
      <h2 className="text-center mb-5  font-bold text-xl">TODO APP</h2>
      <div className=" flex gap-3 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="할일을 입력하세요"
          className="flex-1 border p-2 rounded border-gray-300 focus:outline-none w-80"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
        >
          추가
        </button>
      </div>
      <ul>
        {todoList.map((item) => {
          return (
            <li className="flex justify-between items-center py-4 border-b">
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  checked={item.completed}
                  className="accent-blue-500 w-5 h-5"
                  onChange={() => {
                    toggleTodo(item.id);
                  }}
                />
                <span
                  onClick={() => {
                    toggleTodo(item.id);
                  }}
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                    color: item.completed ? "red" : "black",
                  }}
                >
                  {item.text}
                </span>
              </div>
              <button
                className="text-red-500 text-sm hover:underline"
                onClick={() => {
                  deleteTodo(item.id);
                }}
              >
                삭제
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
