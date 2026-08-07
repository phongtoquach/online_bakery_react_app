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
function ProductsGrid({ filters, sortType, limit }) {
    const { productsList } = useContext(ProductContext);
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

    // BAT DAU SEARCH
    let filteredProductsList = getProductsByFilters(formattedFiltersData);


    /**
     * Ham format lai filtersData de dam bao tung attribute trong filtersData luon valid
     * {
     *      keyword: "",
     *      onlyFeatured: 0,
     *      minPrice: null,
     *      maxPrice: null,
     *      productIds: []
     * }
     */
    function handleFiltersData(filtersData) {
        let finalFilters = {
            keyword: "",
            onlyFeatured: 0,
            minPrice: null,
            maxPrice: null,
            productIds: []
        };

        // check keyword
        if (Object.hasOwn(filtersData, "keyword")) {
            console.log("[handleFiltersData] filtersData co attr keyword ! Value : " + filtersData.keyword);
            finalFilters.keyword = filtersData.keyword.trim();
        }
        else {
            console.log("[handleFiltersData] filtersData KHONG CO attr keyword !");
        }

        // check onlyFeatured
        if (Object.hasOwn(filtersData, "onlyFeatured")) {
            console.log("[handleFiltersData] filtersData co attr onlyFeatured ! Value : " + filtersData.onlyFeatured);
            // check co phai number ko
            let onlyFeaturedVal = Number(filtersData.onlyFeatured);
            if (Number.isNaN(onlyFeaturedVal)) {
                onlyFeaturedVal = 0;
            }
            // chi chap nhan 0 hoac 1
            if (onlyFeaturedVal != 0 && onlyFeaturedVal != 1) {
                onlyFeaturedVal = 0;
            }

            finalFilters.onlyFeatured = onlyFeaturedVal;
        }
        else {
            console.log("[handleFiltersData] filtersData KHONG CO attr onlyFeatured !");
        }

        // check minPrice
        if (Object.hasOwn(filtersData, "minPrice")) {
            console.log("[handleFiltersData] filtersData co attr minPrice ! Value : " + filtersData.minPrice);

            if (filtersData.minPrice !== null) {
                if (filtersData.minPrice === "") {
                    console.log("[handleFiltersData] minPrice rong ! Set thanh null !");
                    finalFilters.minPrice = null;
                }
                else {
                    // check co phai number ko
                    let minPrice_int = Number(filtersData.minPrice);
                    if (Number.isNaN(minPrice_int)) {
                        console.log("[handleFiltersData] minPrice khong phai number ! Set thanh null !");
                        finalFilters.minPrice = null;
                    }
                    else {
                        console.log("[handleFiltersData] minPrice la number : " + minPrice_int);
                        finalFilters.minPrice = minPrice_int;
                    }
                }
            }
            else {
                console.log("[handleFiltersData] minPrice = null ! Bo qua !");
            }
        }
        else {
            console.log("[handleFiltersData] filtersData KHONG CO attr minPrice !");
        }

        // check maxPrice
        if (Object.hasOwn(filtersData, "maxPrice")) {
            console.log("[handleFiltersData] filtersData co attr maxPrice ! Value : " + filtersData.maxPrice);

            if (filtersData.maxPrice !== null) {
                if (filtersData.maxPrice === "") {
                    console.log("[handleFiltersData] maxPrice rong ! Set thanh null !");
                    finalFilters.maxPrice = null;
                }
                else {
                    // check co phai number ko
                    let maxPrice_int = Number(filtersData.maxPrice);
                    if (Number.isNaN(maxPrice_int)) {
                        console.log("[handleFiltersData] maxPrice khong phai number ! Set thanh null !");
                        finalFilters.maxPrice = null;
                    }
                    else {
                        console.log("[handleFiltersData] maxPrice la number : " + maxPrice_int);
                        finalFilters.maxPrice = maxPrice_int;
                    }
                }
            }
            else {
                console.log("[handleFiltersData] maxPrice = null ! Bo qua !");
            }
        }
        else {
            console.log("[handleFiltersData] filtersData KHONG CO attr maxPrice !");
        }

        // check productIds
        if (Object.hasOwn(filtersData, "productIds")) {
            // check productIds co phai array khong
            if (!Array.isArray(filtersData.productIds)) {
                console.log("[handleFiltersData] productIds khong phai array ! Set thanh array rong !");
                filtersData.productIds = [];
            }

            // Neu mang productIds co phan tu thi check tung phan tu trong
            if (filtersData.productIds.length > 0) {
                let finalProductIds = [];
                for (let i=0; i < filtersData.productIds.length; i++) {
                    let productId = filtersData.productIds[i];
                    let productId_int = Number(productId);
                    if (Number.isNaN(productId_int) || productId_int <= 0) {
                        console.log("[handleFiltersData] productId " + productId + " khong hop le! Bo qua!");
                        continue;
                    }

                    console.log("[handleFiltersData] productId " + productId_int + " HOP LE! Add vao mang finalProductIds!");
                    finalProductIds.push(productId_int);
                }

                console.log("[handleFiltersData] Mang finalProductIds cuoi cung :");
                console.log(finalProductIds);

                finalFilters.productIds = finalProductIds;
            }
            else {
                console.log("[handleFiltersData] productIds là array rong !");
            }
        }
        else {
            console.log("[handleFiltersData] filtersData KHONG CO attr productIds !");
        }

        return finalFilters;
    }


    function getProductsByFilters(filtersData) {
        console.log("[getProductsByFilters] filtersData :");
        console.log(filtersData);

        let lowerCaseKeyword = filtersData.keyword.toLocaleLowerCase();
        // neu cac filter trong filtersData deu rong, null : lay tat ca product trong mang productsList
        if (lowerCaseKeyword == "" && filtersData.onlyFeatured == 0 && filtersData.minPrice === null && filtersData.maxPrice === null && filtersData.productIds.length === 0) {
            console.log("[getProductsByFilters] Khong co filter nao trong filtersData. Lay tat ca product trong mang productsList !");
            return productsList;
        }

        const filteredProducts = productsList.filter((product) => {
            console.log("[getProductsByFilters] product dang check :");
            console.log(product);

            // check filtersData.keyword
            if (lowerCaseKeyword != "") {
                console.log("[getProductsByFilters] Keyword khac rong : " + lowerCaseKeyword);
                if (!product.name.toLocaleLowerCase().includes(lowerCaseKeyword)) {
                    console.log("[getProductsByFilters] Product " + product.id + " : NOT MATCHED with keyword !");
                    return false;
                }
                else {
                    console.log("[getProductsByFilters] Product " + product.id + " : MATCHED with keyword !");
                }
            }
            else {
                console.log("[getProductsByFilters] Keyword rong ! Bo qua filter nay !");
            }

            // check filtersData.minPrice
            if (filtersData.minPrice !== null) {
                console.log("[getProductsByFilters] Min price khac null : " + filtersData.minPrice);
                if (product.price < filtersData.minPrice) {
                    console.log("[getProductsByFilters] Product " + product.id + " : NOT MATCHED with min price !");
                    return false;
                }
                else {
                    console.log("[getProductsByFilters] Product " + product.id + " : MATCHED with min price !");
                }
            }
            else {
                console.log("[getProductsByFilters] Min price null ! Bo qua filter nay !");
            }

            // check filtersData.maxPrice
            if (filtersData.maxPrice !== null) {
                console.log("[getProductsByFilters] Max price khac null : " + filtersData.maxPrice);
                if (product.price > filtersData.maxPrice) {
                    console.log("[getProductsByFilters] Product " + product.id + " : NOT MATCHED with max price !");
                    return false;
                }
                else {
                    console.log("[getProductsByFilters] Product " + product.id + " : MATCHED with max price !");
                }
            }
            else {
                console.log("[getProductsByFilters] Max price null ! Bo qua filter nay !");
            }

            // check filtersData.onlyFeatured
            if (filtersData.onlyFeatured == 1) {
                console.log("[getProductsByFilters] filter onlyFeatured = 1");
                if (product.isFeatured == false) {
                    console.log("[getProductsByFilters] Product " + product.id + " : co isFeatured = false. NOT MATCHED!");
                    return false;
                }
                else {
                    console.log("[getProductsByFilters] Product " + product.id + " : co isFeatured = true. MATCHED!");
                }
            }
            else {
                console.log("[getProductsByFilters] filter onlyFeatured = " + filtersData.onlyFeatured + " ! Bo qua filter nay !");
            }

            // check filtersData.productIds
            if (filtersData.productIds.length > 0) {
                if (!filtersData.productIds.includes(product.id)) {
                    console.log("[getProductsByFilters] Product " + product.id + " khong nam trong mang filtersData.productIds ! NOT MATCHED!");
                    return false;
                }
                else {
                    console.log("[getProductsByFilters] Product " + product.id + " nam trong mang filtersData.productIds ! MATCHED!");
                }
            }

            console.log("[getProductsByFilters] Product " + product.id + " DA PASSED het cac filter !");
            return true;
        });

        console.log("[getProductsByFilters] Mang filteredProducts sau cung :");
        console.log(filteredProducts);

        return filteredProducts;
    }
    
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
                filteredProductsList.length === 0 ? (
                    <p>Không có sản phẩm nào hết</p>
                ) : (
                    <div className="product-grid">
                        {
                            filteredProductsList.map((product) => {
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
                )
            }
        </div>
    )
}

export default ProductsGrid;