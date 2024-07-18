"use client"; // Thêm dòng này để đánh dấu component này là Client Component

import React, { useEffect } from 'react';
import Info from './Info';

const FooterComponent = () => {
    useEffect(() => {
        const yearElement = document.getElementById('displayYear');
        if (yearElement) {
            yearElement.innerText = new Date().getFullYear();
        }
    }, []);

    return (
        <>
            <Info />
            <footer className="footer_section">
                <div className="container">
                    <p>
                        &copy; <span id="displayYear"></span> All Rights Reserved By
                        <a href="https://example.com" target="_blank" rel="noopener noreferrer"> Lein</a>
                    </p>
                </div>
            </footer>
        </>
    );
};

export default FooterComponent;
