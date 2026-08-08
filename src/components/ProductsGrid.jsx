import { useContext, useEffect } from "react";
import { Link } from "react-router";

import ProductContext from "../context/ProductContext";
import CartContext from "../context/CartContext";
import ToastBoxContext from "../context/ToastBoxContext";

import { defaultProductImageSrc } from "../config/app_configs";

/**
 * filters phai la 1 object co format :
 * {
 *      keyword: "",
 *      onlyFeatured: 0,
 *      minPrice: "",
 *      maxPrice: "",
 *      productIds: []
 * }
 */
function ProductsGrid({ filters, sortType, limit, showProductsCount }) {
    const { productsList, handleFiltersData, getProductsByFilters, sortProductsByType } = useContext(ProductContext);
    const { addProductToCart } = useContext(CartContext);
    const { showToast } = useContext(ToastBoxContext);

    useEffect(() => {
        console.log("[ProductsGrid] đang chạy useEffect() của component ProductsGrid !");
            
        // hàm cleanup
        return () => {
            console.log("[ProductsGrid] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[ProductsGrid] component ProductsGrid render !");
    //console.log("[ProductsGrid] Data của mảng productsList vua lay tu ProductContext : ");
    //console.log(productsList);

    console.log("[ProductsGrid] filters vua truyen vao :");
    console.log(filters);

    // check filters
    let formattedFiltersData = {
        keyword: "",
        onlyFeatured: 0,
        minPrice: null,
        maxPrice: null,
        productIds: []
    };
    if (filters && typeof filters === "object" && filters !== null && !Array.isArray(filters)) {
        console.log("[ProductsGrid] filters la object ! Cho vao ham handleFiltersData() de format lai !");
        formattedFiltersData = handleFiltersData(filters);
    }
    else {
        console.log("[ProductsGrid] filters khong phai la object ! Su dung formattedFiltersData goc !");
    }

    console.log("[ProductsGrid] formattedFiltersData cuoi cung :");
    console.log(formattedFiltersData);

    // THUC HIEN SEARCH
    let filteredProductsList = getProductsByFilters(formattedFiltersData);

    // check sortType
    let finalSortType = "";
    if (sortType) {
        console.log("[ProductsGrid] co truyen vao sortType : " + sortType);
        finalSortType = sortType.trim();
    }
    console.log("[ProductsGrid] finalSortType : " + finalSortType);
    
    // THUC HIEN SORT
    let sortedFilteredProductsList = sortProductsByType(filteredProductsList, finalSortType); 
    console.log("[ProductsGrid] Data cua sortedFilteredProductsList :");
    console.log(sortedFilteredProductsList);
    
    
    /**
     * Ham xu ly khi click nut Add to cart
     */
    function handleClickAddToCart(productId) {
        const addToCartResult = addProductToCart(productId);
        console.log("[ProductsGrid - handleClickAddToCart] Data của addToCartResult :");
        console.log(addToCartResult);

        if (addToCartResult.success) {
            const addedProductObj = addToCartResult.addedProduct;
            const itemTotalPrice = addedProductObj.unitPrice * addedProductObj.quantity;
            showToast("success", "Đã thêm vào giỏ hàng",
                <>
                    <span>{addedProductObj.name}</span><br/>
                    <span>Số lượng trong giỏ: {addedProductObj.quantity}</span><br/>
                    <span>Tổng tiền sản phẩm : {itemTotalPrice.toLocaleString("vi-VN")}đ</span><br/>
                    <Link to="/cart">Xem giỏ hàng</Link>
                </>);
        }
        else {
            showToast("error", "Có lỗi xảy ra!", addToCartResult.errorMsg);
        }
    }


    return (
        <div className="products-grid-section">            
            {
                sortedFilteredProductsList.length === 0 ? (
                    <p>Không có sản phẩm nào được tìm thấy.</p>
                ) : (
                    <>
                        <div className="products-count-div">
                            <span>Có <strong>{sortedFilteredProductsList.length}</strong> sản phẩm</span>
                        </div>
                        <div className="product-grid">
                            {
                                sortedFilteredProductsList.map((product) => {
                                    // check mang images co rong hay ko 
                                    let productImageSrc = "";
                                    if (product.images.length > 0) {
                                        // neu mang images co phan tu thi lay phan tu dau tien (index 0) show ra
                                        productImageSrc = product.images[0];
                                    }
                                    else {
                                        // neu mang images rong thi lay image mac dinh show ra
                                        productImageSrc = defaultProductImageSrc;
                                    }

                                    // chuan bi product details URL
                                    let productDetailsUrl = "/products/" + product.id + "/" + product.slug;

                                    return (
                                        <div className="product-card" key={product.id} data-productid={product.id}>
                                            <div className="product-card-image">
                                                <Link to={productDetailsUrl}>
                                                    <img src={productImageSrc} alt={product.name}/>
                                                    {
                                                        product.isFeatured && (
                                                            <span className="product-card-tag">Nổi bật</span>
                                                        )
                                                    }
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
                                                    <button className="add-to-cart-btn" onClick={() => handleClickAddToCart(product.id)}>
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
                    </>
                )
            }
        </div>
    )
}

export default ProductsGrid;