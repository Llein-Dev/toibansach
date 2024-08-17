// pages/reset-password-success.js
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ResetPasswordSuccessPage = () => {
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            router.push('/login');
        }, 3000); 
    }, [router]);

    return (
        <section className="py-5">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 text-center">
                        <h1 className="display-4">Password Reset Successful</h1>
                        <p className="lead">Your password has been reset to "123456". You will be redirected to the login page shortly.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPasswordSuccessPage;
