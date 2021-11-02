import { action, makeObservable, observable } from "mobx";

class UserStore {
  username = "";
  password = "";
  confirmPassword = "";
  is_logged = false;

  constructor() {
    makeObservable(this, {
      username: observable,
      password: observable,
      confirmPassword: observable,
      updateField: action,
    });
  }

  updateField = (field, new_value) => {
    this[field] = new_value;
  };

  createUser = () => {
    try {
      if (localStorage.hasOwnProperty("users")) {
        const users = JSON.parse(localStorage.getItem("users"));
        users.push({ username: this.username, password: this.password });
        localStorage.setItem("users", JSON.stringify(users));
      } else {
        localStorage.setItem(
          "users",
          JSON.stringify([{ username: this.username, password: this.password }])
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  login = () => {
    try {
      if (localStorage.hasOwnProperty("users")) {
        const users = JSON.parse(localStorage.getItem("users"));
        const user_login = users.filter((user) => {
          return (
            user.username === this.username && user.password === this.password
          );
        });

        if (user_login.length > 0) {
          localStorage.setItem("user_logged", JSON.stringify(user_login[0]));
          this.is_logged = true;
        } else {
          this.is_logged = false;
        }
      }
    } catch (e) {
      console.error(e);
      this.is_logged = false;
    }
  };
}

const user = new UserStore();
export { user };
