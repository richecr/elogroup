import { action, makeObservable, observable } from "mobx";
import uuid from "uuid/v4";

class UserStore {
  username = "";
  password = "";
  confirmPassword = "";
  is_logged = false;

  leads = {};

  leads_ = {};

  constructor() {
    makeObservable(this, {
      username: observable,
      password: observable,
      confirmPassword: observable,
      leads: observable,
      leads_: observable,
      updateField: action,
      find_leads: action,
      setLeads: action,
      verify_logged: action,
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

  logout = () => {
    localStorage.removeItem("user_logged");
    this.is_logged = false;
  };

  verify_logged = () => {
    if (localStorage.hasOwnProperty("user_logged")) {
      this.is_logged = true;
    } else {
      this.is_logged = false;
    }
  };

  find_leads = () => {
    let leads = {};
    if (localStorage.hasOwnProperty("leads")) {
      leads = JSON.parse(localStorage.getItem("leads"));
    }

    const user = JSON.parse(localStorage.getItem("user_logged"));
    if (leads[user.username]) {
      this.leads_ = leads[user.username];
    } else {
      this.setLeads({
        [uuid()]: {
          name: "Cliente em Potencial",
          items: [],
        },
        [uuid()]: {
          name: "Dados Confirmados",
          items: [],
        },
        [uuid()]: {
          name: "Reunião Agendada",
          items: [],
        },
      });
    }
  };

  save_lead = (lead_save) => {
    let leads = {};
    if (localStorage.hasOwnProperty("leads")) {
      leads = JSON.parse(localStorage.getItem("leads"));
    }

    const user = JSON.parse(localStorage.getItem("user_logged"));
    if (!leads[user.username]) {
      leads[user.username] = {
        [uuid()]: {
          name: "Cliente em Potencial",
          items: [],
        },
        [uuid()]: {
          name: "Dados Confirmados",
          items: [],
        },
        [uuid()]: {
          name: "Reunião Agendada",
          items: [],
        },
      };
    }

    let id = "";
    Object.entries(leads[user.username]).forEach((lead) => {
      if (lead[1].name === lead_save.status) {
        id = lead[0];
      }
    });
    leads[user.username][id].items.push(lead_save);
    this.setLeads(leads[user.username]);
  };

  setLeads = (leads) => {
    const user = JSON.parse(localStorage.getItem("user_logged"));
    this.leads[user.username] = leads;
    this.leads_ = leads;
    localStorage.setItem("leads", JSON.stringify(this.leads));
  };
}

const user = new UserStore();
export { user };
