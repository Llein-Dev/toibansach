"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

const API =process.env.NEXT_PUBLIC_API_URL;;

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
        <div className='container'>
            <h1>Order History</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total Amount</th>

                        <th>Address</th>

                        <th>Date</th>
                        <th>Items</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.totalAmount.toFixed(2)}</td>
                                <td>{order.address}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <ul>
                                        {order.items.map((item, index) => (
                                            <li className='list-none' key={index}>{item.name} (Quantity: {item.quantity})</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No orders found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;
