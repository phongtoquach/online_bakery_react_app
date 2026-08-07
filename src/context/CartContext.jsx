import { createContext, useContext, useEffect, useState } from "react";

import { maxCartItemQuantity, defaultProductImageSrc } from "../config/app_configs";

import ProductContext from "../context/ProductContext";


const CartContext = createContext();

export function CartProvider({ children }) {

    const { productsList } = useContext(ProductContext);

    const [cart, setCart] = useState(() => {
        const cartJsonStr = localStorage.getItem("bakeryCartLs");
        console.log("[CartProvider] set value ban dau cho bien useState cart - localStorage bakeryCartLs vua lay ra : ");
        console.log(cartJsonStr);

        if (cartJsonStr) {
            const cartLs = JSON.parse(cartJsonStr);
            console.log("[CartProvider] set value ban dau cho bien useState cart - localStorage bakeryCartLs ton tai ! Convert thanh mang JS !");
            console.log(cartLs);

            return cartLs;
        }

        return [];
    });

    useEffect(() => {
        console.log("[CartProvider] đang chạy useEffect() set localStorage item bakeryCartLs ! value là biến useState cart !");
        console.log(cart);
        // set cart vao local storage
        localStorage.setItem("bakeryCartLs", JSON.stringify(cart));

        // hàm cleanup
        return () => {
            console.log("[CartProvider] đang chạy hàm cleanup của useEffect() set localStorage item bakeryCartLs !");
        };
    }, [cart]);

    /**
     * Hàm xử lý add product vào cart
     */
    function addProductToCart(productId, quantity=1) {
        console.log("[addProductToCart] chuan bi add vao cart - product ID : " + productId + " ; quantity : " + quantity);

        if (quantity <= 0) {
            //showToastBox("error", "Có lỗi xảy ra!", "<span>Số lượng thêm vào giỏ hàng cần phải từ 1 trở lên.</span>");
            return;
        }

        productId = Number(productId);

        // check productId nay da co trong mang cart hay chua
        const foundCartItem = cart.find((cartItem) => cartItem.productId === productId);
        console.log("[CartProvider - addProductToCart] Data cua foundCartItem :");
        console.log(foundCartItem);

        if (foundCartItem) {
            // Nếu trong mảng cart đã có product với productId này
            console.log("[CartProvider - addProductToCart] Product co ID " + productId + " da co trong cart; Quantity hien la " + foundCartItem.quantity + ". Nen gio chi can tang quantity them " + quantity);
            
            // tang quantity theo param quantity
            let newCartItemQty = foundCartItem.quantity + quantity;

            // can check quantity moi duoc cong them có vuot qua so luong cho phep cua 1 item trong cart hay ko
            if (newCartItemQty > maxCartItemQuantity) {
                console.log("[CartProvider - addProductToCart] Neu tang them " + quantity + ", quantity hien tai trong cart cua product " + productId + " se la " + newCartItemQty + ". Vuot qua " + maxCartItemQuantity + ". Stop update quantity cua product nay trong cart !");
                
                //showToastBox("error", "Có lỗi xảy ra!", "Số lượng của sản phẩm này trong giỏ hàng chỉ được phép tối đa là " + maxCartItemQuantity);
                return;
            }

            // sau khi check ok thi moi update cho quantity cua item nay trong mang cart
            const updatedCartItem = {...foundCartItem, quantity: newCartItemQty};
            console.log("[CartProvider - addProductToCart] Data của updatedCartItem :");
            console.log(updatedCartItem);

            // Set value của biến useState cart
            setCart((currentCart) => {
                console.log("[CartProvider - addProductToCart - setCart] Value hiện tại của biến useState cart : ");
                console.log(currentCart);

                const updatedCart = currentCart.map((cartItem) => {
                    console.log("[CartProvider - addProductToCart - setCart] currentCart.map() - phần tử cartItem : ");
                    console.log(cartItem);

                    if (cartItem.productId === updatedCartItem.productId) {
                        console.log("[CartProvider - addProductToCart - setCart] currentCart.map() - cartItem.productId = updatedCartItem.productId ! add updatedCartItem vào mảng mới ! ");
                        return updatedCartItem;
                    }

                    console.log("[CartProvider - addProductToCart - setCart] currentCart.map() - cartItem.productId != updatedCartItem.productId ! add chính cartItem vào mảng mới ! ");
                    return cartItem;
                });

                console.log("[CartProvider - addProductToCart - setCart] Data cua updatedCart :");
                console.log(updatedCart);

                return updatedCart;
            });

            // SHOW TOASTBOX SUCCESS
            // let toastMsg = `<span>` + cartItemObj.name + `</span><br>
            //         <span>Số lượng trong giỏ: ` + cartItemObj.quantity + `</span><br>
            //         <a href="cart.html">Xem giỏ hàng</a>`;
            // showToastBox("success", "Đã thêm vào giỏ hàng", toastMsg);

        }
        else {
            // Nếu trong mảng cart chưa có product với productId này
            console.log("[CartProvider - addProductToCart] Product co ID " + productId + " chua co trong cart. Bat dau add vao trong cart voi quantity = " + quantity);
        
            // Lấy ra object product với productId này từ trong mảng productsList (trong ProductProvider)
            const productObj = productsList.find((productItem) => productItem.id === productId);
            console.log("[CartProvider - addProductToCart] Data cua productObj :");
            console.log(productObj);

            if (!productObj) {
                console.log("[CartProvider - addProductToCart] Product co ID " + productId + " khong ton tai trong mang productsList !");
                //showToastBox("error", "Có lỗi xảy ra!", "<span>Sản phẩm này không tồn tại trong danh sách sản phẩm của shop.</span>");
                return;
            }

            // can check quantity them vao cart có vuot qua so luong cho phep cua 1 item trong cart hay ko
            if (quantity > maxCartItemQuantity) {
                console.log("[CartProvider - addProductToCart] quantity chuan bi add vao cart cho product " + productObj.id + " la " + quantity + ". Vuot qua " + maxCartItemQuantity + ". Stop add to cart !");
                //showToastBox("error", "Có lỗi xảy ra!", "Số lượng của sản phẩm này trong giỏ hàng chỉ được phép tối đa là " + maxCartItemQuantity);
                return;
            }

            // check mang images product nay co rong ko
            let productImgSrc = "";
            if (productObj.images.length > 0) {
                console.log("[CartProvider - addProductToCart] Product nay co image !");
                productImgSrc = productObj.images[0];
            }
            else {
                console.log("[CartProvider - addProductToCart] Product nay khong co image ! Su dung default image !");
                productImgSrc = defaultProductImageSrc;
            }

            // lay vai attribute can thiet tu product object
            let newCartItem = {
                productId: productObj.id,
                name: productObj.name,
                image: productImgSrc,
                unitPrice: productObj.price,
                quantity: quantity
            };
            console.log("[CartProvider - addProductToCart] Data của newCartItem :");
            console.log(newCartItem);

            // Set value của biến useState cart
            setCart((currentCart) => {
                console.log("[CartProvider - addProductToCart - setCart] Value hiện tại của biến useState cart : ");
                console.log(currentCart);

                const newCart = [...currentCart];
                newCart.push(newCartItem);

                console.log("[CartProvider - addProductToCart - setCart] Data của newCart :");
                console.log(newCart);

                return newCart;
            });
        }

        // SHOW TOASTBOX SUCCESS
        // let toastMsg = `<span>` + cartItemObj.name + `</span><br>
        //         <span>Số lượng trong giỏ: ` + cartItemObj.quantity + `</span><br>
        //         <a href="cart.html">Xem giỏ hàng</a>`;
        // showToastBox("success", "Đã thêm vào giỏ hàng", toastMsg);
    }

    // function removeFromCart(productId) {
    //     const newCart = cart.filter((item) => item.id !== productId);

    //     setCart(newCart);
    // }

    useEffect(() => {
        console.log("[CartProvider] đang chạy useEffect() test !");
            
        // hàm cleanup
        return () => {
            console.log("[CartProvider] đang chạy hàm cleanup của useEffect() test !");
        };
    });

    console.log("[CartProvider] CartProvider được render !");

    return (
        <CartContext.Provider value={{ cart, addProductToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;