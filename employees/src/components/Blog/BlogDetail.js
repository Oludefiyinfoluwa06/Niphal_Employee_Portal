import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../Loading';

const BlogDetail = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [blogDetails, setBlogDetails] = useState({});
    const navigate = useNavigate();
    const { blogId } = useParams();

    const token = localStorage.getItem('token');

    useEffect(() => {
        setIsLoading(true);
        
        axios.get(`https://nep-api.vercel.app/api/blogs/employee/${blogId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res);
                setBlogDetails(res.data.blog);
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
    }, [token, blogId, error, navigate]);

    const createdAt = new Date(blogDetails.createdAt);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = createdAt.toLocaleDateString('en-US', options);


    return (
        <div className='blog-detail'>
            {isLoading ? <Loading /> : 
                <>
                    <img src={`https://nep-api.vercel.app/blog/${blogDetails.blogImage}`} alt={blogDetails.title} />
                    <div className="blog-header">
                        <h3>{blogDetails.title}</h3>
                        <h3>{formattedDate}</h3>
                    </div>
                    <p style={{ marginTop: '15px' }}>{blogDetails.content}</p>
                </>
            }
        </div>
    );
}

export default BlogDetail;