import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Final from './Final';

class App extends Component {
 

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Final" component={Final} />
           
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default (App);
