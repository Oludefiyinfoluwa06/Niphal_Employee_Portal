import React, { useState } from 'react';
import { FaBars, FaBlog, FaCalendarDays, FaGauge, FaListCheck, FaNewspaper } from 'react-icons/fa6';
import '../styles/sidenav.css';
import niphal_logo from '../images/niphal_logo.png';
import { NavLink } from 'react-router-dom';

const SideNav = () => {
    const [showSideBar, setShowSideBar] = useState(false);

    const handleShowSideBar = () => {
        setShowSideBar(prev => !prev);
    }

    const handleCloseSideBar = () => {
        setShowSideBar(false);
    }

    return (
        <>
            <div className={showSideBar ? "menu-bar move" : "menu-bar"} onClick={handleShowSideBar}>
                <FaBars />
            </div>

            <aside className={showSideBar ? 'sidebar' : ''}>
                <div className="logo">
                    <img src={niphal_logo} alt="Niphal Logo" />
                    <h2>Niphal</h2>
                </div>

                <div className="nav-links">
                    <NavLink to='/home/dashboard' onClick={handleCloseSideBar}>
                        <div className="icon">
                            <FaGauge />
                        </div>
                        Dashboard
                    </NavLink>
                    <NavLink to='/home/news' onClick={handleCloseSideBar}>
                        <div className="icon">
                            <FaNewspaper />
                        </div>
                        News and Updates
                    </NavLink>
                    <NavLink to='/home/events' onClick={handleCloseSideBar}>
                        <div className="icon">
                            <FaCalendarDays />
                        </div>
                        Events
                    </NavLink>
                    <NavLink to='/home/tasks' onClick={handleCloseSideBar}>
                        <div className="icon">
                            <FaListCheck />
                        </div>
                        Tasks
                    </NavLink>
                    <NavLink to='/home/blogs' onClick={handleCloseSideBar}>
                        <div className="icon">
                            <FaBlog />
                        </div>
                        Blogs
                    </NavLink>
                </div>
            </aside>
        </>
    );
}

export default SideNav;