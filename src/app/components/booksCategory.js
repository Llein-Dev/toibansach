import Link from "next/link";

// Hàm để định dạng số với dấu phân cách ngàn
const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0, // Số chữ số sau dấu thập phân
    }).format(price);
};

const BookCategoryComponent = ({ books, category }) => {
    return (
        <>
            <h4 className="my-3">{category}</h4>
            {books.map((book) => (
                <Link href={`/books/${book._id}`} legacyBehavior key={book._id}>
                    <div className="col-md-3 py-3 px-2 custom-book">
                        <div className="card">
                            <div className="gradient-overlay"></div>
                            {book.sale > 0 && (
                                <div className="sale-tag">
                                    -{book.sale}%
                                </div>
                            )}
                            <img
                                src={`http://localhost:3001/img/Books-image/${book.image}`}
                                className="card-img-top"
                                alt={book.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{book.name}</h5>
                                <p className="card-text">{book.description}</p>
                                <p className="card-price">
                                    {book.sale > 0 ? (
                                        <>
                                            <span className="text-decoration-line-through">
                                                {formatPrice(book.price)}
                                            </span>
                                            {formatPrice(book.price - (book.price * book.sale / 100))}
                                        </>
                                    ) : (
                                        formatPrice(book.price)
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
};

export default BookCategoryComponent;
