import { Link } from "react-router";
import { useEffect } from 'react';

import ProductsGrid from "../components/ProductsGrid";

function Home() {

    useEffect(() => {
        console.log("[Home] đang chạy useEffect() của component Home !");
        
        // hàm cleanup
        return () => {
            console.log("[Home] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[Home] component Home render !");
    

    return (
        <>
            <section className="section" style={{ paddingBottom: '75px' }}>
                <div className="container">
                    <div className="section-title">
                        <h2>Bánh mới ra mắt</h2>
                        <p>Khám phá những mẫu bánh mới nhất, được chế biến tỉ mỉ để mang đến trải nghiệm ngọt ngào cho mọi dịp.</p>
                    </div>

                    <ProductsGrid/>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
                        <Link to="/products" className="btn btn-outline">
                            <i className="fas fa-th-large"></i> Xem thêm
                        </Link>
                    </div>
                </div>
            </section>
            
            <section className="section" style={{ backgroundColor: '#ffffff' }}>
                <div className="container">
                    <div className="section-title">
                        <h2>Tại Sao Chọn Chúng Tôi</h2>
                        <p>Chúng tôi đặt trọn tâm huyết vào từng sản phẩm, chỉ sử dụng những nguyên liệu tươi ngon và chất lượng nhất.</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon pink">
                                <i className="fas fa-leaf"></i>
                            </div>
                            <h3>Nguyên Liệu Tươi Sạch</h3>
                            <p>Chúng tôi lựa chọn những nguyên liệu hữu cơ tươi ngon từ các nông trại địa phương. 
                                Không sử dụng chất bảo quản, không cắt giảm chất lượng trong bất kỳ công đoạn nào.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon brown">
                                <i className="fas fa-hand-holding-heart"></i>
                            </div>
                            <h3>Được Làm Bằng Cả Tấm Lòng</h3>
                            <p>Mỗi chiếc bánh đều được các nghệ nhân làm bánh giàu kinh nghiệm chế tác thủ công với tất cả sự tận tâm và niềm đam mê.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon gold">
                                <i className="fas fa-truck"></i>
                            </div>
                            <h3>Giao Hàng Trong Ngày</h3>
                            <p>Bánh được giao trực tiếp từ lò nướng đến tận tay bạn. Chúng tôi giao hàng ngay trong ngày để đảm bảo độ tươi ngon nhất.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;