"use client";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/Cart-item/cart';
import BillDetails from '../components/Cart-item/bill';
import NoProducts from '../components/Book-item/no-product';
import { removeFromCart, updateQuantity, clearCart } from '../../../redux/slices/cartSlice'; // Added clearCart
import { formatPrice } from '../components/Price';
import axios from 'axios'; // Axios for API requests

const CheckOut = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);
    const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

    // Calculate the total price without discount
    const originalTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Calculate the total price with discounts applied
    const discountedTotal = cart.reduce((sum, item) => {
        // Ensure sale is a valid number, default to 0 if not
        const salePercentage = item.sale ? parseFloat(item.sale) : 0;
        const discountedPrice = item.price * (1 - salePercentage / 100);
        return sum + discountedPrice * item.quantity;
    }, 0);

    // Calculate the discount amount
    const discount = originalTotal - discountedTotal;

    // Prepare bill items
    const billItems = [
        { label: 'Sản phẩm', value: `${formatPrice(originalTotal)} VND` },
        { label: 'Giảm giá', value: `-${formatPrice(discount)} VND` },
        { label: 'Tổng cộng', value: `${formatPrice(discountedTotal)} VND` }
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
                                    key={item.id}
                                    item={item}
                                    onRemove={() => dispatch(removeFromCart(item.id))}
                                    onQuantityChange={(quantity) => dispatch(updateQuantity({ id: item.id, quantity }))}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Bill Section */}
                <div className="col-md-4">
                    <BillDetails items={billItems} cart={cart} dispatch={dispatch} clearCart={clearCart} setIsSubmitting={setIsSubmitting} isSubmitting={isSubmitting} />
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
