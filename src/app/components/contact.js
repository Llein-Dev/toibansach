const ContactComponent = () => {
    return (

        <section class="contact_section layout_padding">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 ">
                        <div class="heading_container ">
                            <h2 class="">
                                Contact Us
                            </h2>
                        </div>
                        <form action="#">
                            <div>
                                <input type="text" placeholder="Name" />
                            </div>
                            <div>
                                <input type="email" placeholder="Email" />
                            </div>
                            <div>
                                <input type="text" placeholder="Phone Number" />
                            </div>
                            <div>
                                <input type="text" class="message-box" placeholder="Message" />
                            </div>
                            <div class="btn-box">
                                <button>
                                    SEND
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <div class="img-box">
                            <img src="./images/about-img.png" alt="Chưa hiện hình" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactComponent;