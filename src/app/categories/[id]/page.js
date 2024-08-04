"use client"

import BookComponent from '@/app/components/Book-item/Book';
import { useEffect, useState } from 'react';


async function fetchCategories(categoryId) {
    const res = await fetch(`http://localhost:3001/categories/category/${categoryId}`);
    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }
    const data = await res.json();
    return data;
}

async function fetchCategoryProducts(categoryId) {
    const res = await fetch(`http://localhost:3001/products/${categoryId}`);
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    const data = await res.json();
    return data;
}

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
                const categoryData = await fetchCategories(categoryId);
                setCategory(categoryData);

                const productsData = await fetchCategoryProducts(categoryId);
                setProducts(productsData);
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

    return (
        <section className="catagory_section mb-5">
            <div className="catagory_container">
                <div className="container">
                    <div className="heading_container heading_center my-5">
                        <div className="box">
                            <div className="img-box">
                                <img src={`http://localhost:3001/img/Categories-image/${category.image}`} alt={category.name} />
                            </div>
                            <div className="detail-box">
                                <h2>{category.name}</h2>
                                <p>{category.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <BookComponent books={products} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoriesID;
