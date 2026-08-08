import { useState, useEffect } from "react";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const contactCards = [
  {
    icon: "fas fa-map-marker-alt",
    title: "Địa chỉ của chúng tôi",
    content: (
      <p>
        123 Đường Nguyễn Huệ
        <br />
        Quận 1, TP. Hồ Chí Minh
      </p>
    ),
  },
  {
    icon: "fas fa-phone-alt",
    title: "Gọi cho chúng tôi",
    content: (
      <p>
        <a href="tel:+845551234567">(+84) 555 123 4567</a>
        <br />
        Thứ 2 - Thứ 7, 9:00 - 20:00
      </p>
    ),
  },
  {
    icon: "fas fa-envelope",
    title: "Email của chúng tôi",
    content: (
      <p>
        <a href="mailto:maisonsweet@gmail.com">maisonsweet@gmail.com</a>
        <br />
        <a href="mailto:maisonsweetsupport@gmail.com">
          maisonsweetsupport@gmail.com
        </a>
      </p>
    ),
  },
  {
    icon: "fas fa-clock",
    title: "Giờ mở cửa",
    content: (
      <p>
        Thứ 2 - Thứ 7: 7:00 - 20:00
        <br />
        Chủ nhật: 8:00 - 18:00
      </p>
    ),
  },
];

function ContactPage() {
  useEffect(() => {
    document.title = "Contact";
  }, []);

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validate(data) {
    const newErrors = {};

    // Validate Họ và tên
    if (!data.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
    }

    // Validate Email
    if (!data.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email.trim())) {
        newErrors.email = "Email không đúng định dạng (ví dụ: name@example.com)";
      }
    }

    // Validate Số điện thoại
    if (!data.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else {
      const phoneRegex = /^(84|0[3|5|7|8|9])+([0-9]{8})$|^[0-9]{10,11}$/;
      if (!phoneRegex.test(data.phone.trim())) {
        newErrors.phone = "Số điện thoại không hợp lệ (ví dụ: 0912345678)";
      }
    }

    // Validate Chủ đề
    if (!data.subject) {
      newErrors.subject = "Vui lòng chọn một chủ đề";
    }

    // Validate Nội dung tin nhắn
    if (!data.message.trim()) {
      newErrors.message = "Vui lòng nhập nội dung tin nhắn";
    } else if (data.message.trim().length < 10) {
      newErrors.message = "Nội dung tin nhắn phải có ít nhất 10 ký tự";
    }

    return newErrors;
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    // Xóa thông báo lỗi của trường đang nhập khi người dùng thay đổi dữ liệu
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    setIsSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitted(false);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    setFormData(initialFormData);
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="container contact-hero-content">
          <h1>Liên hệ với chúng tôi</h1>
          <span className="contact-title-line" aria-hidden="true"></span>
          <p>
            Chúng tôi rất mong nhận được tin từ bạn. Dù là câu hỏi, ý kiến
            <br className="contact-desktop-break" />
            đóng góp hay yêu cầu đặt hàng theo yêu cầu — hãy liên hệ với
            <br className="contact-desktop-break" />
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

            <form onSubmit={handleSubmit} noValidate>
              <div className="contact-form-row">
                <div className="form-group">
                  <label htmlFor="contactName">Họ và tên *</label>
                  <input
                    id="contactName"
                    name="name"
                    type="text"
                    placeholder="Họ Và Tên"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <span
                      className="messageError"
                      style={{
                        color: "#d32f2f",
                        fontSize: "0.85rem",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contactEmail">Email *</label>
                  <input
                    id="contactEmail"
                    name="email"
                    type="email"
                    placeholder="Email@.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <span
                      className="messageError"
                      style={{
                        color: "#d32f2f",
                        fontSize: "0.85rem",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contactPhone">Số điện thoại *</label>
                <input
                  id="contactPhone"
                  name="phone"
                  type="tel"
                  placeholder="(+84) 000-000-0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && (
                  <span
                    className="messageError"
                    style={{
                      color: "#d32f2f",
                      fontSize: "0.85rem",
                      marginTop: "4px",
                      display: "block",
                    }}
                  >
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contactSubject">Chủ đề *</label>
                <select
                  id="contactSubject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Chọn một chủ đề...
                  </option>
                  <option value="custom-order">Đặt bánh theo yêu cầu</option>
                  <option value="other">Khác</option>
                </select>
                {errors.subject && (
                  <span
                    className="messageError"
                    style={{
                      color: "#d32f2f",
                      fontSize: "0.85rem",
                      marginTop: "4px",
                      display: "block",
                    }}
                  >
                    {errors.subject}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contactMessage">Nội dung tin nhắn *</label>
                <textarea
                  id="contactMessage"
                  name="message"
                  placeholder="Hãy cho chúng tôi biết chúng tôi có thể giúp gì cho bạn...."
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
                {errors.message && (
                  <span
                    className="messageError"
                    style={{
                      color: "#d32f2f",
                      fontSize: "0.85rem",
                      marginTop: "4px",
                      display: "block",
                    }}
                  >
                    {errors.message}
                  </span>
                )}
              </div>

              {isSubmitted && (
                <p className="contact-success-message" role="status">
                  <i className="fas fa-check-circle"></i>
                  Cảm ơn bạn! Tin nhắn đã được ghi nhận.
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary contact-submit-btn"
              >
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
