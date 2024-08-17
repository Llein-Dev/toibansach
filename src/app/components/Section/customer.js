// src/components/CustomerComponent.js
export default function CustomerComponent() {
    return (
        <section className="client_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>Reviews</h2>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="client_container">
                            <div className="detail-box">
                                <p>
                                    "Dịch vụ tuyệt vời và sách chất lượng. Tôi đã tìm thấy nhiều cuốn sách mà tôi yêu thích tại đây. Tôi chắc chắn sẽ quay lại!"
                                </p>
                                <span>
                                    <i className="fa fa-quote-left" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="client_id">
                                <div className="img-box">
                                    <img src="https://lh3.googleusercontent.com/a/ACg8ocIbmNhGrhxZgK1D7rCfylLbLNf4TzMvQjZ-uS64aHsWShBOB3co=s396-c-no" alt="Customer 1" />
                                </div>
                                <div className="client_name">
                                    <h5>Nguyễn Thị Lan</h5>
                                    <h6>Giáo viên</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mx-auto">
                        <div className="client_container">
                            <div className="detail-box">
                                <p>
                                    "Một địa điểm tuyệt vời để mua sách. Dịch vụ khách hàng thân thiện và giao hàng nhanh chóng."
                                </p>
                                <span>
                                    <i className="fa fa-quote-left" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="client_id">
                                <div className="img-box">
                                    <img src="https://lh3.googleusercontent.com/a/ACg8ocIoQ5L2ttW2MjWGCCWPqHoD67DSeOeyoTHCLmkL5Ky4xEc01L47fQ=s360-c-no" alt="Customer 2" />
                                </div>
                                <div className="client_name">
                                    <h5>Trần Văn Nam</h5>
                                    <h6>Nhà văn</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mx-auto">
                        <div className="client_container">
                            <div className="detail-box">
                                <p>
                                    "Sách phong phú và giá cả hợp lý. Tôi đã tìm thấy nhiều cuốn sách hay để đọc trong thời gian rảnh."
                                </p>
                                <span>
                                    <i className="fa fa-quote-left" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="client_id">
                                <div className="img-box">
                                    <img src="https://lh3.googleusercontent.com/a/ACg8ocIbmNhGrhxZgK1D7rCfylLbLNf4TzMvQjZ-uS64aHsWShBOB3co=s396-c-no" alt="Customer 3" />
                                </div>
                                <div className="client_name">
                                    <h5>Vũ Minh Tuấn</h5>
                                    <h6>Nhà báo</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
