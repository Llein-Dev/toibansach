import React from 'react';
import GoogleMap from '../Footer/googlemap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const InfoComponent = () => {
    return (
        <>
            <section className="info_section layout_padding2">
                <div className="container">
                    <div className="row">
                        {/* Cột đầu tiên: Logo, Mô tả, Thông tin liên hệ */}
                        <div className="col-md-6 col-lg-4 info-col">
                            <div className="info_detail">
                                <div className='d-flex align-items-center mb-4'>
                                    <img src="./logo.svg" alt="Logo" style={{ maxWidth: '100px' }} />
                                    <div className='d-flex flex-column'>
                                        <strong className='fs-4'> TOIBANSACH </strong>
                                        <span>
                                            Trang Dịch Vụ Trao Đổi & Mua Bán Sách
                                        </span>
                                    </div>
                                </div>

                                <div className="d-flex flex-column align-items-start px-4">
                                    <a href="" className="d-flex align-items-center mb-2 text-decoration-none text-light opacity-75">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                                        <span>123 Đường ABC, Quận X, TP. Y</span>
                                    </a>
                                    <a href="" className="d-flex align-items-center mb-2 text-decoration-none text-light opacity-75">
                                        <FontAwesomeIcon icon={faPhone} className="me-2" />
                                        <span>Gọi +01 1234567890</span>
                                    </a>
                                    <a href="" className="d-flex align-items-center text-decoration-none text-light opacity-75">
                                        <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                                        <span>demo@gmail.com</span>
                                    </a>
                                </div>
                                <div className="info_social">

                                    <a href="" className='mx-2'>
                                        <FontAwesomeIcon icon={faFacebook} aria-hidden="true" />
                                    </a>
                                    <a href="" className='mx-2'>
                                        <FontAwesomeIcon icon={faTwitter} aria-hidden="true" />
                                    </a>
                                    <a href="" className='mx-2'>
                                        <FontAwesomeIcon icon={faLinkedin} aria-hidden="true" />
                                    </a>
                                    <a href="" className='mx-2'>
                                        <FontAwesomeIcon icon={faInstagram} aria-hidden="true" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Cột thứ hai: Navigation */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="h-100 border-0">
                                <div className="text-center">
                                    <h4 className="my-4">Điều Hướng</h4>
                                    <div className='d-flex justify-content-around px-5'>
                                        <ul className="nav flex-column opacity-75">
                                            <li className="nav-item text-start mb-2">
                                                <a href="/" className="nav-link p-0 text-light">Home</a>
                                            </li>
                                            <li className="nav-item text-start mb-2">
                                                <a href="/about" className="nav-link p-0 text-light">About</a>
                                            </li>
                                            <li className="nav-item text-start mb-2">
                                                <a href="/books" className="nav-link p-0 text-light">Books</a>
                                            </li>
                                            <li className="nav-item text-start mb-2">
                                                <a href="/categories" className="nav-link p-0 text-light">Categories</a>
                                            </li>
                                            <li className="nav-item text-start mb-2">
                                                <a href="/contact" className="nav-link p-0 text-light">Contact</a>
                                            </li>
                                        </ul>
                                        <ul className="nav flex-column opacity-75">
                                            <li className="nav-item text-start mb-2">
                                                <a href="/" className="nav-link p-0 text-light">Cart</a>
                                            </li>
                                            <li className="nav-item text-start mb-2">
                                                <a href="/about" className="nav-link p-0 text-light">Checkout</a>
                                            </li>
                                            <li className="nav-item text-start mb-2">
                                                <a href="/books" className="nav-link p-0 text-light">Login</a>
                                            </li>
                                            <li className="nav-item text-start mb-2">
                                                <a href="/categories" className="nav-link p-0 text-light">Order</a>
                                            </li>
                                            <li className="nav-item text-start mb-2">
                                                <a href="/contact" className="nav-link p-0 text-light">Profile</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Cột thứ ba: Google Map và Social Links */}
                        <div className="col-md-6 col-lg-4 info-col">
                            <div className="map_container flex-column flex">
                                <h4 className="my-4">Vị trí của chúng tôi</h4>
                                <div className="map">
                                    <GoogleMap />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default InfoComponent;
