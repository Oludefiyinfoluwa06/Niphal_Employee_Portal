import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Loading from '../../components/Loading';
import EmptyBlog from '../../components/Blog/EmptyBlog';
import BlogCard from '../../components/Blog/BlogCard';
import '../../styles/Blog/blog.css';

const Blogs = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    
    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }

        setIsLoading(true);
                
        axios.get('https://nep-api.vercel.app/api/blogs/employee', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setBlogs(res.data.blogs);
                console.log(res);
            })
            .catch(err => {
                setError(err.response.data.error);

                if (error === 'No token provided' || error === 'Invalid or expired token') {
                    localStorage.clear();
                    localStorage.removeItem('token');
                    localStorage.removeItem('employee');
                    navigate('/');
                    return;
                }
                console.log(err);
            })
            .finally(() => setIsLoading(false));
    }, [error, navigate, token]);

    return (
        <div className='blog'>
            {isLoading ? <Loading /> : 
                <>
                    {error === 'There are no blogs' ? <EmptyBlog /> : 
                        <div className='blogs'>
                            {blogs.map(blog => (
                                <BlogCard blog={blog} />
                            ))}
                        </div>
                    }
                </>
            }
        </div>
    );
}

export default Blogs;