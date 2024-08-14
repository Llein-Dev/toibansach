// src/components/BlogComponent.js
export default function BlogComponent() {
    return (
        <section className="blog_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>Bài Viết Từ Blog Của Chúng Tôi</h2>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="box">
                            <div className="img-box">
                                <img src="/images/b1.jpg" alt="Blog Post 1" />
                                <h4 className="blog_date">
                                    <span>19 Tháng 1, 2021</span>
                                </h4>
                            </div>
                            <div className="detail-box">
                                <h5>Khám Phá Những Cuốn Sách Mới</h5>
                                <p>
                                    Cập nhật những xu hướng sách mới nhất và những cuốn sách đáng đọc trong năm nay. Tìm hiểu các
                                    sách mới được phát hành và nhận xét từ các chuyên gia để không bỏ lỡ những tác phẩm hay.
                                </p>
                                <a href="#">Đọc Thêm</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="box">
                            <div className="img-box">
                                <img src="/images/b2.jpg" alt="Blog Post 2" />
                                <h4 className="blog_date">
                                    <span>19 Tháng 1, 2021</span>
                                </h4>
                            </div>
                            <div className="detail-box">
                                <h5>Cẩm Nang Đọc Sách Hiệu Quả</h5>
                                <p>
                                    Hãy khám phá các mẹo và kỹ thuật đọc sách để tận dụng tối đa thời gian của bạn. Hướng dẫn
                                    chi tiết về cách chọn sách phù hợp và cải thiện kỹ năng đọc của bạn.
                                </p>
                                <a href="#">Đọc Thêm</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
