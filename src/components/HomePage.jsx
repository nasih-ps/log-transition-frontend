import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return(
        <div>
            <h1>Home Page</h1>
            <button className="account-button" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default HomePage;