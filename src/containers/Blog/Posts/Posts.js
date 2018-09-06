import React, { Component } from 'react';
import axios from '../../../common/axios.service';
import { Route } from 'react-router-dom';

import classes from './Posts.css';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

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
        this.props.history.push({ pathname: '/post/' + id });
    }
    
  render () {
    let posts = <p style={{ textAlign: 'center'}}>Somethng went wrong!</p>
    if(!this.state.error) {
        posts = this.state.posts.map( post => {
            return (
                <Post
                    key={post.id}  
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
            );
        })
    }
    
    return (
      <div>
        <section className={classes.Posts}>
            {posts}
        </section>
        <Route path='/post/:id' exact component={FullPost} />
      </div>
    )
  }
}

export default Posts;