"use client"
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { addToCart } from '../../../../redux/slices/CartSlice';
import { useSelector, useDispatch } from "react-redux";

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    }).format(price);
};

const DetailPage = ({ params }) => {
    const { id } = params;
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    const { data: product, error } = useSWR(`http://localhost:3001/products/product/${id}`, fetcher);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const res = await fetch(`http://localhost:3001/products`);
                if (!res.ok) throw new Error('Failed to fetch related products');
                const data = await res.json();
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching related products:', error.message);
                setFetchError(error.message);
                setFilteredProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRelatedProducts();
    }, []);

    if (error) return <div className="error-message"><strong>Lỗi khi tải sản phẩm.</strong></div>;
    if (!product) return <div className="loading"><p>Loading...</p><div className="spinner"></div></div>;

    let discountedPrice = 'N/A';
    if (typeof product.price === 'number' && typeof product.sale === 'number') {
        discountedPrice = product.price - (product.price * product.sale / 100);
    }

    return (
        <section className="py-5 detail-page">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6">
                        <img
                            className="product-image"
                            src={`http://localhost:3001/img/Books-image/${product.image}`}
                            height={600}
                            alt={product.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <h1 className="display-5 fw-bold-custom">{product.name}</h1>
                        <div className="fs-5 mb-5">
                            <span className="text-decoration-line-through old-price">
                                {formatPrice(product.price)}
                            </span>
                            <span className="current-price">
                                {typeof discountedPrice === 'number' ? formatPrice(discountedPrice) : 'N/A'}
                            </span>
                        </div>
                        <p className="lead description-limited">{product.description}</p>
                        <div className="d-flex align-items-center">
                            <input
                                className="form-control text-center me-3 quantity-input"
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                            <button
                                className="btn btn-primary my-2"
                                onClick={() => dispatch(addToCart({ item: product, quantity }))}
                            >
                                <i className="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                        </div>
                        <div className="mt-3">
                            <strong>Số lượng sản phẩm đã thêm vào giỏ hàng: {totalQuantity}</strong>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="accordion" id="descriptionAccordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                    >
                                        <strong>Description</strong>
                                    </button>
                                </h2>
                                <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#descriptionAccordion"
                                >
                                    <div className="accordion-body">
                                        {product.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <h2 className="text-center mb-4">You May Also Like</h2>
                        <div className="row">
                            {loading ? (
                                <div className="loading">
                                    <p>Loading...</p>
                                    <div className="spinner"></div>
                                </div>
                            ) : (
                                filteredProducts.length > 0 ? filteredProducts.map((relatedProduct) => {
                                    let relatedDiscountedPrice = 'N/A';
                                    if (typeof relatedProduct.price === 'number' && typeof relatedProduct.sale === 'number') {
                                        relatedDiscountedPrice = relatedProduct.price - (relatedProduct.price * relatedProduct.sale / 100);
                                    }

                                    return (
                                        <div key={relatedProduct._id} className="col-md-6 mb-4">
                                            <div className="d-flex align-items-center border rounded p-3 shadow-sm">
                                                <div className="me-3">
                                                    <img
                                                        src={`http://localhost:3001/img/Books-image/${relatedProduct.image}`}
                                                        className="related-product-image"
                                                        alt={relatedProduct.name}
                                                    />
                                                </div>
                                                <div>
                                                    <h5 className="related-product-title">{relatedProduct.name}</h5>
                                                    <p className="related-product-price">
                                                        {formatPrice(relatedDiscountedPrice)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }) : (
                                    <div className="no-products">
                                        <strong>Không có sản phẩm liên quan nào.</strong>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailPage;
