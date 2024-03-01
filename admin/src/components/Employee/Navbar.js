import React from 'react';
import { Link } from 'react-router-dom';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import '../../styles/Employee/navbar.css';

const Navbar = () => {
    return (
        <nav>
            <form className='search'>
                <input type="text" placeholder='Search...' />
                <button><FaMagnifyingGlass /></button>
            </form>
            <Link to='add'>Add Employee</Link>
        </nav>
    );
}

export default Navbar;