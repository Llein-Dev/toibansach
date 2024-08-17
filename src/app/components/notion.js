import React from 'react';
import PropTypes from 'prop-types';

const NotificationPopup = ({ type, message, onClose, onCloseAndRedirect }) => {
    const getLogo = () => {
        if (type === 'success') {
            return '✔️'; // Icon cho thành công
        } else if (type === 'error') {
            return '❌'; // Icon cho thất bại
        }
        return 'ℹ️'; // Icon mặc định
    };

    const handleClose = () => {
        onClose();
        if (type === 'success' && onCloseAndRedirect) {
            onCloseAndRedirect(); // Call the redirect function if provided
        }
    };

    const getTitle = () => {
        if (type === 'success') {
            return 'Thành công';
        } else if (type === 'error') {
            return 'Thất bại';
        }
        return 'Thông báo';
    };

    return (
        <div style={popupStyles.container}>
            <div style={popupStyles.popup}>
                <div style={popupStyles.logo}>{getLogo()}</div>
                <div style={popupStyles.content}>
                    <div style={popupStyles.title}>{getTitle()}</div>
                    <div style={popupStyles.message}>{message}</div>
                    <button style={popupStyles.button} onClick={handleClose}>
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

NotificationPopup.propTypes = {
    type: PropTypes.oneOf(['success', 'error']).isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onCloseAndRedirect: PropTypes.func, // Optional function for redirection
};

const popupStyles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    popup: {
        backgroundColor: '#fff',
        width: '400px',  // Kích thước cố định chiều rộng
        maxHeight: '300px',  // Chiều cao tối đa
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        overflowY: 'auto',  // Cho phép cuộn nếu nội dung vượt quá chiều cao tối đa
    },
    logo: {
        fontSize: '40px',
        marginBottom: '10px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    message: {
        fontSize: '16px',
        marginBottom: '20px',
    },
    button: {
        padding: '8px 16px',
        backgroundColor: '#302529',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};


export default NotificationPopup;
