import { action, makeObservable, observable } from "mobx";
import { Todo } from "../domain/Todo";

class TodoList {
  records = [];

  constructor() {
    makeObservable(this, {
      records: observable,
      addTodo: action,
      removeTodo: action,
    });
  }

  addTodo = (name, description) => {
    this.records.push(new Todo(name, description));
  };

  removeTodo = (todo) => {
    this.records.splice(this.records.indexOf(todo), 1);
  };
}

const todoList = new TodoList();
export { todoList };
