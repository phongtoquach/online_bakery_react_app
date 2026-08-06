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

    return (
        <ProductContext.Provider value={{ productsList: productsData }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext;