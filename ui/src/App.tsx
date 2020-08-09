import React from "react";
import "./App.css";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";
import { Landing } from "./Components/Landing";
import { MainRoom } from "./Components/MainRoom";
import { Inbox } from "./Components/Inbox";

function App() {
  return (
    <div className="App container">
      <HashRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/login" component={Landing} />
          <Route exact path="/main" component={MainRoom} />
          <Route exact path="/inbox" component={Inbox} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
