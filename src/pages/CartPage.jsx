import { Link } from "react-router";
import { useEffect } from 'react';

function CartPage() {

    useEffect(() => {
        console.log("[CartPage] đang chạy useEffect() của component CartPage !");
        
        // hàm cleanup
        return () => {
            console.log("[CartPage] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[CartPage] component CartPage render !");
    

    return (
        <div className="container">
            <h2>Trang Giỏ hàng - Cart Page</h2>
            
            <p>Đây là nội dung trang giỏ hàng</p>
        </div>
    )
}

export default CartPage;