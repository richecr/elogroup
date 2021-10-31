import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
