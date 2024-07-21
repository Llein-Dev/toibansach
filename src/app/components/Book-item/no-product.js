// app/product/page.js
import React from 'react';

const NoProducts = () => {
    return (
        <div className="container mt-4 text-center">
            <div className="no-products-content" style={{ padding: '50px 0', textAlign: 'center' }}>
                <img
                    src="./logo.svg"
                    alt="No Products"
                    className="img-fluid mb-4"
                    style={{ maxWidth: '200px', borderRadius: '50%' }}
                />
                <h3 className="display-6 mb-4" style={{ fontWeight: 'bold', color: '#333' }}>
                    Chưa có sản phẩm
                </h3>
                <p className="lead" >
                    <a href="/books" className="btn btn-light ml-2">
                        Thêm ngay
                    </a>
                </p>
            </div>
        </div>
    );
};

export default NoProducts;
