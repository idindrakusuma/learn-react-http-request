import React, { Component } from 'react';
import axios from '../../../common/axios.service';

import classes from './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount () {
        console.log('[FullPost.js] componentDidMount..');
        this.fetchDatahandler();
    }

    componentWillUnmount () {
        console.log('[FullPost.js] componentWillUnMount');
        this.setState({ loadedPost: null })
    }

    componentDidUpdate (nextProps) {
        console.log('[FullPost.js] componentDidUpdate');
        if (nextProps.match.params.id === this.props.match.params.id) return false;
        this.fetchDatahandler();
    }

    shouldComponentUpdate(nextProps, nextState) { 
        return (this.props.match.params.id && !this.state.loadedPost) || (nextState.loadedPost !== this.state.loadedPost) || (nextProps.match.params.id !== this.props.match.params.id);
    }

    fetchDatahandler () {
        console.log('[FullPost.js] Try to fetch data from server..');
        if (this.props.match.params.id) {
            console.log('[FullPost.js] Request data from server...');
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
        if(this.props.match.params.id) post = <p style={{textAlign: 'center'}}>loading..</p>;
        
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