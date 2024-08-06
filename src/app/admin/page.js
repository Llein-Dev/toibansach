"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('https://admin-toibansach.vercel.app'); 
    }, [router]);
};

export default AdminPage;
