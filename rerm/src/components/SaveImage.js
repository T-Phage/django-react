import React from 'react';
import axios from 'axios';

export default class SaveImage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             title: '',
            content: '',
            image: null
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };
// this is working
    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
            // image: e.target.value
        })
        console.log(e.target.files)
    };

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state);
        var imagedata = document.querySelector('input[type="file"]').files[0];
        let form_data = new FormData();
        form_data.append('image', this.state.image, this.state.image.name);
        form_data.append('title', this.state.title);
        form_data.append('content', this.state.content);

    // form_data.append('method', 'POST')
        console.log(form_data)
        let url = 'http://localhost:8000/post/';
        axios.post(url, form_data, {
            headers: {
            'content-type': 'multipart/form-data',
            'accept': 'application/json',
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log("ERROR :", err))
        
        // fetch("http://localhost:8000/post/", form_data, {
        //     method : 'POST',
        //     // mode : 'cors',
        //     headers: {
        //         'content-type': 'multipart/form-data;boundary=63c5979328c44e2c869349443a94200e',
        //         // 'Content-type': 'application/json',
        //         'accept': 'application/json',       
        //     }, 

        //     // body: JSON.stringify({
        //     //     'image' : this.state.image, //this.state.image.name,
        //     //     'title' : this.state.title,
        //     //     'content' : this.state.content,
        //     // })
        // })
        // .then(res => {
        //     res.json()
        //     console.log(res)
            
        // })
        // .catch(e => {
        //     console.log(e)
        // })
    }

    render(){
        return(
            <div className="App">
                <form method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">
                <p>
                    <input type="text" placeholder='Title' id='title' value={this.state.title} onChange={this.handleChange} required/>
                </p>
                <p>
                    <input type="text" placeholder='Content' id='content' value={this.state.content} onChange={this.handleChange} required/>
                </p>
                <p>
                    <input type="file"
                        id="image"
                        accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
                </p>
                <input type="submit"/>
                </form>
            </div>
        )
    }
}