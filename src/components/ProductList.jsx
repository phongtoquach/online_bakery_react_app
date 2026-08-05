import { useContext, useEffect } from "react";
import CartContext from "../context/CartContext";
import ProductContext from "../context/ProductContext";

function ProductList() {
    const { addToCart } = useContext(CartContext);
    const { products, setProducts } = useContext(ProductContext);

    useEffect(() => {
        console.log("[ProductList] đang chạy useEffect() của component ProductList !");
            
        // hàm cleanup
        return () => {
            console.log("[ProductList] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[ProductList] component ProductList render !");

    return (
        <section>
            <h2>Danh sách sản phẩm</h2>
            {
                products.map((pro) => {
                    return (
                        <div className="product-card" key={pro.id}>
                            <div>
                                <strong>{pro.name}</strong>
                                <p>Giá tiền: ${pro.price}</p>
                            </div>
                            <button onClick={() => addToCart(pro)}>Thêm vào giỏ</button>
                        </div>
                    )
                })
            }
        </section>
    )
}

export default ProductList;