"use client";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { formatPrice } from '../components/Price';
import CartItem from '../components/Cart-item/cart';
import BillDetails from '../components/Cart-item/bill';
import NoProducts from '../components/Book-item/no-product';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const cart = useSelector((state) => state.cart.items);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const API =process.env.NEXT_PUBLIC_API_URL;;
    const originalTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountedTotal = cart.reduce((sum, item) => {
        const salePercentage = item.sale ? parseFloat(item.sale) : 0;
        const discountedPrice = item.price * (1 - salePercentage / 100);
        return sum + discountedPrice * item.quantity;
    }, 0);
    const discount = originalTotal - discountedTotal;
    const userPayload = JSON.parse(localStorage.getItem('userPayload'));
    const handlePlaceOrder = async () => {
        try {
            await axios.post(`${API}/carts`, {
                user: userPayload.id,
                items: cart,
                totalQuantity: cart.reduce((sum, item) => sum + item.quantity, 0),
                totalPrice: discountedTotal
            });

            router.push('/checkout');
        } catch (err) {
            console.error('Error placing order:', err);
            setError('Error placing order');
        }
    };



    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const billItems = [
        { label: 'Sản phẩm', value: formatPrice(originalTotal) },
        { label: 'Giảm giá', value: `-${formatPrice(discount)}` },
        { label: 'Tổng cộng', value: formatPrice(discountedTotal) }
    ];

    return (
        <div className="container my-5">
            <div className="row">
                {/* Cart Section */}
                <div className="col-md-8">
                    <div className="cart-container p-3" style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                        <div className="cart-header" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
                            Giỏ hàng của bạn
                        </div>
                        {cart.length === 0 ? (
                            <NoProducts />
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
                    </div>
                </div>

                {/* Bill Section */}
                <div className="col-md-4">
                    <BillDetails
                        items={billItems}
                        handlePlaceOrder={handlePlaceOrder}
                        isSubmitting={isSubmitting}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
};

export default CartPage;
