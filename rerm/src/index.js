import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Mainapp from './Mainapp';
import Profile from './components/Profile';

ReactDOM.render(
  <BrowserRouter>
    {/* <App /> */}
    <Switch>
      <Route path="/" component={App} />
      <Redirect from="/" to="/dash" />
      <Route path="/dash" component={Mainapp} />
      <Route path="/dash/profile" component={Profile} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
