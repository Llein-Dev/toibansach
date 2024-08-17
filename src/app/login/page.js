"use client";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from '../redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import NotificationPopup from '../components/notion';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setNotificationType('error');
            setNotificationMessage('Please enter both email and password.');
            setShowNotification(true);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/users/login`, { email, password });

            if (response.status === 200) {
                const { token, user } = response.data;

                // Lưu token và userPayload vào localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('userPayload', JSON.stringify(user));

                // Cập nhật Redux state
                dispatch(login({ user, token }));
                setNotificationType('success');
                setNotificationMessage('Login successful! Redirecting...');
                setShowNotification(true);
                setTimeout(() => router.push('/'), 2000); // Redirect after 2 seconds
            }
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            const message = error.response?.data?.message || 'Login failed, please try again.';
            setNotificationType('error');
            setNotificationMessage(message);
            setShowNotification(true);
        } finally {
            setLoading(false);
        }
    };

    const signup = () => {
        router.push('/signup');
    };

    return (
        <>
            {showNotification && (
                <NotificationPopup
                    type={notificationType}
                    message={notificationMessage}
                    onClose={() => setShowNotification(false)}
                    onCloseAndRedirect={() => notificationType === 'success' && router.push('/')}
                />
            )}
            <section className="py-5">
                <div className="container-fluid h-custom py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid"
                                alt="Sample"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleLogin}>
                                <div className="d-flex flex-row align-items-center justify-content-center">
                                    <p className="lead fw-normal mb-0 me-3">Login</p>
                                </div>

                                {error && <p className="text-danger">{error}</p>}

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

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3"> Remember me </label>
                                    </div>
                                    <a href="/forget" className="text-body">Forgot password?</a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" onClick={signup} className="btn btn-light" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Signup</button>
                                    <button type="submit" className="btn btn-custom-2" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                                        {loading ? 'Loading...' : 'Login'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginPage;
