"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { formatPrice } from '../components/Price';
import BillDetails from '../components/Cart-item/bill';

const CheckoutPage = () => {
    const router = useRouter();
    const cart = useSelector((state) => state.cart.items);
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const API = process.env.NEXT_PUBLIC_API_URL;

    const originalTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountedTotal = cart.reduce((sum, item) => {
        const salePercentage = item.sale ? parseFloat(item.sale) : 0;
        const discountedPrice = item.price * (1 - salePercentage / 100);
        return sum + discountedPrice * item.quantity;
    }, 0);
    const discount = originalTotal - discountedTotal;

    const userPayload = JSON.parse(localStorage.getItem('userPayload'));

    const handlePlaceOrder = async () => {
        if (!address || !paymentMethod) {
            setError('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post(`${API}/carts/checkout`, {
                user: userPayload.id,
                items: cart,
                address,
                paymentMethod,
            });

            if (response.data.success) {
                alert("Đã Đặt Hàng Thành Công")
                router.push('/order'); // Navigate to success page
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.error('Order Placement Error:', err);
            setError('There was an error placing your order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const billItems = [
        { label: 'Sản phẩm', value: formatPrice(originalTotal) },
        { label: 'Giảm giá', value: `-${formatPrice(discount)}` },
        { label: 'Tổng cộng', value: formatPrice(discountedTotal) }
    ];

    return (
        <div className="container my-5">
            <div className="row">
                {/* Billing Details Section */}
                <div className="col-md-8">
                    <div className="checkout-container p-3" style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                        <div className="checkout-header" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
                            Thanh toán
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Địa chỉ giao hàng</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="form-control"
                                placeholder="Nhập địa chỉ giao hàng (ví dụ: 123 Phố Hoàng Mai, Hà Nội)"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="paymentMethod">Phương thức thanh toán</label>
                            <select
                                id="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="form-control"
                                required
                            >
                                <option value="" disabled>Chọn phương thức thanh toán</option>
                                <option value="cash_on_delivery">Trả tiền sau</option>
                                <option value="momo">Momo</option>
                            </select>
                        </div>
                        {error && <p className="text-danger mt-2">{error}</p>}
                    </div>
                </div>

                {/* Bill Section */}
                <div className="col-md-4">
                    <BillDetails
                        items={billItems}
                        isSubmitting={isSubmitting}
                        handlePlaceOrder={handlePlaceOrder}
                    />
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
