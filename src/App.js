import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MapView from "./components/mapView/MapView";
import Home from "./components/home/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/map">
          <MapView />;
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;