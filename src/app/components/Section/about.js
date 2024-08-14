// src/components/AboutComponent.js
const AboutComponent = () => {
    return (
        <section className="about_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="img-box">
                            <img src="images/about-img.png" alt="About Our Bookstore" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="detail-box">
                            <div className="heading_container">
                                <h2>
                                    Giới Thiệu Về Cửa Hàng Sách Của Chúng Tôi
                                </h2>
                            </div>
                            <p>
                                Chào mừng bạn đến với cửa hàng sách của chúng tôi, nơi cung cấp một bộ sưu tập phong phú các đầu sách từ văn học cổ điển đến sách hiện đại. Chúng tôi cam kết mang đến cho bạn những cuốn sách chất lượng cao và dịch vụ khách hàng tận tâm. Tại cửa hàng của chúng tôi, bạn có thể tìm thấy những cuốn sách phù hợp với sở thích và nhu cầu đọc của mình. Hãy đến và khám phá thế giới sách tuyệt vời với chúng tôi!
                            </p>
                            <a href="/about">
                                Đọc Thêm
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutComponent;
