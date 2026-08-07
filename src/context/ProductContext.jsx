import { createContext, useEffect, useState } from "react";

import productsData from "../data/products_data";

const ProductContext = createContext();

export function ProductProvider({ children }) {

    //const [studentName, setStudentName] = useState("phong quach");

    useEffect(() => {
        console.log("[ProductProvider] đang chạy useEffect() của ProductProvider !");
            
        // hàm cleanup
        return () => {
            console.log("[ProductProvider] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[ProductProvider] ProductProvider được render !");

    console.log("[ProductProvider] Data của mảng productsData vua lay tu file js : ");
    console.log(productsData);


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
            console.log("[ProductProvider - handleFiltersData] filtersData co attr keyword ! Value : " + filtersData.keyword);
            finalFilters.keyword = filtersData.keyword.trim();
        }
        else {
            console.log("[ProductProvider - handleFiltersData] filtersData KHONG CO attr keyword !");
        }

        // check onlyFeatured
        if (Object.hasOwn(filtersData, "onlyFeatured")) {
            console.log("[ProductProvider - handleFiltersData] filtersData co attr onlyFeatured ! Value : " + filtersData.onlyFeatured);
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
            console.log("[ProductProvider - handleFiltersData] filtersData KHONG CO attr onlyFeatured !");
        }

        // check minPrice
        if (Object.hasOwn(filtersData, "minPrice")) {
            console.log("[ProductProvider - handleFiltersData] filtersData co attr minPrice ! Value : " + filtersData.minPrice);

            if (filtersData.minPrice !== null) {
                if (filtersData.minPrice === "") {
                    console.log("[ProductProvider - handleFiltersData] minPrice rong ! Set thanh null !");
                    finalFilters.minPrice = null;
                }
                else {
                    // check co phai number ko
                    let minPrice_int = Number(filtersData.minPrice);
                    if (Number.isNaN(minPrice_int)) {
                        console.log("[ProductProvider - handleFiltersData] minPrice khong phai number ! Set thanh null !");
                        finalFilters.minPrice = null;
                    }
                    else {
                        console.log("[ProductProvider - handleFiltersData] minPrice la number : " + minPrice_int);
                        finalFilters.minPrice = minPrice_int;
                    }
                }
            }
            else {
                console.log("[ProductProvider - handleFiltersData] minPrice = null ! Bo qua !");
            }
        }
        else {
            console.log("[ProductProvider - handleFiltersData] filtersData KHONG CO attr minPrice !");
        }

        // check maxPrice
        if (Object.hasOwn(filtersData, "maxPrice")) {
            console.log("[ProductProvider - handleFiltersData] filtersData co attr maxPrice ! Value : " + filtersData.maxPrice);

            if (filtersData.maxPrice !== null) {
                if (filtersData.maxPrice === "") {
                    console.log("[ProductProvider - handleFiltersData] maxPrice rong ! Set thanh null !");
                    finalFilters.maxPrice = null;
                }
                else {
                    // check co phai number ko
                    let maxPrice_int = Number(filtersData.maxPrice);
                    if (Number.isNaN(maxPrice_int)) {
                        console.log("[ProductProvider - handleFiltersData] maxPrice khong phai number ! Set thanh null !");
                        finalFilters.maxPrice = null;
                    }
                    else {
                        console.log("[ProductProvider - handleFiltersData] maxPrice la number : " + maxPrice_int);
                        finalFilters.maxPrice = maxPrice_int;
                    }
                }
            }
            else {
                console.log("[ProductProvider - handleFiltersData] maxPrice = null ! Bo qua !");
            }
        }
        else {
            console.log("[ProductProvider - handleFiltersData] filtersData KHONG CO attr maxPrice !");
        }

        // check productIds
        if (Object.hasOwn(filtersData, "productIds")) {
            // check productIds co phai array khong
            if (!Array.isArray(filtersData.productIds)) {
                console.log("[ProductProvider - handleFiltersData] productIds khong phai array ! Set thanh array rong !");
                filtersData.productIds = [];
            }

            // Neu mang productIds co phan tu thi check tung phan tu trong
            if (filtersData.productIds.length > 0) {
                let finalProductIds = [];
                for (let i=0; i < filtersData.productIds.length; i++) {
                    let productId = filtersData.productIds[i];
                    let productId_int = Number(productId);
                    if (Number.isNaN(productId_int) || productId_int <= 0) {
                        console.log("[ProductProvider - handleFiltersData] productId " + productId + " khong hop le! Bo qua!");
                        continue;
                    }

                    console.log("[ProductProvider - handleFiltersData] productId " + productId_int + " HOP LE! Add vao mang finalProductIds!");
                    finalProductIds.push(productId_int);
                }

                console.log("[ProductProvider - handleFiltersData] Mang finalProductIds cuoi cung :");
                console.log(finalProductIds);

                finalFilters.productIds = finalProductIds;
            }
            else {
                console.log("[ProductProvider - handleFiltersData] productIds là array rong !");
            }
        }
        else {
            console.log("[ProductProvider - handleFiltersData] filtersData KHONG CO attr productIds !");
        }

        return finalFilters;
    }

    /**
     * Ham lay ra cac product dua theo object filters truyen vao
     */
    function getProductsByFilters(filtersData) {
        console.log("[getProductsByFilters] filtersData :");
        console.log(filtersData);

        let lowerCaseKeyword = filtersData.keyword.toLocaleLowerCase();
        // neu cac filter trong filtersData deu rong, null : lay tat ca product trong mang productsData
        if (lowerCaseKeyword == "" && filtersData.onlyFeatured == 0 && filtersData.minPrice === null && filtersData.maxPrice === null && filtersData.productIds.length === 0) {
            console.log("[getProductsByFilters] Khong co filter nao trong filtersData. Lay tat ca product trong mang productsData !");
            console.log(productsData);
            return productsData;
        }

        const filteredProducts = productsData.filter((product) => {
            console.log("[ProductProvider - getProductsByFilters] product dang check :");
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
            else {
                console.log("[getProductsByFilters] filter productIds la array rong ! Bo qua filter nay !");
            }

            console.log("[getProductsByFilters] Product " + product.id + " DA PASSED het cac filter !");
            return true;
        });

        console.log("[getProductsByFilters] Mang filteredProducts sau cung :");
        console.log(filteredProducts);

        return filteredProducts;
    }


    /**
     * Ham thuc hien sort 1 mang product dua theo param Sort Type truyen vao
     */
    function sortProductsByType(products_data, sortType="") {
        // neu mang products_data rong thi return ngay
        if (products_data.length <= 0) {
            console.log("[ProductProvider - sortProductsByType] products_data rong ! Return mang rong ngay !");
            return [];
        }
        
        console.log("[ProductProvider - sortProductsByType] param sortType : " + sortType);
        if (sortType == "" || sortType == "default") {
            console.log("[ProductProvider - sortProductsByType] sortType rong hoac default. Set lai thanh from_newest_to_oldest");
            sortType = "from_newest_to_oldest";
        }

        let clonedProductsData = structuredClone(products_data);

        switch (sortType) {
            case "name_asc":
                console.log("[ProductProvider - sortProductsByType] sortType = " + sortType + ". Sort theo name A-Z !");

                clonedProductsData.sort(function(a, b) {
                    return a.name.localeCompare(b.name);
                });
                return clonedProductsData;

                break;
            case "name_desc":
                console.log("[ProductProvider - sortProductsByType] sortType = " + sortType + ". Sort theo name Z-A !");

                clonedProductsData.sort(function(a, b) {
                    return b.name.localeCompare(a.name);
                });
                return clonedProductsData;

                break;
            case "price_asc":
                console.log("[ProductProvider - sortProductsByType] sortType = " + sortType + ". Sort theo price tu thap den cao !");

                clonedProductsData.sort(function(a, b) {
                    return a.price - b.price;
                });
                return clonedProductsData;

                break;
            case "price_desc":
                console.log("[ProductProvider - sortProductsByType] sortType = " + sortType + ". Sort theo price tu cao den thap !");

                clonedProductsData.sort(function(a, b) {
                    return b.price - a.price;
                });
                return clonedProductsData;

                break;
            case "from_newest_to_oldest":
                console.log("[ProductProvider - sortProductsByType] sortType = " + sortType + ". Sort theo Product ID tu lon den nho !");

                clonedProductsData.sort((a, b) => b.id - a.id);

                return clonedProductsData;

                break;
            default:
                console.log("[ProductProvider - sortProductsByType] Khong co sort type phu hop! Return mang goc !");
                return clonedProductsData;
        }
    }


    return (
        <ProductContext.Provider value={{ productsList: productsData, handleFiltersData, getProductsByFilters, sortProductsByType }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext;