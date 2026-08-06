import { useContext, useEffect } from "react";
import { Link } from "react-router";

import ProductContext from "../context/ProductContext";
//import CartContext from "../context/CartContext";

import { defaultProductImageSrc } from "../config/app_configs";

function ProductsGrid() {
    const { productsList } = useContext(ProductContext);
    //const { addToCart } = useContext(CartContext);
    

    useEffect(() => {
        console.log("[ProductsGrid] đang chạy useEffect() của component ProductsGrid !");
            
        // hàm cleanup
        return () => {
            console.log("[ProductsGrid] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[ProductsGrid] component ProductsGrid render !");
    console.log("[ProductsGrid] Data của mảng productsList vua lay tu ProductContext : ");
    console.log(productsList);

    return (
        <div className="products-grid-section">            
            {
                productsList.length === 0 ? (
                    <p>Không có sản phẩm nào hết</p>
                ) : (
                    <div className="product-grid">
                        {
                            productsList.map((product) => {
                                // check mang images co rong hay ko 
                                let productImageSrc = "";
                                if (product.images.length > 0) {
                                    // neu mang images co phan tu thi lay phan tu dau tien (index 0) show ra
                                    productImageSrc = product.images[0];
                                    console.log("[ProductsGrid] product " + product.id + " - có image : " + product.images[0]);
                                }
                                else {
                                    // neu mang images rong thi lay image mac dinh show ra
                                    productImageSrc = defaultProductImageSrc;
                                    console.log("[ProductsGrid] product " + product.id + " - không có image. Dùng default image : " + defaultProductImageSrc);
                                }

                                // chuan bi product details URL
                                let productDetailsUrl = "/products/" + product.id + "/" + product.slug;

                                return (
                                    <div className="product-card" key={product.id} data-productid={product.id}>
                                        <div className="product-card-image">
                                            <Link to={productDetailsUrl}>
                                                <img src={productImageSrc} alt={product.name}/>
                                                <span className="product-card-tag">Rất Nổi bật</span>
                                            </Link>
                                        </div>
                                        <div className="product-card-body">
                                            <Link to={productDetailsUrl}>
                                                <h3>{product.name}</h3>
                                            </Link>
                                            <div className="short-desc">
                                                <Link to={productDetailsUrl}>{product.shortDescription}</Link>
                                            </div>
                                            <div className="product-card-footer">
                                                <span className="product-price">{product.price.toLocaleString("vi-VN") + "đ"}</span>
                                            </div>
                                            <div className="product-card-actions">
                                                <button className="add-to-cart-btn">
                                                    <i className="fas fa-cart-plus"></i> Thêm vào giỏ
                                                </button>
                                                <Link to={productDetailsUrl} className="view-details-btn">
                                                    <i className="fas fa-eye"></i> Xem chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default ProductsGrid;