import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Blog/Navbar';

const BlogLayout = () => {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default BlogLayout;