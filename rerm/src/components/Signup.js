import React from 'react';
import { Link } from 'react-router-dom';

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export default class Signup extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            email : "",
            username : "",
            firstname : "",
            surname : "",
            othername : "",
            department : "",
            password : "",
            gender : "",
            userimage: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleFileInput = this.handleFileInput.bind(this)
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state)
    }
    handleFileInput(e){
       console.log(e) 
    //    this.setState({[e.target.name]: e.target.value});
    }
    
    handleSubmit(e){
        e.preventDefault()
        const target = e.target;
        // console.log(target)
        // var object = {};
        // var formData = new FormData(target);
        // formData.append('usermage', 'dsdf')
        // console.log("form :",formData)
        // formData.forEach(function(value, key){
        //     object[key] = value;
        // });
        // console.log(object)
        // var json = JSON.stringify(object);
        // console.log(json)
        

        // for (var [key, value] of formData.entries()) { 
        //     console.log(key, value);
        //     object[key] = value
            // this.setState({[key]: [value]})   
            // console.log(this.state) 
        // }
        // console.log(object)
        // for (var [key, value] of formData.entries()) { 
        //     console.log(key, value);
        // }

        // console.log(formData)
        var data = new FormData();
        var imagedata = document.querySelector('input[type="file"]').files[0];
        console.log(imagedata)
        data.append("data", imagedata);
        // const csrfToken = getCookie('CSRF-TOKEN');
        const csrftoken = getCookie('csrftoken');
        fetch("http://127.0.0.1:8000/api/create/user/", {
            method : 'POST',
            mode : 'cors',
            cache : 'default',
            credentials : 'omit',
            headers: {
                // 'Content-Type' : 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json',
                'accept': 'application/json',          
                'X-CSRF-TOKEN': csrftoken,
            }, 

            // body: JSON.stringify(this.state)
            body: JSON.stringify({

            })
        })
        .then(res => {
            res.json()
            console.log(res)
        })
        // .then(data => {
        //     console.log("DATA :", data)
        // })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" onChange={this.handleChange} value={this.firstname} name="firstname" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Surname</label>
                    <input type="text" onChange={this.handleChange} value={this.surname} name="surname" className="form-control" placeholder="surname" />
                </div>

                <div className="form-group">
                    <label>Othernames</label>
                    <input type="text" onChange={this.handleChange} value={this.othername} name="othername" className="form-control" placeholder="Othername" />
                </div>


                <div className="form-group">
                    <label>Username</label>
                    <input type="text" onChange={this.handleChange} value={this.othername} name="username" className="form-control" placeholder="username" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={this.handleChange} value={this.email} name="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <select className="form-control" onChange={this.handleChange} value={this.gender} name="gender">
                        <option > --Select gender--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Department</label>
                    <input type="text" onChange={this.handleChange} value={this.department} name="department" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group" >
                    <label>Upload profile picture</label>
                    <input type="file" name="userimage" onChange={this.handleFileInput} value={this.userimage} className="form-control" />
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