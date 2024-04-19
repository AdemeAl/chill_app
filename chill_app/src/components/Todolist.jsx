import React, { useState } from "react";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (inputValue.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), text: inputValue, completed: false },
      ]);
      setInputValue("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "active") {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="rounded-lg bg-opacity-60 backdrop-filter backdrop-blur-none bg-zinc-600 p-4">
      <h1 className="font-serif">Todo List :</h1>
      <div>
        Filter:
        <button
          className="ml-1 hover:text-blue-300"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className="ml-1 hover:text-blue-300"
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className="ml-1 hover:text-blue-300"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <input
        type="text"
        className="p-1 mt-2"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task"
      />
      <button className="ml-2" onClick={addTask}>
        <i className="fa-regular fa-square-plus"></i>
      </button>
      <ul className="mt-2 flex-col justify-center items-center">
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              className="m-1"
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskStatus(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button
              className="ml-2 text-sm"
              onClick={() => deleteTask(task.id)}
            >
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
