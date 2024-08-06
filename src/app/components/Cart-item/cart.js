import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '@/app/redux/slices/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function CartItem({ item, onRemove, onQuantityChange }) {
    const dispatch = useDispatch();

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        dispatch(updateQuantity({ id: item._id, quantity: newQuantity }));
    };

    const handleRemove = () => {
        onRemove(item._id);
    };
    const discountedPrice = item.price - (item.price * item.sale / 100);

    return (
        <div className="cart-item  d-flex align-items-center h-100 mb-3">
            <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/img/Books-image/${item.image}`}
                alt={item.name}
                className="cart-item-image mr-3"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />

            <div className="cart-item-details h-100 d-flex flex-column ml-3">
                <h5 className="mb-3 fw-normal">{item.name}</h5>
                <div className='d-flex'>
                    {item.sale > 0 && (
                        <span className="badge bg-danger text-light  m-2">{item.sale}%</span>
                    )}
                    <p className="my-2 text-line opacity-75">
                        <del> {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</del>

                    </p>
                </div>

            </div>
            <div className="ml-3">
                <strong>
                    {(discountedPrice * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </strong>
                <div className="d-flex align-items-center mt-2">
                    <input
                        type="number"
                        className="form-control mr-2"
                        value={item.quantity}
                        onChange={handleQuantityChange}
                        min="1"
                        style={{ width: '80px', textAlign: 'center' }}
                    />
                    <button className="btn btn-danger" onClick={handleRemove}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
