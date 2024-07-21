"use client";
import { useEffect, useState } from "react";
import BookComponent from "../components/Book-item/Book";
import BookMiniComponent from "../components/Book-item/Books-2";

const Books = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [sortOption, setSortOption] = useState("priceAsc");

    const fetchBooks = async () => {
        try {
            const res = await fetch('http://localhost:3001/products');
            if (!res.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await res.json();
            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error.message);
            setFetchError(error.message);
            setFilteredProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        const sortProducts = () => {
            let sortedProducts;
            switch (sortOption) {
                case "priceAsc":
                    sortedProducts = [...products].sort((a, b) => (a.price * (1 - a.sale / 100)) - (b.price * (1 - b.sale / 100)));
                    break;
                case "priceDesc":
                    sortedProducts = [...products].sort((a, b) => (b.price * (1 - b.sale / 100)) - (a.price * (1 - a.sale / 100)));
                    break;
                default:
                    sortedProducts = products;
            }
            setFilteredProducts(sortedProducts);
        };
        sortProducts();
    }, [sortOption, products]);

    if (loading) return <div className="page">Loading...</div>;
    if (fetchError) return <div className="error">Error: {fetchError}</div>;

    const hotBooks = [...products]
        .sort((a, b) => b.view - a.view)
        .slice(0, 4);

    return (
        <div className="hero_area">
            <section className="books_section mb-5">
                <div className="container">
                    <div className="py-5">
                        <div className="heading_container my-4 heading_center">
                            <h2>Hot Books</h2>
                        </div>
                        <div className="row">
                            <BookMiniComponent books={hotBooks} />
                        </div>
                    </div>
                    <div className="py-5">
                        <div className="heading_container my-4 heading_center">
                            <h2>Library</h2>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sortOptions" className="form-label">Sort by:</label>
                            <select
                                id="sortOptions"
                                className="form-select"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="priceAsc">Low to High</option>
                                <option value="priceDesc">High to Low</option>
                            </select>
                        </div>
                        <div className="row">
                            <BookComponent books={filteredProducts} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Books;
