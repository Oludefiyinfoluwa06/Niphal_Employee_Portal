import React from 'react';
import Navbar from '../Navbar';
import '../../styles/Dashboard/header.css';
import employees from '../../images/employees.png';

const Header = ({ name, profilePic }) => {
    return (
        <header>
            <Navbar name={name} profilePic={profilePic} />
            <div className="header">
                <div className="header-content">
                    <h1>Welcome, {name}</h1>
                    <p>Here, you can access important company resources, stay informed about company news and events, and connect with your colleagues</p>
                </div>
                <img src={employees} alt="Employees" />
            </div>
        </header>
    );
}

export default Header;