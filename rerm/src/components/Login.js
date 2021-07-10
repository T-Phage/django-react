import React from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import Success from './SuccessModal'

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            longindetails: {username: "", password: ""},
            show:false,
            success:false
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlesignout = this.handlesignout.bind(this);
    }

    componentDidMount(){
        this.handlesignout()
    }

    showSuccess = () => {
        this.setState({
            ...this.state.success,
            success: true
        })
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
                this.showSuccess()
                
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
            // console.log('Data :', data) 
            localStorage.setItem('access_token', '')
            localStorage.setItem('refresh_token', '')
        })
    }

    render() {
        return(
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
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
                <p className="create-account text-right">
                    Click to <Link to={"/sign-up"}>Create an Account</Link>
                </p>
                 <Modal show={this.state.show} handleClose={this.hideModal}>
                    <p>Modal</p>
                    No active account found with the given credentials

                    <button type="button" className="btn btn-danger btn-block" onClick={this.hideModal}>
                    Retry
                    </button>
                    {/* <Link to={"/sign-in"}>Retry</Link> */}
                </Modal>
                <Success show={this.state.success} >
                    Successfully logged in
                    <br />
                    <a href="/dash">Ok</a>
                </Success>
            </form>
        )
    }
}
