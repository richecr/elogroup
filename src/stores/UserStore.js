import { action, makeObservable, observable } from "mobx";

import UserService from "../service/UserService";

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
            verify_logged: action,
        });
        this.service = new UserService();
    }

    updateField = (field, new_value) => {
        this[field] = new_value;
    };

    createUser = () => {
        try {
            this.service.save({
                username: this.username,
                password: this.password,
            });
        } catch (e) {
            console.error(e);
        }
    };

    login = () => {
        try {
            const user = {
                username: this.username,
                password: this.password,
            };
            let auth = this.service.login(user);
            if (auth) {
                localStorage.setItem("user_logged", JSON.stringify(user));
                this.is_logged = true;
            } else {
                this.is_logged = false;
            }
        } catch (e) {
            console.error(e);
            this.is_logged = false;
        }
    };

    logout = () => {
        if (this.service.logout()) {
            this.is_logged = false;
        }
    };

    verify_logged = () => {
        if (this.service.is_logged()) {
            this.is_logged = true;
        } else {
            this.is_logged = false;
        }
    };

    is_authenticated = () => {
        this.verify_logged();
        return this.is_logged;
    };
}

const user = new UserStore();
export { user };
