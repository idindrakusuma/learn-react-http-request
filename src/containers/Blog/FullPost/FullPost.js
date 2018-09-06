import React, { Component } from 'react';
import axios from '../../../common/axios.service';

import classes from './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount () {
        console.log(this.props);
        if(this.props.match.params.id) {
            if(this.state.loadedPost && this.state.loadedPost.id === this.props.id) return;
            axios.get('/posts/' + this.props.match.params.id + '.json')
                .then(res => {
                    this.setState({ loadedPost: res.data })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id + '.json')
            .then(res => {
                console.log(res)
                this.props.history.push({pathname: '/'})
            })
            .catch(err => {
                console.log(err);
            })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id) {
            post = <p style={{textAlign: 'center'}}>loading..</p>;
        }
        if(this.state.loadedPost) {
            post = (
                <div className={classes.FullPost}>
                    <h3>{this.state.loadedPost.title}</h3>
                    <p>{this.state.loadedPost.body}</p>
                    <div className={classes.Edit}>
                        <button className={classes.Delete} onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }
}

export default FullPost;