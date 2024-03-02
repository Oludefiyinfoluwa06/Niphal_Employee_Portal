import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa6';
import '../../styles/Blog/addblog.css';
import Loading from '../../components/Loading';

const Create = () => {
    const [title, setTitle] = useState('');
    const [blogImage, setBlogImage] = useState();
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const handleNext = () => {
        if (title === '' || !blogImage || category === '') {
            setError('Input fields cannot be empty');
            return;
        }

        setStep(step + 1);
    }

    const handleReturn = () => {
        setStep(step - 1);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        setIsLoading(true);

        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('blogImage', blogImage.name);
        formData.append('category', category);
        formData.append('content', content);

        try {
            const res = await axios.post('https://nep-api.vercel.app/api/blogs/create', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(res);
            navigate('/home/blogs');
        } catch (err) {
            console.log(err);
            if (err.response.data.error === 'No token provided' || err.response.data.error === 'Invalid or expired token') {
                localStorage.clear();
                localStorage.removeItem('token');
                localStorage.removeItem('employee');
                navigate('/');
                return;
            }
            setError(err.response.data.error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className='add-blog' onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="blog-header">
                <div>
                    {step === 2 && (
                        <div className='back-icon' onClick={handleReturn}>
                            <FaArrowLeft />
                        </div>
                    )}
                </div>
                <h1>Create Blog</h1>
            </div>
            {error && <p className='error'>{error}</p>}
            <div className="inputs">
                {step === 1 && (
                    <>
                        <div className="input">
                            <div className="input-box">
                                <label htmlFor="title">Blog title</label>
                                <input type="text" id='title' name='title' value={title} onChange={e => {
                                    setTitle(e.target.value);
                                    setError('');
                                }} />
                            </div>
                            <div className="input-box">
                                <label htmlFor="image">Blog Image</label>
                                <input type="file" id='image' name='image' onChange={e => {
                                    setBlogImage(e.target.files[0]);
                                    setError('');
                                }} />
                            </div>
                        </div>
                        <div className="input-box">
                            <label htmlFor="category">Category</label>
                            <select name="category" id="category" onChange={e => {
                                setCategory(e.target.value);
                                setError('');
                            }}>
                                <option value=''>Select a category</option>
                                <option value='Technology'>Technology</option>
                                <option value='Business'>Business</option>
                                <option value='Finance'>Finance</option>
                                <option value='Entertainment'>Entertainment</option>
                                <option value='Health and Wellness'>Health and Wellness</option>
                                <option value='Fashion'>Fashion</option>
                                <option value='Food'>Food</option>
                                <option value='Travel'>Travel</option>
                                <option value='Lifestyle'>Lifestyle</option>
                                <option value='Parenting'>Parenting</option>
                            </select>
                        </div>
                        <button type='button' onClick={handleNext}>Next</button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="input">
                            <div className="input-box">
                                <label htmlFor="content">Enter the content</label>
                                <textarea name="content" id="content" value={content} onChange={e => {
                                    setContent(e.target.value);
                                    setError('');
                                }}></textarea>
                            </div>
                        </div>
                        <button type='submit' disabled={isLoading}>{isLoading ? <Loading /> : 'Create'}</button>
                    </>
                )}
            </div>
        </form>
    );
}

export default Create;
