import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Routes
// import Login from './Components/Login';
// import Home1 from './Components/Home1';
// import Todos from './Components/Todos';
// import Register from './Components/Register';
// import Admin from './Components/Admin';

import PrivateRoute from './Private/PrivateRoute';
import UnPrivateRoute from './Private/UnPrivateRoute';
import SignIn from "./components/pages/signin/SignIn";
import SignUp from "./components/pages/signup/SignUp";
import MainApp from "./MainApp";



class App extends Component {
  render() {
    return (
      <Router>
        <UnPrivateRoute exact path="/" component={SignIn} />
        <UnPrivateRoute exact path="/signup" component={SignUp} />
        <PrivateRoute path="/mainapp" component={MainApp}/>


      {/* <Route exact path="/" component={Home1}/>
      <UnPrivateRoute path="/login" component={Login}/>
      <UnPrivateRoute path="/register" component={Register}/>
      <PrivateRoute path="/admin" roles={["admin"]} component={Admin}/> */}
      </Router>
    );
  }
}

export default App;
