import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // Load tasks from local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  // Save tasks to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add or update task
  const handleAddOrUpdate = () => {
    if (!input) return;

    if (editId !== null) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { id: editId, text: input } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: input }]);
    }
    setInput("");
  };

  // Delete task
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit task
  const handleEdit = (id) => {
    const task = todos.find((todo) => todo.id === id);
    setInput(task.text);
    setEditId(id);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 shadow-lg rounded-md">
      <h2 className="text-xl font-bold mb-4">Todo List</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 w-full rounded-md"
          placeholder="Enter task"
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul className="mt-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-white p-2 my-2 rounded-md shadow"
          >
            <span>{todo.text}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(todo.id)}
                className="bg-yellow-400 px-3 py-1 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
