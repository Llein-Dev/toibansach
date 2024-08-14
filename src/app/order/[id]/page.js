import { formatPrice } from '../../components/Price';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/order.css';

const API = process.env.NEXT_PUBLIC_API_URL;

export default async function OrderDetailPage({ params }) {
    const { id } = params;

    try {
        const res = await fetch(`${API}/carts/orders/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await res.json();

        return (
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center my-4">
                    <a href="/order" className="btn btn-outline-secondary">Back to Orders</a>
                </div>

                <div className="card shadow-lg border-light mb-5">
                    <div className="card-body">
                        <div className="row mb-3 ">
                            <div className="col-md-6">
                                <h4 className="card-title">Order ID:</h4>
                                <p className="text-muted">{data.data._id}</p>
                            </div>
                        </div>

                        <div className="row mb-3 container">
                            <div className="col-md-6 border-end px-5 mb-3 mb-md-0">
                                <div className="row mb-2">
                                    <div className="col-6">
                                        <p><strong>Address:</strong></p>
                                    </div>
                                    <div className="col-6 text-end">
                                        <p>{data.data.address}</p>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6">
                                        <p><strong>Date:</strong></p>
                                    </div>
                                    <div className="col-6 text-end">
                                        <p>{new Date(data.data.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6">
                                        <p><strong>Status:</strong></p>
                                    </div>
                                    <div className="col-6 text-end">
                                        <span className={`badge ${data.data.status === 'Completed' ? 'bg-success' : 'bg-warning'} ms-2`}>
                                            {data.data.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 ps-5">
                                <div className="row mb-2">
                                    <div className="col-6">
                                        <p><strong>Total Amount:</strong></p>
                                    </div>
                                    <div className="col-6 text-end">
                                        <p>{formatPrice(data.data.totalAmount)}</p>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6">
                                        <p><strong>Discount:</strong></p>
                                    </div>
                                    <div className="col-6 text-end">
                                        <p>{formatPrice(data.data.discount)}</p>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6">
                                        <p><strong>Payment Method:</strong></p>
                                    </div>
                                    <div className="col-6 text-end">
                                        <p>{data.data.paymentMethod}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h5 className="mt-4 fw-bold">Products:</h5>
                        <ul className="list-group list-group-flush">
                            {data.data.items.map((item, index) => (
                                <li key={index} className="shadow list-group-item d-flex justify-content-between align-items-center">
                                    <div className="d-flex flex-column">
                                        <span className="fw-bold">{item.name}</span>
                                        <small className="text-muted">x {item.quantity}</small>
                                    </div>
                                    <span className="fw-bold">{formatPrice(item.price)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching order:', error);
        return <p className="text-danger text-center">Error: {error.message}</p>;
    }
}
