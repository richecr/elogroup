import React from "react";
import { useLocalStore } from "mobx-react";

import { todoList } from "../../controllers/TodoList";

const TodoContext = React.createContext(null);

export const TodoProvider = ({ children }) => {
  const todoStore = useLocalStore(() => todoList);

  return (
    <TodoContext.Provider value={todoStore}>{children}</TodoContext.Provider>
  );
};

export const useTodosStore = () => React.useContext(TodoContext);
