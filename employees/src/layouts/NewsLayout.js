import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/News/Navbar';

const NewsLayout = () => {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default NewsLayout;