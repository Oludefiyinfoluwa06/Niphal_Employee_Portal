import React from 'react';
// import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    return (
        <div className='blog-card' key={blog._id}>
            <img src={`https://nep-api.vercel.app/blog/${blog.blogImage}`} alt={blog.title} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <Link to={blog._id}><h5>{blog.title}</h5></Link>
                {/* <Link to={blog._id}><FaArrowUpRightFromSquare /></Link> */}
            </div>
            <p>{blog.category}</p>
        </div>
    );
}

export default BlogCard;