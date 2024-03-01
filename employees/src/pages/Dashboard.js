import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Dashboard/Header';

const Dashboard = () => {
    const navigate = useNavigate();
    const employee = JSON.parse(localStorage.getItem('employee'));
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!employee && !token) {
            navigate('/');
            return;
        }
    }, [employee, token, navigate]);

    const name = employee.name;
    const profilePic = `images/profile/${employee.profilePic}`;
    
    return (
        <section className='dashboard'>
            <Header name={name} profilePic={profilePic} />
        </section>
    );
}

export default Dashboard;