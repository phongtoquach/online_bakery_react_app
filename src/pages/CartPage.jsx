import { useContext, useState, useEffect } from "react";
import { Link } from "react-router";
import CartContext from "../context/CartContext";
import ToastBoxContext from "../context/ToastBoxContext";
import { maxCartItemQuantity } from "../config/app_configs";

// Component quản lý ô nhập số lượng dùng trực tiếp updateQuantity từ CartContext
function CartQuantityInput({ productId, itemQuantity }) {
  const { updateQuantity } = useContext(CartContext);
  const { showToast } = useContext(ToastBoxContext);
  const [tempQty, setTempQty] = useState(itemQuantity);

  useEffect(() => {
    setTempQty(itemQuantity);
  }, [itemQuantity]);

  const handleDecrease = () => {
    const current = Number(tempQty) || 1;
    if (current > 1) {
      const nextQty = current - 1;
      setTempQty(nextQty);
      updateQuantity(productId, nextQty);
    } else {
      updateQuantity(productId, 0);
    }
  };

  const handleIncrease = () => {
    const current = Number(tempQty) || 1;
    const nextQty = current + 1;

    if (nextQty > maxCartItemQuantity) {
      if (showToast) {
        showToast(
          "error",
          "Có lỗi xảy ra!",
          `Số lượng của sản phẩm này trong giỏ hàng chỉ được phép tối đa là ${maxCartItemQuantity}`,
        );
      }
      return;
    }

    setTempQty(nextQty);
    updateQuantity(productId, nextQty);
  };

  return (
    <div className="quantity-controls">
      <button
        type="button"
        className="btn-minus"
        onClick={handleDecrease}
        aria-label="Giảm số lượng"
      >
        -
      </button>

      <input
        type="number"
        className="input--quantity"
        value={tempQty}
        min="1"
        max={maxCartItemQuantity}
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          const val = e.target.value;
          setTempQty(val);
          const num = Number(val);
          if (val !== "" && num > 0) {
            if (num > maxCartItemQuantity) {
              if (showToast) {
                showToast(
                  "error",
                  "Có lỗi xảy ra!",
                  `Số lượng của sản phẩm này trong giỏ hàng chỉ được phép tối đa là ${maxCartItemQuantity}`,
                );
              }
              setTempQty(maxCartItemQuantity);
              updateQuantity(productId, maxCartItemQuantity);
            } else {
              updateQuantity(productId, num);
            }
          }
        }}
        onBlur={() => {
          const num = Number(tempQty);
          if (tempQty === "" || num < 1) {
            setTempQty(1);
            updateQuantity(productId, 1);
          } else if (num > maxCartItemQuantity) {
            if (showToast) {
              showToast(
                "error",
                "Có lỗi xảy ra!",
                `Số lượng của sản phẩm này trong giỏ hàng chỉ được phép tối đa là ${maxCartItemQuantity}`,
              );
            }
            setTempQty(maxCartItemQuantity);
            updateQuantity(productId, maxCartItemQuantity);
          }
        }}
      />

      <button
        type="button"
        className="btn-plus"
        onClick={handleIncrease}
        aria-label="Tăng số lượng"
      >
        +
      </button>
    </div>
  );
}

function CartPage() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  // Tính tổng tiền tạm tính
  const subtotal = (cart || []).reduce(
    (total, item) =>
      total + (item.unitPrice || item.price || 0) * item.quantity,
    0,
  );

  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <h2>Giỏ Hàng</h2>
          <p>Xem lại giỏ hàng của bạn và tiến hành thanh toán</p>
        </div>

        {/* Cart Empty State */}
        {!cart || cart.length === 0 ? (
          <div className="cart-empty" id="cartEmpty">
            <i className="fas fa-shopping-cart"></i>
            <h3>Giỏ hàng của bạn đang trống</h3>
            <p>Dường như bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng</p>
            <Link to="/products" className="btn btn-primary">
              <i className="fas fa-shopping-bag"></i> Xem sản phẩm
            </Link>
          </div>
        ) : (
          /* Cart Table & Summary Layout */
          <div className="cart-layout" id="cartShop">
            <div className="cart-table-wrapper">
              <table className="cart-table" id="cartTable">
                <thead>
                  <tr>
                    <th style={{ whiteSpace: "nowrap" }}>Tên Sản Phẩm</th>
                    <th style={{ whiteSpace: "nowrap" }}>Giá</th>
                    <th style={{ whiteSpace: "nowrap" }}>Số Lượng</th>
                    <th style={{ whiteSpace: "nowrap" }}>Tổng</th>
                    <th style={{ whiteSpace: "nowrap" }}>Xóa</th>
                  </tr>
                </thead>
                <tbody id="cartBody">
                  {cart.map((item) => {
                    const price = item.unitPrice || item.price || 0;
                    const itemTotal = price * item.quantity;
                    const id = item.productId || item.id;

                    return (
                      <tr key={id}>
                        <td>
                          <div className="cart-product">
                            <img
                              src={item.image || "/images/default_cake.png"}
                              alt={item.name}
                            />
                            <div className="cart-product-info">
                              <h4>{item.name}</h4>
                            </div>
                          </div>
                        </td>
                        <td
                          className="cart-unit-price"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {price.toLocaleString("vi-VN")} đ
                        </td>
                        <td>
                          <div className="cart-quantity">
                            <CartQuantityInput
                              productId={id}
                              itemQuantity={item.quantity}
                            />
                          </div>
                        </td>
                        <td
                          className="cart-total-price"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {itemTotal.toLocaleString("vi-VN")} đ
                        </td>
                        <td>
                          <button
                            type="button"
                            className="remove-cart-item"
                            onClick={() => removeFromCart(id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="cart-actions">
                <button
                  id="clearCartBtn"
                  className="btn btn-outline"
                  onClick={clearCart}
                >
                  <i className="fas fa-trash"></i> Clear Cart
                </button>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="cart-summary" id="summaryRow">
              <h3>Tóm tắt đơn hàng</h3>
              <div
                className="summary-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "1rem 0",
                }}
              >
                <span>Tạm tính:</span>
                <strong style={{ whiteSpace: "nowrap" }}>
                  {subtotal.toLocaleString("vi-VN")} đ
                </strong>
              </div>
              <hr />
              <div
                className="summary-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "1rem 0",
                  fontSize: "1.2rem",
                }}
              >
                <span>Tổng cộng:</span>
                <strong
                  style={{
                    color: "var(--color-primary, #d97706)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {subtotal.toLocaleString("vi-VN")} đ
                </strong>
              </div>

              <Link
                to="/checkout"
                className="btn btn-primary"
                style={{
                  display: "block",
                  textAlign: "center",
                  width: "100%",
                  marginTop: "1rem",
                }}
              >
                Tiến hành thanh toán
              </Link>
            </div>
          </div>
        )}

        {/* Continue Shopping */}
        <div
          style={{ textAlign: "center", marginTop: "var(--space-2xl, 2rem)" }}
        >
          <Link to="/products" className="btn btn-outline">
            <i className="fas fa-arrow-left"></i> Tiếp tục mua hàng
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
