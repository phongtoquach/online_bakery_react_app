import { useEffect } from "react";
import { NavLink, Link } from "react-router";

function Footer() {

    useEffect(() => {
        console.log("[Footer] đang chạy useEffect() của component Footer !");
        
        // hàm cleanup
        return () => {
            console.log("[Footer] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[Footer] component Footer render !");
   
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="logo-text">
                            Maison Sweet Bakery
                            <small>Bakery &amp; Patisserie</small>
                        </div>
                        <p>Mang đến những khoảnh khắc ngọt ngào từ năm 2015.
    Niềm đam mê làm bánh là động lực để chúng tôi không ngừng hoàn thiện từng sản phẩm, từ việc lựa chọn nguyên liệu tươi ngon đến mang niềm vui và hương vị tuyệt hảo đến tận tay khách hàng.</p>
                        <div className="footer-social">
                            <Link to="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></Link>
                            <Link to="#" aria-label="Instagram"><i className="fab fa-instagram"></i></Link>
                            <Link to="#" aria-label="Twitter"><i className="fab fa-twitter"></i></Link>
                            <Link to="#" aria-label="Pinterest"><i className="fab fa-pinterest-p"></i></Link>
                            <Link to="#" aria-label="YouTube"><i className="fab fa-youtube"></i></Link>
                        </div>
                    </div>
                    <div>
                        <h4>Liên Kết Nhanh</h4>
                        <ul className="footer-links">
                            <li><Link to="/"><i className="fas fa-chevron-right"></i>Trang chủ</Link></li>
                            <li><Link to="/products"><i className="fas fa-chevron-right"></i> Sản phẩm</Link></li>
                            <li><Link to="/cart"><i className="fas fa-chevron-right"></i> Giỏ hàng</Link></li>
                            <li><Link to="/contact"><i className="fas fa-chevron-right"></i> Liên hệ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Danh Mục Sản Phẩm</h4>
                        <ul className="footer-links">
                            <li><Link to="/products"><i className="fas fa-chevron-right"></i> Bánh cưới</Link></li>
                            <li><Link to="/products"><i className="fas fa-chevron-right"></i> Bánh sinh nhật</Link></li>
                            <li><Link to="/products"><i className="fas fa-chevron-right"></i> Bánh ngọt</Link></li>
                            <li><Link to="/products"><i className="fas fa-chevron-right"></i> Bánh Macaron</Link></li>
                            <li><Link to="/products"><i className="fas fa-chevron-right"></i> Bánh phô mai</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Contact Info</h4>
                        <ul className="footer-contact">
                            <li><i className="fas fa-map-marker-alt"></i> 123 Đường Nguyễn Huệ Quận 1, TP. Hồ Chí Minh</li>
                            <li><i className="fas fa-phone"></i> (+84) 555 123 4567</li>
                            <li><i className="fas fa-envelope"></i> maisonsweet@gmail.com</li>
                            <li><i className="fas fa-clock"></i> Thứ 2 - Thứ 7: 7:00 - 20:00 &bull; Chủ nhật: 8:00 - 18:00</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 Sweet Crumbs Bakery. All rights reserved. Baked with <i className="fas fa-heart" style={{ color: 'var(--color-light-pink)' }}></i> and a lot of butter.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;