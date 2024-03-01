import React from 'react';
import { FaBlog, FaCalendarDays, FaGauge, FaListCheck, FaUsers } from 'react-icons/fa6';
import '../styles/sidenav.css';
import niphal_logo from '../images/niphal_logo.png';
import { NavLink } from 'react-router-dom';

const SideNav = () => {
    return (
        <aside>
            <div className="logo">
                <img src={niphal_logo} alt="Niphal Logo" />
                <h2>Niphal</h2>
            </div>

            <div className="nav-links">
                <NavLink to='/'>
                    <div className="icon">
                        <FaGauge />
                    </div>
                    Dashboard
                </NavLink>
                <NavLink to='/news'>
                    <div className="icon">
                        <FaCalendarDays />
                    </div>
                    News and Updates
                </NavLink>
                <NavLink to='/employees'>
                    <div className="icon">
                        <FaUsers />
                    </div>
                    Employees
                </NavLink>
                <NavLink to='/event-management'>
                    <div className="icon">
                        <FaCalendarDays />
                    </div>
                    Event Management
                </NavLink>
                <NavLink to='/task-management'>
                    <div className="icon">
                        <FaListCheck />
                    </div>
                    Task Management
                </NavLink>
                <NavLink to='/blogs'>
                    <div className="icon">
                        <FaBlog />
                    </div>
                    Blog Management
                </NavLink>
            </div>
        </aside>
    );
}

export default SideNav;