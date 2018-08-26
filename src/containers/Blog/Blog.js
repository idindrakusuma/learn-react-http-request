import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostID: null,
        error: false
    }
    
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
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
                this.setState({ error: true })
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
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostID} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;