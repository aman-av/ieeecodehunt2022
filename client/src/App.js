import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Final from "./Final";
import Quiz from "./Quiz";
import WaitPage from "./wait";
import Example from "./example";

function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/Quiz" component={Quiz} />
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Final" component={Final} />
            <Route exact path="/Wait" component={WaitPage} />
            <Route exact path="/Example" component={Example} />
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
