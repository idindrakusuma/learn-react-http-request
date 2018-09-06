import React, { Component } from 'react';
import axios from '../../../common/axios.service';

import classes from './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Indra Kusuma'
    }

    setNullStateHandler = () => {
        this.setState({
            title: '',
            content: '',
            author: 'Indra Kusuma'
        })
    }

    newPostHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }

        axios.post('/posts.json', data)
            .then(res => {
                console.log(res.data)
                alert('Post successfull!')
                this.setNullStateHandler();
            })
            .catch(err => {
                console.log(err)
            })
        
    }

    render () {
        return (
            <div className={classes.NewPost}>
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Indra Kusuma">Indra Kusuma</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.newPostHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;