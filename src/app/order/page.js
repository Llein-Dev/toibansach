"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatPrice } from '../components/Price';

const API = process.env.NEXT_PUBLIC_API_URL;

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userPayload = localStorage.getItem('userPayload');
                if (!userPayload) {
                    throw new Error('User payload not found');
                }

                const user = JSON.parse(userPayload);
                if (!user || !user.id) {
                    throw new Error('User ID not found in payload');
                }

                const response = await axios.get(`${API}/carts/orders/${user.id}`);
                setOrders(response.data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='container py-5'>
            <div class="heading_container my-4 heading_center"><h2>Order</h2></div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Đơn Hàng</th>
                        <th>Address</th>
                        <th>Total</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <ul className='list-unstyled'>
                                        {order.items.map((item, idx) => (
                                            <li key={idx}>{item.name} (x {item.quantity})</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{order.address}</td>
                                <td>{formatPrice(order.totalAmount)}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No orders found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;
