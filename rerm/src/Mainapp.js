import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Modal from './components/Modal';
import Profile from './components/Profile';
// import './index.css'

export default class Mainapp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show:false,
            currentuser: [],
            longindetails: {username: "", password: ""},
        }

        this.getCurentUser = this.getCurentUser.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.refreshToken = this.refreshToken.bind(this)
        this.after5minutes = this.after5minutes.bind(this)
        // this.handlesignout = this.handlesignout.bind(this)
    }

    componentDidMount() {
        this.getCurentUser()
    }

    showModal = () => {
        this.setState({
            ...this.state.show,
            show: true
        })
    }

    hideModal = () => {
        this.setState({
            ...this.state.show,
            show: false
        })
    }

    after5minutes(){
        setInterval( function(){console.log('after')},5000)
    }

    refreshToken(){
        fetch('https://testingmyapis.herokuapp.com/api/token/refresh/',{ 
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'omit',
            headers: {
                // 'Content-Type' : 'application/x-www-form-urlencoded'
                'Content-Type': 'application/json',
                'accept': 'application/json',              
            }, 
            body: JSON.stringify({'refresh': localStorage.getItem('refresh_token')})
        })
        .then(response => response.json())
        .then(data => {
            // console.log('Data :', data)
            
            if (data.access){
                localStorage.setItem('access_token', data.access)
                localStorage.setItem('refresh_token', data.refresh)
                this.showSuccess()
                this.getCurentUser()
            }
            else if(data.detail){
                // 'No active account found with the given credentials'
                // console.log('not valid')
                localStorage.setItem('access_token', '')
                localStorage.setItem('refresh_token', '')
                this.showModal()
            } 
        })
        .catch((error) => {
            // console.log(error)
        })
    }

    getCurentUser(){
        fetch('https://testingmyapis.herokuapp.com/api/active/user/',{ 
            method : 'GET',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'omit',
            headers: {
                // 'Content-Type' : 'application/x-www-form-urlencoded'
                'Content-Type': 'application/json',
                'accept': 'application/json',  
                'Authorization': 'JWT ' + localStorage.getItem('access_token')             
            }, 
            // body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(data => {
            // console.log('Data :', data)
            if(data.code === "token_not_valid"){
                this.showModal()
                    // this.refreshToken()
            }   else {
                // console.log('gfhk')
                this.setState({
                    currentuser:data
                });
                // this.state.currentuser.append(data)
                // console.log("user :",this.state.currentuser)
            }
        })
        .catch((error) => {
            // console.log(error)
        })
    }

    handleChange(event) {
        this.setState({
            longindetails:{
                ...this.state.longindetails,
                [event.target.name]: event.target.value}
        });
        // console.log(this.state.longindetails)
    }

    handleSubmit(event) {
        // alert('A username and password was submitted: ' + this.state.username + " " + this.state.password);
        event.preventDefault();
        fetch('https://testingmyapis.herokuapp.com/api/token/obtain/', {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'omit',
            headers: {
                // 'Content-Type' : 'application/x-www-form-urlencoded'
                'Content-Type': 'application/json',
                'accept': 'application/json',           
            }, 
            body: JSON.stringify(this.state.longindetails)
        })
        .then(response => response.json())
        .then(data => {
            // console.log('Data :', data)
            
            if (data.access){
                localStorage.setItem('access_token', data.access)
                localStorage.setItem('refresh_token', data.refresh)
                this.hideModal()
                this.getCurentUser()
                window.location.reload()
            }
            else if(data.detail){
                // 'No active account found with the given credentials'
                // console.log('not valid')
                localStorage.setItem('access_token', '')
                localStorage.setItem('refresh_token', '')
                this.showModal()
            } 
        })
        .catch((error) => {
            // console.log(error)
        })
    }

    handlesignout(){
        // e.preventDefault()
        fetch('https://testingmyapis.herokuapp.com/api/user/logout/', {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'omit',
            headers: {
                // 'Content-Type' : 'application/x-www-form-urlencoded'
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('access_token'),       
            }, 
            body: JSON.stringify({'refresh':localStorage.getItem('refresh_token')})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data :', data) 
            localStorage.setItem('access_token', '')
            localStorage.setItem('refresh_token', '')
        })
        

    }

    render() {
    return (<Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>positronX.io</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  {/* <Link className="nav-link" to={} onClick={this.hahandlesignout}>Logout</Link> */}
                </li>
                <li className="nav-item">
                  {/* <Link className="nav-link" to={"/sign-up"}>Sign up</Link> */}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
        <div>
            <Modal show={this.state.show} handleClose={this.hideModal}>
                   
                Session closed

                <form onSubmit={this.handleSubmit}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" value={this.state.longindetails.username} onChange={this.handleChange} className="form-control" placeholder="Enter username" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.longindetails.password} onChange={this.handleChange} className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            {/* <input type="checkbox" className="custom-control-input" id="customCheck1" /> */}
                            {/* <label className="custom-control-label" htmlFor="customCheck1">Remember me</label> */}
                            <br />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                    <p className="create-account text-right">
                        Click to <Link to={"/sign-up"}>Create an Account</Link>
                    </p>
                </form>
                    <br />
                    {/* <Link to={"/sign-in"}>Login</Link> */}
            </Modal>
            <div className="auth-wrapper">
                <div className="auth-inner"> 
                    
                <Switch>
                    <Route exact path='/dash' component={Profile} />
                    <Route path="/profile" component={Profile} />
                </Switch>
                </div>
            </div>
        </div>
      </Router>
    );
  }
}