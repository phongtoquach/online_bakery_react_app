import { createContext, useContext, useEffect, useState } from "react";
import ProductContext from "../context/ProductContext";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);

    function addProductToCart(productId, quantity=1) {
        console.log("[addProductToCart] chuan bi add vao cart - product ID : " + productId + " ; quantity : " + quantity);

        const productExists = cart.some((item) => item.id === product.id);

        if (productExists) {
            alert("San pham da co trong gio hang !");
            return;
        }

        setCart([...cart, product]);
    }

    // function removeFromCart(productId) {
    //     const newCart = cart.filter((item) => item.id !== productId);

    //     setCart(newCart);
    // }

    useEffect(() => {
        console.log("[CartProvider] đang chạy useEffect() của CartProvider !");
            
        // hàm cleanup
        return () => {
            console.log("[CartProvider] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[CartProvider] CartProvider được render !");

    return (
        <CartContext.Provider value={{ addProductToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;