import BookComponent from "../components/Book";
import BookCategoryComponent from "../components/booksCategory";

async function fetchBooks() {
    const res = await fetch('http://localhost:3001/products');
    if (!res.ok) {
        throw new Error('Failed to fetch books');
    }
    const data = await res.json();
    return data;
}

const Books = async () => {
    // Fetch all books
    const books = await fetchBooks();

    // Sort books by price (low to high)
    const sortedByPrice = books
        .sort((a, b) => a.price - b.price)
        .slice(0, 4);

    // Get hot books (assuming hot books have a sale property > 0)
    const hotBooks = books
        .filter(book => book.sale > 0)
        .slice(0, 4);

    // Get unique categories for the category section
    const uniqueCategories = [...new Set(books.map(book => book.category))];

    return (
        <div className="hero_area">
            <section className="books_section layout_padding">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>Our Books</h2>
                        <p>Explore our collection of books available at TOIBANSACH Bookstore.</p>
                    </div>

                    {/* Sản phẩm hot */}
                    <div className="my-5">
                        <h3>Hot Books</h3>
                        <div className="row">
                            <BookComponent books={hotBooks} />
                        </div>
                    </div>

                    {/* Sản phẩm theo giá từ thấp tới cao */}
                    <div className="my-5">
                        <h3>Books from Low to High Price</h3>
                        <div className="row">
                            <BookComponent books={sortedByPrice} />
                        </div>
                    </div>

                    {/* Sản phẩm theo chủ đề */}
                    <div className="my-5">
                        <h3>Books by Category</h3>
                        {uniqueCategories.map((category) => (
                            <div key={category} className="my-4">
                                <h4>{category}</h4>
                                <div className="row">
                                    <BookCategoryComponent books={books.filter(book => book.category === category)} category={category} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Books;