import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../../../common/axios.service';

import classes from './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Indra Kusuma',
        submitted: false
    }

    newPostHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }

        axios.post('/posts.json', data)
            .then(res => {
                alert('Post successfull!');
                this.props.history.replace('/posts');
                // this.setState({ submitted: true });
            })
            .catch(err => {
                console.log(err);
            })
        
    }

    render () {
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to="/" />
        }
        return (
            <div className={classes.NewPost}>
                { redirect }
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