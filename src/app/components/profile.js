import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/app/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faHistory, faCog, faDoorClosed } from '@fortawesome/free-solid-svg-icons';

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

    const toggleAdmin = () => {
        router.push('/admin');
        setShowMenu(false); // Close menu on admin panel redirection
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
            <button className="btn btn-light d-flex align-items-center" onClick={toggleMenu}>
                Welcome, <span className='fw-bold mx-2'>{user.fullname}</span>!
            </button>
            {showMenu && (
                <div className="dropdown-menu-2">
                    <Link href="/profile" legacyBehavior>
                        <a className="btn text-start btn-light d-flex align-items-center" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faUser} className="me-3" /> Manage Profile
                        </a>
                    </Link>
                    <Link href="/cart" legacyBehavior>
                        <a className="btn text-start btn-light d-flex align-items-center" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faShoppingCart} className="me-3" /> Cart
                        </a>
                    </Link>
                    <Link href="/order" legacyBehavior>
                        <a className="btn text-start btn-light d-flex align-items-center" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faHistory} className="me-3" /> Order
                        </a>
                    </Link>
                    {user.role === 'admin' && (
                        <a className="btn text-start btn-dark d-flex align-items-center py-2 " onClick={toggleAdmin}>
                            <FontAwesomeIcon icon={faCog} className="me-3" /> Admin Panel
                        </a>
                    )}
                    <button onClick={handleLogout} className="btn border-top text-start btn-light d-flex align-items-center">
                        <FontAwesomeIcon icon={faDoorClosed} className="me-3" /> Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;
