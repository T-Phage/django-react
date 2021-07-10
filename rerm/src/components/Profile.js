import React from 'react';

export default class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show:false,
            currentuser: [],
            longindetails: {}
        }

        this.getCurentUser = this.getCurentUser.bind(this)
    }

    componentDidMount() {
        this.getCurentUser()
    }

    // componentDidUpdate(){
    //     this.getCurentUser()
    // }

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

    getCurentUser(){
        fetch('http://127.0.0.1:8000/api/active/user/',{ 
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
            }   else {
                // console.log('gfhk')
                this.setState({
                    ...this.state.currentuser,
                    currentuser:[data]
                });
                // this.state.currentuser.append(data)
                // console.log("user :", this.state.currentuser)
                // console.log('id', this.state.currentuser)
            }
        })
        .catch((error) => {
            // console.log(error)
        })
    }

    
    render(){
        var user = this.state.currentuser
        var self = this        
        return(
            <div>
                {/* <h2 style={{textAlign:'center'}}>User Profile</h2>
                <div className="card">

                    <img src="" alt="img" style={{width:'100%'}}/>
                    <h1>{user.id} </h1>
                    <p className="title">Student</p>
                    <p>School</p>
                    <div>
                        
                    </div>
                </div> */}
                {user.map(function(user, index){
                    return(
                        <div key={index}>
                        <h2 style={{textAlign:'center'}}>User Profile</h2>
                        <div className="card">

                            <img src={user.userimage} alt="img" style={{width:'100%'}}/>
                            <h1>{user.name} </h1>
                            <p className="">{user.email}</p>
                            <p>{user.department}</p>
                            <p>{user.faculty}</p>
                            <p>{user.gender}</p>
                            <p>{user.username}</p>
                            <p>Developer</p>
                            {/* <p>{user.userimage}</p> */}
                            <div>
                               <a href="/sign-in">Logout</a> 
                            </div>
                        </div>
                        </div>
                    )
                })}
            </div>
        )
        
    }
}
