import { Link, useSearchParams } from "react-router";
import { useEffect, useContext, useState } from 'react';

import "../assets/css/products.css";

import { websiteName } from "../config/app_configs";

import ProductContext from "../context/ProductContext";
import CartContext from "../context/CartContext";

import ProductsGrid from "../components/ProductsGrid";

function ProductsPage() {
    useEffect(() => {
        document.title = "Sản phẩm | " + websiteName;
    }, []);

    
    // check URL params
    const [searchParams] = useSearchParams();

    const keywordUrlParam = searchParams.get("keyword");
    console.log("[ProductsPage] URL param keyword : " + keywordUrlParam);

    let defaultFiltersFormData = {
        keyword: "",
        onlyFeatured: 0,
        minPrice: "",
        maxPrice: ""
    };

    if (keywordUrlParam !== null && keywordUrlParam.trim() !== "") {
        console.log("[ProductsPage] URL param keyword ton tai va khac rong !");
        defaultFiltersFormData.keyword = keywordUrlParam.trim();
    }

    //console.log("[ProductsPage] Data của defaultFiltersFormData ban dau : ");
    //console.log(defaultFiltersFormData);

    const [filtersFormData, setFiltersFormData] = useState(defaultFiltersFormData);
    
    // const [filtersFormData, setFiltersFormData] = useState({
    //     keyword: "",
    //     onlyFeatured: 0,
    //     minPrice: "",
    //     maxPrice: ""
    // });

    const [priceError, setPriceError] = useState("");

    const [sortOption, setSortOption] = useState("default");


    // copy filtersFormData ra 1 object moi
    const filtersData = {...filtersFormData};
    // gan value cua bien useState sortOption lai cho 1 bien binh thuong
    const sortTypeStr = sortOption;

    console.log("[ProductsPage] Data cua filtersData cuoi cung :");
    console.log(filtersData);
    console.log("[ProductsPage] sortTypeStr cuoi cung : " + sortTypeStr);
    console.log("[ProductsPage] priceError sau cung : " + priceError);

    useEffect(() => {
        console.log("[ProductsPage] đang chạy useEffect() của component ProductsPage !");
        
        // hàm cleanup
        return () => {
            console.log("[ProductsPage] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[ProductsPage] component ProductsPage render !");


    function validatePrice(minPrice, maxPrice) {
        if (minPrice !== "" && Number(minPrice) < 0) {
            console.log("[ProductsPage - validatePrice] minPrice = " + minPrice + " ! Khong hop le !");
            return "Giá min cần phải là số và phải từ 0 trở lên !";
        }

        if (maxPrice !== "" && Number(maxPrice) < 0) {
            console.log("[ProductsPage - validatePrice] maxPrice = " + maxPrice + " ! Khong hop le !");
            return "Giá max cần phải là số và phải từ 0 trở lên !";
        }

        if (minPrice !== "" && maxPrice !== "" && Number(maxPrice) < Number(minPrice)) {
            console.log("[ProductsPage - validatePrice] maxPrice = " + maxPrice + " ; minPrice = " + minPrice + " ! maxPrice < minPrice ! Khong hop le !");
            return "Giá max cần phải lớn hơn hoặc bằng giá min !";
        }

        return "";
    }


    function handleChangeInput(attrKey, inputVal) {
        //let trimmedInputVal = inputVal.trim();

        setFiltersFormData(currentFiltersFormData => {
            console.log("[handleChangeInput - setFiltersFormData] bien attrKey : " + attrKey + " ; inputVal : " + inputVal);
            console.log("[handleChangeInput - setFiltersFormData] Data cua currentFiltersFormData :");
			console.log(currentFiltersFormData);

			let newFiltersFormData = { ...currentFiltersFormData, [attrKey]: inputVal };
			
			console.log("[handleChangeInput - setFiltersFormData] Data cua newFiltersFormData :");
			console.log(newFiltersFormData);

            // validate price
            const priceErrorStr = validatePrice(newFiltersFormData.minPrice, newFiltersFormData.maxPrice);
            console.log("[handleChangeInput - setFiltersFormData] priceErrorStr la : " + priceErrorStr);
            setPriceError(priceErrorStr);

			return newFiltersFormData;
		});
    }

    function handleOnlyFeaturedChange(e) {
        setFiltersFormData((currentFiltersFormData) => {
            console.log("[handleOnlyFeaturedChange - setFiltersFormData] Data cua currentFiltersFormData :");
			console.log(currentFiltersFormData);

            let newFiltersFormData = {
                ...currentFiltersFormData,
                onlyFeatured: e.target.checked ? 1 : 0
            };

            console.log("[handleOnlyFeaturedChange - setFiltersFormData] Data cua newFiltersFormData :");
			console.log(newFiltersFormData);

            return newFiltersFormData;
        });
    }

    return (
        <>
            <section className="section products-container-section">
                <div className="container">
                    <div className="section-title">
                        <h2>Menu bánh của chúng tôi</h2>
                        <p>Từ bánh ngọt đến bánh mặn - Tất cả đều đang chờ bạn.</p>
                    </div>
                    <div className="products-layout">
                        
                        <aside className="filter-sidebar">
                            <h3><i className="fas fa-filter"></i> Bộ lọc sản phẩm</h3>
                            <div className="filter-group">
                                <label htmlFor="txtSearchKeyword">Tên sản phẩm</label>
                                <input type="text" id="txtSearchKeyword" value={filtersFormData.keyword} placeholder="Tên sản phẩm..." onChange={(event) => handleChangeInput("keyword", event.target.value)}/>
                            </div>
                            <div className="filter-group">
                                <label>Khoảng giá</label>
                                <div className="price-range">
                                    <input type="number" value={filtersFormData.minPrice} placeholder="Giá min" min="0" onChange={(event) => handleChangeInput("minPrice", event.target.value)} />
                                    <input type="number" value={filtersFormData.maxPrice} placeholder="Giá max" onChange={(event) => handleChangeInput("maxPrice", event.target.value)}/>
                                </div>
                                <div id="priceErrorMsg" className="field-error-msgbox" style={ priceError === "" ? { display: 'none' } : {} }>{priceError}</div>
                            </div>

                            <div className="filter-group filter-checkbox">
                                <input type="checkbox" id="chkOnlyFeatured" checked={filtersFormData.onlyFeatured === 1} onChange={(event) => handleOnlyFeaturedChange(event)}/>
                                <label htmlFor="chkOnlyFeatured">Chỉ hiện sản phẩm nổi bật</label>
                            </div>

                            <button className="apply-filters-btn" id="btnClearFilters">
                                <i className="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc
                            </button>
                        </aside>
                        
                        <div>
                            <div className="product-toolbar" id="productToolbar">
                                <div className="product-toolbar-sort">
                                    <span className="sort-label">Sắp xếp theo:</span>
                                    <div className="sort-toggle-group">
                                        <button className={`sort-toggle-btn ${sortTypeStr === "default" ? "active" : ""}`} onClick={() => setSortOption("default")}>
                                        Mặc định
                                        </button>
                                        <button className={`sort-toggle-btn ${sortTypeStr === "name_asc" ? "active" : ""}`} onClick={() => setSortOption("name_asc")}>
                                        Tên A-Z
                                        </button>
                                        <button className={`sort-toggle-btn ${sortTypeStr === "name_desc" ? "active" : ""}`} onClick={() => setSortOption("name_desc")}>
                                        Tên Z-A
                                        </button>
                                        <button className={`sort-toggle-btn ${sortTypeStr === "price_asc" ? "active" : ""}`} onClick={() => setSortOption("price_asc")}>
                                        Giá thấp đến cao
                                        </button>
                                        <button className={`sort-toggle-btn ${sortTypeStr === "price_desc" ? "active" : ""}`} onClick={() => setSortOption("price_desc")}>
                                        Giá cao xuống thấp
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="products-grid-container">
                                {
                                    priceError === "" ? (
                                        <ProductsGrid filters={filtersData} sortType={sortTypeStr} showProductsCount={1} />
                                    ) : (
                                        <>
                                            <p>Điều kiện tìm kiếm chưa hợp lệ !</p>
                                            <p>Xin vui lòng kiểm tra lại bộ lọc sản phẩm !</p>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductsPage;