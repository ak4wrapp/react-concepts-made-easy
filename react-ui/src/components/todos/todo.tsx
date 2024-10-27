import React from "react";
import "./todos.css";
export enum TodoState {
  Pending,
  Complete,
}
export interface ITodo {
  id: string;
  label: string;
  state: TodoState;
}

export interface ITodoProps {
  item: ITodo;
  toggleToStatus: (item: ITodo) => void;
  removeTodo: (item: ITodo) => void;
}

export const Todo: React.FC<ITodoProps> = ({
  item,
  removeTodo,
  toggleToStatus,
}) => {
  return (
    <li className="todo-item">
      <span
        style={{
          textDecoration:
            item.state === TodoState.Complete ? "line-through" : "none",
        }}
      >
        {item.label}
      </span>
      <span>{item.state === TodoState.Complete ? "Complete" : "Pending"}</span>
      <div>
        <button onClick={() => toggleToStatus(item)}>
          {item.state === TodoState.Complete ? "Undone" : "Done"}
        </button>
        <button onClick={() => removeTodo(item)}>Remove</button>
      </div>
    </li>
  );
};
