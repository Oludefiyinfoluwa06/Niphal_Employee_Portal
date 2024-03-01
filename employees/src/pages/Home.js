import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === '/home' || window.location.pathname === '/home/') {
      navigate('/home/dashboard');
    }
  }, [navigate]);

  return (
    <div></div>
  );
}

export default Home;
