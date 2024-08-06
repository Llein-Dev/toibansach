"use client";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import CartItem from './cart';
import { removeFromCart, updateQuantity, clearCart } from '@/app/redux/slices/cartSlice';
import { useRouter } from 'next/navigation';
import { formatPrice } from '../Price'; // Đảm bảo rằng bạn đã định nghĩa hàm này

const CartModal = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);
    const total = useSelector((state) => state.cart.totalPrice);
    const router = useRouter();

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleCheckout = () => {
        router.push('/cart'); // Chuyển đến trang giỏ hàng để xem chi tiết
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header className="d-flex justify-content-between">
                <Modal.Title>Giỏ Hàng</Modal.Title>
                <Button variant="light" onClick={handleClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </Button>
            </Modal.Header>
            <Modal.Body>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cart.map((item) => (
                        <CartItem
                            key={item._id}
                            item={item}
                            onRemove={() => handleRemove(item._id)}
                            onQuantityChange={(quantity) => {
                                dispatch(updateQuantity({ id: item._id, quantity }));
                            }}
                        />
                    ))
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCheckout}>
                    Detail
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CartModal;
