import Link from "next/link";
import { formatPrice } from "../Price";

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
                                src={`${process.env.NEXT_PUBLIC_API_URL}/img/Books-image/${book.image}`}
                                className="card-img-top"
                                alt={book.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{book.name}</h5>
                                <p className="card-text">{book.description}</p>
                                <p className="card-price">

                                    {formatPrice(book.price - (book.price * book.sale / 100))}

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
