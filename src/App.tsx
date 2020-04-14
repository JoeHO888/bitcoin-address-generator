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
import { routes } from "./routes";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="App-body">
          <Switch>
            <Route exact path={routes.multiSig.route}>
              <MultiSigGenerator />
            </Route>
            <Route exact path={routes.hdSegWit.route}>
              <HDGenerator />
            </Route>
            <Route path={routes.home.route}>
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
