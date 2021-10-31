import "./App.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";

import { useTodosStore } from "./providers/Todo/TodoProvider";
import { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const todoStore = useTodosStore();

  return (
    <div className="form-login">
      <h1>Teste</h1>
      {todoStore.records.map((todo) => (
        <div>
          <p>{todo.name}</p>
          <p>{todo.description}</p>
          <Checkbox value={todo.is_done} disabled>
            Done
          </Checkbox>
        </div>
      ))}
      <div>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        />
        <button
          onClick={() => {
            todoStore.addTodo(name, description);
            setName("");
            setDescription("");
          }}
        >
          Add todo
        </button>
      </div>
    </div>
  );
};

export default App;
