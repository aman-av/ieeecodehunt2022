import React, { Component,useState,useEffect } from 'react';
import { BrowserRouter, Route, withRouter,Switch,Redirect } from 'react-router-dom';
import Login from './Login'
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Final from './Final';
import Quiz from './Quiz';
import WaitPage from './wait';

function App() {

  // const [auth, setauth] = useState(null)
  // useEffect(() => {
  //   fetch('/api/auth').
  //   then(ree=>ree.json())
  //   .then(re=>{console.log(re)
  //     setauth(re)})
    
  // },[])
  

  return (
    <div>
       {/* <div className="container" > */}
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/Login" component={Login}/>
            <Route exact path="/" component={Landing} />
            <Route exact path="/Quiz" component={Quiz} />
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Final" component={Final} />
            <Route exact path="/Wait" component= {WaitPage}/>
           
          </div>
        </BrowserRouter>
      {/* </div> */}
    </div>
  )
}

export default App

