import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/app/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const userFromRedux = useSelector((state) => state.auth.user);
    const [user, setUser] = useState(userFromRedux);

    const getUserFromLocalStorage = () => {
        const userPayload = localStorage.getItem('userPayload');
        return userPayload ? JSON.parse(userPayload) : null;
    };

    useEffect(() => {
        if (!userFromRedux) {
            const userFromStorage = getUserFromLocalStorage();
            setUser(userFromStorage);
        } else {
            setUser(userFromRedux);
        }
    }, [userFromRedux]);

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('userPayload');
        setUser(null);
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
                    <Link href="/profile" legacyBehavior>
                        <button className="btn btn-light" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faUser} /> Manage Profile
                        </button>
                    </Link>
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
