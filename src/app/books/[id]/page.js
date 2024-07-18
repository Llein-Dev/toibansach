import Link from "next/link";

// Hàm để định dạng số với dấu phân cách ngàn
const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0, // Số chữ số sau dấu thập phân
    }).format(price);
};

const DetailPage = async ({ params, searchParams }) => {
    const { id } = params;
    const currentPage = parseInt(searchParams.page) || 1;

    async function fetchProductById(id) {
        try {
            const res = await fetch(`http://localhost:3001/products/product/${id}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch product: ${res.statusText}`);
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching product:', error.message);
            return null;
        }
    }

    async function fetchBooks(page) {
        try {
            const res = await fetch(`http://localhost:3001/products`);
            if (!res.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching books:', error.message);
            return { products: [], totalPages: 0 };
        }
    }

    const product = await fetchProductById(id);
    const filteredProducts = await fetchBooks(currentPage);

    if (!product) {
        return (
            <div className="container py-5 text-center">
                <h1 className="display-4">Error</h1>
                <p className="lead">Failed to load product details.</p>
            </div>
        );
    }

    // Kiểm tra và tính toán giá đã giảm
    let discountedPrice = 'N/A'; // Giá mặc định khi không có dữ liệu hợp lệ
    if (typeof product.price === 'number' && typeof product.sale === 'number') {
        discountedPrice = product.price - (product.price * product.sale / 100);
    }

    return (
        <section className="py-5 detail-page">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6">
                        <img
                            className="product-image"
                            src={`http://localhost:3001/img/Books-image/${product.image}`}
                            height={600}
                            alt={product.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <h1 className="display-5 fw-bold-custom">{product.name}</h1>
                        <div className="fs-5 mb-5">
                            <span className="text-decoration-line-through old-price">
                                {formatPrice(product.price)}
                            </span>
                            <span className="current-price">
                                {typeof discountedPrice === 'number' ? formatPrice(discountedPrice) : 'N/A'}
                            </span>
                        </div>
                        <p className="lead description-limited">{product.description}</p>
                        <div className="d-flex align-items-center">
                            <input className="form-control text-center me-3 quantity-input" id="inputQuantity" type="number" defaultValue="1" />
                            <button className="btn add-to-cart-btn" type="button">
                                <i className="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="accordion" id="descriptionAccordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <strong>Description</strong>
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#descriptionAccordion">
                                    <div className="accordion-body">
                                        {product.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <h2 className="text-center mb-4">You May Also Like</h2>
                        <div className="row">
                            {filteredProducts.map((relatedProduct) => {
                                let relatedDiscountedPrice = 'N/A';
                                if (typeof relatedProduct.price === 'number' && typeof relatedProduct.sale === 'number') {
                                    relatedDiscountedPrice = relatedProduct.price - (relatedProduct.price * relatedProduct.sale / 100);
                                }

                                return (
                                    <div key={relatedProduct._id} className="col-md-6 mb-4">
                                        <div className="d-flex align-items-center border rounded p-3 shadow-sm">
                                            <div className="me-3">
                                                <img
                                                    src={`http://localhost:3001/img/Books-image/${relatedProduct.image}`}
                                                    className="related-product-image"
                                                    alt={relatedProduct.name}
                                                />
                                            </div>
                                            <div>
                                                <h5 className="related-product-title">{relatedProduct.name}</h5>
                                                <p className="related-product-price">
                                                    {formatPrice(relatedDiscountedPrice)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailPage;
