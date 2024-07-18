import Link from "next/link";
import { formatPrice } from "./Price";


const BookMiniComponent = ({ books }) => {
    return (
        <>
            {books.map((book) => {
                let relatedDiscountedPrice = 'N/A';
                if (typeof book.price === 'number' && typeof book.sale === 'number') {
                    relatedDiscountedPrice = book.price - (book.price * book.sale / 100);
                }

                return (
                    <Link href={`/books/${book._id}`} legacyBehavior key={book._id}>
                        <div key={book._id} className="col-md-6 mb-4">
                            <div className="d-flex align-items-center border rounded p-3 shadow-sm position-relative">
                                {book.sale > 0 && (
                                    <span className="badge bg-danger text-light position-absolute top-0 start-0 m-2">{book.sale }%</span>
                                )}
                                <div className="me-3">
                                    <img
                                        src={`http://localhost:3001/img/Books-image/${book.image}`}
                                        className="related-product-image"
                                        alt={book.name}
                                    />
                                </div>
                                <div>
                                    <h5 className="related-product-title">{book.name}</h5>
                                    <p className="related-product-price">
                                        {formatPrice(relatedDiscountedPrice)}
                                    </p>
                                    {book.sale > 0 && (
                                        <p className="text-muted text-decoration-line-through">
                                            {formatPrice(book.price)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </>
    );
};

export default BookMiniComponent;
