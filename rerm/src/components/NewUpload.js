import React from 'react';
import { Link } from 'react-router-dom';

export default class CreateAccount extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title : "",
            content : "",
            image : null,
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleFileInput(e){
        console.log(e) 
        this.setState({[e.target.name]: e.target.value});
        // var imagedata = document.querySelector('input[type="file"]').files[0];
        // this.setState({[e.target.name]: imagedata});
        console.log(this.state)
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state)
    }

    handleSubmit(e){
        e.preventDefault()

        fetch("http://127.0.0.1:8000/create-user/", {
            method : 'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'omit',
            headers: {
                // 'Content-Type' : 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json',
                'accept': 'application/json',         
            }, 

            body: JSON.stringify(this.state)
        })
        .then(res => {
            res.json()
            console.log(res)
        })
        .catch(e => {
            console.log(e)
        })
        // (error) => {
        // //   setIsLoaded(true);
        // //   console.log(error);
        // })
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" onChange={this.handleChange} value={this.title} name="title" className="form-control" placeholder="title" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={this.handleChange} value={this.content} name="content" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={this.handleChange} value={this.password} name="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <Link to={"/sign-in"}>sign in?</Link>
                </p>
            </form>
        )
    }

}