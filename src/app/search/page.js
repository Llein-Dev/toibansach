import BookComponent from "../components/Book";
import ContactComponent from "../components/contact";
import NoResults from "../components/Noresults";

export default async function SearchPage({ searchParams }) {
    const keyword = searchParams.keyword || '';

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
                        <h2 className="search-title">Kết quả tìm kiếm cho từ khóa: <span className="keyword">{keyword}</span></h2>
                        <div className="search-results ">
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
            <div className="search-page container ">
                <div className="error-message">

                    <h3>Không tìm thấy kết quả!</h3>
                    <p>Vui lòng thử lại sau hoặc liên hệ với chúng tôi nếu vấn đề vẫn tiếp tục.</p>
                    <img src="images/slider-img.png" width="50%" />
                </div>
            </div>
        );
    }
}
