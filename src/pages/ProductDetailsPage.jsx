import { Link, useParams } from "react-router";
import { useEffect, useContext } from 'react';

import "../assets/css/product_details.css";

import ProductContext from "../context/ProductContext";
//import CartContext from "../context/CartContext";

import ProductThumbnails from "../components/ProductThumbnails";
import AddToCartSection from "../components/AddToCartSection";
import ProductsGrid from "../components/ProductsGrid";

function ProductDetailsPage() {

    const { productsList } = useContext(ProductContext);

    useEffect(() => {
        console.log("[ProductDetailsPage] đang chạy useEffect() của component ProductDetailsPage !");
        
        // hàm cleanup
        return () => {
            console.log("[ProductDetailsPage] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[ProductDetailsPage] component ProductDetailsPage render !");


    // lay ra param productId & slug tren URL
    const { productId, slug } = useParams();
    console.log("[ProductDetailsPage] URL param - productId : " + productId + " ; slug : " + slug);

    // chuan bi JSX product not found
    const productNotFoundElement = (
        <section className="section">
            <div className="container">
                <div className="product-details-section">
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '15px' }}>Không tìm thấy sản phẩm</h3>
                        <p>Xin vui lòng đi đến trang sản phẩm để chọn sản phẩm khác.</p>
                        <Link to="/products" className="btn btn-primary"><i className="fas fa-shopping-bag"></i> Đi đến trang sản phẩm</Link>
                    </div>
                </div>
            </div>
        </section>
    );

    // check URL param productId phai la number
    let productId_int = Number(productId);
    if (Number.isNaN(productId_int)) {
        console.log("[ProductDetailsPage] URL param productId khong phai number ! Show message !");
        return productNotFoundElement;
    }

    // check URL param : slug
    let productSlug = slug.trim();
    console.log("[ProductDetailsPage] URL param slug sau trim : " + productSlug);
    if (productSlug === "") {
        console.log("[ProductDetailsPage] URL param slug rong ! Show message !");
        return productNotFoundElement;
    }

    console.log("[ProductDetailsPage] productId_int : " + productId_int + " ; productSlug : " + productSlug);

    // lay ra product dua theo productId & slug
    const productObj = productsList.find((productItem) => productItem.id === productId_int && productItem.slug === productSlug);
    console.log("[ProductDetailsPage] Data cua productObj :");
    console.log(productObj);

    if (!productObj) {
        console.log("[ProductDetailsPage] Khong tim thay product nay trong productsList ! Show message !");
        return productNotFoundElement;
    }
    
    return (
        <>
            <section className="section">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Trang chủ</Link>
                        <span className="separator"><i className="fas fa-chevron-right"></i></span>
                        <Link to="/products">Sản phẩm</Link>
                        <span className="separator"><i className="fas fa-chevron-right"></i></span>
                        <span className="current">{productObj.name}</span>
                    </nav>

                    <div className="product-details-section">
                        <div className="product-details-layout">

                            <ProductThumbnails productImages={productObj.images}/>

                            <div className="product-info" id="productInfo">
                                <h1>{productObj.name}</h1>
                                <div className="product-details-price" id="productPrice">{productObj.price.toLocaleString("vi-VN")}đ</div>
                                <div className="product-description" id="productShortDescription">
                                    {productObj.shortDescription}
                                </div>
                                
                                <AddToCartSection productId={productObj.id} />

                                <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)', marginTop: 'var(--space-md)' }}>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                                        <i className="fas fa-truck" style={{ color: "var(--color-gold)", marginRight: "0.5rem" }}></i>
                                        <strong>Giao hàng:</strong> Giao trong ngày trước 2h chiều
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="product-tabs">
                            <div className="tab-buttons">
                                <button className="tab-btn active" data-tab="description">Mô tả sản phẩm</button>
                            </div>

                            <div className="tab-content active" id="tab-description">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: productObj.description
                                    }}
                                />
                            </div>
                        </div>

                        {
                            productObj.relatedProductIds.length > 0 && (
                                <div className="section" style={{ paddingBottom: '0' }}>
                                    <div className="section-title">
                                        <h2>Sản phẩm liên quan</h2>
                                        <p>Khám phá thêm những hương vị được tuyển chọn dành cho bạn.</p>
                                    </div>
                                    <div className="related-products-grid-section">
                                        <ProductsGrid filters={{
                                            //keyword: "hộp",
                                            //onlyFeatured: 1
                                            //minPrice: 150000,
                                            //maxPrice: 170000,
                                            productIds: productObj.relatedProductIds
                                        }} sortType="default" />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductDetailsPage;