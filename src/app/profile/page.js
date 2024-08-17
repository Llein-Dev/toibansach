// profile-management.js
"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, changePassword } from '../redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import '../css/profile-management.css';

const ProfileManagement = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const userFromRedux = useSelector((state) => state.auth.user);
    const [user, setUser] = useState(userFromRedux || {});
    const [activeTab, setActiveTab] = useState('editProfile');
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (!userFromRedux) {
            const userPayload = localStorage.getItem('userPayload');
            setUser(userPayload ? JSON.parse(userPayload) : {});
        }
    }, [userFromRedux]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(user));
        localStorage.setItem('userPayload', JSON.stringify(user));
        router.push('/');
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordData.newPassword === passwordData.confirmPassword) {
            dispatch(changePassword(passwordData));
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            router.push('/');
        } else {
            alert('New password and confirm password do not match');
        }
    };

    return (
        <div className="container profile-management-container layout_padding">
            <div className="heading_container heading_center"><h2>User Manager</h2></div>
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
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email || ''}
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
