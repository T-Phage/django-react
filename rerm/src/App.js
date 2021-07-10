import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Mainapp from './Mainapp';
import Accounts from './Accounts';

class App extends React.Component {

  render() {
    return (<Router>
      {/* <div className="App">
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
      </div> */}
 
      <div> {/* className="auth-wrapper"> */}
        <div> {/* className="auth-inner"> */}
          <Switch>
            <Route exact path='/dash' component={Mainapp}></Route>
            <Route path="/" component={Accounts} />
            {/* <Route path="/sign-up" component={SignUp} /> */}
            {/* <Route path="/dash/profile" component={Profile} /> */}
          </Switch>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
