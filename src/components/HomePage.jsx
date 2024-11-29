import React from 'react';
import {Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return(
        // <div>
        //     <h1>Home Page</h1>
        //     <button className="account-button" onClick={handleLogout}>Logout</button>
        // </div>

<Typography variant="h2" align="center" gutterBottom>
Home
</Typography>
    )
}

export default HomePage;