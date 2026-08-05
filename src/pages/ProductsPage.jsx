import { Link } from "react-router";
import { useEffect, useContext } from 'react';

import ProductContext from "../context/ProductContext";
import CartContext from "../context/CartContext";

//import ProductList from "../components/ProductList";

function ProductsPage() {

    const { studentName, setStudentName } = useContext(ProductContext);
    const { studentMark, setStudentMark } = useContext(CartContext);

    useEffect(() => {
        console.log("[ProductsPage] đang chạy useEffect() của component ProductsPage !");
        
        // hàm cleanup
        return () => {
            console.log("[ProductsPage] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[ProductsPage] component ProductsPage render !");
    

    return (
        <>
            <h1>Đây là trang danh sách Product - {studentName} - Mark : {studentMark}</h1>

            <button onClick={() => setStudentName("nguyen ngoc lam")}>Đổi tên student</button>
            <br/><br/>
            <button onClick={() => setStudentMark("156")}>Đổi mark</button>
        </>
    )
}

export default ProductsPage;