import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        // Hardcoded admin credentials
        const adminEmail = 'admin@example.com';
        const adminPassword = 'password';

        // Get registered users from local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        // Simulate authentication
        if (role === 'admin' && email === adminEmail && password === adminPassword) {
            console.log('Admin login successful');
            localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));
            navigate('/admin-dashboard');
        } else if (role === 'user' && user) {
            console.log('User login successful');
            localStorage.setItem('user', JSON.stringify({ email, role: 'user' }));
            navigate('/dashboard');
        } else {
            setError('Invalid email or password');
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4">
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="form-group mb-3">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Role:</label>
                        <select
                            className="form-control"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
                </form>
                <button className="btn btn-secondary w-100" onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
};

export default Login;
