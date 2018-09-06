import React, { Component } from 'react';
import axios from '../../../common/api.service';
import { Link } from 'react-router-dom';

import classes from './Posts.css';

import Post from '../../../components/Post/Post';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/posts')
            .then(res => {
                const posts = res.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Indra Kusuma'
                    }
                })
                this.setState({ posts: updatedPosts })

            })
            .catch(err => {
                console.log(err)
                // this.setState({ error: true })
            })
    }

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostID: id
        })
    }
    
  render () {
    let posts = <p style={{ textAlign: 'center'}}>Somethng went wrong!</p>
    if(!this.state.error) {
        posts = this.state.posts.map( post => {
            return (
                <Link to={'/post/' + post.id} key={post.id}>
                    <Post  
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                </Link>
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