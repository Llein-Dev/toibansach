import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BillDetails = ({ items }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);

    const handleCheckout = async () => {
        setIsSubmitting(true);
        try {
            console.log('Cart data being sent:', cart); // Log cart data
            const response = await axios.post('http://localhost:3001/carts/checkout', { items: cart });
            if (response.status === 201) {
                // Handle successful checkout
            }
        } catch (error) {
            console.error('Error submitting cart:', error.response ? error.response.data : error.message);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="bill-container p-3" style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <div className="cart-header" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
                Hóa đơn
            </div>
            <div className="bill-details" style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#f8f9fa' }}>
                {items.map((item, index) => (
                    <div className="row" key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #dee2e6', padding: '10px 0' }}>
                        <p className="label" style={{ fontSize: '16px', fontWeight: 'bold', color: '#343a40' }}>{item.label}:</p>
                        <p className="value" style={{ fontSize: '16px', fontWeight: 'bold', color: '#28a745' }}>{item.value}</p>
                    </div>
                ))}
            </div>
            <div className="checkout-btn text-right mt-3">
                <button className="btn btn-success" onClick={handleCheckout} disabled={isSubmitting}>Thanh toán</button>
            </div>
        </div>
    );
};

export default BillDetails;
