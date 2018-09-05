import React, { Component } from 'react';
import classes from './Blog.css';

import Posts from './Posts/Posts';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostID: null,
        error: false
    }
    
    render () {
        return (
            <div>
                <header className={classes.Blog}>
                    <nav>
                        <ul>
                            <li> <a href="/">Home</a></li> |
                            <li> <a href="/new-post">New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <Posts />
            </div>
        );
    }
}

export default Blog;