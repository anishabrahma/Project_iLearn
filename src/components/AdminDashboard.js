import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.css'; 

const AdminDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [profile, setProfile] = useState({});
    const [activeSection, setActiveSection] = useState('home');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [newCourse, setNewCourse] = useState({ name: '', videoUrl: '' });
    const [editCourse, setEditCourse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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
        // Clear admin session and redirect to login page
        localStorage.removeItem('admin-dashboard');
        navigate('/login');
    };

    const handleAddCourse = () => {
        setCourses([...courses, { id: courses.length + 1, ...newCourse }]);
        setNewCourse({ name: '', videoUrl: '' });
    };

    const handleEditCourse = (courseId) => {
        const course = courses.find(course => course.id === courseId);
        setEditCourse(course);
    };

    const handleUpdateCourse = () => {
        setCourses(courses.map(course => (course.id === editCourse.id ? editCourse : course)));
        setEditCourse(null);
    };

    const handleDeleteCourse = (courseId) => {
        setCourses(courses.filter(course => course.id !== courseId));
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
                        <p>Name: {profile.name}</p>
                        <p>Email: {profile.email}</p>
                        <p>Role: {profile.role}</p>
                    </div>
                );
            case 'manageCourses':
                return (
                    <div>
                        <h2>Manage Courses</h2>
                        <button className="btn btn-primary m-2" onClick={() => setNewCourse({ name: '', videoUrl: '' })}>Add Course</button>
                        {newCourse && (
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Course Name"
                                    value={newCourse.name}
                                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                                    className="form-control mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Video URL"
                                    value={newCourse.videoUrl}
                                    onChange={(e) => setNewCourse({ ...newCourse, videoUrl: e.target.value })}
                                    className="form-control mb-2"
                                />
                                <button className="btn btn-success" onClick={handleAddCourse}>Save</button>
                            </div>
                        )}
                        {editCourse && (
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Course Name"
                                    value={editCourse.name}
                                    onChange={(e) => setEditCourse({ ...editCourse, name: e.target.value })}
                                    className="form-control mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Video URL"
                                    value={editCourse.videoUrl}
                                    onChange={(e) => setEditCourse({ ...editCourse, videoUrl: e.target.value })}
                                    className="form-control mb-2"
                                />
                                <button className="btn btn-success" onClick={handleUpdateCourse}>Update</button>
                            </div>
                        )}
                        <ul>
                            {courses.map(course => (
                                <li key={course.id}>
                                    {course.name}
                                    <button className="btn btn-secondary m-2" onClick={() => handleEditCourse(course.id)}>Edit</button>
                                    <button className="btn btn-danger m-2" onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                return <p>Welcome to the admin dashboard!</p>;
        }
    };

    return (
        <div className="dashboard d-flex">
            <div className="sidebar bg-dark text-white p-3">
                <h2>Admin Sidebar</h2>
                <ul className="list-unstyled">
                    <li><a href="#home" className="text-white" onClick={() => { setActiveSection('home'); setSelectedCourse(null); }}>Home</a></li>
                    <li><a href="#courses" className="text-white" onClick={() => { setActiveSection('courses'); setSelectedCourse(null); }}>Courses</a></li>
                    <li><a href="#profile" className="text-white" onClick={() => { setActiveSection('profile'); setSelectedCourse(null); }}>Profile</a></li>
                    <li><a href="#manageCourses" className="text-white" onClick={() => { setActiveSection('manageCourses'); setSelectedCourse(null); }}>Manage Courses</a></li>
                </ul>
                <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
            </div>
            <div className="main-content flex-grow-1 p-4">
                <div className="header mb-4">
                    <h1>Admin Dashboard</h1>
                </div>
                <div className="content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
