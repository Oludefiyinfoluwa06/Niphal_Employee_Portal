import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../components/SideNav';

const RootLayout = () => {
    return (
        <div className='root'>
            <SideNav />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default RootLayout;