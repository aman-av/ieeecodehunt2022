import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Final from "./Final";
import Quiz from "./Quiz";
import WaitPage from "./wait";
import Example from "./example";
import Test from "./Test";

function App() {
  const eventEndDate =  new Date(2021,9,29,13,40,0);
  const eventStartDate = new Date(2021,9,29,13,35,0,0);

  return (
    <div>
      {/* <Header /> */}
      <div >
        <BrowserRouter>
          <div>
            <Route exact path="/" component={()=>(<Login eventStartDate = {eventStartDate}  eventEndDate= {eventEndDate} />)}/>
            <Route exact path="/Quiz" component={()=>(<Quiz eventStartDate = {eventStartDate}  eventEndDate= {eventEndDate} />)} />
            <Route exact path="/Dashboard" component={()=>(<Dashboard eventStartDate = {eventStartDate}  eventEndDate= {eventEndDate} />)} />
            <Route exact path="/Final" component={()=>(<Final eventStartDate = {eventStartDate}  eventEndDate= {eventEndDate} />)} />
            <Route exact path="/Wait" component={()=>(<WaitPage eventStartDate = {eventStartDate}  eventEndDate= {eventEndDate} />)} />
            <Route exact path="/Example" component={Example} />
            <Route exact path="/Test" component={Test} />
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
