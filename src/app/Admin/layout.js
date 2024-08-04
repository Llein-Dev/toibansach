"use client";
import { useState, useEffect, useRef } from 'react';
// import 'tailwindcss/tailwind.css';
import Nav from './components/NavAside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Transition from './template';
export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef(null); // Reference for the menu

  useEffect(() => {
    // Load dark mode preference from localStorage
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModePreference);

    // Attach event listener for clicks outside the menu
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevState => {
      const newMode = !prevState;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  return (
    <html lang="en" className={isDarkMode ? 'dark' : ''}>
      <body className={`flex min-h-screen w-full flex-col ${isDarkMode ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'}`}>
        <Nav
          isOpen={isOpen}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          menuRef={menuRef}
        />

        <div className="relative flex flex-1 flex-col lg:pl-16">
          {/* Toggle button only visible when menu is closed */}
          {!isOpen && (
            <button
              className="sm:hidden flex absolute top-0 left-0 z-10 px-4 py-6 items-center justify-center"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </button>
          )}
          <Transition>
            {children}
          </Transition>
        </div>
      </body>
    </html>
  );
}
