import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Events/Navbar';

const EventLayout = () => {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default EventLayout;