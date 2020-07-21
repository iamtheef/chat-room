import React from "react";
import "./App.css";
import { Landing } from "./Components/Landing";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/login" component={Landing} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
