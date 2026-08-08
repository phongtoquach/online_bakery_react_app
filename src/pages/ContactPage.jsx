import { useContext, useState } from "react";

import ToastBoxContext from "../context/ToastBoxContext";

const initialFormData = {
    name: "",
    phone: "",
    email: "",
    message: ""
};

function ContactPage() {
    const [formData, setFormData] = useState(initialFormData);
    const [loginData, setLoginData] = useState({ email: "", password: "" });
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

    function handleLoginChange(event) {
        const { name, value } = event.target;
        setLoginData((currentData) => ({ ...currentData, [name]: value }));
    }

    function handleLoginSubmit(event) {
        event.preventDefault();

        if (!loginData.email.trim() || !loginData.password) {
            showToast("error", "Chưa đủ thông tin", "Vui lòng nhập email và mật khẩu.");
            return;
        }

    }

    return (
        <>
            <section className="contact-hero">
                <div className="container">
                    <div className="contact-layout">
                        <aside className="contact-info-wrapper">
                            <span className="contact-eyebrow">Maison Sweet Bakery</span>
                            <h2>Xin chào!</h2>
                            <p className="contact-intro">Đăng nhập để theo dõi đơn hàng và nhận những ưu đãi dành riêng cho bạn.</p>

                            <div className="contact-login">
                                <h3><i className="fas fa-user-circle"></i> Đăng nhập</h3>
                                <form onSubmit={handleLoginSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="loginEmail">Email</label>
                                        <input id="loginEmail" name="email" type="email" placeholder="Nhập email" value={loginData.email} onChange={handleLoginChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="loginPassword">Mật khẩu</label>
                                        <input id="loginPassword" name="password" type="password" placeholder="Nhập mật khẩu" value={loginData.password} onChange={handleLoginChange} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary contact-login-btn">Đăng nhập</button>
                                </form>
                            </div>

                        </aside>

                        <div className="contact-form-wrapper">
                            <div className="contact-form-heading">
                                <h2>Liên hệ với chúng tôi</h2>
                                <p>Vui lòng điền thông tin theo mẫu bên dưới.</p>
                            </div>
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-group">
                                    <label htmlFor="contactName">Họ và tên</label>
                                    <input id="contactName" name="name" type="text" placeholder="Họ và tên" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contactEmail">Email</label>
                                    <input id="contactEmail" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contactPhone">Số điện thoại</label>
                                    <input id="contactPhone" name="phone" type="tel" placeholder="Số điện thoại" value={formData.phone} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contactMessage">Nội dung</label>
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
