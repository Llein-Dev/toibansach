"use client"
import { useState, useMemo } from "react";

export default function Cart() {
    const [cart, setCart] = useState([
        { id: 1, name: "Product 1", price: 10, quantity: 2 },
        { id: 2, name: "Product 2", price: 20, quantity: 1 },
        // Add more items here
    ]);

    const total = useMemo(() => {
        console.log("render");
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cart]);

    function addtocart() {
        // Add code to add item to cart
        setCart((prevCart) => [...prevCart, { id: 3, name: "Product 3", price: 30, quantity: 1 }]);
    }

    return (
        <>
            <div>
                <button className="btn" onClick={addtocart}>Thêm giỏ hàng</button>
                <p>Total: {total}</p>
            </div>
        </>
    );
}