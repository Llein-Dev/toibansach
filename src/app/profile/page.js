"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

const API = "http://localhost:3000";

const ProfileManagement = () => {
    const [activeTab, setActiveTab] = useState('editProfile');
    const [user, setUser] = useState({});
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch user data from localStorage
        const userPayload = JSON.parse(localStorage.getItem('userPayload'));
        if (userPayload) {
            setUser(userPayload);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle profile update logic here
        // You need to implement the update logic as per your requirements
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage('New passwords do not match.');
            return;
        }

        const userPayload = JSON.parse(localStorage.getItem('userPayload'));
        if (!userPayload || !userPayload.id) {
            setMessage('User ID is missing.');
            return;
        }

        try {
            const response = await axios.put(`${API}/users/change-password`, {
                userId: userPayload.id,
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error changing password');
        }
    };

    return (
        <div className="container profile-management-container layout_padding">
            <div className="heading_container heading_center">
                <h2>User Manager</h2>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <ul className="nav nav-pills flex-column">
                        <li className="nav-item w-100">
                            <button className={`nav-link ${activeTab === 'editProfile' ? 'active' : ''}`} onClick={() => setActiveTab('editProfile')}>Edit Profile</button>
                        </li>
                        <li className="nav-item w-100">
                            <button className={`nav-link ${activeTab === 'changePassword' ? 'active' : ''}`} onClick={() => setActiveTab('changePassword')}>Change Password</button>
                        </li>
                    </ul>
                </div>
                <div className="col-md-9">
                    {activeTab === 'editProfile' && (
                        <div className="profile-form">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={user.fullname || ''}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                {/* Add more fields as needed */}
                                <button type="submit" className="btn btn-custom">Save Changes</button>
                            </form>
                        </div>
                    )}
                    {activeTab === 'changePassword' && (
                        <div className="password-form">
                            <form onSubmit={handlePasswordSubmit}>
                                {message && <div className="alert">{message}</div>}
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className="form-control"
                                    />
                                </div>
                                <button type="submit" className="btn btn-custom">Change Password</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileManagement;
