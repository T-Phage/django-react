import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router';
import Modal from './Modal';


export default class Signup extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            show: false,
            dept:[],
            user: {
                email : "",
                username : "",
                firstname : "",
                surname : "",
                othername : "",
                department : null,
                password : "",
                gender : "",
                image: null,
            }
        };
        

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.alldepartments = this.alldepartments.bind(this);
        
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    
    componentDidMount(){
        this.alldepartments()
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

    alldepartments(){
        var dept = []
        fetch('https://testingmyapis.herokuapp.com/api/departments/')
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            this.setState({
                dept:data
            })
        });
    }

    handleChange(event) {
        this.setState({
            user:{
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        });
        // console.log(this.state.user)
    }
    handleFileInput(e){
    //    console.log(e) 
       
       this.setState({
           user:{
            ...this.state.user,   
            [e.target.name]: e.target.value
           }
        });
    }
    
    handleSubmit(e){
        e.preventDefault()

        var imagedata = document.querySelector('input[type="file"]').files[0];
        let form_data = new FormData();
        form_data.append('image', imagedata);
        form_data.append('email', this.state.user.email);
        form_data.append('username', this.state.user.username);
        form_data.append('firstname', this.state.user.firstname);
        form_data.append('surname', this.state.user.surname);
        form_data.append('othername', this.state.user.othername);
        form_data.append('department', this.state.user.department);
        form_data.append('password', this.state.user.password);
        form_data.append('gender', this.state.user.gender);
        form_data.append('image', imagedata);
           
        let url = 'https://testingmyapis.herokuapp.com/api/save-user/';
        axios.post(url, form_data, {
            headers: {
            'content-type': 'multipart/form-data',
            'accept': 'application/json',
            }
        })
        .then(res => {
            // console.log(res)
            // console.log(res.data);
            if (res.data.message === "saved successfully"){
               this.showModal()
            }
        })
        .catch(err => console.log("ERROR :", err))
    }

    render() {
        var depts = this.state.dept
        var self = this
        return(
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" onChange={this.handleChange} value={this.state.user.firstname} name="firstname" className="form-control" placeholder="First name" required />
                </div>

                <div className="form-group">
                    <label>Surname</label>
                    <input type="text" onChange={this.handleChange} value={this.state.user.surname} name="surname" className="form-control" placeholder="surname" required/>
                </div>

                <div className="form-group">
                    <label>Othernames</label>
                    <input type="text" onChange={this.handleChange} value={this.state.user.othername} name="othername" className="form-control" placeholder="Othername" />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" onChange={this.handleChange} value={this.state.user.username} name="username" className="form-control" placeholder="username" required/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={this.handleChange} value={this.state.user.email} name="email" className="form-control" placeholder="Enter email" required/>
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <select className="form-control" onChange={this.handleChange} value={this.state.user.gender} name="gender">
                        <option > --Select gender--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Department</label>
                    <select className="form-control deptSelect" onChange={this.handleChange} value={this.state.user.department} name="department" required >
                        <option> --Select department-- </option>
                        {depts.map(function(dept, index){
                            return(
                                <option key={dept.dept_id} value={dept.dept_id}>{dept.dept_name}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="form-group" >
                    <label>Upload profile picture</label>
                    <input type="file" name="userimage" onChange={this.handleFileInput} value={this.state.user.image} className="form-control" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={this.handleChange} value={this.state.user.password} name="password" className="form-control" placeholder="Enter password" required />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <Link to={"/sign-in"}>sign in?</Link>
                </p>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <p>Modal</p>
                    <Link to={"/sign-in"}>Ok</Link>
                </Modal>
                {/* <button type="button" onClick={this.showModal}>open</button> */}
            </form>
        )
    }
}
