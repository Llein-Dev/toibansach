// src/app/search/page.js
"use client"
import BookComponent from "../components/Book-item/Book";
import NoResults from "../components/header/Noresults";
import ContactComponent from "../components/Section/contact";
import { useSearch } from "../components/text/searchcontext";

export default async function SearchPage({ searchParams }) {
    const { keyword, setKeyword } = useSearch();

    // Cập nhật từ khóa nếu có
    if (searchParams.keyword) {
        setKeyword(searchParams.keyword);
    }

    // Nếu không có từ khóa tìm kiếm, hiển thị tất cả dữ liệu hoặc một thông báo
    if (!keyword) {
        return (
            <div className="search-page container my-3">
                <div className="row">
                    <div className="col-12">
                        <h2 className="search-title">Hiển thị tất cả sản phẩm</h2>
                        <div className="search-results">
                            <p>Hiện không có từ khóa tìm kiếm. Vui lòng nhập từ khóa để tìm kiếm sản phẩm.</p>
                        </div>
                    </div>
                </div>
                <ContactComponent />
            </div>
        );
    }

    try {
        const res = await fetch(`http://localhost:3001/search?keyword=${encodeURIComponent(keyword)}`, {
            next: { revalidate: 10 },
        });

        if (!res.ok) {
            throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
        }

        const productSearch = await res.json();

        return (
            <div className="search-page container my-3">
                <div className="row">
                    <div className="col-12">
                        <h2 className="search-title">
                            Kết quả tìm kiếm cho từ khóa: <span className="keyword">{keyword}</span>
                        </h2>
                        <div className="search-results">
                            {productSearch.length > 0 ? (
                                <div className="row">
                                    <BookComponent books={productSearch} />
                                </div>
                            ) : (
                                <NoResults keyword={keyword} />
                            )}
                        </div>
                    </div>
                </div>
                <ContactComponent />
            </div>
        );
    } catch (error) {
        console.error('SearchPage Error:', error.message);
        return (
            <div className="search-page container">
                <div className="error-message">
                    <h3>Không tìm thấy kết quả!</h3>
                    <p>Vui lòng thử lại sau hoặc liên hệ với chúng tôi nếu vấn đề vẫn tiếp tục.</p>
                    <img src="/images/slider-img.png" width="50%" alt="Error" />
                </div>
            </div>
        );
    }
}
