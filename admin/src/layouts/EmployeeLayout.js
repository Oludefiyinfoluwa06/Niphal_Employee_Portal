import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Employee/Navbar';
import '../styles/Employee/employee.css';

const EmployeeLayout = () => {
    return (
        <div className='employee'>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default EmployeeLayout;