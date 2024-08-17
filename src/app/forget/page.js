'use client';
import { useState } from 'react';
import axios from 'axios';

// const API = process.env.NEXT_PUBLIC_API_URL;
const API = "http://localhost:3000";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post(`${API}/users/reset-password`, { email });

            if (response.status === 200) {
                setMessage('A password reset link has been sent to your email address. Please check your inbox.');
            }
        } catch (err) {
            setError('Error sending reset link: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <section className="py-5">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4">
                        <form onSubmit={handleForgotPassword} className="d-flex flex-column align-items-center">
                            <div className="text-center mb-4">
                                <h1 className="lead">Forgot Your Password?</h1>
                                <p className="">Enter your email address below and we'll send you a link to reset your password.</p>
                            </div>

                            {/* Email input */}
                            <div className="form-outline my-2">
                                <label htmlFor="emailInput" className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    id="emailInput"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {error && <p className="text-danger">{error}</p>}
                            {message && <p className="text-success">{message}</p>}

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-custom-2" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                                    Send Reset Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPasswordPage;
