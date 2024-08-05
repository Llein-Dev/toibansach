'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignupPage = () => {
    const [fullName, setFullName] = useState('John Doe'); // Test data
    const [username, setUsername] = useState('johndoe'); // Test data
    const [email, setEmail] = useState('john.doe@example.com'); // Test data
    const [password, setPassword] = useState('password123'); // Test data
    const [confirmPassword, setConfirmPassword] = useState('password123'); // Test data
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
                fullname: fullName,
                username,
                email,
                password,
                role: 'user' // Default role
            });

            if (response.status === 201) {
                router.push('/');
                alert('Sign Up successful!');
            }
        } catch (err) {
            setError('Error during signup: ' + err.response?.data?.message || err.message);
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

                            {/* Full Name input */}
                            <div className="form-outline my-5">
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
                            <div className="form-outline my-5">
                                <input
                                    type="text"
                                    id="form3Example2"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
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
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Already have an account? <a href="/login" className="link-danger">Login</a>
                                </p>
                                {error && <div className="alert alert-danger mt-3">{error}</div>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignupPage;
