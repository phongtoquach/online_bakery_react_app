import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";

import { defaultProductImageSrc } from "../config/app_configs";

function ProductThumbnails({ productImages }) {

    useEffect(() => {
        console.log("[ProductThumbnails] đang chạy useEffect() của component ProductThumbnails !");
        
        // hàm cleanup
        return () => {
            console.log("[ProductThumbnails] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[ProductThumbnails] component ProductThumbnails render ! Mang productImages vua truyen vao :");
    console.log(productImages);

    let finalProductImages = [];
    if (!productImages || !Array.isArray(productImages)) {
        console.log("[ProductThumbnails] productImages khong duoc truyen vao hoac khong phai array ! Su dung hinh default !");
        finalProductImages.push(defaultProductImageSrc);
    }
    else {
        if (productImages.length === 0) {
            console.log("[ProductThumbnails] productImages la mang rong ! Su dung hinh default !");
            finalProductImages.push(defaultProductImageSrc);
        }
        else {
            console.log("[ProductThumbnails] productImages la mang co phan tu !");
            finalProductImages = [...productImages];
        }
    }

    console.log("[ProductThumbnails] Mang finalProductImages :");
    console.log(finalProductImages);

    const [selectedImage, setSelectedImage] = useState(finalProductImages[0]);
    console.log("[ProductThumbnails] bien selectedImage hien tai : " + selectedImage);
   
    return (
        <>
            <div className="product-gallery" id="productGallery">
                <div className="main-image"><img src={selectedImage} alt="main image" /></div>
                <div className="gallery-thumbnails" id="productGalleryThumbnails">
                    {
                        finalProductImages.map((proImage, index) => {
                            return (
                                <img src={proImage} alt="image thumbnail" onClick={() => setSelectedImage(proImage)} key={index} data-imageindex={index}
                                className={`product-image-thumbnail ${proImage === selectedImage ? "active" : ""}`}/>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ProductThumbnails;
