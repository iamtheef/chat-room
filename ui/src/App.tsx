import React from "react";
import "./App.css";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";
import { Landing } from "./Components/Landing";
import { MainRoom } from "./Components/MainRoom";
import { Inbox } from "./Components/Inbox";
import { Info } from "./Components/Info";
import { Settings } from "./Components/Settings";

function App() {
  return (
    <div className="App container">
      <HashRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/login" component={Landing} />
          <Route exact path="/main" component={MainRoom} />
          <Route exact path="/inbox" component={Inbox} />
          <Route exact path="/info" component={Info} />
          <Route exact path="/settings" component={Settings} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
