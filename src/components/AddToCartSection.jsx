import { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router";

import { maxCartItemQuantity, maxEnteredQuantity } from "../config/app_configs";

//import ProductContext from "../context/ProductContext";
import CartContext from "../context/CartContext";
import ToastBoxContext from "../context/ToastBoxContext";

function AddToCartSection({ productId }) {

    const { addProductToCart } = useContext(CartContext);
    const { showToast } = useContext(ToastBoxContext);

    const [quantity, setQuantity] = useState("1");
    const [quantityError, setQuantityError] = useState("");

    useEffect(() => {
        console.log("[AddToCartSection] đang chạy useEffect() của component AddToCartSection !");
        
        // hàm cleanup
        return () => {
            console.log("[AddToCartSection] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[AddToCartSection] component AddToCartSection render ! prop productId truyen vao la : " + productId);

    function handleQuantityChange(event) {
        let quantityVal = event.target.value;

        console.log("[handleQuantityChange] Đang chạy hàm ! quantityVal đã nhập là : " + quantityVal);

        // Chỉ giữ lại ký tự số
        //quantityVal = quantityVal.replace(/\D/g, "");
        quantityVal = quantityVal.replace(/[^0-9]/g, '');

        if (quantityVal === "") {
            console.log("[checkQuantityInput] user nhap quantity rong. Bo qua !");
            setQuantity("");
            setQuantityError("");
            return;
        }

        let quantityInt = Number(quantityVal);

        // Textbox nhập 0
        if (quantityInt <= 0) {
            console.log("[handleQuantityChange] quantityInt <= 0 ! Set textbox lai thanh 1 ! ");

            setQuantity(1);
            setQuantityError("Nhập số lượng phải từ 1 trở lên");
            return;
        }

        
        // Nhập vượt quá maxEnteredQuantity
        if (quantityInt > maxEnteredQuantity) {
            console.log("[handleQuantityChange] user nhap quantity = " + quantityInt + ", lon hon muc cho phep la " + maxEnteredQuantity + " ! Set textbox lai thanh " + maxEnteredQuantity);

            setQuantity(maxEnteredQuantity);
            setQuantityError(`Số lượng không được vượt quá ${maxEnteredQuantity}`);
            return;
        }

        console.log("[handleQuantityChange] user nhap quantity OK : " + quantityInt);
        setQuantity(quantityInt);
        setQuantityError("");
    }

    function handleIncreaseQuantity() {
        console.log("[handleIncreaseQuantity] Đang chạy hàm !");

        setQuantity((currentQuantity) => {
            console.log("[handleIncreaseQuantity] currentQuantity la : " + currentQuantity);

            let currentQty = 0;
            if (currentQuantity == "") {
                console.log("[handleIncreaseQuantity] currentQuantity rong ! Set thanh 1 !");
                //currentQty = 0;
                return 1;
            }
            else {
                currentQty = Number(currentQuantity);
                console.log("[handleIncreaseQuantity] currentQty = " + currentQty);
            }

            // currentQty đã ở mức max hoặc vượt quá mức max
            if (currentQty >= maxEnteredQuantity) {
                console.log("[handleIncreaseQuantity] currentQty đã >= " + maxEnteredQuantity + " ! Không được tăng thêm nữa !");

                setQuantityError(`Số lượng không được vượt quá ${maxEnteredQuantity} !`);
                //return currentQty;
                return maxEnteredQuantity;
            }

            // currentQty chưa vượt mức max
            console.log("[handleIncreaseQuantity] Value HOP LE !");
            setQuantityError("");
            return currentQty + 1;
        });
    }

    function handleDecreaseQuantity() {
        console.log("[handleDecreaseQuantity] Đang chạy hàm !");

        setQuantity((currentQuantity) => {
            console.log("[handleDecreaseQuantity] currentQuantity la : " + currentQuantity);

            let currentQty = 0;
            if (currentQuantity == "") {
                console.log("[handleDecreaseQuantity] currentQuantity rong ! Set thanh 1 !");
                return 1;
            }
            else {
                currentQty = Number(currentQuantity);
                console.log("[handleDecreaseQuantity] currentQty = " + currentQty);
            }

            // currentQty đã đang <= 1
            if (currentQty <= 1) {
                console.log("[handleDecreaseQuantity] currentQty đã <= 1 ! Không được giảm nữa !");

                setQuantityError("Số lượng phải từ 1 trở lên !");
                return 1;
            }

            // Chưa xuống tới 1
            console.log("[handleDecreaseQuantity] Value HOP LE !");
            setQuantityError("");
            return currentQty - 1;
        });
    }

    /**
     * Ham validate quantity truyen vao co hop le hay ko
     */
    function validateQuantity(quantity) {
        let isValid = true;
        let errorMsg = "";

        if (quantity <= 0) {
            console.log("[validateQuantity] quantity = " + quantity + ". Not valid !");
            errorMsg = "Số lượng phải từ 1 trở lên";
            isValid = false;
        }
        else if (quantity > maxEnteredQuantity) {
            console.log("[validateQuantity] quantity = " + quantity + ". Vuot qua " + maxEnteredQuantity + ". Not valid !");
            errorMsg = "Số lượng không được vượt quá " + maxEnteredQuantity;
            isValid = false;
        }
        else {
            console.log("[validateQuantity] quantity = " + quantity + ". Valid !");
        }

        return {
            "isValid": isValid,
            "errorMsg": errorMsg
        };
    }

    function handleClickAddToCatWithQty(proId) {
        console.log("[handleClickAddToCatWithQty] proId can add to cart : " + proId + " ; quantity lúc này : " + quantity);

        let currentQty = 0;
        // Neu quantity luc này là rỗng
        if (quantity == "") {
            console.log("[handleClickAddToCatWithQty] quantity đang rong ! Set thanh 1 !");
            currentQty = 1;
            setQuantity(1);
        }
        else {
            currentQty = Number(quantity);
            console.log("[handleClickAddToCatWithQty] quantity co value. currentQty = " + currentQty);
        }

        // check currentQty co valid hay ko
        let resultValidateQuantity = validateQuantity(currentQty);
        console.log("[handleClickAddToCatWithQty] Ket qua ham validateQuantity() : ");
        console.log(resultValidateQuantity);

        if (resultValidateQuantity.isValid == true) {
            console.log("[handleClickAddToCatWithQty] currentQty = " + currentQty + " HOP LE! Goi ham addProductToCart() !");
            const addToCartResult = addProductToCart(proId, currentQty);

            console.log("[handleClickAddToCatWithQty] Data của addToCartResult :");
            console.log(addToCartResult);

            if (addToCartResult.success) {
                const addedProductObj = addToCartResult.addedProduct;
                const itemTotalPrice = addedProductObj.unitPrice * addedProductObj.quantity;
                showToast("success", "Đã thêm vào giỏ hàng",
                    <>
                        <span>{addedProductObj.name}</span><br/>
                        <span>Số lượng trong giỏ: {addedProductObj.quantity}</span><br/>
                        <span>Tổng tiền sản phẩm : {itemTotalPrice.toLocaleString("vi-VN")}đ</span><br/><br/>
                        <Link to="/cart">Xem giỏ hàng</Link>
                    </>);
            }
            else {
                showToast("error", "Có lỗi xảy ra!", addToCartResult.errorMsg);
            }

            setQuantityError("");
        }
        else {
            console.log("[handleClickAddToCatWithQty] currentQty = " + currentQty + " KHONG HOP LE! Show error msg!");
            setQuantityError(resultValidateQuantity.errorMsg);
        }
    }
   
    return (
        <>
            <div className="quantity-selector">
                <label>Số lượng:</label>
                <div className="quantity-controls">
                    <button type="button" className="btn-minus" onClick={() => handleDecreaseQuantity()}>
                        <i className="fas fa-minus"></i>
                    </button>
                    <input type="text" id="txtProductQuantity" value={quantity} onChange={(event) => handleQuantityChange(event)} />
                    <button type="button" className="btn-plus" onClick={() => handleIncreaseQuantity()}>
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            {
                quantityError !== "" && (
                    <div className="quantity-error-box">
                        {quantityError}
                    </div>
                )
            }
            
            <div className="product-detail-actions">
                <button className="add-to-cart-btn" id="addToCartBtn" onClick={() => handleClickAddToCatWithQty(productId)}>
                    <i className="fas fa-cart-plus"></i> Thêm vào giỏ
                </button>
            </div>
        </>
    )
}

export default AddToCartSection;
