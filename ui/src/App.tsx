import React from "react";
import "./App.css";
import { Landing } from "./Components/Landing";
import { MainRoom } from "./Components/MainRoom";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";

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
