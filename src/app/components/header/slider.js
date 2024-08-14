import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';


const SliderComponent = () => {
    return (
        <section className="slider_section">
            <div id="customCarousel1" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="detail-box">
                                        <h5>TOIBANSACH</h5>
                                        <h1>Cho Tất Cả Nhu Cầu Đọc Sách Của Bạn</h1>
                                        <p>
                                            Chúng tôi cung cấp đa dạng các thể loại sách, từ tiểu thuyết, khoa học, đến sách học thuật.
                                            Đến với chúng tôi để tìm thấy cuốn sách phù hợp với sở thích và nhu cầu của bạn.
                                        </p>
                                        <a href="#">Tìm Hiểu Thêm</a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="img-box">
                                        <img src="/images/slider-img.png" alt="Ảnh Slider 1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="detail-box">
                                        <h5>Nhà Sách Bostorek</h5>
                                        <h1>Cho Tất Cả Nhu Cầu Đọc Sách Của Bạn</h1>
                                        <p>
                                            Khám phá thế giới sách phong phú với chúng tôi. Chúng tôi cam kết mang đến những cuốn sách chất lượng
                                            và dịch vụ tốt nhất cho bạn.
                                        </p>
                                        <a href="#">Tìm Hiểu Thêm</a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="img-box">
                                        <img src="/images/slider-img.png" alt="Ảnh Slider 2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="detail-box">
                                        <h5>Nhà Sách Bostorek</h5>
                                        <h1>Cho Tất Cả Nhu Cầu Đọc Sách Của Bạn</h1>
                                        <p>
                                            Với đội ngũ nhân viên chuyên nghiệp và tận tâm, chúng tôi sẵn sàng hỗ trợ bạn tìm kiếm
                                            cuốn sách yêu thích và đáp ứng nhu cầu đọc sách của bạn.
                                        </p>
                                        <a href="#">Tìm Hiểu Thêm</a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="img-box">
                                        <img src="/images/slider-img.png" alt="Ảnh Slider 3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel_btn_box">
                    <a className="carousel-control-prev" href="#customCarousel1" role="button" data-bs-slide="prev">
                        <FontAwesomeIcon icon={faAngleLeft}/>
                        <span className="visually-hidden">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#customCarousel1" role="button" data-bs-slide="next">
                    <FontAwesomeIcon icon={faAngleRight}/>
                        <span className="visually-hidden">Next</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default SliderComponent;
