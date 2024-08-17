"use client";

import axios from 'axios';
import BookComponent from '@/app/components/Book-item/Book';
import { useEffect, useState } from 'react';

const CategoriesID = ({ params }) => {
    const categoryId = params.id;
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setFetchError(null);
            try {
                const categoryResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`);
                setCategory(categoryResponse.data);

                const productsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/category/${categoryId}`);
                setProducts(productsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setFetchError(error.message);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categoryId]);

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (fetchError) return <p>Lỗi khi tải dữ liệu: {fetchError}</p>;

    if (!category) return <p>Không tìm thấy danh mục này.</p>; // Fallback for null category

    return (
        <section className="catagory_section mb-5">
            <div className="category_container">
                <div className="container">
                    <div className="heading_container heading_center my-5">
                        <div className="box">
                            <div className="img-box">
                                <img src={`${process.env.NEXT_PUBLIC_API_URL}/img/Categories-image/${category.image}`} alt={category.name} />
                            </div>
                            <div className="detail-box">
                                <h5>{category.name}</h5>
                                <p>{category.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <BookComponent books={products} />
                    </div>
                </div>
            </div>
        </section >
    );
};

export default CategoriesID;
