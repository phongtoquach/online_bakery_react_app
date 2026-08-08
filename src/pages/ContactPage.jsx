const contactCards = [
    {
        icon: "fas fa-map-marker-alt",
        title: "Địa chỉ của chúng tôi",
        content: (
            <p>123 Đường Nguyễn Huệ<br />Quận 1, TP. Hồ Chí Minh</p>
        )
    },
    {
        icon: "fas fa-phone-alt",
        title: "Gọi cho chúng tôi",
        content: (
            <p><a href="tel:+845551234567">(+84) 555 123 4567</a><br />Thứ 2 - Thứ 7, 9:00 - 20:00</p>
        )
    },
    {
        icon: "fas fa-envelope",
        title: "Email của chúng tôi",
        content: (
            <p>
                <a href="mailto:maisonsweet@gmail.com">maisonsweet@gmail.com</a><br />
                <a href="mailto:maisonsweetsupport@gmail.com">maisonsweetsupport@gmail.com</a>
            </p>
        )
    },
    {
        icon: "fas fa-clock",
        title: "Giờ mở cửa",
        content: (
            <p>Thứ 2 - Thứ 7: 7:00 - 20:00<br />Chủ nhật: 8:00 - 18:00</p>
        )
    }
];

function ContactPage() {
    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <main className="contact-page">
            <section className="contact-hero">
                <div className="container contact-hero-content">
                    <h1>Liên hệ với chúng tôi</h1>
                    <span className="contact-title-line" aria-hidden="true"></span>
                    <p>
                        Chúng tôi rất mong nhận được tin từ bạn. Dù là câu hỏi, ý kiến<br className="contact-desktop-break" />
                        đóng góp hay yêu cầu đặt hàng theo yêu cầu — hãy liên hệ với<br className="contact-desktop-break" />
                        chúng tôi bất cứ lúc nào!
                    </p>
                </div>
            </section>

            <section className="contact-content-section">
                <div className="container contact-layout">
                    <div className="contact-details" aria-label="Thông tin liên hệ">
                        {contactCards.map((card) => (
                            <article className="contact-info-card" key={card.title}>
                                <span className="contact-info-icon">
                                    <i className={card.icon}></i>
                                </span>
                                <h2>{card.title}</h2>
                                {card.content}
                            </article>
                        ))}
                    </div>

                    <div className="contact-form-wrapper">
                        <h2 className="contact-form-title">
                            <i className="fas fa-paper-plane"></i>
                            Gửi tin nhắn cho chúng tôi
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="contact-form-row">
                                <div className="form-group">
                                    <label htmlFor="contactName">Họ và tên <span>*</span></label>
                                    <input id="contactName" name="name" type="text" placeholder="Họ Và Tên" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contactEmail">Email <span>*</span></label>
                                    <input id="contactEmail" name="email" type="email" placeholder="Email@.com" required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="contactPhone">Số điện thoại</label>
                                <input id="contactPhone" name="phone" type="tel" placeholder="(+84) 000-000-0000" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contactSubject">Chủ đề <span>*</span></label>
                                <select id="contactSubject" name="subject" defaultValue="" required>
                                    <option value="" disabled>Chọn một chủ đề...</option>
                                    <option value="custom-order">Đặt bánh theo yêu cầu</option>
                                    <option value="product">Thông tin sản phẩm</option>
                                    <option value="feedback">Góp ý và phản hồi</option>
                                    <option value="other">Khác</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="contactMessage">Nội dung tin nhắn <span>*</span></label>
                                <textarea
                                    id="contactMessage"
                                    name="message"
                                    placeholder="Hãy cho chúng tôi biết chúng tôi có thể giúp gì cho bạn...."
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary contact-submit-btn">
                                <i className="fas fa-paper-plane"></i> Gửi tin nhắn
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ContactPage;
