import { action, makeObservable, observable } from "mobx";

export class Todo {
  name = "";
  description = "";
  is_done = false;

  constructor(name, description) {
    makeObservable(this, {
      name: observable,
      description: observable,
      is_done: observable,
      toggleIsDone: action,
      updateText: action,
    });
    this.name = name;
    this.description = description;
  }

  toggleIsDone() {
    this.is_done = !this.is_done;
  }

  updateText(name) {
    this.name = name;
  }
}
