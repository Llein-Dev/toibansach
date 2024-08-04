"use client";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { useRouter } from "next/router"; // Kiểm tra phiên bản Next.js của bạn
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CartItem from "./cart";
import axios from 'axios';
import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function CartModal({ show, handleClose }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);
    const total = useSelector((state) => state.cart.totalPrice);
    const [checkoutError, setCheckoutError] = useState(null);
    const user = useSelector((state) => state.auth.user);

    const handleRemove = (id) => {
        console.log(`Removing item with id: ${id}`); // Log removal
        dispatch(removeFromCart(id));
    };

    const handleCheckout = async () => {
        try {
            console.log(`${apiUrl}/carts/api/cart`);
            console.log('Cart data before checkout:', cart); // Kiểm tra dữ liệu giỏ hàng
            const response = await axios.post(`${apiUrl}/carts/api/cart`, { items: cart }); // Chỉnh sửa URL nếu cần
            console.log('Response from server:', response.data); // Kiểm tra phản hồi từ server

            if (response.data.message === 'Cart submitted successfully') {
                dispatch(clearCart()); // Uncomment if you want to clear cart after successful checkout
                router.push('/cart');
            } else {
                throw new Error('Checkout failed');
            }
        } catch (error) {
            console.error('Checkout Error:', error.response ? error.response.data : error.message);
            setCheckoutError('Failed to complete checkout. Please try again.');
        }
    };

    const handleCheckoutAndClose = () => {
        handleCheckout();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header>
                <Modal.Title>Giỏ Hàng</Modal.Title>
                <Button variant="light" onClick={handleClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </Button>
            </Modal.Header>
            <Modal.Body>
                {checkoutError && <div className="alert alert-danger">{checkoutError}</div>}
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cart.map((item) => (
                        <CartItem
                            key={item._id} 
                            item={item}
                            onRemove={() => handleRemove(item._id)} 
                            onQuantityChange={(quantity) => {
                                console.log(`Updating quantity for item ${item._id} to ${quantity}`); // Log quantity update
                                dispatch(updateQuantity({ id: item._id, quantity }));
                            }}
                        />
                    ))
                )}
                <div className="mt-3">
                    <h4>Total: {total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h4>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCheckoutAndClose}>
                    Checkout
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
