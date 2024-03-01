import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Tasks/Navbar';

const TaskLayout = () => {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default TaskLayout;