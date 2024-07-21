"use client";
import { useEffect, useState } from 'react';
import CategoryComponent from '../components/Category-item/category';
import Filter from '../components/Category-item/filter';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            setFetchError(null);
            try {
                await new Promise(resolve => setTimeout(resolve, 200)); // Chờ 1 giây

                const res = await fetch(`http://localhost:3001/categories`);
                if (!res.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await res.json();
                setCategories(data);
                setFilteredCategories(data); // Cập nhật danh sách lọc khi có dữ liệu
            } catch (error) {
                console.error('Error fetching categories:', error.message);
                setFetchError(error.message);
                setFilteredCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []); // Chỉ chạy khi component mount

    // Hàm lọc danh mục sách dựa trên tên danh mục
    const applyFilter = (filterValue) => {
        const filtered = categories.filter(category =>
            category.name.toLowerCase().includes(filterValue.toLowerCase())
        );
        setFilteredCategories(filtered);
    };

    // Xử lý sự kiện thay đổi của trường nhập liệu
    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    // Xử lý sự kiện khi nhấn nút lọc
    const handleFilterSubmit = (event) => {
        event.preventDefault();
        applyFilter(filter);
    };

    // Reset filter và hiển thị toàn bộ danh mục
    const handleResetFilter = () => {
        setFilter('');
        setFilteredCategories(categories);
    };

    if (loading) return <div className='page'>Đang tải danh mục sách...</div>;
    if (fetchError) return <p>Lỗi khi tải danh mục sách: {fetchError}</p>;

    return (
        <section className="catagory_section layout_padding">
            <div className="catagory_container">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>Books Categories</h2>
                        <p>Explore a variety of book categories with something for everyone.</p>
                    </div>
                    {/* Form lọc */}
                    <div className="filter-form ml-auto my-4">
                        <form onSubmit={handleFilterSubmit}>
                            <input
                                className='btn border fiter-input'
                                type="text"
                                placeholder="Nhập tên danh mục để lọc"
                                value={filter}
                                onChange={handleChange}
                            />
                            <button className='btn border' type="submit">Lọc</button>
                        </form>
                    </div>
                    <div className="row">
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                                <CategoryComponent key={category._id} category={category} />  // Truyền danh mục cho component
                            ))
                        ) : (
                            <p>Không có danh mục nào phù hợp với tiêu chí lọc.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;
