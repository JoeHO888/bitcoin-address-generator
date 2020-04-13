import React from 'react';
import './App.css';
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { HDGenerator } from "./components/HDGenerator";
import { Home } from "./components/Home";
import { MultiSigGenerator } from "./components/MultiSigGenerator";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="App-body">
          <Switch>
            <Route exact path="/multisig-generator">
              <MultiSigGenerator />
            </Route>
            <Route exact path="/hd-generator">
              <HDGenerator />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>

  );
}

export default App;
