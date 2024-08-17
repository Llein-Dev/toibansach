'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import NotificationPopup from '../components/notion';

const API = "http://localhost:3000";

const SignupPage = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState(''); // 'success' or 'error'
    const [popupMessage, setPopupMessage] = useState('');
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setPopupMessage('');

        if (password !== confirmPassword) {
            setPopupType('error');
            setPopupMessage('Passwords do not match');
            setShowPopup(true);
            return;
        }

        if (!fullName || !username || !email || !password || !confirmPassword) {
            setPopupType('error');
            setPopupMessage('All fields are required');
            setShowPopup(true);
            return;
        }

        try {
            const response = await axios.post(`${API}/users/register`, {
                fullname: fullName,
                username: username,
                email: email,
                password: password,
                role: 'user' // Default role
            });

            if (response.status === 201) {
                setPopupType('success');
                setPopupMessage('Sign Up successful!');
                setShowPopup(true);
                setTimeout(() => router.push('/login'), 2000); // Redirect to login page after 2 seconds
            }
        } catch (err) {
            setPopupType('error');
            setPopupMessage('Error during signup: ' + (err.response?.data?.message || err.message));
            setShowPopup(true);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleCloseAndRedirect = () => {
        handleClosePopup();
        if (popupType === 'success') {
            router.push('/login');
        }
    };

    return (
        <section className="py-5">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid"
                            alt="Sample"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleSignup}>
                            <div className="d-flex flex-row align-items-center justify-content-center">
                                <p className="lead fw-normal mb-0 me-3">Signup</p>
                            </div>

                            <div className='d-flex my-5 gap-2'>
                                {/* Full Name input */}
                                <div className="form-outline w-100">
                                    <input
                                        type="text"
                                        id="form3Example1"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your full name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>

                                {/* Username input */}
                                <div className="form-outline w-100">
                                    <input
                                        type="text"
                                        id="form3Example2"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Email input */}
                            <div className="form-outline my-5">
                                <input
                                    type="email"
                                    id="form3Example3"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Password input */}
                            <div className="form-outline mb-5">
                                <input
                                    type="password"
                                    id="form3Example4"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Confirm Password input */}
                            <div className="form-outline mb-5">
                                <input
                                    type="password"
                                    id="form3Example5"
                                    className="form-control form-control-lg"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-custom-2" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Signup</button>
                                <button type="button" className="btn btn-light" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                                    <a className='text-reset' href="/login">Login</a>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {showPopup && (
                <NotificationPopup
                    type={popupType}
                    message={popupMessage}
                    onClose={handleClosePopup}
                    onCloseAndRedirect={popupType === 'success' ? handleCloseAndRedirect : null}
                />
            )}
        </section>
    );
};

export default SignupPage;
