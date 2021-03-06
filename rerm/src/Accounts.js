import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Signup from './components/OkSignup';
import Login from './components/Login';

export default class Accounts extends React.Component {
    render() {
    return (<Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>positronX.io</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      
      <div className="auth-wrapper"> 
        <div className="auth-inner">
         
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={Signup} />
            {/* <Route path="/dash/profile" component={Profile} /> */}
          </Switch>
        </div>
      </div>
      </Router>
    );
  }
}
