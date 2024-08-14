// src/app/order/[id]/page.js
import { formatPrice } from '../../components/Price';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/order.css'

const API = "http://localhost:3000";

export default async function OrderDetailPage({ params }) {
    const { id } = params;

    try {
        const res = await fetch(`${API}/carts/orders/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await res.json();

        return (
            <div className='container py-5'>

                <div class="heading_container my-4 heading_center"><h2>Order Details</h2></div>

                <div className='card shadow-lg border-light'>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <h4 className='card-title'>Order ID:</h4>
                                <p className='text-muted'>{data.data._id}</p>
                            </div>
                            <div className='col-md-6'>
                                <h4 className='card-title'>Address:</h4>
                                <p className='text-muted'>{data.data.address}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <p><strong className='text-dark'>Date:</strong> {new Date(data.data.createdAt).toLocaleDateString()}</p>
                                <p><strong className='text-dark'>Total Amount:</strong> {formatPrice(data.data.totalAmount)}</p>
                                <p><strong className='text-dark'>Status:</strong> <button className='btn btn-primary'>{data.data.status}</button></p>
                            </div>  
                            <div className='col-md-6'>
                                <p><strong className='text-dark'>Discount:</strong> {formatPrice(data.data.discount)}</p>
                                <p><strong className='text-dark'>Payment Method:</strong> {data.data.paymentMethod}</p>
                                
                            </div>
                        </div>

                        <h5 className='mt-4 text-primary'>Products:</h5>
                        <ul className='list-group'>
                            {data.data.items.map((item, index) => (
                                <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>
                                    <div className='d-flex flex-column'>
                                        <span className='fw-bold'>{item.name}</span>
                                        <small className='text-muted'>x {item.quantity}</small>
                                    </div>
                                    <span className='fw-bold'>{formatPrice(item.price)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching order:', error);
        return <p className='text-danger text-center'>Error: {error.message}</p>;
    }
}
