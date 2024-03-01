import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='blog-nav'>
            <label></label>
            <ul>
                <li>
                    <Link to='/home/blogs'>View Blogs</Link>
                </li>
                <li>
                    <Link to='create'>Create Blog</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;