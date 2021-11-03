class UserService {
    constructor() {
        this.USER_STORAGE = "users";
        this.USER_LOGGED_STORAGE = "user_logged";
    }

    getAll() {
        let users = [];
        if (localStorage.hasOwnProperty(this.USER_STORAGE)) {
            users = JSON.parse(localStorage.getItem(this.USER_STORAGE));
        } else {
            localStorage.setItem(this.USER_STORAGE, JSON.stringify(users));
        }

        return users;
    }

    save(user) {
        let users = this.getAll();
        users.push(user);
        localStorage.setItem(this.USER_STORAGE, JSON.stringify(users));
    }

    login(user) {
        let users = this.getAll();
        let auth = users.filter(
            (user_db) =>
                user_db.username === user.username &&
                user_db.password === user.password
        );

        return auth.length > 0;
    }

    logout() {
        if (localStorage.hasOwnProperty(this.USER_LOGGED_STORAGE)) {
            localStorage.removeItem(this.USER_LOGGED_STORAGE);
            return true;
        }

        return false;
    }

    is_logged() {
        return localStorage.hasOwnProperty(this.USER_LOGGED_STORAGE);
    }
}

export default UserService;
