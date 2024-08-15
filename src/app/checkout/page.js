"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { formatPrice } from '../components/Price';
import BillDetails from '../components/Cart-item/bill';

const CheckoutPage = () => {
    const router = useRouter();
    const cart = useSelector((state) => state.cart.items);
    const [streetAddress, setStreetAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const API = process.env.NEXT_PUBLIC_API_URL;

    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState('');

    // Fetch provinces data
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched Provinces:', data);
                setProvinces(data);
            })
            .catch(error => console.error('Error fetching provinces:', error));
    }, []);

    // Fetch districts when province changes
    useEffect(() => {
        if (selectedProvince) {
            const province = provinces.find(province => province.Id === selectedProvince);
            setDistricts(province?.Districts || []);
            setSelectedDistrict('');
            setWards([]);
        }
    }, [selectedProvince, provinces]);

    // Fetch wards when district changes
    useEffect(() => {
        if (selectedDistrict) {
            const district = districts.find(district => district.Id === selectedDistrict);
            setWards(district?.Wards || []);
            setSelectedWard('');
        }
    }, [selectedDistrict, districts]);

    // Debugging logs
    useEffect(() => {
        console.log('Selected Province:', selectedProvince);
    }, [selectedProvince]);

    useEffect(() => {
        console.log('Selected District:', selectedDistrict);
    }, [selectedDistrict]);

    useEffect(() => {
        console.log('Selected Ward:', selectedWard);
    }, [selectedWard]);

    useEffect(() => {
        console.log('Street Address:', streetAddress);
    }, [streetAddress]);

    // Calculate totals
    const originalTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountedTotal = cart.reduce((sum, item) => {
        const salePercentage = item.sale ? parseFloat(item.sale) : 0;
        const discountedPrice = item.price * (1 - salePercentage / 100);
        return sum + discountedPrice * item.quantity;
    }, 0);
    const discount = originalTotal - discountedTotal;

    const handlePlaceOrder = async () => {
        if (!streetAddress || !paymentMethod || !selectedProvince || !selectedDistrict || !selectedWard) {
            setError('Please fill in all required fields.');
            return;
        }
        
        const selectedProvinceName = provinces.find(province => province.Id === selectedProvince)?.Name || '';
        const selectedDistrictName = districts.find(district => district.Id === selectedDistrict)?.Name || '';
        const selectedWardName = wards.find(ward => ward.Id === selectedWard)?.Name || '';

        setIsSubmitting(true);
        try {
            const userPayload = JSON.parse(localStorage.getItem('userPayload'));
            if (!userPayload || !userPayload.id) {
                setError('User is not authenticated.');
                return;
            }

            const response = await axios.post(`${API}/carts/checkout`, {
                user: userPayload.id,
                items: cart,
                province: selectedProvinceName,
                district: selectedDistrictName,
                ward: selectedWardName,
                streetAddress: streetAddress,
                paymentMethod,
            });

            if (response.data.success) {
                alert("Order placed successfully!");
                router.push('/order');
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
                <div className="col-md-8 mt-4">
                    <div className="checkout-container p-3" style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                        <div className="checkout-header" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
                            Thanh toán
                        </div>
                        <div className="form-group">
                            <label htmlFor="streetAddress">Địa chỉ cụ thể</label>
                            <input
                                type="text"
                                id="streetAddress"
                                value={streetAddress}
                                onChange={(e) => setStreetAddress(e.target.value)}
                                className="form-control"
                                placeholder="Nhập địa chỉ cụ thể (ví dụ: 123 Phố Hoàng Mai)"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="province">Tỉnh/Thành phố</label>
                            <select
                                id="province"
                                value={selectedProvince}
                                onChange={(e) => setSelectedProvince(e.target.value)}
                                className="form-control"
                                required
                            >
                                <option value="" disabled>Chọn Tỉnh/Thành phố</option>
                                {provinces.map(province => (
                                    <option key={province.Id} value={province.Id}>
                                        {province.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="district">Quận/Huyện</label>
                            <select
                                id="district"
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                className="form-control"
                                required
                                disabled={!selectedProvince}
                            >
                                <option value="" disabled>Chọn Quận/Huyện</option>
                                {districts.map(district => (
                                    <option key={district.Id} value={district.Id}>
                                        {district.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ward">Phường/Xã</label>
                            <select
                                id="ward"
                                value={selectedWard}
                                onChange={(e) => setSelectedWard(e.target.value)}
                                className="form-control"
                                required
                                disabled={!selectedDistrict}
                            >
                                <option value="" disabled>Chọn Phường/Xã</option>
                                {wards.map(ward => (
                                    <option key={ward.Id} value={ward.Id}>
                                        {ward.Name}
                                    </option>
                                ))}
                            </select>
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
