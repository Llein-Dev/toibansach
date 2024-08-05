import React, { useEffect, useState } from 'react';

const Filter = () => {
    // State để quản lý dữ liệu danh mục sách, tiêu chí lọc và trạng thái loading
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    // useEffect để fetch dữ liệu danh mục sách khi component mount
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            setFetchError(null);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Chờ 1 giây

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
                if (!res.ok) {
                    throw new Error('Failed to fetch related categories');
                }
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching related categories:', error.message);
                setFetchError(error.message);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []); // Chỉ chạy khi component mount

    // Hàm lọc danh mục sách dựa trên tên danh mục
    const applyFilter = () => {
        const filteredCategories = categories.filter(category =>
            category.name.toLowerCase().includes(filter.toLowerCase())
        );
        setCategories(filteredCategories);
    };

    // Xử lý sự kiện thay đổi của trường nhập liệu
    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    if (loading) return <p>Đang tải danh mục sách...</p>;
    if (fetchError) return <p>Lỗi khi tải danh mục sách: {fetchError}</p>;

    return (
        <div className="container">
            <h1>Danh Sách Các Danh Mục Sách</h1>

            {/* Form lọc */}
            <div className="filter-form">
                <input
                    type="text"
                    placeholder="Nhập tên danh mục để lọc"
                    value={filter}
                    onChange={handleChange}
                />
                <button onClick={applyFilter}>Lọc</button>
            </div>

            {/* Hiển thị danh sách các danh mục sách */}
            <div className="categories-list">
                {categories.length > 0 ? (
                    categories.map(category => (
                        <div key={category._id} className="category-item">
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                            <img src={`${process.env.NEXT_PUBLIC_API_URL}/img/Categories-image/${category.image}`} alt={category.name} />
                        </div>
                    ))
                ) : (
                    <p>Không có danh mục nào phù hợp với tiêu chí lọc.</p>
                )}
            </div>
        </div>
    );
};

export default Filter;
