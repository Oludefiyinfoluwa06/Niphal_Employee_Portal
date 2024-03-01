import React, { useState } from 'react';
import axios from 'axios';
import niphal_logo from '../images/niphal_logo.png';
import '../styles/login.css';
import Loading from '../components/Loading';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await axios.post('api/admin/login', { email, password });

            setIsLoading(false);
            console.log(response);
            
        } catch (error) {
            setError(error.response.data.error);
            setIsLoading(false);
        }
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <div className="form-header">
                <img src={niphal_logo} alt="Niphal Logo" />
                <h2>Login Here</h2>
            </div>

            {error && <p className='error'>{error}</p>}

            <input type="email" placeholder='Enter your email address' value={email} onChange={e => {
                setEmail(e.target.value);
                setError('');
            }} />

            <input type="password" placeholder='Enter your password' value={password} onChange={e => {
                setPassword(e.target.value);
                setError('');
            }} />

            <button type='submit'>
                {isLoading ? <Loading /> : 'Login'}
            </button>
        </form>
    );
}

export default Login;