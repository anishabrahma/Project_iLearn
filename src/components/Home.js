import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; // Import the CSS file for custom styles

const Home = () => {
    const navigate = useNavigate();

    const handleLoginRegister = () => {
        navigate('/login');
    };

    return (
        <div className="home-container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4">
                <h2 className="text-center mb-4">Welcome to iLearn</h2>
                <button className="btn btn-primary w-100" onClick={handleLoginRegister}>Login or Register</button>
            </div>
        </div>
    );
};

export default Home;
