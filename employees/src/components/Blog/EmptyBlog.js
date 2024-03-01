import React from 'react';
import emptyBlog from '../../images/empty_blog.png';
import { Link } from 'react-router-dom';

const EmptyBlog = () => {
    return (
        <div className='empty-blog'>
            <img src={emptyBlog} alt="Empty blog" />
            <p>You have not created any blog, <Link to='/home/blogs/create'>Start here</Link></p>
        </div>
    );
}

export default EmptyBlog;