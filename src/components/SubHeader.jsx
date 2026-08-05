import { useContext, useEffect } from "react";

import ProductContext from "../context/ProductContext";
import CartContext from "../context/CartContext";

function SubHeader() {

    //const { setStudentName } = useContext(ProductContext);
    const { studentMark } = useContext(CartContext);

    useEffect(() => {
        console.log("[SubHeader] đang chạy useEffect() của component SubHeader !");
        
        // hàm cleanup
        return () => {
            console.log("[SubHeader] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[SubHeader] component SubHeader render !");
   
    return (
        <header>
            <h1>Khu vực Sub Header - Mark là : {studentMark}</h1>
        </header>
    )
}

export default SubHeader;