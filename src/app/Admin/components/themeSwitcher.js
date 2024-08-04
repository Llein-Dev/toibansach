// src/components/ThemeSwitcher.js
import React, { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Kiểm tra chế độ hiện tại và cập nhật trạng thái
        const savedMode = localStorage.getItem('dark-mode') === 'true';
        setIsDarkMode(savedMode);
        if (savedMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('dark-mode', !isDarkMode);
    };

    return (
        <button
            onClick={toggleTheme}
            className="inline-flex items-center p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
        >
            {isDarkMode ? '🌙' : '☀️'}
        </button>
    );
};

export default ThemeSwitcher;
