import { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "antd/dist/antd.css";

import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Leads from "./pages/Leads";
import NewLead from "./pages/NewLead";
import { useUserStore } from "./providers/User/UserProvider";
import "./App.css";

const App = () => {
    const [titleHeader, setTitleHeader] = useState();
    const UserStore = useUserStore();

    return (
        <BrowserRouter>
            <Header titleHeader={titleHeader} setTitleHeader={setTitleHeader} />
            <Switch>
                <Route exact path="/">
                    {UserStore.is_authenticated() ? (
                        <Redirect to="/leads" />
                    ) : (
                        <Login setTitleHeader={setTitleHeader} />
                    )}
                </Route>
                <Route exact path="/register">
                    {UserStore.is_authenticated() ? (
                        <Redirect to="/leads" />
                    ) : (
                        <Register />
                    )}
                </Route>
                <Route exact path="/leads">
                    {UserStore.is_authenticated() ? (
                        <Leads setTitleHeader={setTitleHeader} />
                    ) : (
                        <Register />
                    )}
                </Route>
                <Route exact path="/new_lead">
                    {UserStore.is_authenticated() ? (
                        <NewLead setTitleHeader={setTitleHeader} />
                    ) : (
                        <Register />
                    )}
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
