import { createContext, useContext, useEffect, useState } from "react";
import ProductContext from "../context/ProductContext";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [studentMark, setStudentMark] = useState("12");

    //const { newProductsList } = useContext(ProductContext);

    //const [cart, setCart] = useState([]);

    // function addToCart(product) {
    //     const productExists = cart.some((item) => item.id === product.id);

    //     if (productExists) {
    //         alert("San pham da co trong gio hang !");
    //         return;
    //     }

    //     setCart([...cart, product]);
    // }

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
    //console.log(newProductsList);

    return (
        <CartContext.Provider value={{ studentMark, setStudentMark }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;