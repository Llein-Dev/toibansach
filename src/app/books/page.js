"use client"
import { useEffect, useState } from "react";
import BookComponent from "../components/Book";
import BookMiniComponent from "../components/Books-2";

const Books = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const fetchBooks = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 200)); // Delay for 200ms
            const res = await fetch('http://localhost:3001/products');
            if (!res.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await res.json();
            setProducts(data);
            setFilteredProducts(data); // Update filtered list with fetched data
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

    if (loading) return <div>Loading...</div>;
    if (fetchError) return <div>Error: {fetchError}</div>;

    const sortedByPrice = [...products]
        .sort((a, b) => b.sale - a.sale)
        .slice(0, 4);

    const hotBooks = [...products]
        .sort((a, b) => b.view - a.view)
        .slice(0, 4);

    return (
        <div className="hero_area">
            <section className="books_section mb-5">
                <div className="container">
                    {/* <div className="heading_container heading_center">
                        <h2>Our Books</h2>
                        <p>Explore our collection of books available at TOIBANSACH Bookstore.</p>
                    </div> */}

                    {/* Sản phẩm hot */}
                    <div className="py-5" >
                        <h3 className="my-4 title-product">Hot Books</h3>
                        <div className="row">
                            <BookMiniComponent books={hotBooks} />
                        </div>
                    </div>

                    {/* Sản phẩm theo giá từ thấp tới cao */}
                    <div className="py-5">
                        <h3 className="my-4 title-product">Good Price</h3>
                        <div className="row">
                            <BookMiniComponent books={sortedByPrice} />
                        </div>
                    </div>

                    {/* Sản phẩm theo chủ đề */}
                    <div className="py-5">
                        <h3 className="my-4 title-product">Books</h3>

                        <div className="row">
                            <BookComponent books={products} />
                        </div>


                    </div>
                </div>
            </section>
        </div>
    );
};

export default Books;