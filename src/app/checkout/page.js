"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BillDetails from '../components/Cart-item/bill';
import { formatPrice } from '../components/Price';

const CheckoutPage = () => {
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [error, setError] = useState(null);
    const cart = useSelector((state) => state.cart.items);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Calculate totals
    const originalTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountedTotal = cart.reduce((sum, item) => {
        const salePercentage = item.sale ? parseFloat(item.sale) : 0;
        const discountedPrice = item.price * (1 - salePercentage / 100);
        return sum + discountedPrice * item.quantity;
    }, 0);
    const discount = originalTotal - discountedTotal;

    // Bill details
    const billItems = [
        { label: 'Sản phẩm', value: formatPrice(originalTotal) },
        { label: 'Giảm giá', value: `-${formatPrice(discount)}` },
        { label: 'Tổng cộng', value: formatPrice(discountedTotal) }
    ];

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            // Handle order placement logic here
            // const response = await axios.post('/orders', { address, paymentMethod, province, district, ward });
            // if (response.data.success) {
            //     alert('Order placed successfully');
            // } else {
            //     throw new Error('Order failed');
            // }
        } catch (err) {
            setError('Failed to complete checkout. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fetch provinces
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('https://vapi.vnappmob.com/api/province');
                if (response.data && Array.isArray(response.data.results)) {
                    setProvinces(response.data.results);
                } else {
                    throw new Error('Invalid data format for provinces');
                }
            } catch (err) {
                setError('Failed to load provinces. Please try again later.');
            }
        };

        fetchProvinces();
    }, []);

    // Fetch districts when province changes
    useEffect(() => {
        if (province) {
            const fetchDistricts = async () => {
                try {
                    const response = await axios.get(`https://vapi.vnappmob.com/api/district?provinceid=${province}`);
                    if (response.data && Array.isArray(response.data.results)) {
                        setDistricts(response.data.results);
                    } else {
                        throw new Error('Invalid data format for districts');
                    }
                } catch (err) {
                    setError('Failed to load districts. Please try again later.');
                }
            };

            fetchDistricts();
        } else {
            setDistricts([]);
            setWard('');
        }
    }, [province]);

    // Fetch wards when district changes
    useEffect(() => {
        if (district) {
            const fetchWards = async () => {
                try {
                    const response = await axios.get(`https://vapi.vnappmob.com/api/ward?districtid=${district}`);
                    if (response.data && Array.isArray(response.data.results)) {
                        setWards(response.data.results);
                    } else {
                        throw new Error('Invalid data format for wards');
                    }
                } catch (err) {
                    setError('Failed to load wards. Please try again later.');
                }
            };

            fetchWards();
        } else {
            setWards([]);
        }
    }, [district]);

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-8">
                    <h2 className="mb-4">Checkout</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="province">Province</label>
                            <select
                                id="province"
                                className="form-control"
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                required
                            >
                                <option value="">Select Province</option>
                                {provinces.map((prov) => (
                                    <option key={prov.province_id} value={prov.province_id}>
                                        {prov.province_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="district">District</label>
                            <select
                                id="district"
                                className="form-control"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                required
                                disabled={!province}
                            >
                                <option value="">Select District</option>
                                {districts.map((dist) => (
                                    <option key={dist.district_id} value={dist.district_id}>
                                        {dist.district_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="ward">Ward</label>
                            <select
                                id="ward"
                                className="form-control"
                                value={ward}
                                onChange={(e) => setWard(e.target.value)}
                                required
                                disabled={!district}
                            >
                                <option value="">Select Ward</option>
                                {wards.map((wrd) => (
                                    <option key={wrd.ward_id} value={wrd.ward_id}>
                                        {wrd.ward_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="paymentMethod">Payment Method</label>
                            <select
                                id="paymentMethod"
                                className="form-control"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="creditCard">Credit Card</option>
                                <option value="paypal">PayPal</option>
                                {/* Add more payment methods as needed */}
                            </select>
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'Complete Checkout'}
                        </button>
                    </form>
                </div>
                <div className="col-md-4">
                    <BillDetails
                        items={billItems}
                        handlePlaceOrder={handleSubmit}
                        isSubmitting={isSubmitting}
                        error={error}
                        setAddress={setAddress}
                        setPaymentMethod={setPaymentMethod}
                    />
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
