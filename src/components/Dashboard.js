import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'; // Import the CSS file for custom styles

const Dashboard = () => {
    const [homeData, setHomeData] = useState('');
    const [courses, setCourses] = useState([]);
    const [profile, setProfile] = useState({});
    const [activeSection, setActiveSection] = useState('home');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/home')
            .then(response => response.json())
            .then(data => setHomeData(data.message));

        // Sample courses data with YouTube URLs
        const sampleCourses = [
            { id: 1, name: 'Science', videoUrl: 'https://www.youtube.com/embed/Jj9iNphbY88' },
            { id: 2, name: 'History', videoUrl: 'https://www.youtube.com/embed/bO7FQsCcbD8' },
            { id: 3, name: 'Physics', videoUrl: 'https://www.youtube.com/embed/p7bzE1E5PMY' },
            { id: 4, name: 'Chemistry', videoUrl: 'https://www.youtube.com/embed/0RRVV4Diomg' },
            { id: 5, name: 'Art', videoUrl: 'https://www.youtube.com/embed/QZFkZiwMLZ4' },
            { id: 6, name: 'Music', videoUrl: 'https://www.youtube.com/embed/R0JKCYZ8hng' }
        ];
        setCourses(sampleCourses);

        // Retrieve user profile from localStorage
        const userProfile = JSON.parse(localStorage.getItem('user'));
        if (userProfile) {
            setProfile(userProfile);
        }
    }, []);

    const handleLogout = () => {
        // Clear user session and redirect to login page
        localStorage.removeItem('user');
        navigate('/login');
    };

    const renderContent = () => {
        if (selectedCourse) {
            return (
                <div>
                    <h2>{selectedCourse.name}</h2>
                    <iframe
                        width="600"
                        height="400"
                        src={selectedCourse.videoUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={selectedCourse.name}
                    ></iframe>
                    <button className="btn btn-secondary mt-3" onClick={() => setSelectedCourse(null)}>Back to Courses</button>
                </div>
            );
        }

        switch (activeSection) {
            case 'home':
                return (
                    <div>
                        <h2>Browse Courses</h2>
                        <ul>
                            {courses.slice(0, 10).map(course => (
                                <li key={course.id}>
                                    <a href="#!" className="text-primary" onClick={() => setSelectedCourse(course)}>{course.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'courses':
                return (
                    <div>
                        <h2>Courses</h2>
                        <ul>
                            {courses.map(course => (
                                <li key={course.id}>
                                    <a href="#!" className="text-primary" onClick={() => setSelectedCourse(course)}>{course.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'profile':
                return (
                    <div>
                        <h2>Profile</h2>
                        <p>Email: {profile.email}</p>
                        <p>Role: {profile.role}</p>
                    </div>
                );
            default:
                return <p>Welcome to the dashboard!</p>;
        }
    };

    return (
        <div className="dashboard d-flex">
            <div className="sidebar bg-dark text-white p-3">
                <h2>Sidebar</h2>
                <ul className="list-unstyled">
                    <li><a href="#home" className="text-white" onClick={() => { setActiveSection('home'); setSelectedCourse(null); }}>Home</a></li>
                    <li><a href="#courses" className="text-white" onClick={() => { setActiveSection('courses'); setSelectedCourse(null); }}>Courses</a></li>
                    <li><a href="#profile" className="text-white" onClick={() => { setActiveSection('profile'); setSelectedCourse(null); }}>Profile</a></li>
                </ul>
                <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
            </div>
            <div className="main-content flex-grow-1 p-4">
                <div className="header mb-4">
                    <h1>Dashboard</h1>
                </div>
                <div className="content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
