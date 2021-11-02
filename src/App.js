import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Leads from "./pages/Leads";

const App = () => {
  return (
    <div className="main">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/leads" component={Leads} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
