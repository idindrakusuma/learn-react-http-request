import React, { Component } from 'react';
import axios from '../../../common/axios.service';

import classes from './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }
    
    componentWillUnmount () {
        this.isCancelled = true;
    }

    componentDidMount () {
        console.log('component did mount');
        if (this.props.match.params.id) {
            if (this.state.loadedPost && this.state.loadedPost.id === this.props.match.params.id) return;
            !this.isCancelled && this.fetchDatahandler();
        }
    }

    componentDidUpdate () {
        console.log('component did update');
        if (this.state.loadedPost.id === this.props.match.params.id) return;
        else this.fetchDatahandler();
    }


    fetchDatahandler = () => {
        axios.get('/posts/' + this.props.match.params.id + '.json')
            .then(res => {
                let data = res.data;
                let updatedData = {
                    ...data,
                    id: this.props.match.params.id
                }
                 this.setState({ loadedPost: updatedData })
            })
            .catch(err => {
                console.log(err);
            })
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