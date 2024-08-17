"use client";
import React, { useState } from 'react';
import axios from 'axios';
import NotificationPopup from '@/app/components/notion';
import { useRouter } from 'next/navigation';

const API = "http://localhost:3000";

const ResetPasswordPage = ({ params }) => {
    const { id } = params;
    const router = useRouter();

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!id) {
            setNotificationMessage('Token is missing');
            setShowNotification(true);
            return;
        }

        setIsLoading(true);
        try {
            await axios.post(`${API}/users/reset-password/${id}`);
            setNotificationMessage('Password has been reset to 123456.');
            setShowNotification(true);
            // Chuyển hướng đến trang đăng nhập sau khi đặt lại mật khẩu
            setTimeout(() => {
                router.push('/login'); // Đảm bảo đường dẫn chính xác tới trang đăng nhập
            }, 2000); // Thời gian chờ 2 giây để người dùng có thể thấy thông báo
        } catch (err) {
            console.error('Error resetting password:', err);
            setNotificationMessage('Error resetting password');
            setShowNotification(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center py-5">
            {showNotification && (
                <NotificationPopup
                    type="success"
                    message={notificationMessage}
                    onClose={() => setShowNotification(false)}
                />
            )}

            <div className="card p-4 shadow-sm w-100" style={{ maxWidth: '400px' }}>
                <h1 className="card-title mb-4 text-center">Reset Password</h1>
                {isLoading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="mb-4">Click the button below to reset your password.</p>
                        <button
                            className="btn btn-custom-2"
                            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                            onClick={handleResetPassword}
                            disabled={isLoading}
                        >
                            Reset Password
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
