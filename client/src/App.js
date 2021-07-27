import React, { Component,useState,useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Final from './Final';
import Quiz from './Quiz';

function App() {

  const [auth, setauth] = useState(null)
  useEffect(() => {
    fetch('/api/auth').
    then(ree=>ree.json())
    .then(re=>{console.log(re)
      setauth(re)})
    
  },[])
  

  return (
    <div>
       <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/Quiz" component={auth!=null?Quiz:Landing} />
            <Route exact path="/Dashboard" component={auth!=null?Dashboard:Landing} />
            <Route exact path="/Final" component={auth!=null?Final:Landing} />
           
          </div>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
