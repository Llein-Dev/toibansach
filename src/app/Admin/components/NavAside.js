import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faShoppingCart, faBox, faSun, faMoon, faUsers, faChartLine, faCog, faSignOutAlt, faThList } from '@fortawesome/free-solid-svg-icons';

const icons = {
    faHouse,
    faShoppingCart,
    faBox,
    faUsers,
    faChartLine,
    faCog,
    faSignOutAlt,
    faThList
};

const navData = {
    "logo": "/logo.png",
    "menuItems": [
        {
            "icon": "faHouse",
            "href": "/Admin/",
            "srText": "Dashboard"
        },
        {
            "icon": "faShoppingCart",
            "href": "/Admin/Orders",
            "srText": "Orders"
        },
        {
            "icon": "faBox",
            "href": "/Admin/Products",
            "srText": "Products"
        },
        {
            "icon": "faThList",
            "href": "/Admin/Categories",
            "srText": "Categories"
        },
        {
            "icon": "faUsers",
            "href": "/Admin/customers",
            "srText": "Customers"
        },
    ],
    "footerItems": [
        {
            "icon": "faCog",
            "href": "/Admin/Settings",
            "srText": "Settings"
        },
        {
            "icon": "faSignOutAlt",
            "href": "/Admin/Logout",
            "srText": "Logout"
        }
    ]
};

function Nav({ isOpen, toggleDarkMode, isDarkMode, menuRef }) {
    return (
        <aside
            ref={menuRef}
            className={`fixed inset-y-0 left-0 z-10 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} md:translate-x-0 md:opacity-100 md:w-16 sm:w-10 flex-col border-r bg-background sm:flex`}
        >
            <nav className="flex flex-col items-center gap-4 md:px-2 sm:px-1 py-5">
                <a className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base" href="/">
                    <img src={navData.logo} alt="Logo" className="navbar-logo" />
                </a>
                {navData.menuItems.map((item, index) => (
                    <a
                        key={index}
                        className={`flex flex-col w-full items-center justify-center rounded-lg text-muted-foreground transition-colors duration-300 hover:bg-gray-200 hover:text-primary-dark active:bg-gray-300 `}
                        href={item.href}
                        data-state="closed"
                    >
                        <FontAwesomeIcon icon={icons[item.icon]} className="h-5 w-5 mb-1" />
                        <span className="text-[10px] ">{item.srText}</span>
                    </a>
                ))}
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <button
                    onClick={toggleDarkMode}
                    className="flex flex-col items-center justify-center  rounded-lg text-muted-foreground transition-colors duration-300 hover:bg-gray-200 hover:text-primary-dark active:bg-gray-300 "
                >
                    <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="h-5 w-5 mb-1" />
                    <span className="text-[10px]">{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
                </button>
                {navData.footerItems.map((item, index) => (
                    <a
                        key={index}
                        className="flex flex-col items-center justify-center  rounded-lg text-muted-foreground transition-colors duration-300 hover:bg-gray-200 hover:text-primary-dark active:bg-gray-300"
                        href={item.href}
                        data-state="closed"
                    >
                        <FontAwesomeIcon icon={icons[item.icon]} className="h-5 w-5 mb-1" />
                        <span className="text-[10px]">{item.srText}</span>
                    </a>
                ))}
            </nav>
        </aside>
    );
}

export default Nav;
