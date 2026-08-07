import { Link } from "react-router";
import { useEffect, useContext } from 'react';

import ProductContext from "../context/ProductContext";
//import CartContext from "../context/CartContext";

function ProductDetailsPage() {

    useEffect(() => {
        console.log("[ProductDetailsPage] đang chạy useEffect() của component ProductDetailsPage !");
        
        // hàm cleanup
        return () => {
            console.log("[ProductDetailsPage] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[ProductDetailsPage] component ProductDetailsPage render !");
    

    return (
        <>
            <h1>Đây là trang chi tiết của 1 Product</h1>
        </>
    )
}

export default ProductDetailsPage;