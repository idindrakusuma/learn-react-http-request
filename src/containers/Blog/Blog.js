import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import classes from './Blog.css';

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
// import FullPost from './FullPost/FullPost';

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
                            <li> <NavLink 
                                    to="/" exact 
                                    activeClassName={classes.Active}>Home</NavLink>
                            </li>
                            <li> <NavLink 
                                    to={{
                                        pathname: '/new-post',
                                        hash: '#submit',
                                        search: 'tag=cloud'
                                    }} 
                                    activeClassName={classes.Active}>New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/new-post" component={NewPost}/>
                    <Redirect from="/posts" to="/" />
                    <Route path="/" component={Posts}/>
                </Switch>
            </div>
        );
    }
}

export default Blog;