import Link from 'next/link';
import SearchComponent from './SearchBar';
import Image from 'next/image';

const NavbarComponent = () => {
    return (
        <header className="header_section">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg custom_nav-container">
                    <Link href="/" legacyBehavior>
                        <a className="navbar-brand">
                            <Image src="/images/logo.png" width={50} height={50} alt="Logo" className="navbar-logo" />
                            <span>TOIBANSACH</span>
                        </a>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link href="/about" legacyBehavior>
                                    <a className="nav-link">About</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/books" legacyBehavior>
                                    <a className="nav-link">Books</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/categories" legacyBehavior>
                                    <a className="nav-link">Categories</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/blog" legacyBehavior>
                                    <a className="nav-link">Blog</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/contact" legacyBehavior>
                                    <a className="nav-link">Contact Us</a>
                                </Link>
                            </li>
                        </ul>
                        <SearchComponent />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default NavbarComponent;
