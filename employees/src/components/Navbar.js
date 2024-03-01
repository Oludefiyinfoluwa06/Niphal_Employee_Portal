import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa6';
import '../styles/navbar.css';

const Navbar = ({ name, profilePic }) => {
    const [showLinks, setShowLinks] = useState(false);
    
    const handleShowLinks = () => {
        setShowLinks(prev => !prev);
    }

    return (
        <>
            <nav>
                <div className="profile" onClick={handleShowLinks}>
                    <img src={profilePic} alt={name} />
                    <p>
                        {name}
                        <div className="icon">
                            <FaAngleDown />
                        </div>
                    </p>
                </div>
            </nav>

            {showLinks &&
                <ul className="links">
                    <li>
                        <Link to='/profile'>Profile</Link>
                    </li>
                    <li>
                        <button>Logout</button>
                    </li>
                </ul>
            }
        </>
    );
}

export default Navbar;