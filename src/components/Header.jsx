import { useContext, useEffect } from "react";
import { NavLink, Link } from "react-router";

//import ProductContext from "../context/ProductContext";
import CartContext from "../context/CartContext";

import HeaderSearchSection from "../components/HeaderSearchSection";

function Header() {

    const { cart } = useContext(CartContext);

    useEffect(() => {
        console.log("[Header] đang chạy useEffect() của component Header !");
        
        // hàm cleanup
        return () => {
            console.log("[Header] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[Header] component Header render ! Data của cart :");
    console.log(cart);
   
    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">
                    <div className="logo-image">
                        <img src="/images/web_logo_small.png" alt="Logo Maison Sweet Bakery"/>
                    </div>
                    <div className="logo-text">
                        Maison Sweet Bakery
                        <small>Bakery &amp; Patisserie</small>
                    </div>
                </Link>
                <nav className="nav-menu">
                    <NavLink to="/" end className={ ({isActive}) => isActive ? "nav-link active" : "nav-link" }><i className="fas fa-home"></i> Trang chủ</NavLink>
                    <NavLink to="/products" end className={ ({isActive}) => isActive ? "nav-link active" : "nav-link" }><i className="fas fa-th-large"></i> Sản phẩm</NavLink>
                    <NavLink to="/cart" end className={ ({isActive}) => isActive ? "nav-link active" : "nav-link" }><i className="fas fa-shopping-bag"></i> Giỏ hàng</NavLink>
                    <NavLink to="/contact" className={ ({isActive}) => isActive ? "nav-link active" : "nav-link" }><i className="fas fa-envelope"></i> Liên hệ</NavLink>
                </nav>
                
                <HeaderSearchSection/>

                <NavLink to="/cart" className="cart-icon">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-badge" id="headerCartBadgeText">{cart.length}</span>
                </NavLink>
            </div>
        </header>
    )
}

export default Header;
