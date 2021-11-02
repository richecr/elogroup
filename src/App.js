import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Leads from "./pages/Leads";
import NewLead from "./pages/NewLead";

const App = () => {
  const [titleHeader, setTitleHeader] = useState();

  return (
    <BrowserRouter>
      <Header titleHeader={titleHeader} setTitleHeader={setTitleHeader} />
      <Switch>
        <Route exact path="/">
          <Login setTitleHeader={setTitleHeader} />
        </Route>
        <Route exact path="/register" component={Register} />
        <Route exact path="/leads">
          <Leads setTitleHeader={setTitleHeader} />
        </Route>
        <Route exact path="/new_lead">
          <NewLead setTitleHeader={setTitleHeader} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
