import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import niphal_logo from '../images/niphal_logo.png';
import '../styles/login.css';
import Loading from '../components/Loading';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const employee = localStorage.getItem('employee');

        if (token && employee) {
            navigate('/home');
            return;
        } else {
            localStorage.clear();
            localStorage.removeItem('token');
            localStorage.removeItem('employee');
        }

    }, [navigate]);

    const handleSubmit = async e => {
        e.preventDefault();

        setIsLoading(true);
        
        await axios.post('https://nep-api.vercel.app/api/employees/login', { email, password })
            .then(res => {
                setIsLoading(false);
                console.log(res);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('employee', JSON.stringify(res.data.employee));
                navigate('/home');
            })
            .catch(err => {
                setError(err.response.data.error);
                setIsLoading(false);
            })
            .finally(() => setIsLoading(false));
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

            <button type='submit' disabled={isLoading}>
                {isLoading ? <Loading /> : 'Login'}
            </button>
        </form>
    );
}

export default Login;