import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from '../../../redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = parseJwt(token);
            dispatch(login({ user, token }));
        }
    }, [dispatch]);

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };


    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        router.push('/login');
    };

    if (!user) {
        return (
            <Link href="/login" legacyBehavior>
                <button className="btn btn-light">
                    <FontAwesomeIcon icon={faUser} />
                </button>
            </Link>
        );
    }

    return (
        <div>
            <button className="btn btn-light d-flex" onClick={toggleMenu}>
                Welcome, {user.fullname}!
            </button>
            {showMenu && (
                <div className="dropdown-menu-2">
                    <Link href="/cart" legacyBehavior>
                        <button className="btn btn-light" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faShoppingCart} /> Cart
                        </button>
                    </Link>
                    <button onClick={handleLogout} className="btn btn-light">Logout</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
