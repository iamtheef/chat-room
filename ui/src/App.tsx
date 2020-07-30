import React from "react";
import "./App.css";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";
import { Landing } from "./Components/Landing";
import { MainRoom } from "./Components/MainRoom";

function App() {
  return (
    <div className="App container">
      <HashRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/login" component={Landing} />
          <Route exact path="/main" component={MainRoom} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
