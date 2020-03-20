import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Presentation from "./layouts/Presentation";

export default function App(props: any) {
  return (
    <Router>
      {props.children}
      <Switch>
        <Route path="/">
          <Presentation />
        </Route>
      </Switch>
    </Router>
  );
}
