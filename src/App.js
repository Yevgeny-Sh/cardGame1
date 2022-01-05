//import React, { Component } from "react";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Game from "./components/Game";
import HomePage from "./components/HomePage";
import Instructions from "./components/Instructions";
//import NotFound from "./NotFound";
function App() {
  return (
    <div className="app-main-container">
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/game" exact component={Game} />
            <Route path="/Instructions" exact component={Instructions} />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
