import { useContext, useEffect } from "react";
import CartContext from "../context/CartContext";

function Cart() {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    const totalPrice = cart.reduce((total, product) => total + product.price, 0);

    useEffect(() => {
        console.log("[Cart] đang chạy useEffect() của component Cart !");
            
        // hàm cleanup
        return () => {
            console.log("[Cart] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[Cart] component Cart render !");

    return (
        <section>
            <h2>Giỏ hàng</h2>
            <p>So luong san pham : { cart.length }</p>

            {
                cart.length === 0 ? (
                    <p>Giỏ hàng đang trống</p>
                ) : (
                    cart.map((item) => {
                        return (
                            <div key={item.id}>
                                <span>{item.name} - ${item.price}</span>
                                <button onClick={() => removeFromCart(item.id)}>Xóa</button>
                            </div>
                        )
                    })
                )
            }

            <h3>Tổng tiền: ${totalPrice}</h3>
        </section>
    )
}

export default Cart;