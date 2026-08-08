import { useContext, useState } from "react";

import ToastBoxContext from "../context/ToastBoxContext";

const initialFormData = {
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
};

function ContactPage() {
    const [formData, setFormData] = useState(initialFormData);
    const { showToast } = useContext(ToastBoxContext);

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const cleanFormData = {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim()
        };

        if (!cleanFormData.name || !cleanFormData.phone || !cleanFormData.message) {
            showToast("error", "Chưa đủ thông tin", "Vui lòng nhập họ tên, số điện thoại và nội dung liên hệ.");
            return;
        }

        if (cleanFormData.name.length < 2) {
            showToast("error", "Họ tên chưa hợp lệ", "Họ và tên cần có ít nhất 2 ký tự.");
            return;
        }

        const normalizedPhone = cleanFormData.phone.replace(/[.\s-]/g, "");
        const vietnamPhonePattern = /^(0\d{9,10}|\+84\d{9,10})$/;

        if (!vietnamPhonePattern.test(normalizedPhone)) {
            showToast("error", "Số điện thoại chưa hợp lệ", "Vui lòng nhập số điện thoại Việt Nam hợp lệ.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (cleanFormData.email && !emailPattern.test(cleanFormData.email)) {
            showToast("error", "Email chưa hợp lệ", "Vui lòng kiểm tra lại địa chỉ email.");
            return;
        }

        if (cleanFormData.message.length < 10) {
            showToast("error", "Nội dung quá ngắn", "Nội dung liên hệ cần có ít nhất 10 ký tự.");
            return;
        }

        // TODO: Gửi cleanFormData tới API/backend tại đây khi dự án có máy chủ.
        showToast(
            "success",
            "Đã ghi nhận liên hệ",
            `Cảm ơn ${cleanFormData.name}. Chúng tôi sẽ phản hồi bạn sớm nhất có thể.`
        );
        setFormData(initialFormData);
    }

    return (
        <>
            <section className="contact-hero">
                <div className="container">
                    <div className="contact-layout">
                        <aside className="contact-info-wrapper">
                            <span className="contact-eyebrow">Maison Sweet Bakery</span>
                            <h2>Xin chào!</h2>
                            <p className="contact-intro">Ghé thăm cửa hàng để tận hưởng những chiếc bánh tươi mới mỗi ngày.</p>

                            <div className="contact-location">
                                <h3>Địa chỉ Hồ Chí Minh</h3>
                                <ul className="contact-details">
                                    <li><i className="fas fa-map-marker-alt"></i><span>2A Ba Gia, Phường Tân Sơn Nhất, TP. Hồ Chí Minh</span></li>
                                    <li><i className="fas fa-clock"></i><span>Mở cửa mỗi ngày: 8:00 – 22:00</span></li>
                                    <li><i className="fas fa-phone"></i><a href="tel:02888883388">028.8888.3388</a></li>
                                    <li><i className="fas fa-envelope"></i><a href="mailto:hi@cailonuong.vn">hi@cailonuong.vn</a></li>
                                </ul>
                            </div>

                        </aside>

                        <div className="contact-form-wrapper">
                            <div className="contact-form-heading">
                                <h2>Liên hệ với chúng tôi</h2>
                                <p>Vui lòng điền thông tin theo mẫu bên dưới. Mọi thắc mắc về sản phẩm và dịch vụ, chúng tôi <strong>sẽ phản hồi trong thời gian sớm nhất.</strong></p>
                            </div>
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-group">
                                    <label htmlFor="contactName">Họ và tên <span>*</span></label>
                                    <input id="contactName" name="name" type="text" placeholder="Họ và tên" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contactEmail">Email</label>
                                    <input id="contactEmail" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contactPhone">Số điện thoại <span>*</span></label>
                                    <input id="contactPhone" name="phone" type="tel" placeholder="Số điện thoại" value={formData.phone} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contactSubject">Tiêu đề</label>
                                    <input id="contactSubject" name="subject" type="text" placeholder="Tiêu đề" value={formData.subject} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contactMessage">Nội dung <span>*</span></label>
                                    <textarea
                                        id="contactMessage"
                                        name="message"
                                        placeholder="Nội dung"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary contact-submit-btn">
                                    <i className="fas fa-paper-plane"></i> Gửi liên hệ
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default ContactPage;
