import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Presentation from "./layouts/Presentation";
import Home from "./layouts/Home";

export default function App(props: any) {
  return (
    <Router>
      {props.children}
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/presentation" exact>
            <Presentation />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
