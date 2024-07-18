"use client"
import { useEffect, useState } from "react";
export default function Detail({ params }) {
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${params.id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [params.id]);

    return (
        <div>
            <h1>Tên Sản Phẩm: {product.title}</h1>
            <p>Giá: {product.price}</p>
        </div>
    );
}
