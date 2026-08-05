import { Link } from "react-router";
import { useEffect } from 'react';

function ContactPage() {

    useEffect(() => {
        console.log("[ContactPage] đang chạy useEffect() của component ContactPage !");
        
        // hàm cleanup
        return () => {
            console.log("[ContactPage] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[ContactPage] component ContactPage render !");
    

    return (
        <div className="container">
            <h2>Trang Liên hệ - Contact Page</h2>
            
            <p>Đây là nội dung trang Liên hệ</p>
        </div>
    )
}

export default ContactPage;