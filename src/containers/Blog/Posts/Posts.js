import React, { Component } from 'react';
import axios from '../../../common/axios.service';
// import { Link } from 'react-router-dom';

import classes from './Posts.css';

import Post from '../../../components/Post/Post';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        // console.log(this.props);
        axios.get('/posts.json')
            .then(res => {
                const posts = res.data;
                let updatedData = [];
                for (let key in posts) {
                    let data = posts[key];
                    let addData = {
                        ...data,
                        id: key
                    }
                    updatedData.push(addData)
                }
                this.setState({ posts: updatedData })
            })
            .catch(err => {
                console.log(err)
            })
    }

    postSelectedHandler = (id) => {
        this.props.history.push({ pathname: '/post/' + id })
    }
    
  render () {
    let posts = <p style={{ textAlign: 'center'}}>Somethng went wrong!</p>
    if(!this.state.error) {
        posts = this.state.posts.map( post => {
            return (
                // <Link to={'/post/' + post.id} key={post.id}>
                    <Post
                        key={post.id}  
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                // </Link> 
            );
        })
    }
    
    return (
      <section className={classes.Posts}>
          {posts}
      </section>
    )
  }
}

export default Posts;