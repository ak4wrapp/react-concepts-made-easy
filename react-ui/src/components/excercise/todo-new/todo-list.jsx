import React, { useState, useEffect } from 'react';
import './todo-list.css';

export default function TodoList() {
  // 1. Lazy initialization: reads from localStorage ONLY on the first mount
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Failed to parse todos from local storage", error);
      return [];
    }
  });

  const [inputValue, setInputValue] = useState('');

  // 2. Persist to localStorage whenever the `todos` array changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      text: inputValue.trim(),
      checked: false,
      createdAt: Date.now(),
      completedAt: null, // Hidden timestamp for stretch goal
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleToggle = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const isNowChecked = !todo.checked;
        return {
          ...todo,
          checked: isNowChecked,
          // Update completed timestamp based on the new checked state
          completedAt: isNowChecked ? Date.now() : null
        };
      }
      return todo;
    }));
  };

  const handleDelete = (e, id) => {
    e.stopPropagation(); // Prevents the <li> onClick (toggle) from firing
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 3. Sorting Logic (Stretch Goals)
  // Active todos: sorted by createdAt descending (newest first)
  const activeTodos = todos
    .filter(todo => !todo.checked)
    .sort((a, b) => b.createdAt - a.createdAt);

  // Completed todos: sorted by completedAt ascending (oldest completion first)
  const completedTodos = todos
    .filter(todo => todo.checked)
    .sort((a, b) => a.completedAt - b.completedAt);

  // Combine them so completed items always sink to the bottom
  const sortedTodos = [...activeTodos, ...completedTodos];

  return (
    <div className="todo-container">
      <h2>React Todo List</h2>
      
      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {sortedTodos.map(todo => (
          <li 
            key={todo.id} 
            className={`todo-item ${todo.checked ? 'checked' : ''}`}
            onClick={() => handleToggle(todo.id)}
          >
            <span className="todo-text">{todo.text}</span>
            <button 
              className="delete-btn"
              onClick={(e) => handleDelete(e, todo.id)}
              aria-label="Delete todo"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}