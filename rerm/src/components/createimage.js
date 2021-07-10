import React, { Component } from 'react';
import axios from 'axios';
//  This is working
class CreateImage extends Component {

  state = {
    title: '',
    content: '',
    image: null
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
    console.log(e.target.files)
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    var imagedata = document.querySelector('input[type="file"]').files[0];
    let form_data = new FormData();
    form_data.append('image', imagedata);//this.state.image) //, this.state.image.name);
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
    
        // fetch(url, {
        //     method: 'POST',
        //     credentials: 'omit',
        //   headers: {
        //       // 'content-type': 'multipart/form-data',
        //       // 'accept': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     'image': imagedata,
        //     'title': this.state.title,
        //     'content': this.state.content
        //   })
        // })
        //     .then(res => {
        //       console.log(res.data);
        //     })
        //     .catch(err => console.log(err))
      };

  render() {
    return (
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
                   name="image"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
          </p>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default CreateImage;