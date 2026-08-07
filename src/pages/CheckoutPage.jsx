import { useState, useContext } from "react";
import { Link } from "react-router";
import CartContext from "../context/CartContext";
import ToastBoxContext from "../context/ToastBoxContext";
import "../assets/css/checkout.css";

function CheckoutPage() {
  const { cart, updateQuantity, clearCart } = useContext(CartContext);
  const { showToast } = useContext(ToastBoxContext);

  // State chọn hình thức nhận hàng: 'delivery' (Giao hàng) hoặc 'pickup' (Ghé lấy)
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");

  // State checkbox người nhận khác người mua
  const [isOtherRecipient, setIsOtherRecipient] = useState(false);

  // State chọn phương thức thanh toán: 'cod' hoặc 'transfer'
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // State chọn ngày giao
  const [selectedDateKey, setSelectedDateKey] = useState(0);

  // State đặt hàng thành công
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  // State thông tin form
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Tp Hồ Chí Minh",
    district: "Tân Bình",
  });

  const [errors, setErrors] = useState({});

  // Tạo danh sách 4 ngày tiếp theo
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];
  const datesList = Array.from({ length: 4 }).map((_, index) => {
    const d = new Date();
    d.setDate(d.getDate() + index);
    return {
      weekday: index === 0 ? "Hôm nay" : daysOfWeek[d.getDay()],
      dayStr: `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`,
    };
  });

  // Tính toán tổng số lượng & tổng tiền
  const totalQuantity = (cart || []).reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const subtotal = (cart || []).reduce(
    (sum, item) => sum + (item.unitPrice || item.price || 0) * item.quantity,
    0,
  );
  const shippingFee = deliveryMethod === "delivery" ? 0 : 0;
  const grandTotal = subtotal + shippingFee;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (deliveryMethod === "delivery" && !formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ giao hàng";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast &&
        showToast(
          "error",
          "Thông tin chưa hoàn tất",
          "Vui lòng nhập đầy đủ các thông tin bắt buộc!",
        );
      return;
    }

    setErrors({});

    const generatedId = "BK-" + Math.floor(100000 + Math.random() * 900000);
    setOrderInfo({
      orderId: generatedId,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      deliveryMethod,
      paymentMethod,
      total: grandTotal,
      date: datesList[selectedDateKey]?.dayStr || "",
    });

    // 1. Xóa toàn bộ sản phẩm trong giỏ hàng
    clearCart && clearCart();

    // 2. Hiển thị Toast thông báo thành công
    showToast &&
      showToast(
        "success",
        "Đặt hàng thành công!",
        `Đơn hàng #${generatedId} của bạn đã được tiếp nhận.`,
      );

    // 3. Chuyển sang màn hình Cảm ơn
    setIsOrderSubmitted(true);
  };

  // Màn hình Cảm ơn sau khi đặt hàng thành công
  if (isOrderSubmitted) {
    return (
      <section className="section py-12">
        <div className="container max-w-lg mx-auto text-center bg-white p-8 md:p-12 rounded-2xl border border-amber-900/15 shadow-lg space-y-6">
          <h2 className="thanks__title text-2xl md:text-3xl font-bold text-amber-950">
            Cảm ơn bạn đã lựa chọn Maison Sweet Bakery ^.^
          </h2>

          <div className="btn--block pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="btn--cart px-6 py-3 text-center inline-block"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <h2>Giỏ Hàng</h2>
        </div>

        {/* CART CONTAINER */}
        <div className="cart__container md:grid md:grid-cols-3 md:gap-6">
          {/* Main Content */}
          <div className="cart__maincontent space-y-4 md:col-span-2 md:space-y-6">
            <div className="cart__chooseMethod space-y-4 md:rounded-lg md:border md:p-5">
              {/* Nút chọn hình thức nhận hàng */}
              <div className="cart__chooseMethod--button grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={`btn--cart ${deliveryMethod === "delivery" ? "active" : ""}`}
                  onClick={() => setDeliveryMethod("delivery")}
                >
                  <img src="/cartImgs/delivery.png" alt="" />
                  Giao hàng
                </button>
                <button
                  type="button"
                  className={`btn--cart ${deliveryMethod === "pickup" ? "active" : ""}`}
                  onClick={() => setDeliveryMethod("pickup")}
                >
                  <img src="/cartImgs/shop.png" alt="" />
                  Ghé lấy tại cửa hàng
                </button>
              </div>

              {/* Personal Order Form */}
              <form id="checkOutForm" onSubmit={handleSubmitOrder}>
                <div className="personal__order rounded-xl border border-amber-200 bg-amber-50 p-3 space-y-3">
                  <p className="personal__text text-sm font-semibold text-amber-800">
                    Bạn đặt hàng với tư cách khách
                  </p>
                  <div className="personal__form grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="name">Tên người đặt *</label>
                      <input
                        type="text"
                        placeholder="Họ và tên"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {errors.name && (
                        <span id="nameMessageError" className="messageError">
                          {errors.name}
                        </span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone">SĐT người đặt *</label>
                      <input
                        type="text"
                        placeholder="0123456789"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                      {errors.phone && (
                        <span id="phoneMessageError" className="messageError">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="personal__login--promotions flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-2.5">
                    <img src="/cartImgs/gift.png" alt="" />
                    <p className="promotions__link">
                      <Link to="#">
                        <span>Đăng nhập</span>
                      </Link>{" "}
                      để xem ví voucher ưu đãi và áp dụng khi đặt hàng
                    </p>
                  </div>
                </div>

                {/* Actived Info */}
                <div
                  id="information__container"
                  className={`information__container rounded-lg ${isOtherRecipient ? "actived" : ""}`}
                >
                  <p className="information__header">
                    Thông tin người mua (bạn)
                  </p>
                  <p className="information__content">
                    <span id="nameValue">{formData.name || "..."}</span> -{" "}
                    <span id="phoneValue">{formData.phone || "..."}</span>
                  </p>
                </div>

                {/* Địa Chỉ Giao Hàng */}
                {deliveryMethod === "delivery" && (
                  <div className="address__container">
                    <label
                      htmlFor="address"
                      className="address__container--text"
                    >
                      Địa Chỉ Giao Hàng *
                    </label>
                    <textarea
                      id="address"
                      placeholder="Số nhà, đường..."
                      value={formData.address}
                      onChange={handleInputChange}
                    ></textarea>
                    {errors.address && (
                      <span id="texetAreaMessageError" className="messageError">
                        {errors.address}
                      </span>
                    )}
                  </div>
                )}

                {/* Select Tỉnh / Thành */}
                <div className="select__Address--Container grid grid-cols-2 gap-3 sm:grid-cols-2">
                  <div className="select__Address--City">
                    <p>Tỉnh/TP *</p>
                    <select
                      id="city"
                      className="select__Address--City--dropdown flex items-center justify-center rounded-md border p-3 text-sm font-medium transition-colors border-primary bg-primary/5 text-primary w-full"
                      value={formData.city}
                      onChange={handleInputChange}
                    >
                      <option value="Tp Hồ Chí Minh">Tp Hồ Chí Minh</option>
                    </select>
                  </div>
                  <div className="select__Address--district">
                    <p>Phường/Xã *</p>
                    <select
                      id="district"
                      className="select__Address--district--dropdown flex items-center justify-center rounded-md border p-3 text-sm font-medium transition-colors border-primary bg-primary/5 text-primary w-full"
                      value={formData.district}
                      onChange={handleInputChange}
                    >
                      <option value="Tân Bình">Tân Bình</option>
                      <option value="Quận 1">Quận 1</option>
                      <option value="Quận 3">Quận 3</option>
                    </select>
                  </div>
                </div>

                <hr />

                {/* Select Ship Date */}
                <div className="Select__Date">
                  <p>Chọn Ngày Giao</p>
                  <div
                    id="date-container"
                    className="date__container flex flex-wrap gap-2"
                  >
                    {datesList.map((item, idx) => (
                      <div
                        key={idx}
                        className={`date__main ${selectedDateKey === idx ? "selected" : ""}`}
                        onClick={() => setSelectedDateKey(idx)}
                      >
                        <p className="date__content--Weekdays text">
                          {item.weekday}
                        </p>
                        <p className="date__content--days text">
                          {item.dayStr}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {/* Phương Thức Thanh Toán */}
            <div className="cart__howToCash rounded-lg">
              <h2>Phương Thức Thanh Toán</h2>
              <div
                id="methodCash"
                className="cart__chooseMethod--button grid grid-cols-2 gap-3"
              >
                <button
                  type="button"
                  id="cod"
                  className={`btn--cart ${paymentMethod === "cod" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <img src="/cartImgs/money.png" alt="" />
                  COD
                </button>
                <button
                  type="button"
                  id="transfer"
                  className={`btn--cart ${paymentMethod === "transfer" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("transfer")}
                >
                  <img src="/cartImgs/shop.png" alt="" />
                  Chuyển Khoản
                </button>
              </div>
            </div>
          </div>

          {/* Side Content */}
          <div className="Side_cash--container">
            <div className="Side_cash--main rounded-lg">
              <h3 className="Side_cash--main--text">
                Tóm tắt (<span id="quantityOrder">{totalQuantity}</span> món)
              </h3>

              <div className="cash__cart--list" id="cashCartList">
                {!cart || cart.length === 0 ? (
                  <p className="text-gray-500 text-sm py-2">
                    Giỏ hàng đang trống
                  </p>
                ) : (
                  cart.map((item) => {
                    const price = item.unitPrice || item.price || 0;
                    const itemId = item.productId || item.id;
                    return (
                      <div key={itemId} className="cash__cart--item">
                        <div className="item__img">
                          <img
                            src={item.image || "/cartImgs/banh_dua_luoi.png"}
                            alt={item.name}
                          />
                        </div>
                        <div className="item__desc">
                          <div className="item__name--container">
                            <h3 className="item__name">{item.name}</h3>
                          </div>
                          <div className="item__quantity">
                            <div className="flex items-center gap-1.5">
                              <span className="item__quantity--span">SL</span>
                              <input
                                className="input--quantity"
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) =>
                                  updateQuantity &&
                                  updateQuantity(
                                    itemId,
                                    Math.max(1, Number(e.target.value) || 1),
                                  )
                                }
                              />
                            </div>
                            <div className="totalPriceTemp--container">
                              <span className="totalPriceTemp">
                                {(price * item.quantity).toLocaleString(
                                  "vi-VN",
                                )}{" "}
                                đ
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <hr />
              <div className="tempTotal--container">
                <div className="tempTotal--flex">
                  <p className="tempTotal--text">Tạm tính:</p>
                  <p>
                    <span className="tempTotal--price">
                      {subtotal.toLocaleString("vi-VN")} đ
                    </span>
                  </p>
                </div>
                <div className="tempTotal--flex">
                  <p className="tempTotal--text">Vận chuyển:</p>
                  <p>
                    <span className="tempTotal--price" id="tempTotalShip">
                      Miễn Phí
                    </span>
                  </p>
                </div>
              </div>

              <hr />
              <div className="primary--Total">
                <p className="primary--Total-text">Tổng:</p>
                <p className="primary--Total-text">
                  <span className="primaryTotalPrice" id="primaryTotalPrice">
                    {grandTotal.toLocaleString("vi-VN")}
                  </span>
                  <span className="primaryTotalPrice"> đ</span>
                </p>
              </div>

              <button
                type="submit"
                id="checkout"
                form="checkOutForm"
                className="button--order"
              >
                <img src="/cartImgs/delivery.png" alt="" />
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
