import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '../../../../redux/slices/cartSlice';

function CartItem({ item, onRemove }) {
    const dispatch = useDispatch();

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        dispatch(updateQuantity({ id: item._id, quantity: newQuantity }));
    };

    const handleRemove = () => {
        onRemove(item._id);
    };

    return (
        <div className="cart-item d-flex align-items-center mb-3">
            <img
                src={`http://localhost:3001/img/Books-image/${item.image}`}
                alt={item.name}
                className="cart-item-image mr-3"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <div className="cart-item-details flex-grow-1 ml-3">
                <h5 className="mb-1">{item.name}</h5>
                <p className="mb-1">
                    {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </p>
            </div>
            <div className="ml-3">
                <strong>
                    {(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
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
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
