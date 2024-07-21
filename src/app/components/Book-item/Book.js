import { motion } from "framer-motion";
import Link from "next/link";

const BookComponent = ({ books }) => {
    const variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <>
            {books.map((book) => {
                const discountedPrice = book.price - (book.price * book.sale / 100);
                return (
                    <Link href={`/books/${book._id}`} legacyBehavior key={book._id}>
                        <motion.div
                            className="col-md-3 py-3 px-2 custom-book"
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="card">
                                <div className="gradient-overlay"></div>
                                <div className="sale-tag">
                                    -{book.sale}%
                                </div>
                                <img
                                    src={`http://localhost:3001/img/Books-image/${book.image}`}
                                    className="card-img-top"
                                    alt={book.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{book.name}</h5>
                                    <p className="card-text">{book.description}</p>
                                    <p className="card-price">
                                        {discountedPrice} VND
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                );
            })}
        </>
    );
};

export default BookComponent;
