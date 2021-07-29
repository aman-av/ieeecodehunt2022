import React, { Component,useState,useEffect } from 'react';
import { BrowserRouter, Route, withRouter,Switch,Redirect } from 'react-router-dom';
import Login from './Login'
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Final from './Final';
import Quiz from './Quiz';

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
       <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/Login" component={Login}/>
            <Route exact path="/" component={Landing} />
            <Route exact path="/Quiz" component={Quiz} />
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Final" component={Final} />
           
          </div>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     // Store the previous pathname and search strings
//     this.currentPathname = null;
//     this.currentSearch = null;
//   }

//   componentDidMount() {
//     const { history } = this.props;

//     history.listen((newLocation, action) => {
//       if (action === "PUSH") {
//         if (
//           newLocation.pathname !== this.currentPathname ||
//           newLocation.search !== this.currentSearch
//         ) {
//           // Save new location
//           this.currentPathname = newLocation.pathname;
//           this.currentSearch = newLocation.search;

//           // Clone location object and push it to history
//           history.push({
//             pathname: newLocation.pathname,
//             search: newLocation.search
//           });
//         }
//       } else {
//         // Send user back if they try to navigate back
//         history.go(1);
//       }
//     });
//   }

//   render() {
//     return (
//       <div>
//         <div className="container">
//           <Switch>
//              <Header />
             
//              <Route exact path="/" render={() => <Redirect to="/Landing" />}
//             //  component={Landing} 
//              />
//              <Route exact path="/Login" component={Login}/>
//              <Route exact path = "/Landing" component= {Landing} />
//              <Route exact path="/Quiz" component={Quiz} />
//              <Route exact path="/Dashboard" component={Dashboard} />
//              <Route exact path="/Final" component={Final} />         
//            </Switch>
//        </div>
//      </div>
//       // <Switch>
//       //   <Route exact path="/" render={() => <Redirect to="/page1" />} />
//       //   <Route path="/page1" component={Page1} />
//       //   <Route path="/page2" component={Page2} />
//       //   <Route path="/page3" component={Page3} />
//       // </Switch>
//     );
//   }
// }

// export default withRouter(App);
