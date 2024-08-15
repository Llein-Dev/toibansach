
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/app/redux/slices/cartSlice';
import BookMiniComponent from '@/app/components/Book-item/Books-2';
import NotificationPopup from '@/app/components/notion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from '@/app/components/Price';

const API = "http://localhost:3000";
// const API = process.env.NEXT_PUBLIC_API_URL;

const fetcher = (url) => fetch(url).then((res) => res.json());

const DetailPage = ({ params }) => {
    const { id } = params;
    const [quantity, setQuantity] = useState(1);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID, setUserID] = useState(null);
    const [Fullname, setFullname] = useState(null);
    const [Image, setImage] = useState(null);


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userPayload'));
        if (user && user.id) {
            setUserID(user.id);
            setFullname(user.fullname);
            setImage(user.image);
            setIsLoggedIn(true);
        }
    }, []);

    const handleAddToCart = async () => {
        try {
            dispatch(addToCart({ item: product, quantity }));
            setPopupType('success');
            setPopupMessage('Sản phẩm đã được thêm vào giỏ hàng!');
            setShowPopup(true);
        } catch (error) {
            setPopupType('error');
            setPopupMessage('Không thể thêm sản phẩm vào giỏ hàng.');
            setShowPopup(true);
        }
    };


    const handleCommentSubmit = async () => {
        if (!comment.trim()) {
            alert("Bình luận không được để trống.");
            return;
        }

        try {
            const response = await axios.post(`${API}/comment`, {
                productId: id,
                userID: userID,
                comment,
                fullname: Fullname, // Add fullname
                image: Image// Add image
            });
            setComment('');
            fetchComments();
        } catch (error) {
            console.error('Failed to submit comment:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${API}/comment/${id}`);
            setComments(response.data);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        }
    };

    const fetchRelatedProducts = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const res = await fetch(`${API}/products`);
            if (!res.ok) throw new Error('Failed to fetch related products');
            const data = await res.json();
            setFilteredProducts(data);
        } catch (error) {
            setFetchError(error.message);
            setFilteredProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
        fetchRelatedProducts();
    }, []);

    const { data: product, error } = useSWR(`${API}/products/${id}`, fetcher);

    if (error) return <div className="error-message h-100"><strong>Lỗi khi tải sản phẩm.</strong></div>;
    if (!product) return <div className="loading"><p>Loading...</p><div className="spinner"></div></div>;

    const discountedPrice = product.price - (product.price * product.sale / 100);

    return (
        <section className="py-5 detail-page">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6">
                        <img
                            className="product-image"
                            src={`${API}/img/Books-image/${product.image}`}
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
                            {discountedPrice !== null ? (
                                <span className="current-price">
                                    {formatPrice(discountedPrice)}
                                </span>
                            ) : (
                                <span className="current-price">N/A</span>
                            )}
                        </div>
                        <p className="description-limited">{product.description}</p>
                        <div className="d-flex align-items-center">
                            <input
                                className="form-control text-center me-3 quantity-input"
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value) > 0 ? Number(e.target.value) : 1)}
                            />
                            <button
                                className="btn btn-custom my-2"
                                onClick={() => handleAddToCart()}
                            >
                                <FontAwesomeIcon icon={faCartPlus} />
                            </button>
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
                    <div className="col-12 ">
                        <h2 className="text-center mb-4">Comments</h2>
                        <div className="comment-form d-flex align-items-start ">
                            <img
                                src={Image ? `${API}/images/Users-image/${Image}` : `${API}/images/Users-image/avatar.jpg`} // Hình đại diện người dùng
                                alt="user-avatar"
                                className="avatar rounded-circle me-3"
                                style={{ width: '50px', height: '50px' }}
                            />
                            <div className="flex-grow-1">
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Viết bình luận..."
                                ></textarea>
                                <button
                                    className="btn btn-primary mt-2 float-right"
                                    onClick={handleCommentSubmit}
                                >
                                    Gửi bình luận
                                </button>
                            </div>
                        </div>
                        <div className="comments-list mt-4">
                            {comments.length > 0 ? (
                                comments.map((com) => (
                                    <div key={com._id} className="comment-item d-flex align-items-start mb-4">
                                        <img
                                            src={com.image ? `${API}/images/Users-image/${com.image}` : `${API}/images/Users-image/avatar.jpg`}
                                            alt={com.image || 'avatar'}
                                            className="avatar rounded-circle me-3"
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                        <div className="comment-content">
                                            <strong className="username">{com.fullname}</strong>
                                            <p className="comment">{com.comment}</p>
                                            <small className="text-muted">{new Date(com.createdAt).toLocaleString()}</small>


                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">Chưa có bình luận nào.</p>
                            )}
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
                            ) : filteredProducts.length > 0 ? (
                                <BookMiniComponent books={filteredProducts} />
                            ) : (
                                <div className="no-products">
                                    <strong>Không có sản phẩm liên quan nào.</strong>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && <NotificationPopup type={popupType} message={popupMessage} onClose={() => setShowPopup(false)} />}
        </section >
    );
};

export default DetailPage;
