import { createContext, useEffect, useState } from "react";

import productsList from "../data/products.json";

const ProductContext = createContext();

export function ProductProvider({ children }) {

    const [studentName, setStudentName] = useState("phong quach");

    const newProductsList = structuredClone(productsList);

    useEffect(() => {
        console.log("[ProductProvider] đang chạy useEffect() của ProductProvider !");
            
        // hàm cleanup
        return () => {
            console.log("[ProductProvider] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[ProductProvider] ProductProvider được render !");

    return (
        <ProductContext.Provider value={{ studentName, setStudentName, newProductsList }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext;