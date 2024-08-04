"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import CartModal from '../Cart-item/cart-modal';
import SearchComponent from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Profile from '../profile';

const navigate = [
    { name: "About", href: "/about" },
    { name: "Books", href: "/books" },
    { name: "Categories", href: "/categories" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

const NavbarComponent = () => {
    const [showCart, setShowCart] = useState(false);
    const handleShowCart = () => setShowCart(true);
    const handleCloseCart = () => setShowCart(false);

    return (
        <>
            <header className="header_section">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg custom_nav-container">
                        <Link href="/" className="navbar-brand">
                            <Image src="/images/logo.png" width={50} height={50} alt="Logo" className="navbar-logo" />
                            <span>TOIBANSACH</span>
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                {navigate.map((nav) => (
                                    <li className="nav-item" key={nav.href}>
                                        <Link href={nav.href} className="nav-link">
                                            {nav.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='d-flex align-items-center'>
                            <SearchComponent />
                            <button
                                className="btn btn-custom mx-3"
                                onClick={handleShowCart}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </button>
                            <Profile />
                        </div>
                    </nav>
                </div>
            </header>

            {/* Cart Modal */}
            <CartModal show={showCart} handleClose={handleCloseCart} />
        </>
    );
};

export default NavbarComponent;
