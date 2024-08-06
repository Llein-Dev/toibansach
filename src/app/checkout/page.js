"use client";
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BillDetails from '../components/Cart-item/bill';
import { formatPrice } from '../components/Price';

const CheckoutPage = () => {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const mockAddress = "123 Đường Example, Phường 1, Quận 2";
    const mockPhoneNumber = "0123456789";
    const mockProvince = "Hà Nội";
    const mockDistrict = "Hoàn Kiếm";
    const mockWard = "Hàng Bạc";

    const [address, setAddress] = useState(mockAddress);
    const [phoneNumber, setPhoneNumber] = useState(mockPhoneNumber);
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [province, setProvince] = useState(mockProvince);
    const [district, setDistrict] = useState(mockDistrict);
    const [ward, setWard] = useState(mockWard);
    const [error, setError] = useState(null);
    const cart = useSelector((state) => state.cart.items);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Tính toán tổng số tiền
    const originalTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountedTotal = cart.reduce((sum, item) => {
        const salePercentage = item.sale ? parseFloat(item.sale) : 0;
        const discountedPrice = item.price * (1 - salePercentage / 100);
        return sum + discountedPrice * item.quantity;
    }, 0);
    const discount = originalTotal - discountedTotal;

    // Chi tiết hóa đơn
    const billItems = [
        { label: 'Sản phẩm', value: formatPrice(originalTotal) },
        { label: 'Giảm giá', value: `-${formatPrice(discount)}` },
        { label: 'Tổng cộng', value: formatPrice(discountedTotal) }
    ];

    // Xử lý gửi biểu mẫu
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            // Chuẩn bị dữ liệu đơn hàng
            const orderData = {
                address,
                phoneNumber,
                paymentMethod,
                province,
                district,
                ward,
                cartItems: cart, // Thêm dữ liệu giỏ hàng
            };

            // Gửi dữ liệu đơn hàng đến máy chủ
            const response = await axios.post(`${API}/carts/checkout`, orderData);

            if (response.data.success) {
                alert('Đặt hàng thành công');
                // Xóa giỏ hàng hoặc chuyển hướng đến trang xác nhận nếu cần
                // Example: dispatch(clearCart());
            } else {
                throw new Error('Đặt hàng thất bại');
            }
        } catch (err) {
            setError('Không thể hoàn tất thanh toán. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-8">
                    <h2 className="mb-4">Thanh toán</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="address">Địa chỉ</label>
                            <input
                                type="text"
                                id="address"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="phoneNumber">Số điện thoại</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                className="form-control"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="province">Tỉnh</label>
                            <input
                                type="text"
                                id="province"
                                className="form-control"
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="district">Quận/Huyện</label>
                            <input
                                type="text"
                                id="district"
                                className="form-control"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="ward">Phường/Xã</label>
                            <input
                                type="text"
                                id="ward"
                                className="form-control"
                                value={ward}
                                onChange={(e) => setWard(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="paymentMethod">Phương thức thanh toán</label>
                            <select
                                id="paymentMethod"
                                className="form-control"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="creditCard">Thẻ tín dụng</option>
                                <option value="paypal">PayPal</option>
                                {/* Thêm các phương thức thanh toán khác nếu cần */}
                            </select>
                        </div>

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
