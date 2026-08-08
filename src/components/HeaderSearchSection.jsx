import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

//import ProductContext from "../context/ProductContext";

function HeaderSearchSection() {

    useEffect(() => {
        console.log("[HeaderSearchSection] đang chạy useEffect() của component HeaderSearchSection !");
        
        // hàm cleanup
        return () => {
            console.log("[HeaderSearchSection] đang chạy hàm cleanup của useEffect() !");
        };
    });

    const [searchedKeyword, setSearchedKeyword] = useState("");

    console.log("[HeaderSearchSection] component HeaderSearchSection render ! searchedKeyword la : " + searchedKeyword);

    const navigate = useNavigate();

    function handleSearchByKeyword(event) {
        console.log("[handleSearchByKeyword] phim da bam la : " + event.key);

        if (event.key === "Enter") {
            event.preventDefault();
            let keywordStr = searchedKeyword.trim();

            console.log("[handleSearchByKeyword] keyword da nhap : " + keywordStr);

            if (keywordStr == "") {
                //showToastBox("error", "Có lỗi xảy ra!", "<span>Vui lòng nhập từ khóa.</span>");
                return false;
            }

            navigate("/products?keyword=" + keywordStr);
        }
    }
   
    return (
        <div className="search-box">
            <i className="fas fa-search search-icon"></i>
            <input type="text" placeholder="Tìm sản phẩm..." value={searchedKeyword} onChange={(event) => setSearchedKeyword(event.target.value)} onKeyDown={(event) => handleSearchByKeyword(event)} />
        </div>
    )
}

export default HeaderSearchSection;
