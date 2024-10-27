import React, { useRef, useState } from "react";
import { ITodo, Todo, TodoState } from "./todo";
import "./todos.css";

const Todos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const newTodoRef = useRef<HTMLInputElement>(null);

  const removeTodo = (item: ITodo) => {
    setTodos(todos.filter((todo: ITodo) => todo.id != item.id));
  };

  const toggleToStatus = (selectedTodo: ITodo) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === selectedTodo.id
          ? {
              ...todo,
              state:
                todo.state === TodoState.Pending
                  ? TodoState.Complete
                  : TodoState.Pending,
            }
          : todo
      );

      return updatedTodos;
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e as React.KeyboardEvent).key === "Enter") {
      e.preventDefault();
      addTodo();
    }
  };

  const onClickedAddTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    addTodo();
  };

  const addTodo = () => {
    const newTodoText = newTodoRef.current?.value;

    if (!!newTodoText && newTodoText.trim()) {
      const todo = {
        id: Math.random().toString(),
        label: newTodoText,
        state: TodoState.Pending,
      };
      setTodos([...todos, todo]);

      if (newTodoRef.current) {
        newTodoRef.current.value = "";
      }
    }
  };

  return (
    <div>
      <div>
        <input type="text" ref={newTodoRef} onKeyDown={onKeyDown}></input>
        <button onClick={onClickedAddTodo}>Add new Todo</button>
      </div>
      <div>
        <ul>
          {todos.map((item) => (
            <Todo
              key={item.id}
              item={item} // Use the existing item
              removeTodo={removeTodo}
              toggleToStatus={toggleToStatus}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todos;
